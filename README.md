# Systems Portfolio

An anonymized portfolio of three backend and operations case studies, illustrated
with seven editable draw.io models. The page covers purchase-intent processing,
distributed telemetry, and mobile access to an analysis workstation.

[Portfolio](https://cargo-build.github.io/backend-process-portfolio/) ·
[Source repository](https://github.com/cargo-build/backend-process-portfolio)

The cases explain mechanisms, responsibilities, and failure boundaries. They do
not claim measured commercial impact, a production rollout of the purchase feature,
or distributed exactly-once payment processing.

## Edit the page

| File | Responsibility |
|---|---|
| `site/index.html` | Page text, case sections, diagram descriptions, links, metadata |
| `site/styles.css` | Typography, colors, spacing, responsive layout |
| `site/app.js` | Full-size diagram viewer and keyboard controls |
| `site/assets/diagrams/*.svg` | Seven approved draw.io exports |
| `site/assets/process-models.drawio` | Editable seven-page diagram source |
| `site/assets/portfolio.pdf` | Seven-page presentation download |
| `.github/workflows/pages.yml` | Publish `site/` to GitHub Pages |

Edit case text directly in `site/index.html`. Keep the existing section identifiers
so navigation links remain stable. Add a case by following an existing section's
semantic structure; update its navigation and figure labels in the same change.

Open `site/assets/process-models.drawio` in draw.io to update a drawing. Export
its SVG to the matching diagram filename, and export all seven pages to the PDF.
Keep the drawing, explanation, accessible image description, and download consistent.
The viewer discovers diagram links from the page; it does not maintain a second
hard-coded diagram catalog.

## Preview locally

No package installation or build step is required. From the checkout:

```sh
python3 -m http.server 4173 --bind localhost --directory site
```

Open `http://localhost:4173` and stop the server with Ctrl+C when finished.
Check desktop and mobile layouts, one enlarged diagram, all download links,
keyboard navigation, and text enlargement. Read the cases with JavaScript disabled
to verify the base page and direct image links remain useful.

Check JavaScript syntax after changing the viewer:

```sh
node --check site/app.js
```

## Publish an update with jj

The repository uses jj with a Git backend. Start from the published branch and
prepare a feature change before editing:

```sh
jj git fetch
jj new main@origin
jj bookmark set feat/portfolio-update -r @
```

Keep a public no-reply commit identity for this anonymized repository. The
maintainer's local checkout already has repository-scoped identity settings;
configure them after cloning into a new checkout:

```sh
jj config set --repo user.name cargo-build
jj config set --repo user.email cargo-build@users.noreply.github.com
```

If an initial working-copy change already has another identity, update its author
with `jj metaedit --update-author` before publishing.

After editing and previewing, describe the change, immediately create a fresh
working copy, and advance `main` to the reviewed revision:

```sh
jj describe -m "Update portfolio case studies"
jj new
jj bookmark set main -r @-
jj git push --bookmark main
```

The Pages workflow publishes only `site/`. Check the repository's Actions run
until deployment succeeds, then verify the published page. Use the workflow's
manual run when republishing an unchanged revision is necessary.

## Content rules

- MUST use generic roles and conceptual mechanisms in all published material.
- MUST omit employer and website identity, deployment aliases, real operational
  identifiers, addresses, credentials, private paths, and live operational data.
- MUST preserve the cases' evidence boundaries and visible failure limits.
- MUST distinguish intended benefits from measured results; no invented metrics.
- MUST retain readable case text, direct diagram links, and downloads without JavaScript.
- MUST keep browser assets local; no analytics or external font dependencies.

The public Gist is a supplementary diagram/source collection:
[anonymized process models](https://gist.github.com/cargo-build/584359278fe027fe10929f3c08f7faf9).
