import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

const manifest = {
  registerType: "prompt",
  manifest: {
    name: "Rippio",
    short_name: "Rippio",
    description: "Aplicación de comida a domicilio",
    theme_color: "#60c0bd",
    background_color: "#fff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: "/icons/rippioIcon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/rippioIcon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/rippioIcon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskableRippio.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
};
// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifest)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@m": path.resolve(__dirname, "./src/modules"),
    },
  },
});
