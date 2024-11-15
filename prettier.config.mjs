/**
 * Some of Prettier's defaults can be overridden by an EditorConfig file.
 * Define those here to ensure that doesn't happen.
 *
 * See: https://github.com/prettier/prettier/blob/main/docs/configuration.md#editorconfig
 */

const globalDefaults = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  endOfLine: "lf",
};

export default {
  ...globalDefaults,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  embeddedLanguageFormatting: "auto",
  singleAttributePerLine: false,
  plugins: ["prettier-plugin-packagejson"],
};
