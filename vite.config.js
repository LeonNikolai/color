import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";
import { build } from "vite";
export default {
    plugins: [
        vituum(),
        pug({
            root: "./src",
        }),
    ],
    build: {
        outDir: "./dist",
        emptyOutDir: true,
    },
};
