$env:GIT_PAGER = ""
$env:PAGER = ""
git add package.json
git add package-lock.json
git add vite.config.js
git add src/pages/ServiceCharter.jsx
git add src/components/BrandMark.jsx
git add src/components/Layout.jsx
git add src/lib/translations.js
git commit -m "fix: add esbuild dep, migrate to oxc minifier, fix SW translations and UI polish"
git push origin main
Write-Output "DONE"
