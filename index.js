require("dotenv").config();
const { makeConnection } = require("./engine/database");
const amazonEngine = require("./engine/services/amazon");
const nexusEngine = require("./engine/services/nexus");
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
  // amazonEngine.configService({
  //   headless: false,
  //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
  // });
  // amazonEngine.initEndpoints((app, page) => makeAmazonEndpoints(app, page));
  // const amazonServer = await amazonEngine.startService();
  nexusEngine.configService({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  nexusEngine.initEndpoints((app, page) => makeNexusEndpoints(app, page));
  const nexusServer = await nexusEngine.startService();
  //#endregion

  //#region TASKS
  nexusTask.init();
  amazonTask.init();
  //#endregion

  //#region SCHEDULERS
  // amazonScheduler.putSchedTask("fetch", "*/2 * * * *", amazonTask.run);
  nexusScheduler.putSchedTask("fetch", "*/2 * * * *", nexusTask.run);
  // amazonScheduler.putSchedTask("fetch", "*/2 * * * *", () => {
  //   console.log("amazon");
  // });
  nexusScheduler.putSchedTask("fetch", "*/2 * * * *", () => {
    console.log("nexus");
  });
  // amazonScheduler.start();
  nexusScheduler.start();
  //#endregion

  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // await amazonEngine.stopService(server);
  console.log(";)");
})();
