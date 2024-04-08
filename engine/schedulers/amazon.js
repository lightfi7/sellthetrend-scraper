const cron = require("node-cron");

class Scheduler {
  scheduledTasks = {};

  putSchedTask = (name, opt, cb) => {
    scheduledTasks[name] = cron.schedule(
      opt, //"* * * * *",
      () => {
        cb();
      },
      {
        scheduled: false,
      }
    );
  };

  popSchedTask = (name) => {
    scheduledTasks[name] = null;
    delete scheduledTasks[name];
  };

  start = () => {
    for (const task of scheduledTasks) {
      task.start();
    }
  };

  stop = () => {
    for (const task of scheduledTasks) {
      task.stop();
    }
  };
}

module.exports = new Scheduler();
