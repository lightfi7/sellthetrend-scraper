const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = {
  makeConnection: async (url, options) => {
    mongoose
      .connect(url, options)
      .then(() => {
        console.log("Connected to the database!");
        Promise.resolve();
      })
      .catch((err) => {
        console.log("Cannot connect to the database!", err);
        Promise.reject(err);
      });
  },
  makeSchema: (schema) => {
    return mongoose.Schema(schema);
  },
  makeCollection: (name, schema) => {
    return mongoose.model(name, schema);
  },
};
