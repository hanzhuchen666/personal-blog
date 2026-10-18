# Experiments publishing

Experiments use the same BaseLayout, article list, dates, comments and feedback as notes.
Metadata and introductory prose live in `src/content/experiments/*.md`; `app` points to a browser app under `public/experiments/apps/`.
The detail page starts the iframe only after a click, keeping article navigation lightweight.

## Boids release

Exported from private `notes/boids.py` using marimo 0.25.1, run mode, code hidden.
The publishing copy removes the unused Matplotlib import and replaces the editor-only “expand a cell” instruction. The original notebook is unchanged.

Directory export is used instead of single-file CDN export. Frontend assets are stored once at `public/experiments/_shared/marimo-0.25.1/assets/`; references in the exported HTML point there. Keep dynamic imports and worker files together in that assets directory. Other experiments exported with the same version can reuse the same verified assets. New marimo versions need a separate version directory; do not overwrite immutable resources.
Pyodide and Python packages still load from upstream sources; this is not an offline export. Downloads and Python startup still take time on a first visit.

`--mode run --no-show-code` hides the code in the application UI. WASM exports contain the Python needed by the browser and do not provide source confidentiality. Do not publish credentials, private datasets, or unselected notebooks.

## Update workflow

1. Export only the selected notebook into a temporary directory with marimo 0.25.1:
   `marimo export html-wasm /path/to/boids.py -o /tmp/boids-export --mode run --no-show-code --no-include-cloudflare`
2. Apply the release-only dependency/prose changes described above before export. Copy the exported app into `public/experiments/apps/boids/`, excluding the generated `CLAUDE.md`. Move `assets/` to the shared version directory (verify identical contents before reusing an existing version), and replace `./assets/` in the HTML with `/experiments/_shared/marimo-0.25.1/assets/`.
3. Run `npm run build`. The build checks the entire output against Cloudflare's 25 MiB per-file limit and 20,000-file free Pages limit. Total directory size is not the per-file limit.
4. Serve `dist/` locally, inspect desktop/mobile pages, launch the notebook, confirm animation and slider interaction, and check network errors.
5. Review the diff, commit and push the blog repository. Its existing Cloudflare Git integration performs the build/deploy; no per-experiment Wrangler configuration is needed.
