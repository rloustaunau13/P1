import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // Inject Bootstrap's SCSS variables and mixins
        additionalData: `
          @import 'bootstrap/scss/functions';
          @import 'bootstrap/scss/variables';
          @import 'bootstrap/scss/mixins';
          @import 'bootstrap/scss/bootstrap';

        `,
      },
    },
  },
});
