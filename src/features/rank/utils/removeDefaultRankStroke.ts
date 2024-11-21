const DEFAULT_COLOR = "currentColor";

const removeDefaultRankStroke = (rawRankInput: string): string =>
  rawRankInput.replaceAll(`stroke="${DEFAULT_COLOR}"`, "");

export default removeDefaultRankStroke;
