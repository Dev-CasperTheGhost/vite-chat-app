import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src", "components"),
      "@lib": resolve(__dirname, "src", "lib"),
    },
  },
  plugins: [reactRefresh()],
});
