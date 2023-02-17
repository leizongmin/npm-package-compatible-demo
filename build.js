const { builtinModules } = require("module");
const { sep: pathSep } = require("path");
const esbuild = require("esbuild");

const regexpNodeJsBuiltinModules = RegExp(
  "^(node\\:)?(" +
    builtinModules.filter((n) => !n.startsWith("_")).join("|") +
    ")$"
);
const mockNodeJsBuiltinModulesPlugin = {
  name: "example",
  setup(build) {
    build.onResolve(
      { filter: regexpNodeJsBuiltinModules },
      async function (args) {
        if (/[/\\]packages[/\\]some[/\\]/.test(args.importer)) {
          // 默认尝试重定向到 adapter/browser/$name 模块
          const mockPath = ["adapter", "browser", args.path].join(pathSep);
          delete args.path;

          const result = await build.resolve(mockPath, { ...args });
          if (result.errors.length > 0) {
            // 如果不存在，尝试重定向到 adapter/browser/_empty 模块
            const emptyPath = ["adapter", "browser", "_empty"].join(pathSep);
            const result2 = await build.resolve(emptyPath, { ...args });
            if (result2.errors.length === 0) {
              return { path: result2.path };
            }
          } else {
            return { path: result.path };
          }
        }
      }
    );
  },
};

async function main() {
  await esbuild.build({
    entryPoints: ["app_browser.js"],
    outfile: "bundle/app_browser.js",
    bundle: true,
    platform: "browser",
    plugins: [mockNodeJsBuiltinModulesPlugin],
  });
}

main();
