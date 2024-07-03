import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default ({ mode }) => {
   process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
   // https://vitejs.dev/config/
   return defineConfig({
      resolve: {
         alias: {
            '@': path.resolve(__dirname, './src'),
         },
      },
      server: {
         port: 1100,
         host: true,
      },
      plugins: [react()],
   });
};
