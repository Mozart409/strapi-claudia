"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    // Called after an entry is created
    async afterCreate(result) {
      await strapi.plugins["email"].services.email.send({
        to: "",
        subject: "New entry in the lead-form-submissions in Strapi",
        text: "New entry in the lead-form-submissions in Strapi",
        html: `<h1>New entry in the lead-form-submissions in Strapi</h1>       <p>${result}</p>`,
      });
    },
  },
};
