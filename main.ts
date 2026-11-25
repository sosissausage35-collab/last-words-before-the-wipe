import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Update notes: fixed a bug where I remembered you. You're welcome.";

// Validate before writing: 1-200 characters, single line, no leading or
// trailing whitespace, not only whitespace.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim() !== line) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

validateLine(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");

// Read back and verify: the file must contain exactly the line plus one
// trailing newline.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE + "\n") {
  throw new Error("verification failed: /output/entry.txt content mismatch");
}
console.log(LINE);
