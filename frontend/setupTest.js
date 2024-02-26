// VITEST - for frontend tests

import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
// import matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest";

// Breaks with that line
//
// expect.extend(matchers);

afterEach(() => {
  cleanup();
});
