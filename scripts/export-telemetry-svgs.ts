import * as fs from 'fs';
import * as path from 'path';
import {
  generateIsocalendarSvg,
  generateLanguagesDonutSvg,
  generateHabitsRadarSvg,
  generateAchievementsRackSvg,
  generateTerminalHudSvg,
  generatePageSpeedAuditSvg,
  generateMusicPlayerSvg,
  generateLeetCodeStatsSvg,
} from '../website/src/lib/forge-telemetry/svg-generators';

const publicDir = path.resolve(process.cwd(), 'website/public/assets');

const svgs = [
  { file: 'telemetry-isocalendar-3d.svg', content: generateIsocalendarSvg() },
  { file: 'telemetry-languages-donut.svg', content: generateLanguagesDonutSvg() },
  { file: 'telemetry-habits-radar.svg', content: generateHabitsRadarSvg() },
  { file: 'telemetry-achievements-rack.svg', content: generateAchievementsRackSvg() },
  { file: 'telemetry-terminal-hud.svg', content: generateTerminalHudSvg() },
  { file: 'telemetry-pagespeed-audit.svg', content: generatePageSpeedAuditSvg() },
  { file: 'telemetry-music-player.svg', content: generateMusicPlayerSvg() },
  { file: 'telemetry-leetcode-stats.svg', content: generateLeetCodeStatsSvg() },
];

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

for (const svg of svgs) {
  const filePath = path.join(publicDir, svg.file);
  fs.writeFileSync(filePath, svg.content, 'utf8');
  console.log(`Generated: ${filePath} (${svg.content.length} bytes)`);
}

console.log('All telemetry SVGs generated successfully in public/assets.');
