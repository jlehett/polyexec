// vite.config.js
import { defineConfig } from "file:///C:/Users/johnt/development/web/tools/autoscript/ui/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/johnt/development/web/tools/autoscript/ui/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\johnt\\development\\web\\tools\\autoscript\\ui";
var vite_config_default = defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 6969
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets"),
      "@data": path.resolve(__vite_injected_original_dirname, "./src/data"),
      "@context": path.resolve(__vite_injected_original_dirname, "./src/context"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@models": path.resolve(__vite_injected_original_dirname, "./src/models"),
      "@pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
      "@root": path.resolve(__vite_injected_original_dirname, "./src/root"),
      "@services": path.resolve(__vite_injected_original_dirname, "./src/services"),
      "@styles": path.resolve(__vite_injected_original_dirname, "./src/styles"),
      "@utils": path.resolve(__vite_injected_original_dirname, "./src/utils")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqb2hudFxcXFxkZXZlbG9wbWVudFxcXFx3ZWJcXFxcdG9vbHNcXFxcYXV0b3NjcmlwdFxcXFx1aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcam9obnRcXFxcZGV2ZWxvcG1lbnRcXFxcd2ViXFxcXHRvb2xzXFxcXGF1dG9zY3JpcHRcXFxcdWlcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2pvaG50L2RldmVsb3BtZW50L3dlYi90b29scy9hdXRvc2NyaXB0L3VpL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gICAgYmFzZTogXCIuL1wiLFxuICAgIHNlcnZlcjoge1xuICAgICAgICBwb3J0OiA2OTY5LFxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0Bhc3NldHMnOiAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2Fzc2V0cycpLFxuICAgICAgICAgICAgJ0BkYXRhJzogICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2RhdGEnKSxcbiAgICAgICAgICAgICdAY29udGV4dCc6ICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb250ZXh0JyksXG4gICAgICAgICAgICAnQGNvbXBvbmVudHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvY29tcG9uZW50cycpLFxuICAgICAgICAgICAgJ0Bob29rcyc6ICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2hvb2tzJyksXG4gICAgICAgICAgICAnQG1vZGVscyc6ICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvbW9kZWxzJyksXG4gICAgICAgICAgICAnQHBhZ2VzJzogICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvcGFnZXMnKSxcbiAgICAgICAgICAgICdAcm9vdCc6ICAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9yb290JyksXG4gICAgICAgICAgICAnQHNlcnZpY2VzJzogICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvc2VydmljZXMnKSxcbiAgICAgICAgICAgICdAc3R5bGVzJzogICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9zdHlsZXMnKSxcbiAgICAgICAgICAgICdAdXRpbHMnOiAgICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy91dGlscycpLFxuICAgICAgICB9LFxuICAgIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1YsU0FBUyxvQkFBb0I7QUFDclgsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsTUFBTTtBQUFBLEVBQ04sUUFBUTtBQUFBLElBQ0osTUFBTTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILFdBQWUsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUNyRCxTQUFlLEtBQUssUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDbkQsWUFBZSxLQUFLLFFBQVEsa0NBQVcsZUFBZTtBQUFBLE1BQ3RELGVBQWUsS0FBSyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQ3pELFVBQWUsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUNwRCxXQUFlLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDckQsVUFBZSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ3BELFNBQWUsS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUNuRCxhQUFlLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUN2RCxXQUFlLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDckQsVUFBZSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLElBQ3hEO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
