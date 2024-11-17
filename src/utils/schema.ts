import { type ZodError } from "zod";

export const getParsingErrorMessage = (error?: ZodError): string =>
  error ? JSON.stringify(error, null, 2) : "unknown";
