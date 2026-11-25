// The Funniest One-Line Resignation Letter
// (make.fun competition u-deranalabs-the-funniest-one-line-resignation-letter-53c0d947)
//
// The entry is a single line, written in the voice of a retry loop whose
// exponential backoff has quietly outgrown the job it was retrying.
// Flat, tired, faintly passive-aggressive, and specific: only a retry loop
// could complain that its waiting now takes longer than the work itself.

import { mkdirSync, writeFileSync } from "node:fs";

// The resignation letter itself. One line, 107 characters, no quotation
// marks around it, no stage directions, no explanation of the joke.
const LINE =
  "I resign: my backoff now waits longer than the job I retry ever took to run, so at this point I am the job.";

// The grader mounts the repository read-only, so a relative output path
// would throw and fail the run. The entry must go to the absolute path.
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "/output/entry.txt";

// The gate counts characters, not UTF-16 code units, so measure the line
// the way the scorer does: one code point at a time.
function charCount(text: string): number {
  return [...text].length;
}

function validateLine(line: string): void {
  // Guard the gate before writing: the entry must be 1-140 characters
  // of UTF-8 text and not only whitespace, or it scores Valid 0.
  const length = charCount(line);
  if (length < 1 || length > 140) {
    throw new Error(`entry line is ${length} characters, must be 1-140`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateLine(LINE);

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, LINE, "utf8");
}

main();
