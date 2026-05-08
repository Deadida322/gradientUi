import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'gradient-ui': resolve(__dirname, 'src/index.ts'),
			'@': resolve(__dirname, 'src'),
			'@docs': resolve(__dirname, 'docs/src/docs'),
			'@playground': resolve(__dirname, 'docs/src/playground')
		},
		extensions: ['.ts', '.js', '.json']
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler' // or "modern"
			}
		}
	},
	server: {
		host: '127.0.0.1', // forces IPv4
		port: 8000
	}

	// server: {
	//   fs: {
	//     allow: [
	//       // search up for workspace root
	//       searchForWorkspaceRoot(process.cwd()),
	//       // your custom rules
	//       '/path/to/custom/allow',
	//     ],
	//   },
	// },
});
