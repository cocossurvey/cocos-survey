# Cocos community survey app: source

The live app is the single file `index.html` in the repository root (plus `sw.js`, `manifest.webmanifest`, `icon.svg`, `robots.txt`). It is built from the files in this folder.

`source_v16.tar.gz.b64` is a base64-encoded gzipped tar of the source for version v16-offline (household grid, sync, home screen):

- app/spec.json: the survey instrument (blocks, pages, items, display logic, conjoint attributes)
- app/i18n_map.json: maps item fields to translation IDs (the same IDs as the translation document)
- app/translation_ms.json: Cocos Malay strings by ID (empty until the translation returns)
- app/style.css: styles
- app/app.js: the application (survey engine, household grid and visit log, backup by share sheet, sync, exports)
- app/apps_script.gs: the Google Apps Script sync endpoint (Drive folder, live household sheet, upload log). Passcodes in this copy are placeholders.
- app/build.py: inlines everything into ghpages/index.html, stamps the build hash and writes sw.js
- test_app.js: Playwright smoke test of the survey flow
- test_sync.js: Playwright test of two devices syncing through a mocked endpoint (test passcodes only)
- shots.js: screenshot script

SHA-256 of the decoded tar.gz: e639e645a78d444a496e6b4b6fbd448845e0a6ddef710ba740d967cb71fc6449

To unpack and rebuild:

    base64 -d source_v16.tar.gz.b64 > source_v16.tar.gz
    sha256sum source_v16.tar.gz
    mkdir src && tar xzf source_v16.tar.gz -C src
    cd src && mkdir ghpages && python3 app/build.py

## Sync and passcodes

The app posts its data (responses and household log) to a Google Apps Script web app owned by the research team whenever it has internet, and merges what comes back. The endpoint URL is public; it is in the page source. Access is controlled by per-device passcodes that live only in the deployed script (the PASSCODES table in apps_script.gs), never in this repository or in the page. A request with an unknown passcode is refused. Only passcodes marked admin may clear the server copy. To revoke a device, delete its line in the deployed script and publish a new version.

Each device also has a "Send backup by email" button that shares the full data file through the tablet's share sheet, as a fallback that does not depend on the sync endpoint.

Respondent data are never stored in this repository.
