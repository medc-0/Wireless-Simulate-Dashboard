import { promises as fs } from 'fs';
import path from 'path';

const buildDir = path.resolve('desktop', 'build');

async function run() {
	const mainJs = path.join(buildDir, 'main.js');
	const preloadJs = path.join(buildDir, 'preload.js');
	const mainCjs = path.join(buildDir, 'main.cjs');
	const preloadCjs = path.join(buildDir, 'preload.cjs');

	try {
		await fs.rename(mainJs, mainCjs);
	} catch {}
	try {
		await fs.rename(preloadJs, preloadCjs);
	} catch {}
}

run().catch((e) => {
	console.error(e);
	process.exit(1);
});


