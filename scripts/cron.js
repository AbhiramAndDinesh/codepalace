const cron = require("node-cron");
const axios = require("axios");
async function leetcodecron() {
  try {
    console.log("Leetcode cron job is running");
    await axios.post("http://localhost:3000/api/leetcode");
  } catch (error) {
    console.log("Error in running  cron job:", error);
  }
}
async function codechefcron() {
  try {
    console.log("Codechef cron job is running");
    await axios.post("http://localhost:3000/api/codechef");
  } catch (error) {
    console.log("Error in running  cron job:", error);
  }
}
async function codeforcescron() {
  try {
    console.log("Codeforces cron job is running");
    await axios.post("http://localhost:3000/api/codeforces");
  } catch (error) {
    console.log("Error in running  cron job:", error);
  }
}
// cron.schedule("0 * * * * * ", () => {
//   leetcodecron();
//   console.log("Running cron job every minute");
// });
// cron.schedule("15 * * * * *", () => {
//   codechefcron();
// });
// cron.schedule("30 * * * * *", () => {
//   codeforcescron();
// });
console.log("Cron job is scheduled in development.");
