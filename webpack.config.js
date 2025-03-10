import path from "path";
import { glob } from "glob";
const __dirname = import.meta.dirname;

export default {
    entry: Object.fromEntries(
        glob
            .sync("./src/*.{ts,tsx}")
            .map((file) => [
                path.basename(file, path.extname(file)),
                path.resolve(__dirname, file),
            ]),
    ),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "client/dist"),
    },
    mode: "development",
    cache: {
        type: "filesystem",
    },
};
