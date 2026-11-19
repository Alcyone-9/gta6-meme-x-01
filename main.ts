// Entry program for the make.fun bounty "gta6-meme-x-01" (Post a GTA 6 meme on X).
//
// The entry itself is the X post; this program has exactly one job: hand the
// post's address to the grader. It copies POST.json from the repository root
// into the output directory, byte for byte, and that is all. It uses only the
// Node.js standard library, touches no network, reads no clock, and writes the
// same bytes on every run.
//
// Where the files live can be overridden for a local dry run:
//   MAKEFUN_BOT_DIR    repository root  (default "/bot" in the grader)
//   MAKEFUN_OUTPUT_DIR output directory (default "/output" in the grader)
//
// Local check:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

function abort(reason: string): never {
  console.error(`gta6-meme-x-01: ${reason}`);
  process.exit(1);
}

const repoDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(repoDir, "POST.json");
const target = join(outDir, "POST.json");

if (!existsSync(source)) {
  abort(`no POST.json found at ${source} - nothing to hand in`);
}

mkdirSync(outDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (err) {
  abort(`could not copy POST.json to ${target}: ${(err as Error).message}`);
}
