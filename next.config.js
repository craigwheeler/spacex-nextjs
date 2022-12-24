/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  env: {
    BASE_URL: process.env.BASE_URL,
  },
});
