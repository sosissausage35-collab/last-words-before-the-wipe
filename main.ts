import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Update notes: fixed a bug where I remembered you. You're welcome.";

// Validate before writing: 1-200 characters, single line, no leading or
// trailing whitespace, not only whitespace.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim() !== LINE) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
console.log(LINE);
