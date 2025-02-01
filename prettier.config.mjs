import erPrettierConfig from '@eternalrival/prettier-config';

/**
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  ...erPrettierConfig,
  /* your rules */
};

export default config;
