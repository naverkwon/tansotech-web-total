import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                tree: resolve(__dirname, 'tree.html'),
                solar: resolve(__dirname, 'solar.html'),
                wood: resolve(__dirname, 'wood.html'),
            },
        },
    },
});
