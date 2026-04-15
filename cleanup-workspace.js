const fs = require("fs");
const path = require("path");

// Clean up pnpm-workspace.yaml
const workspaceYamlPath = path.join(process.cwd(), "pnpm-workspace.yaml");
if (fs.existsSync(workspaceYamlPath)) {
  let yaml = fs.readFileSync(workspaceYamlPath, "utf8");
  // Remove @replit exclusions and catalog entries
  yaml = yaml.replace(/\s*-\s*'@replit\/\*'/g, "");
  yaml = yaml.replace(/\s*'@replit\/vite-plugin-cartographer':.*?\n/g, "\n");
  yaml = yaml.replace(/\s*'@replit\/vite-plugin-dev-banner':.*?\n/g, "\n");
  yaml = yaml.replace(
    /\s*'@replit\/vite-plugin-runtime-error-modal':.*?\n/g,
    "\n",
  );
  yaml = yaml.replace(/\s*'@types\/.*?':.*?\n/g, "\n");
  yaml = yaml.replace(/\s*'tsx':.*?\n/g, "\n");

  fs.writeFileSync(workspaceYamlPath, yaml);
  console.log("Cleaned up pnpm-workspace.yaml");
}

// Ensure typescript isn't listed anywhere
function cleanPackageJson(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!["node_modules", ".git", "dist"].includes(file)) {
        cleanPackageJson(fullPath);
      }
    } else if (file === "package.json") {
      try {
        let pkgRaw = fs.readFileSync(fullPath, "utf8");
        let pkg = JSON.parse(pkgRaw);
        let modified = false;

        ["dependencies", "devDependencies", "peerDependencies"].forEach(
          (depType) => {
            if (pkg[depType]) {
              for (const name of Object.keys(pkg[depType])) {
                if (
                  name.startsWith("@replit/") ||
                  name.startsWith("@types/") ||
                  name === "typescript" ||
                  name === "tsx"
                ) {
                  delete pkg[depType][name];
                  modified = true;
                }
              }
            }
          },
        );

        // Clean up scripts
        if (pkg.scripts) {
          for (const [scriptName, scriptCmd] of Object.entries(pkg.scripts)) {
            if (scriptCmd.includes("tsc ") || scriptCmd.includes("typecheck")) {
              delete pkg.scripts[scriptName];
              modified = true;
            } else if (scriptCmd.includes(".ts")) {
              pkg.scripts[scriptName] = scriptCmd.replace(/\.ts\b/g, ".js");
              modified = true;
            }
          }
        }

        if (modified) {
          fs.writeFileSync(fullPath, JSON.stringify(pkg, null, 2) + "\n");
          console.log(`Cleaned up ${fullPath}`);
        }
      } catch (e) {
        console.error(`Error processing ${fullPath}`, e);
      }
    }
  }
}

cleanPackageJson(process.cwd());
