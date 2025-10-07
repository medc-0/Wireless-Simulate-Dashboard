import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

export default defineConfig(() => {
	const isDesktop = process.env.BUILD_TARGET === "desktop";

	return {
		plugins: [react(), tsconfigPaths()],
		base: isDesktop ? "./" : "/",
		server: {
			port: 5173,
			strictPort: true
		}
	};
});


