import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                tree: resolve(__dirname, 'src/tree.html'),
                solar: resolve(__dirname, 'src/solar.html'),
                wood: resolve(__dirname, 'src/wood.html'),
            },
        },
    },
});
