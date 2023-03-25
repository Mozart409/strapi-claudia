module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env("PGHOST", "localhost"),
        port: env.int("PGPORT", 5432),
        database: env("PGDATABASE", "strapi"),
        username: env("PGUSER", "strapi"),
        password: env("PGPASSWORD", "strapi"),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
