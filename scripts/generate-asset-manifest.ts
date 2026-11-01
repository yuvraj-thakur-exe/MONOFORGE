import { writeManifestFile } from '../website/src/lib/assets/manifest-generator';

const res = writeManifestFile(process.cwd());
console.log(`Successfully generated MonoForge Asset Manifest with ${res.count} indexed assets at ${res.path}`);

