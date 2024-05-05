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
    for (const name of Object.keys(scheduledTasks)) {
      const task = scheduledTasks[name];
      task.start();
    }
  };

  stop = () => {
    for (const name of Object.keys(scheduledTasks)) {
      const task = scheduledTasks[name];
      task.stop();
    }
  };
}

module.exports = new Scheduler();
