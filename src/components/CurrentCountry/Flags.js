// Flags.js
const flags = {};
const requireFlags = require.context('../CountryFlags', false, /\.svg$/);

requireFlags.keys().forEach((filename) => {
  const flagName = filename.replace('./', '').replace('.svg', '');
  flags[flagName] = requireFlags(filename).default;
});

export default flags;
