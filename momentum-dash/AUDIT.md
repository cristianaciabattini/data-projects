# Audit – Momentum Dash replica

Publication audit of the `momentum-dash` project before making the repository public. Sanitized summary: no secret values or private details are included.

## How the audit was run

- **Tool:** my coding assistant (Claude), with the audit prompt from the assignment, used word for word.
- **Rules followed:** the assistant did not modify files, run the project code, commit or push, and no secret values were printed.
- **Evidence inspected:** output of `git status`, `git log --oneline`, `git ls-files -s` (all tracked files with content hashes, compared with the reviewed versions) and a secret-keyword search of tracked files that prints file names or keywords only (`git grep -l` / `git grep -n -o`).
- **Runs:** run 1 on 2026-11-25, run 2 and a final check on 2026-11-26, after the fixes.

## What was checked

- Secrets, credentials, personal or sensitive data (code, README, photos, screenshot, commit e-mails)
- Files that should be excluded (local configuration, caches, dependency folders, generated files)
- `.gitignore` rules
- Dependencies, setup instructions and configuration
- README sections: purpose, data collection, persistence, user interaction, setup, learning, limitations, screenshot

## Issues found and fixes

| Run | Issue | Type | Fix |
| --- | --- | --- | --- |
| 1 | `momentum-dash/README.md` was empty: the full README had been written but never saved and committed | Confirmed | README saved and committed |
| 1 | No screenshot in the repository | Confirmed | `screenshots/newtab.png` added |
| 1 | `AUDIT.md` missing | Confirmed | This file |
| 2 | Root `README.md` contained only a title, with no links to the projects | Confirmed | Root README now describes the repository and links to `momentum-dash/` |
| 2 | Screenshot could show personal details | Possible concern | Reviewed before publishing: it shows only neutral example tasks |
| 1 | Commit e-mail addresses become public | Possible concern | Checked privately: all commits use GitHub's private *noreply* address |
| 1–2 | Secret-keyword search matched `README.md` | Checked, not an issue | The only match is the word "token" in a sentence explaining how I pushed to GitHub; no credential |

## Confirmed safe by design


- **No API keys or secrets are needed:** Open-Meteo requires no key, and the Tuttosport RSS feed is public. The GitHub access token used to push lives in the macOS Keychain, outside the repository.
- **No personal data in the code:** my name and my tasks are stored only in `chrome.storage.local` in my browser. The location is rounded to about 1 km, used only for the weather request, and never stored.
- **Photos:** my own photos, converted to JPEG with all metadata removed (including GPS); one recognisable person cropped out and one number plate pixelated.
- **Minimal permissions:** `storage`, `geolocation` and host access to `www.tuttosport.com` only.
- **Excluded files:** `.gitignore` excludes macOS `.DS_Store` files. The project has no dependencies, caches, build output or local configuration files, so nothing else needs excluding.

## Remaining limitations

- The audit relied on command output from my computer; the assistant could not open the folder directly. Five files edited by hand in VS Code (`manifest.json`, `newtab.html`, `style.css`, `background.js`, `weather.js`) were covered by the secret search but not compared line by line with the reviewed versions.
- Finding no issues does not prove the project is safe; the checks cover the risks listed above.
- Functional limitations of the extension are listed in the README.