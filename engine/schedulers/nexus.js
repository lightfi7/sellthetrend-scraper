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
    for (const taskKey of Object.keys(scheduledTasks)) {
      const task = scheduledTasks[taskKey];
      task.start();
    }
  };

  stop = () => {
    for (const taskKey of Object.keys(scheduledTasks)) {
      const task = scheduledTasks[taskKey];
      task.stop();
    }
  };
}

module.exports = new Scheduler();
