# Cocos community survey app: source

The live app is the single file `index.html` in the repository root (plus `sw.js`, `manifest.webmanifest`, `icon.svg`, `robots.txt`). It is built from the files in this folder.

`source_v16.tar.gz.b64` is a base64-encoded gzipped tar of the source for version v16-offline:

- app/spec.json: the survey instrument (blocks, pages, items, display logic, conjoint attributes)
- app/i18n_map.json: maps item fields to translation IDs (the same IDs as the translation document)
- app/translation_ms.json: Cocos Malay strings by ID (empty until the translation returns)
- app/style.css: styles
- app/app.js: the application (survey engine, household grid and visit log, exports)
- app/build.py: inlines everything into ghpages/index.html and writes sw.js
- test_app.js: Playwright smoke test

To unpack and rebuild:

    base64 -d app/source_v16.tar.gz.b64 | tar xz
    python3 app/build.py
    cp ghpages/index.html ghpages/sw.js .

SHA-256 of the decoded tar.gz: 3a801ae5c1763749253b419e2e177b6675ceab986a2fb4c8a915b889c0973dda

Data never leave the device. Responses and the household log are stored in the browser (localStorage) and exported by the interviewer from the Interviewer page.
