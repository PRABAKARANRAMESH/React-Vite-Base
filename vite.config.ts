import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "@svgr/rollup"


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_PUBLIC_PATH,
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
          
        },
      }),
      svgr()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    assetsInclude: ["**/*.xlsx"],
  };
});
