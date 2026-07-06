# Space Field Generator

Generative audio-reactive visual system. Desktop app (Mac + Windows).

## Run locally (dev mode)

```bash
npm install
npm start
```

## Build distributable

```bash
npm install

# Mac (.dmg, Intel + Apple Silicon)
npm run build:mac

# Windows (.exe installer)
npm run build:win
```

Output goes to `dist/` folder.

## First run

1. Open the app
2. Click **"Enable audio input"** and allow microphone access
3. Play music through your speakers or route DAW audio via BlackHole (Mac) / VB-Cable (Win)
4. Use the panel on the right to switch modes and tweak parameters

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `1–5` | Switch mode (Field / Lines / Stream / Flow / Organic) |
| `Cmd/Ctrl + S` | Save HD frame (native dialog) |
| `Cmd/Ctrl + R` | Regenerate composition |
| `Cmd/Ctrl + /` | Toggle control panel |
| `Cmd/Ctrl + F` | Fullscreen |

## Routing DAW audio (macOS)

Install [BlackHole](https://existential.audio/blackhole/) (free).
In Ableton: Preferences → Audio → Output Device → BlackHole 2ch.
In Space Field: select BlackHole as your mic input when prompted.

## Routing DAW audio (Windows)

Install [VB-Cable](https://vb-audio.com/Cable/) (free).
Set CABLE Input as Ableton output, CABLE Output as mic input in Space Field.
