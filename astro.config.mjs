import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // URL pública: usada para montar os links absolutos das meta tags de compartilhamento e o sitemap.
  // Trocar pelo domínio próprio quando ele estiver apontado (também em public/robots.txt).
  site: 'https://portfolio-xi-inky-6ugen7d7un.vercel.app',
  integrations: [sitemap()],
});
