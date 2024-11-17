import { Palette } from "@/data/constants";

const DEFAULT_COLOR = "currentColor";

const setCourtColor = (rawCourtInput: string): string =>
  rawCourtInput.replaceAll(DEFAULT_COLOR, Palette.BLACK);

export default setCourtColor;
