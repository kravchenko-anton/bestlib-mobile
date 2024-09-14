module.exports = function (api) {
  const plugins = [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
      },
    ],
    ["nativewind/babel"],
    "react-native-reanimated/plugin",
  ];

  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins,
  };
};
