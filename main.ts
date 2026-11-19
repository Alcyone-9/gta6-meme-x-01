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

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
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

// Fail loudly here, in our own run, rather than letting the gate refuse a
// malformed hand-in later: POST.json must parse and name an X post address
// of the shape the bounty accepts (x.com or twitter.com, digits-only id).
// The copy below still hands the file over byte for byte, untouched.
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(source, "utf8"));
} catch (err) {
  abort(`POST.json is not valid JSON: ${(err as Error).message}`);
}
const named =
  parsed !== null && typeof parsed === "object"
    ? (parsed as { url?: unknown }).url
    : undefined;
if (
  typeof named !== "string" ||
  !/^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+\/?(\?.*)?$/.test(
    named,
  )
) {
  abort(
    `POST.json does not name an X post address (got ${JSON.stringify(named)})`,
  );
}

mkdirSync(outDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (err) {
  abort(`could not copy POST.json to ${target}: ${(err as Error).message}`);
}
