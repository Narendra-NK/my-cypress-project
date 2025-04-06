const { defineConfig } = require("cypress");
const cypressSplit = require("cypress-split");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Use new ENV variable format for latest cypress-split
      const splits = parseInt(config.env.SPLIT, 10);
      const group = parseInt(config.env.SPLIT_INDEX, 10);

      if (!splits || isNaN(group)) {
        console.log("Invalid SPLIT or SPLIT_INDEX environment variables");
        return config;
      }

      cypressSplit(on, config, { splits, group });
      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: false,
  },
});
