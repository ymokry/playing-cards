import { type ZodError } from "zod";

export const getParsingErrorMessage = (error?: ZodError): string =>
  error ? JSON.stringify(error.flatten().fieldErrors, null, 2) : "unknown";
