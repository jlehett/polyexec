import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
    ],
    base: "./",
    resolve: {
        alias: {
            '@assets':     path.resolve(__dirname, './src/assets'),
            '@data':       path.resolve(__dirname, './src/data'),
            '@context':    path.resolve(__dirname, './src/context'),
            '@components': path.resolve(__dirname, './src/components'),
            '@hooks':      path.resolve(__dirname, './src/hooks'),
            '@models':     path.resolve(__dirname, './src/models'),
            '@pages':      path.resolve(__dirname, './src/pages'),
            '@root':       path.resolve(__dirname, './src/root'),
            '@services':   path.resolve(__dirname, './src/services'),
            '@styles':     path.resolve(__dirname, './src/styles'),
            '@utils':      path.resolve(__dirname, './src/utils'),
        },
    },
});
