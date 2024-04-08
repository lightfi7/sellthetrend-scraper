require("dotenv").config();
const { makeConnection } = require("./engine/database");
const engine = require("./engine");
const amazonTask = require("./engine/tasks/amazon");
const nexusTask = require("./engine/tasks/nexus");
const amazonScheduler = require("./engine/schedulers/amazon");
const nexusScheduler = require("./engine/schedulers/nexus");
const makeAmazonEndpoints = require("./engine/endpoints/amazon");
const makeNexusEndpoints = require("./engine/endpoints/nexus");

(async () => {
  await makeConnection(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
  });

  //#region  SEVICE
  engine.configService({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  engine.initEndpoints((app, page) => makeAmazonEndpoints(app, page));
  const server = await engine.startService();
  //#endregion

  //#region TASKS
  nexusTask.init();
  amazonTask.init();
  //#endregion

  //#region SCHEDULERS
  // amazonScheduler.putSchedTask("fetch", "*/2 * * * *", amazonTask.run);
  // nexusScheduler.putSchedTask("fetch", "*/2 * * * *", nexusTask.run);
  amazonScheduler.putSchedTask("fetch", "*/2 * * * *", () => {
    console.log("amazon");
  });
  nexusScheduler.putSchedTask("fetch", "*/2 * * * *", () => {
    console.log("nexus");
  });
  amazonScheduler.startScheduler();
  nexusScheduler.startScheduler();
  //#endregion

  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // await engine.stopService(server);
  console.log(";)");
})();
