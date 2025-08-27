// cronjob.js
const cron = require("node-cron");
const {generalScraping}=require('./controllers/scraping');

// Run every 2 minutes
// cron.schedule("*/10 * * * *", () => {
//     generalScraping();
//     console.log("Hello World! The time is:", new Date().toLocaleTimeString());
// });
// cron.schedule("0 2 * * *", () => {
//   generalScraping();
//   console.log("Hello World! The time is:", new Date().toLocaleTimeString());
// });


module.exports = cron;
