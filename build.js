import esbuild from "esbuild";
import path from "path";
const __dirname = import.meta.dirname;

const build_server = esbuild.build({
    entryPoints: [path.join(__dirname, "./src/server/server.ts")],
    bundle: true,
    platform: "node",
    packages: "external",
    outdir: path.join(__dirname, "build"),
    format: "esm",
});

const build_client = esbuild.build({
    entryPoints: [path.join(__dirname, "./src/client/*")],
    bundle: true,
    minify: true,
    outdir: path.join(__dirname, "client/dist"),
});

await Promise.all([build_server, build_client]);
