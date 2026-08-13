import { build, context } from "esbuild";

const watch = process.argv.includes("--watch");

const options = {
  entryPoints: ["src/code.ts"],
  bundle: true,
  outfile: "code.js",
  format: "iife",
  target: "es2019",
  platform: "browser",
  logLevel: "info",
};

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await build(options);
}
