const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

class Engine {
  //#region BROWSER
  constructor() {
    this.browser = null;
    this.page = null;
    this.config = {};
    this.app = express();
    this.app.use(bodyParser.json());
    this.errorNum = 0;
  }

  configService = (config) => {
    this.config = config;
  };

  launchBrowser = async (headless = false, args = []) => {
    this.browser = await puppeteer.launch({
      headless: headless,
      args: args,
    });
    this.page = await this.browser.newPage();
  };

  loginBrower = async () => {
    try {
      await this.page.goto("https://www.sellthetrend.com/login", {
        timeout: process.env.WAIT_TIME,
        waitUntil: "networkidle0",
      });
      await this.page.waitForSelector("#email", {
        timeout: process.env.WAIT_TIME,
      });
      await this.page.type("#email", process.env.NEXUS_EMAIL);
      await this.page.type("#password", process.env.NEXUS_PASSWORD);
      await this.page.click("button[type=submit]");
      await Promise.all([
        await this.page.click("button[type=submit]"),
        await this.page.waitForNavigation({ timeout: process.env.WAIT_TIME }),
      ]);

      const url = await this.page.url();
      if (url == "https://www.sellthetrend.com/login") Promise.reject();
      Promise.resolve();
    } catch (err) {
      Promise.reject(err);
    }
  };

  beginBrowser = async () => {
    try {
      const { headless = false, args = [] } = this.config;
      await this.launchBrowser(headless, args);
      await this.loginBrower();
      await this.page.goto(
        "https://www.sellthetrend.com/dashboard/products/amazon",
        {
          timeout: process.env.WAIT_TIME,
        }
      );
      Promise.resolve();
    } catch (err) {
      console.log(err);
      this.errorNum++;
      if (this.browser) await this.browser.close();
      if (this.errorNum < 3) {
        setTimeout(
          async () => Promise.resolve(await this.beginBrowser()),
          3000
        );
      } else {
        Promise.reject(err);
      }
    }
  };
  //#endregion

  //#region ENDPOINTS
  initEndpoints = (cb) => {
    cb(this.app, this.page);
  };
  //#endregion

  startService = async () => {
    await this.beginBrowser();
    return this.app.listen(process.env.NEXUS_PORT || 5000, () => {
      console.log(
        `Server is running on port ${process.env.NEXUS_PORT || 5000}`
      );
    });
  };

  stopService = async (server) => {
    server.close(async (err) => {
      if (err) Promise.reject(err);
      await this.browser.close();
      Promise.resolve();
    });
  };
}

module.exports = new Engine();
