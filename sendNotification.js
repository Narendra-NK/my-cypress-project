const axios = require("axios");
const fs = require("fs");

const webhookURL = process.env.SLACK_WEBHOOK_URL; // Read from GitHub Actions secret
const logFilePath = "cypress/logs/test-run.log";

// Read log file and check if tests passed or failed
fs.readFile(logFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("❌ Error reading log file:", err);
    return;
  }

  const passed = (data.match(/✓/g) || []).length;
  const failed = (data.match(/✖/g) || []).length;

  let message = `📝 Cypress Test Results: \n✅ Passed: ${passed} \n❌ Failed: ${failed}`;

  console.log("📨 Sending message:", message);

  axios
    .post(webhookURL, { text: message })
    .then(() => console.log("✅ Notification sent successfully!"))
    .catch((error) =>
      console.error("❌ Error sending notification:", error.response?.data || error.message)
    );
});
