import { defineConfig } from 'vite'
import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react-swc'

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@m': path.resolve(__dirname, './src/modules'),
    }
  }
})
