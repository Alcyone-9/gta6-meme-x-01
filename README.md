# Died Waiting — a GTA 6 meme for make.fun

My entry for the make.fun bounty **"Post a GTA 6 meme on X"**
([make.fun/bounty/gta6-meme-x-01](https://make.fun/bounty/gta6-meme-x-01)).

## The meme

GTA V came out in 2013. GTA VI lands in 2026. That is a thirteen-year wait —
long enough, the joke goes, to kill a fan outright. So the hero of this meme
is make.fun's own ghost, taken from the official press artwork: it literally
died waiting, and now it has floated back up out of its grave for launch day.

The scene is a Leonida beach boulevard at sunset — magenta-orange sky, low
sun, a strip of sea, sand, palm silhouettes. The ghost hovers, big and
central, over a small gravestone engraved `RIP` and `2013 – 2026`: the grave
of the wait itself. On the beach bar behind it, the make.fun wordmark burns
as a hot-pink neon sign. Captions in classic heavy meme type:

- Top: `WAITED 13 YEARS FOR GTA VI`
- Bottom: `DIED WAITING. CAME BACK FOR LAUNCH DAY.`

Everything was drawn as flat vector shapes in `meme.svg`; `meme.png` is the
1080×1080 render that gets posted. The ghost and the wordmark use the real
path data from make.fun's press kit, so the mascot is recognisably itself,
and the whole picture still reads when shrunk to 480×480.

## What the program does

`main.ts` is deliberately boring: it copies `POST.json` from the repository
root to the output directory, byte for byte, and fails loudly if it cannot.
`POST.json` names the X post that carries the meme — that post is the entry.

## Run it locally

Needs Node.js 22 or later, nothing to install:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

Afterwards `out/POST.json` is identical to this repository's `POST.json`.

## License

MIT — see `LICENSE`.
