const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

function walkAndConvert(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (
        !["node_modules", "dist", ".git", ".replit-artifact"].includes(file)
      ) {
        walkAndConvert(fullPath);
      }
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      // Exclude d.ts files
      if (file.endsWith(".d.ts")) {
        fs.unlinkSync(fullPath);
        console.log(`Deleted ${fullPath}`);
        continue;
      }

      const isTsx = file.endsWith(".tsx");
      const newExt = isTsx ? ".jsx" : ".js";
      const newPath = fullPath.substring(0, fullPath.lastIndexOf(".")) + newExt;

      try {
        const result = babel.transformFileSync(fullPath, {
          presets: [
            [
              "@babel/preset-typescript",
              { isTSX: isTsx, allExtensions: isTsx },
            ],
            ["@babel/preset-react", { runtime: "automatic" }], // For React 17+
          ],
          retainLines: true, // Keep line numbers as close as possible
          generatorOpts: { jsescOption: { minimal: true } }, // Don't unnaturally escape characters
        });

        if (result && result.code != null) {
          fs.writeFileSync(newPath, result.code);
          fs.unlinkSync(fullPath);
          console.log(`Converted ${fullPath} -> ${newPath}`);
        }
      } catch (err) {
        console.error(`Error compiling ${fullPath}:`, err);
      }
    }
  }
}

["artifacts", "lib", "scripts", "api-server"].forEach((dir) =>
  walkAndConvert(path.join(process.cwd(), dir)),
);
// Include root files like drizzle.config.ts, vite.config.ts etc if we want, but those might be better renamed using a RegExp or just manually if there are only a few.
// For drizzle.config.ts
const rootFiles = fs.readdirSync(process.cwd());
for (const file of rootFiles) {
  if (file.endsWith(".ts") && fs.statSync(file).isFile()) {
    const fullPath = path.join(process.cwd(), file);
    const result = babel.transformFileSync(fullPath, {
      presets: [
        ["@babel/preset-typescript", { isTSX: false, allExtensions: false }],
      ],
    });
    if (result && result.code != null) {
      const newPath = fullPath.substring(0, fullPath.lastIndexOf(".")) + ".js";
      fs.writeFileSync(newPath, result.code);
      fs.unlinkSync(fullPath);
      console.log(`Converted ${fullPath} -> ${newPath}`);
    }
  }
}
