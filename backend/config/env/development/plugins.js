module.exports = ({ env }) => ({
  // ...
  // ...
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: env("DEFAULT_FROM_EMAIL"),
      defaultReplyTo: env("DEFAULT_REPLAY_EMAIL"),
    },
  },
});
