module.exports = {
  reporters: [
    "default",
    ["jest-junit", {
      outputDirectory: "coverage",
      outputName: "junit.xml",
      classNameTemplate: "{classname}",
      titleTemplate: "{title}",
      ancestorSeparator: " › ",
      usePathForSuiteName: true
    }]
  ]
};