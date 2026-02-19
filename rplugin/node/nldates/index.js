const chrono = require("chrono-node");
const moment = require("moment");

module.exports = (plugin) => {
  plugin.registerFunction(
    "NLDATE",
    ([date, fmt]) => {
      const results = chrono.parse(date);
      if (results.length === 0) return;

      const parsedDate = results[0].date();
      const formatted = moment(parsedDate).format(fmt);
      return formatted;
    },
    { sync: true },
  );
};
