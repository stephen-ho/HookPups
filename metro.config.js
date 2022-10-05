// <<<<<<< HEAD
const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
// =======
// Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');

// const config = getDefaultConfig(__dirname);

// config.resolver.sourceExts = process.env.RN_SRC_EXT
//     ? [...process.env.RN_SRC_EXT.split(',').concat(config.resolver.sourceExts), 'cjs'] // <-- cjs added here
//     : [...config.resolver.sourceExts, 'cjs'] // <-- cjs added here

// module.exports = config;
// >>>>>>> 0f0b7d75a328f71bdbfd3541246953af643e51df
