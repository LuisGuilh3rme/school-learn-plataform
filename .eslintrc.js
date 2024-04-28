module.exports = {
  root: true,
  extends: ["universe/native"],
  rules: {
    // Ensures props and state inside functions are always up-to-date
    "react-hooks/exhaustive-deps": "warn",
  },
  overrides: [
    {
      // Test files only
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  parser: "@typescript-eslint/parser",
};
