# Portfolio maintenance

Read `README.md` for the file map, preview, and publication workflow.

- MUST use jj for version-control mutations; DO NOT use git add/commit/checkout/push/pull.
- MUST prepare a feature working copy before source edits and run relevant syntax
  and user-workflow checks after changes. After `jj describe`, immediately `jj new`.
- MUST keep the website static and directly editable unless the operator requests
  a different architecture. Do not add build dependencies, analytics, authentication,
  a CMS, contact forms, or background updates without a request.
- MUST publish only `site/`. Do not copy private notes or operational source into it.
- MUST use the maintainer's public no-reply commit identity; do not publish a personal email.
- MUST preserve anonymity, conceptual naming, evidence boundaries, and visible
  failure limits. Do not imply production deployment, measured impact, or statistical
  triangulation where the cases do not establish them.
- MUST keep case content in semantic HTML. The diagram viewer is a progressive
  enhancement; direct image links and downloads MUST work without JavaScript.
- SHOULD preserve the established navy/white/orange editorial design, responsive
  behavior, keyboard access, reduced-motion preference, and 200% text enlargement.
- MUST keep draw.io source, SVG exports, PDF, and case explanations consistent.

Keep task scratch, screenshots, logs, credentials, and runtime browser state outside
the public repository. Publish reviewed changes through the repository's Pages
workflow and record the successful deployment URL.
