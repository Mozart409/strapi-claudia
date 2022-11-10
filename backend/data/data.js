const { global, pages } = require("./de");

const { leadFormSubmissions } = require("./lead-form-submissions.json");

module.exports = {
  globals: [global],
  pages: [...pages],
  leadFormSubmissions,
};
