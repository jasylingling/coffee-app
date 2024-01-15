const { $schema, ...config } = require('@smartive/prettier-config');
module.exports = {
  ...config,
  plugins: ['prettier-plugin-tailwindcss'],
};
