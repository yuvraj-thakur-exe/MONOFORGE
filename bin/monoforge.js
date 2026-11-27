#!/usr/bin/env node

/**
 * MonoForge CLI & AI Agent Skill Tool
 * Autonomous GitHub profile README generator, archetype renderer, and MCP server.
 * Zero external dependencies — runs anywhere with Node.js 18+.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Archetypes Catalog with Configurations
export const ARCHETYPES = [
  {
    id: 'wow-3d-city-cat',
    name: '#1 Wow Profile (3D City & Peeking Cat)',
    category: 'Popular',
    accent: '#10b981',
    description: 'Turn your GitHub profile into a work of art with a peeking black cat mascot, retro pixel-art avatar header, 3D isometric contribution city, glowing language stack, and featured projects.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Alex Rivers';
      const role = u.role || 'Frontend & Full-Stack Systems Engineer';
      return `<div align="center">
  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/wow-profile-full.svg" width="100%" alt="#1 Wow Profile 3D City & Peeking Cat" />
</div>

<br/>

<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${user}&theme=radical&no-frame=false&no-bg=true&margin-w=4" alt="Trophies" />
</div>

<br/>

<div align="center">
  <h3>🏙️ The City I Built This Year</h3>
  <img src="https://github-profile-3d-contrib.vercel.app/api?username=${user}&theme=dark" alt="3D Contributions City" />
</div>

<br/>

<div align="center">
  <h3>⚡ Language &amp; Tech Stack</h3>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=kotlin,rust,javascript,python,typescript,react,docker,git,linux,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/10B981/${user}" alt="Commit Velocity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'bento-signal-dashboard',
    name: '#5 Signal Dashboard (Bento Grid & Anime Cat)',
    category: 'Popular',
    accent: '#38bdf8',
    description: 'Data-driven GitHub stats bento grid with anime cinematic banner, live profile signal metrics (Stars, Commits, Repos, Followers), emerald contribution activity graph, and featured repo showcase.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/bento-dashboard-full.svg" width="100%" alt="#5 Signal Dashboard Bento Grid" />
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/10B981/${user}" alt="Annual Contribution Activity" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=c,rust,python,bash,linux,docker,git,react,typescript,nextjs&theme=dark&perline=10" alt="Languages" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=donut&theme=tokyonight" alt="Top Languages" />
</div>`;
    },
  },
  {
    id: 'forge-telemetry-dashboard',
    name: 'MonoForge Telemetry Dashboard',
    category: 'Popular',
    accent: '#10b981',
    description: 'Native telemetry dashboard with PageSpeed scores, 3D contribution calendar, commit activity graphs, and tech icons.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Alex Rivers';
      const role = u.role || 'Principal Systems Architect & Open-Source Engineer';
      return `# Hi there, I'm ${name} 👋
### ${role}

<div align="center">
  <img src="https://img.shields.io/badge/Performance-97%25-10B981?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Performance" />
  <img src="https://img.shields.io/badge/Accessibility-100%25-10B981?style=for-the-badge&logo=w3c&logoColor=white" alt="Accessibility" />
  <img src="https://img.shields.io/badge/Best_Practices-100%25-10B981?style=for-the-badge&logo=lighthouse&logoColor=white" alt="Best Practices" />
  <img src="https://img.shields.io/badge/SEO-100%25-10B981?style=for-the-badge&logo=google&logoColor=white" alt="SEO" />
</div>

<br/>

<div align="center">
  <img src="https://github-profile-3d-contrib.vercel.app/api?username=${user}&theme=dark" alt="3D Contributions" />
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/10B981/${user}" alt="Commit Habits" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,ts,python,cpp,vue,docker,git,aws,gcp,arduino,raspberrypi,linux,bash,react&theme=dark&perline=14" alt="Skills" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'neon-craftsman-owl',
    name: 'Purple Neon & Digital Craftsman',
    category: 'Design',
    accent: '#9333ea',
    description: 'Curved waving purple neon banner (HELLO WORLD), two-column layout with emoji status bullets and celebratory owl party popper mascot sticker.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Morgan Reed';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:6a11cb,100:2575fc&height=220&section=header&text=HELLO%20WORLD&desc=WELCOME%20TO%20MY%20PROFILE&fontSize=40&fontColor=ffffff&fontAlignY=42&descAlignY=64&descSize=16" alt="Header" width="100%" />
</div>

<br/>

<table>
  <tr>
    <td valign="top" width="65%">
      <h3>⚡ I'm ${name}!</h3>
      <p><em>Digital Craftsman (Developer / Programmer)</em></p>
      <ul>
        <li>🌱 Student of life :)</li>
        <li>🔭 Currently learning distributed systems &amp; cloud-native Go</li>
        <li>👨‍💻 Dedicated open-source contributor and technical mentor</li>
        <li>✍️ Writing technical deep dives on systems engineering</li>
        <li>🤝 Passionate about collaborative open-source</li>
      </ul>
      <br/>
      <a href="https://github.com/${user}">
        <img src="https://komarev.com/ghpvc/?username=${user}&label=PROFILE+VIEWS&color=9333ea&style=for-the-badge" alt="Profile Views" />
      </a>
    </td>
    <td valign="top" width="35%" align="center">
      <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/owl-confetti.svg" alt="Owl Mascot" width="260" />
    </td>
  </tr>
</table>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,react,nodejs,django,postgres,fastapi,typescript,docker,git,linux&theme=dark&perline=10" alt="Skills" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=radical" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'minimal-light-unicorn',
    name: 'Minimal Light & Coding Unicorn',
    category: 'Minimal',
    accent: '#3b82f6',
    description: 'Clean light-mode layout with centered greeting, monochromatic social badges row, checkmarked bio achievements, and cute pastel coding unicorn at laptop sticker.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Jordan Lee';
      return `<div align="center">
  <h1>Hi 👋, I'm ${name}</h1>
  <p>Software Engineer | Technical Writer | Open Source Enthusiast</p>
  <a href="https://github.com/${user}"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://linkedin.com"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://dev.to"><img src="https://img.shields.io/badge/Dev.to-0A0A0A?style=flat&logo=devdotto&logoColor=white" alt="Dev.to" /></a>
</div>

<br/>

<table>
  <tr>
    <td valign="top" width="65%">
      <h3>🌟 Talking about Personal Stuffs...</h3>
      <p><em>Learning while HOPING &amp; HUSTLING! Building scalable apps and sharing knowledge along the way.</em></p>
      <ul>
        <li>✔ Currently developing payment gateways &amp; microservices</li>
        <li>✔ Learning ReactJS, NodeJS &amp; cloud architecture</li>
        <li>✔ Looking to collaborate on high-impact open source</li>
        <li>✔ Regularly writing technical blogs and tutorials</li>
        <li>✔ Active problem solver on LeetCode</li>
        <li>✔ Fun fact: I turn coffee into clean, well-tested commits</li>
      </ul>
      <br/>
      <a href="https://github.com/${user}">
        <img src="https://komarev.com/ghpvc/?username=${user}&label=Profile+views&color=3b82f6&style=flat" alt="Profile Views" />
      </a>
    </td>
    <td valign="top" width="35%" align="center">
      <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/coding-unicorn.svg" alt="Coding Unicorn" width="260" />
    </td>
  </tr>
</table>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=c,cpp,python,flask,css,html,js,nodejs,react,sass,git,linux&theme=light&perline=12" alt="Skills" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=default" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'constellation-devops-desk',
    name: 'Constellation DevOps & Workstation',
    category: 'DevOps',
    accent: '#38bdf8',
    description: 'Dark constellation cyberpunk DevOps engineer profile with deep space banner, SRE bullet points, and programmer at workstation desk illustration.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Samir Patel';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&color=0:090d16,100:111827&height=180&section=header&text=Hey!%20I%20am%20a%20DevOps%20Engineer&desc=Automating%20everything%20between%20commit%20and%20production&fontSize=32&fontColor=38bdf8&descSize=16" alt="Header" width="100%" />
</div>

<br/>

<table>
  <tr>
    <td valign="top" width="65%">
      <h3>Hi 👋, I'm ${name}</h3>
      <p><em>Passionate and aspiring DevOps &amp; Cloud Infrastructure Engineer</em></p>
      <ul>
        <li>🔭 Currently engineering multi-region Kubernetes clusters</li>
        <li>🌱 Learning eBPF, service mesh observability, and zero-trust security</li>
        <li>👨‍💻 Stack: Git, Docker, Kubernetes, Jenkins, Ansible, AWS, GCP, Grafana</li>
        <li>⚡ Passionate about automated testing, 99.99% uptime, and sub-minute deploys</li>
      </ul>
      <br/>
      <a href="https://github.com/${user}">
        <img src="https://komarev.com/ghpvc/?username=${user}&label=Profile+views&color=38bdf8&style=flat" alt="Profile views" />
      </a>
    </td>
    <td valign="top" width="35%" align="center">
      <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets/developer-desk.svg" alt="Dev at Desk" width="260" />
    </td>
  </tr>
</table>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=docker,kubernetes,aws,gcp,linux,git,ansible,grafana,prometheus,bash,python,go&theme=dark&perline=12" alt="DevOps Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/38BDF8/${user}" alt="Commit Velocity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="Stats" />
</div>`;
    },
  },
  {
    id: 'isometric-terminal-connect',
    name: 'Isometric Terminal & Fullstack Connect',
    category: 'Popular',
    accent: '#6366f1',
    description: '3D isometric terminal cube header banner, Competitive Programmer subtitle, vibrant "Let\'s Connect and have a Chat!" callout with colorful rounded social badge arsenal, skills matrix, and trophy rack.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Casey Vance';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=cylinder&color=0:0b0f19,100:1e1b4b&height=200&section=header&text=Hey!%20I'm%20a%20Full-Stack%20Developer&desc=%3E_%20Competitive%20Programmer%20%7C%20Cloud%20Architect&fontSize=34&fontColor=ffffff&descSize=18&fontAlignY=42&descAlignY=64" alt="Header" width="100%" />
</div>

<br/>

<div align="center">
  <h3>Let's Connect and have a Chat! 💭</h3>
  <a href="https://github.com/${user}"><img src="https://img.shields.io/badge/Portfolio-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>
  <a href="https://linkedin.com"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://dev.to"><img src="https://img.shields.io/badge/DEV.TO-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white" alt="Dev.to" /></a>
  <a href="https://twitter.com"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>
  <a href="https://instagram.com"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=java,spring,ts,react,nodejs,mongodb,docker,git,mysql,aws,redux,tailwind&theme=dark&perline=12" alt="Fullstack Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${user}&theme=radical&no-frame=false&no-bg=true&margin-w=4" alt="Trophies" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="Stats" />
</div>`;
    },
  },
  {
    id: 'pinterest-lofi-aesthetic',
    name: 'Aesthetic Lo-Fi & Pinterest Art',
    category: 'Design',
    accent: '#ec4899',
    description: 'Vibrant, cozy developer profile with animated Lo-Fi midnight coding desk artwork from Pinterest, ambient music player, aesthetic tech badges, and clean stats.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Aria Vance';
      return `<div align="center">
  <img src="https://i.pinimg.com/originals/0a/61/52/0a6152a25992955f134764b86378e994.gif" alt="Aesthetic Lo-Fi Midnight Coding" width="100%" />
  <br/>
  <p align="center"><em>✦ Turning coffee and midnight playlists into clean software architectures ✦</em></p>
</div>

<br/>

<div align="center">
  <h1>Hi there, I'm ${name} 🎧</h1>
  <p>Creative Technologist &amp; Lo-Fi Enthusiast</p>
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=ts,react,nextjs,tailwind,nodejs,python,docker,git&theme=dark&perline=10" alt="Aesthetic Skills" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/EC4899/${user}" alt="Aesthetic Commit Velocity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=radical" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'data-engineer-streaming',
    name: 'Data Engineer & Stream Processor',
    category: 'AI & Data',
    accent: '#0284c7',
    description: 'High-throughput data pipelines, Kafka streaming, Spark transformations, and Snowflake analytics warehouse.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:0284c7&height=180&section=header&text=Data%20Platform%20%26%20Distributed%20Systems&desc=Streaming%20billions%20of%20events%20per%20second%20with%20sub-second%20latency&fontSize=28&fontColor=ffffff&descSize=14&descColor=0284c7" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,kafka,apache,spark,postgres,docker,aws,linux,git,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/0284C7/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'game-dev-3d-graphics',
    name: '3D Game Developer & Graphics Engineer',
    category: 'Design',
    accent: '#ec4899',
    description: 'Real-time ray tracing, custom HLSL/GLSL shaders, Unreal Engine 5, Unity, and procedural generation.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:ec4899&height=180&section=header&text=3D%20Graphics%20%26%20Game%20Engine%20Architecture&desc=Translating%20mathematical%20equations%20into%20living%2C%20breathing%20real-time%20wo&fontSize=28&fontColor=ffffff&descSize=14&descColor=ec4899" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=cpp,rust,unity,unreal,blender,js,webgl,git,linux&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/EC4899/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'web3-solidity-defi',
    name: 'Web3 & DeFi Smart Contract Architect',
    category: 'Mobile & Web3',
    accent: '#8b5cf6',
    description: 'Gas-optimized EVM bytecode, formal smart contract verification, Foundry test suites, and decentralized finance.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:8b5cf6&height=180&section=header&text=Trustless%20Decentralized%20Protocols&desc=Formal%20verification%2C%20sub-21k%20gas%20execution%2C%20and%20cryptographic%20security&fontSize=28&fontColor=ffffff&descSize=14&descColor=8b5cf6" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=solidity,rust,ethereum,ts,ipfs,git,linux,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/8B5CF6/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'embedded-iot-firmware',
    name: 'Embedded Systems & IoT Firmware Engineer',
    category: 'Systems',
    accent: '#10b981',
    description: 'Bare-metal C/C++, FreeRTOS multitasking, STM32 microcontrollers, low-power Bluetooth, and hardware drivers.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:10b981&height=180&section=header&text=Bare-Metal%20%26%20Real-Time%20Firmware&desc=Deterministic%20execution%20in%20microsecond%20budgets%20on%20resource-constrained&fontSize=28&fontColor=ffffff&descSize=14&descColor=10b981" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=c,cpp,rust,linux,arduino,raspberrypi,git,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/10B981/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'creative-technologist-motion',
    name: 'Creative Technologist & Interaction Designer',
    category: 'Design',
    accent: '#f43f5e',
    description: 'Fluid GLSL canvas shaders, reactive micro-interactions, generative SVG animations, and design systems.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:f43f5e&height=180&section=header&text=Interactive%20Motion%20%26%20Generative%20Systems&desc=Sculpting%20delightful%20digital%20interactions%20at%20silky%2060fps&fontSize=28&fontColor=ffffff&descSize=14&descColor=f43f5e" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,ts,threejs,figma,tailwind,css,html,git,nextjs&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/F43F5E/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'quantum-algorithms-physicist',
    name: 'Quantum Computing & Algorithms Researcher',
    category: 'AI & Data',
    accent: '#6366f1',
    description: 'Quantum circuits, Qiskit error mitigation, topological qubits, and quantum variational eigensolvers.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:6366f1&height=180&section=header&text=Quantum%20Information%20%26%20Superposition&desc=Harnessing%20quantum%20entanglement%20to%20solve%20classically%20intractable%20probl&fontSize=28&fontColor=ffffff&descSize=14&descColor=6366f1" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,julia,c,linux,git,latex,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/6366F1/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'site-reliability-sre-chaos',
    name: 'Site Reliability Engineer (SRE & Observability)',
    category: 'DevOps',
    accent: '#f59e0b',
    description: 'Multi-region Kubernetes clusters, 99.999% SLA budgeting, eBPF telemetry, and chaos engineering drills.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:f59e0b&height=180&section=header&text=Five-Nines%20Uptime%20%26%20Chaos%20Engineering&desc=Automated%20self-healing%20infrastructure%20engineered%20for%20planetary%20scale&fontSize=28&fontColor=ffffff&descSize=14&descColor=f59e0b" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=kubernetes,docker,prometheus,grafana,linux,bash,go,python,terraform&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/F59E0B/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'competitive-programmer-grandmaster',
    name: 'Competitive Programmer & Algorithmic Specialist',
    category: 'Systems',
    accent: '#ef4444',
    description: 'Master of graph theory, dynamic programming, Segment Trees, and sub-millisecond C++20 execution.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:ef4444&height=180&section=header&text=Optimal%20Algorithms%20%26%20Sub-Millisecond%20Speed&desc=Transforming%20NP-hard%20computational%20challenges%20into%20elegant%20optimal%20sol&fontSize=28&fontColor=ffffff&descSize=14&descColor=ef4444" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=cpp,java,python,c,linux,git,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/EF4444/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'indie-hacker-solopreneur',
    name: 'Solo Founder & Indie Hacker',
    category: 'Popular',
    accent: '#10b981',
    description: 'Shipping profitable micro-SaaS products, public revenue metrics, full-stack velocity, and user-centric features.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:10b981&height=180&section=header&text=Building%20in%20Public%20%26%20Bootstrapping%20SaaS&desc=Zero%20fluff%2C%20zero%20meetings%2C%20100%25%20customer%20value%20delivered%20weekly&fontSize=28&fontColor=ffffff&descSize=14&descColor=10b981" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,postgres,supabase,git,html,css&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/10B981/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'bioinformatics-genomics-core',
    name: 'Bioinformatics & Computational Genomics Specialist',
    category: 'AI & Data',
    accent: '#06b6d4',
    description: 'Whole-genome sequencing pipelines, variant effect prediction, single-cell RNA-seq, and reproducibility.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:06b6d4&height=180&section=header&text=Genomic%20Big%20Data%20%26%20Molecular%20Discovery&desc=Accelerating%20therapeutic%20breakthroughs%20with%20statistical%20genomics%20and%20d&fontSize=28&fontColor=ffffff&descSize=14&descColor=06b6d4" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,r,linux,bash,docker,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/06B6D4/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'audio-dsp-audio-engineer',
    name: 'Audio Programmer & DSP Software Engineer',
    category: 'Systems',
    accent: '#a855f7',
    description: 'Real-time VST/AU plugins, low-latency SIMD buffers, spatial HRTF synthesis, and musical acoustics.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:a855f7&height=180&section=header&text=Digital%20Signal%20Processing%20%26%20Acoustics&desc=Microsecond%20buffer%20latency%2C%20pristine%20harmonics%2C%20and%20real-time%20DSP%20filt&fontSize=28&fontColor=ffffff&descSize=14&descColor=a855f7" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=cpp,c,rust,python,linux,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/A855F7/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'backend-systems-rust-tokio',
    name: 'High-Concurrency Distributed Systems Engineer',
    category: 'Systems',
    accent: '#ea580c',
    description: 'Lock-free data structures, Tokio async runtime, Raft consensus, and microsecond IPC communication.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:ea580c&height=180&section=header&text=Zero-Cost%20Abstractions%20%26%20Concurrency&desc=Memory%20safety%20without%20garbage%20collection%2C%20scaling%20horizontally%20across%20&fontSize=28&fontColor=ffffff&descSize=14&descColor=ea580c" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=rust,go,redis,postgres,docker,linux,git,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/EA580C/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'enterprise-java-spring-boot',
    name: 'Enterprise Java & Microservices Architect',
    category: 'Systems',
    accent: '#b45309',
    description: 'Domain-Driven Design, event-driven Kafka messaging, Spring Boot 3, and mission-critical reliability.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:b45309&height=180&section=header&text=Enterprise%20Resilience%20%26%20Event%20Sourcing&desc=Domain-Driven%20Design%2C%20robust%20transaction%20boundaries%2C%20and%2099.999%25%20enter&fontSize=28&fontColor=ffffff&descSize=14&descColor=b45309" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=java,spring,docker,kubernetes,postgres,aws,git,linux&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/B45309/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'flutter-crossplatform-specialist',
    name: 'Cross-Platform Mobile Architect',
    category: 'Mobile & Web3',
    accent: '#0284c7',
    description: 'Pixel-perfect mobile applications for iOS & Android, offline-first sync, reactive Riverpod state, and native plugins.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:0284c7&height=180&section=header&text=High-Performance%20Cross-Platform%20Mobile&desc=Single%20codebase%2C%20120fps%20native%20performance%20across%20iOS%2C%20Android%2C%20and%20De&fontSize=28&fontColor=ffffff&descSize=14&descColor=0284c7" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=flutter,dart,react,ts,swift,kotlin,git,figma&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/0284C7/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'red-team-ethical-hacker',
    name: 'Penetration Tester & Offensive Security Specialist',
    category: 'Systems',
    accent: '#dc2626',
    description: 'Red team adversary simulation, binary exploitation, zero-day research, and network intrusion analysis.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:dc2626&height=180&section=header&text=Offensive%20Security%20%26%20Binary%20Exploitation&desc=Discovering%20edge-case%20attack%20vectors%20to%20harden%20mission-critical%20softwa&fontSize=28&fontColor=ffffff&descSize=14&descColor=dc2626" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,bash,linux,c,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/DC2626/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'synthwave-outrun-coder',
    name: 'Synthwave 80s Cyber Hacker',
    category: 'Design',
    accent: '#d946ef',
    description: 'Retro 80s synthwave horizon, neon purple chrome gradients, electronic beats, and ultra-fast frontend applications.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:d946ef&height=180&section=header&text=Neon%20Outrun%20%26%20Retro%20Synth%20Aesthetics&desc=Cruising%20down%20the%20digital%20highway%20with%2080s%20synths%20and%20modern%20clean%20cod&fontSize=28&fontColor=ffffff&descSize=14&descColor=d946ef" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=vue,ts,tailwind,vite,pinia,git,html,css&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/D946EF/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'terminal-matrix-digital-rain',
    name: 'Neo Matrix Cyber Terminal',
    category: 'Popular',
    accent: '#22c55e',
    description: 'Phosphor green digital rain, pure terminal cadence, Linux kernel hacker aesthetic, and minimal overhead.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:22c55e&height=180&section=header&text=Phosphor%20Green%20Matrix%20Terminal&desc=Wake%20up%2C%20Neo...%20The%20terminal%20holds%20the%20truth&fontSize=28&fontColor=ffffff&descSize=14&descColor=22c55e" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=c,bash,linux,git,python&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/22C55E/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'frontend-design-system-lead',
    name: 'Design Systems Lead & UI Architect',
    category: 'Design',
    accent: '#3b82f6',
    description: 'Token architectures, WCAG AAA accessibility, component libraries, Storybook documentation, and micro-interactions.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:3b82f6&height=180&section=header&text=Accessible%20Design%20Systems%20%26%20Tokens&desc=Pixel%20precision%2C%20WCAG%20AAA%20conformance%2C%20and%20effortless%20multi-brand%20them&fontSize=28&fontColor=ffffff&descSize=14&descColor=3b82f6" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,ts,tailwind,nextjs,figma,html,css,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/3B82F6/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'deep-learning-computer-vision',
    name: 'Deep Learning & Computer Vision Researcher',
    category: 'AI & Data',
    accent: '#8b5cf6',
    description: 'Convolutional neural networks, Vision Transformers (ViT), real-time object detection, and edge tensor runtimes.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:8b5cf6&height=180&section=header&text=Spatial%20Vision%20%26%20Neural%20Representations&desc=Real-time%20multi-modal%20perception%20models%20running%20inference%20on%20edge%20hard&fontSize=28&fontColor=ffffff&descSize=14&descColor=8b5cf6" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=pytorch,python,opencv,linux,docker,git,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/8B5CF6/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'platform-engineer-kubernetes',
    name: 'Platform Engineer & Developer Portal Specialist',
    category: 'DevOps',
    accent: '#0ea5e9',
    description: 'Internal Developer Platforms (IDP), GitOps with ArgoCD, golden path infrastructure templates, and developer happiness.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:0ea5e9&height=180&section=header&text=Internal%20Developer%20Platforms%20%26%20GitOps&desc=Empowering%20product%20engineers%20to%20deploy%20with%20confidence%20in%20seconds%2C%20not&fontSize=28&fontColor=ffffff&descSize=14&descColor=0ea5e9" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=kubernetes,docker,terraform,go,linux,bash,git,aws&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/0EA5E9/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'graphql-api-architect',
    name: 'API Architect & GraphQL Specialist',
    category: 'Systems',
    accent: '#e11d48',
    description: 'Federated GraphQL supergraphs, schema stitching, ultra-fast Fastify servers, and OpenAPI contract testing.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:e11d48&height=180&section=header&text=Federated%20Graph%20Architecture%20%26%20Gateway&desc=Type-safe%20client%20contracts%20with%20zero%20over-fetching%20and%20millisecond%20res&fontSize=28&fontColor=ffffff&descSize=14&descColor=e11d48" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,ts,graphql,postgres,redis,docker,git,linux&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/E11D48/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'database-tuner-dba',
    name: 'Database Architect & Performance Tuner',
    category: 'Systems',
    accent: '#0284c7',
    description: 'Query plan optimization, pgvector similarity indexing, horizontal sharding, and high-availability replication.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:0284c7&height=180&section=header&text=High-Throughput%20Relational%20%26%20Vector%20Storage&desc=Zero-downtime%20failovers%2C%20index%20optimization%2C%20and%20sub-millisecond%20query&fontSize=28&fontColor=ffffff&descSize=14&descColor=0284c7" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=postgres,redis,linux,bash,python,docker,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/0284C7/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'blue-team-soc-analyst',
    name: 'Security Operations & Blue Team Defense Specialist',
    category: 'Systems',
    accent: '#3b82f6',
    description: 'Threat hunting, SIEM log correlation, automated incident response playbooks, and perimeter defense.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:3b82f6&height=180&section=header&text=Defensive%20Perimeter%20%26%20Threat%20Detection&desc=Uncompromising%20security%20posture%2C%20automated%20containment%2C%20and%2024%2F7%20resil&fontSize=28&fontColor=ffffff&descSize=14&descColor=3b82f6" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,bash,linux,docker,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/3B82F6/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'robotics-ros2-navigation',
    name: 'Robotics & Autonomous Navigation Engineer',
    category: 'Systems',
    accent: '#f97316',
    description: 'Simultaneous Localization and Mapping (SLAM), ROS2 micro-nodes, trajectory planning, and hardware sensor fusion.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:f97316&height=180&section=header&text=Autonomous%20Navigation%20%26%20Sensor%20Fusion&desc=Real-time%20kinematic%20planning%2C%20multi-sensor%20integration%2C%20and%20determinis&fontSize=28&fontColor=ffffff&descSize=14&descColor=f97316" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=cpp,python,linux,ros,git,docker,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/F97316/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'spatial-computing-visionos',
    name: 'Spatial Computing & VisionOS Developer',
    category: 'Mobile & Web3',
    accent: '#6366f1',
    description: 'Volumetric windows, RealityKit spatial anchors, hand-tracking gestures, and immersive 3D mixed reality.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:6366f1&height=180&section=header&text=Spatial%20Computing%20%26%20Volumetric%20Realities&desc=Transcending%20flat%20screens%20with%20interactive%20spatial%20anchors%20and%20mixed%20r&fontSize=28&fontColor=ffffff&descSize=14&descColor=6366f1" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=swift,apple,unity,blender,git,figma&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/6366F1/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'tech-educator-content-creator',
    name: 'Technical Content Creator & Educator',
    category: 'Popular',
    accent: '#eab308',
    description: 'Visual coding tutorials, open-source educational repositories, engineering guides, and community mentorship.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:eab308&height=180&section=header&text=Open%20Knowledge%20%26%20Developer%20Mentorship&desc=Empowering%20the%20next%20million%20engineers%20with%20free%2C%20accessible%2C%20and%20cryst&fontSize=28&fontColor=ffffff&descSize=14&descColor=eab308" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,ts,react,python,git,markdown,html,css&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/EAB308/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'kernel-driver-lowlevel-dev',
    name: 'Linux Kernel & Low-Level Driver Developer',
    category: 'Systems',
    accent: '#64748b',
    description: 'Ring-0 privilege programming, memory-mapped I/O, PCIe device drivers, and kernel crash dump analysis.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:64748b&height=180&section=header&text=Kernel%20Internals%20%26%20Memory%20Architecture&desc=Operating%20at%20Ring%200%2C%20where%20every%20byte%20and%20cycle%20directly%20controls%20phys&fontSize=28&fontColor=ffffff&descSize=14&descColor=64748b" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=c,linux,bash,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/64748B/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'fintech-hft-low-latency',
    name: 'FinTech & High-Frequency Trading Developer',
    category: 'Systems',
    accent: '#059669',
    description: 'Sub-microsecond order execution, kernel-bypass networking, FPGA packet parsing, and modern C++20.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:059669&height=180&section=header&text=Sub-Microsecond%20Quantitative%20Systems&desc=Deterministic%20nanosecond%20performance%20where%20latency%20directly%20equals%20com&fontSize=28&fontColor=ffffff&descSize=14&descColor=059669" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=cpp,python,linux,git,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/059669/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'edtech-simulation-developer',
    name: 'EdTech & Interactive Simulation Developer',
    category: 'Design',
    accent: '#8b5cf6',
    description: 'Interactive STEM physics simulations, mathematical visualizations, HTML5 Canvas animations, and gamified learning.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:8b5cf6&height=180&section=header&text=Interactive%20STEM%20Simulations&desc=Visualizing%20abstract%20mathematical%20principles%20into%20playful%2C%20intuitive%20t&fontSize=28&fontColor=ffffff&descSize=14&descColor=8b5cf6" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,react,ts,html,css,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/8B5CF6/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'pixel-art-indie-gamedev',
    name: 'Cozy Pixel Artist & Retro Indie Gamedev',
    category: 'Design',
    accent: '#f59e0b',
    description: '16-bit nostalgic worlds, chiptune soundscapes, Godot game mechanics, and handcrafted sprite animations.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:f59e0b&height=180&section=header&text=16-Bit%20Nostalgia%20%26%20Handcrafted%20Games&desc=Painting%20retro%20worlds%20one%20pixel%20at%20a%20time%20with%20endless%20heart%20and%20imagi&fontSize=28&fontColor=ffffff&descSize=14&descColor=f59e0b" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=godot,blender,git,linux,python&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/F59E0B/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'cloud-serverless-specialist',
    name: 'Cloud Native Serverless Architect',
    category: 'DevOps',
    accent: '#f97316',
    description: 'Event-driven architectures, DynamoDB single-table design, zero-idle infrastructure cost, and AWS CDK/SST.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:f97316&height=180&section=header&text=True%20Serverless%20%26%20Event%20Choreography&desc=Scaling%20from%200%20to%20100%2C000%20requests%20in%20milliseconds%20with%20zero%20idle%20infr&fontSize=28&fontColor=ffffff&descSize=14&descColor=f97316" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=aws,ts,nodejs,docker,git,linux,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/F97316/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'developer-experience-dx-lead',
    name: 'Developer Experience & Documentation Engineer',
    category: 'Popular',
    accent: '#10b981',
    description: 'Instant CLI toolchain feedback, interactive SDK documentation, AST code generation, and ergonomic APIs.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:10b981&height=180&section=header&text=Zero-Friction%20Developer%20Experience&desc=Transforming%20painful%20onboarding%20friction%20into%20effortless%2C%20delightfully&fontSize=28&fontColor=ffffff&descSize=14&descColor=10b981" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=astro,react,ts,tailwind,markdown,git,nextjs&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/10B981/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
];

const REPO_ASSETS_DIR = path.resolve(__dirname, '../public/assets');
const RAW_ASSET_BASE = 'https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/public/assets';
const STUDIO_URL = 'https://monoforge-studio.vercel.app';

export const SUPPORTED_THEMES = [
  'emerald',
  'matrix',
  'cyberpunk',
  'tokyonight',
  'amber',
  'slate',
  'ocean',
];

export const VISUALIZATION_CATALOG = [
  { id: 'diagonal-heatmap', name: 'Diagonal Contribution Heatmap', category: 'activity', tagline: '53x7 CSS staggered diagonal wave heatmap + streak footer' },
  { id: 'whoami', name: 'Neofetch Whoami Info Card', category: 'identity', tagline: 'Staggered terminal profile card pairable with ASCII portrait' },
  { id: 'city', name: 'Commit City (3D Skyline)', category: 'activity', tagline: '3D isometric voxel skyline scaled to daily commit intensity' },
  { id: 'isocalendar', name: '3D Isometric Calendar', category: 'activity', tagline: 'Isometric contribution blocks with streak and average summary' },
  { id: 'river', name: 'Commit River', category: 'activity', tagline: 'Luminous fluid streamlines across seasonal sprint peaks' },
  { id: 'languageriver', name: 'Language River', category: 'architecture', tagline: 'Multi-stream polyglot river mapping repository languages' },
  { id: 'yearclock', name: 'Developer Year Clock', category: 'activity', tagline: '360-degree radial chronometer with radar sweep' },
  { id: 'pulse', name: 'Coding Pulse (EKG)', category: 'activity', tagline: 'Weekly commit rhythm rendered as a glowing phosphor EKG' },
  { id: 'radar', name: 'Engineering Radar', category: 'skills', tagline: 'Hexagonal radar contrasting full-stack engineering dimensions' },
  { id: 'blueprint', name: 'Codebase Blueprint', category: 'architecture', tagline: 'Architectural schematic tracing modules, languages & health' },
  { id: 'neofetch', name: 'Fastfetch Terminal', category: 'identity', tagline: 'Retro ASCII system telemetry card driven by GitHub data' },
  { id: 'synthwave', name: 'Synthwave Outrun Bento', category: 'identity', tagline: 'High-contrast perspective grid bento profile card' },
  { id: 'timeline', name: 'Release Timeline', category: 'architecture', tagline: 'Horizontal milestone track of repositories and commit peaks' },
  { id: 'dna', name: 'Developer DNA', category: 'skills', tagline: 'Double-helix biometric strand encoded from language ratios' },
  { id: 'galaxy', name: 'Repository Galaxy', category: 'architecture', tagline: 'Orbiting planetary repository constellation sized by stars' },
  { id: 'solarsystem', name: 'Tech Stack Solar System', category: 'architecture', tagline: 'Core language sun orbited by tool & framework satellites' },
  { id: 'heatmap', name: '52-Week Contribution Heatmap', category: 'activity', tagline: 'Classic annual GitHub matrix with peak day callout' },
  { id: 'velocity', name: 'Contributor Velocity', category: 'activity', tagline: 'Streak momentum and daily velocity gauge' },
  { id: 'leetcode', name: 'LeetCode Progress Card', category: 'skills', tagline: 'Algorithm problem-solving scorecard' },
  { id: 'music', name: 'Now Playing Vinyl Card', category: 'identity', tagline: 'Camo-safe animated equalizer soundtrack card' },
  { id: 'pagespeed', name: 'Lighthouse PageSpeed Card', category: 'skills', tagline: 'Radial performance, accessibility, best practices & SEO gauges' },
  { id: 'stamp', name: 'MonoForge Camo Stamp', category: 'identity', tagline: 'Verified Camo-safe MonoForge seal badge' },
];

function classifyAsset(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('divider') || lower.includes('hands')) return 'divider';
  if (lower.includes('telemetry-')) return 'telemetry';
  if (['snake.svg', 'pacman.svg', 'breakout.svg', 'bomberman.svg', 'galaga.svg', 'puzzle-bobble.svg'].includes(lower)) return 'arcade';
  if (['roaming-bot.svg', 'coding-unicorn.svg', 'developer-desk.svg', 'owl-confetti.svg', 'octocat-coffee.svg', 'cyber-monkey-mascot.svg', 'peeking-cat-header.svg', 'animated-heroes-squad.svg', 'animated-characters.svg'].includes(lower)) return 'mascot';
  if (lower.includes('hud') || lower.includes('banner') || lower.includes('terminal') || lower.includes('header') || lower.includes('text-effects') || lower.includes('wow-profile') || lower.includes('bento-dashboard') || lower.includes('isometric') || lower.includes('developer-mode')) return 'banner';
  if (lower.includes('logo') || lower.includes('stamp') || lower.includes('icon')) return 'branding';
  return 'sticker';
}

export function listRepoAssets() {
  const results = [];
  if (fs.existsSync(REPO_ASSETS_DIR)) {
    const entries = fs.readdirSync(REPO_ASSETS_DIR, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && /\.(svg|png|jpg|jpeg|webp|gif)$/i.test(entry.name)) {
        const id = entry.name.replace(/\.[^.]+$/, '');
        const rawUrl = `${RAW_ASSET_BASE}/${entry.name}`;
        results.push({
          id,
          filename: entry.name,
          kind: classifyAsset(entry.name),
          relativePath: `public/assets/${entry.name}`,
          rawUrl,
          markdown: `<img src="${rawUrl}" alt="${id}" />`,
        });
      }
    }
    const socialDir = path.join(REPO_ASSETS_DIR, 'icons', 'social');
    if (fs.existsSync(socialDir)) {
      const platforms = fs.readdirSync(socialDir, { withFileTypes: true });
      for (const p of platforms) {
        if (p.isDirectory() && fs.existsSync(path.join(socialDir, p.name, 'default.svg'))) {
          const rawUrl = `${RAW_ASSET_BASE}/icons/social/${p.name}/default.svg`;
          results.push({
            id: `social-${p.name}`,
            platform: p.name,
            filename: `icons/social/${p.name}/default.svg`,
            kind: 'social',
            relativePath: `public/assets/icons/social/${p.name}/default.svg`,
            rawUrl,
            markdown: `<a href="https://github.com"><img src="${rawUrl}" width="28" height="28" alt="${p.name}" /></a>`,
          });
        }
      }
    }
  }
  return results;
}

export function searchRepoAssets(query = '', kind = 'all', limit = 30) {
  const all = listRepoAssets();
  const q = String(query || '').trim().toLowerCase();
  const k = String(kind || 'all').trim().toLowerCase();
  return all
    .filter((item) => (k === 'all' || item.kind === k))
    .filter((item) => !q || item.id.toLowerCase().includes(q) || item.kind.includes(q) || (item.platform || '').includes(q))
    .slice(0, Math.max(1, Math.min(100, Number(limit) || 30)));
}

export function inspectRepoAsset(assetIdOrPath) {
  const clean = String(assetIdOrPath || '').trim();
  if (!clean) {
    return { error: 'Asset id or path is required.' };
  }
  const all = listRepoAssets();
  const matched = all.find(
    (a) =>
      a.id.toLowerCase() === clean.toLowerCase() ||
      a.filename.toLowerCase() === clean.toLowerCase() ||
      a.relativePath.toLowerCase() === clean.toLowerCase() ||
      a.platform?.toLowerCase() === clean.toLowerCase()
  );

  const relFromAssets = matched ? matched.filename : clean.replace(/^public\/assets\//i, '');
  const resolved = path.resolve(REPO_ASSETS_DIR, relFromAssets);
  if (!resolved.startsWith(REPO_ASSETS_DIR + path.sep) && resolved !== REPO_ASSETS_DIR) {
    return { error: 'Path traversal is not permitted outside public/assets.' };
  }
  if (!fs.existsSync(resolved) || fs.statSync(resolved).isDirectory()) {
    return { error: `Asset not found: ${clean}` };
  }

  const stat = fs.statSync(resolved);
  const rawUrl = matched ? matched.rawUrl : `${RAW_ASSET_BASE}/${relFromAssets.replace(/\\/g, '/')}`;
  let viewBox = null;
  let width = null;
  let height = null;
  let camoSafe = true;
  const violations = [];

  if (resolved.toLowerCase().endsWith('.svg')) {
    const content = fs.readFileSync(resolved, 'utf8');
    const vbMatch = content.match(/viewBox=["']([^"']+)["']/i);
    const wMatch = content.match(/\bwidth=["']([^"']+)["']/i);
    const hMatch = content.match(/\bheight=["']([^"']+)["']/i);
    viewBox = vbMatch ? vbMatch[1] : null;
    width = wMatch ? wMatch[1] : null;
    height = hMatch ? hMatch[1] : null;
    if (/<script\b/i.test(content)) violations.push('Contains <script>');
    if (/<foreignObject\b/i.test(content)) violations.push('Contains <foreignObject>');
    if (/\son[a-z]+\s*=/i.test(content)) violations.push('Contains inline event handler');
    camoSafe = violations.length === 0;
  }

  const label = matched ? matched.id : path.basename(resolved, path.extname(resolved));
  return {
    id: label,
    kind: matched ? matched.kind : classifyAsset(path.basename(resolved)),
    relativePath: `public/assets/${relFromAssets.replace(/\\/g, '/')}`,
    rawUrl,
    bytes: stat.size,
    viewBox,
    width,
    height,
    camoSafe,
    violations,
    htmlImg: `<img src="${rawUrl}" alt="${label}" width="100%" />`,
    clickableButtonSnippet: `<a href="${STUDIO_URL}/en/assets">\n  <img src="${rawUrl}" alt="${label}" width="260" />\n</a>`,
  };
}

export function buildTelemetryEmbedSnippet(options = {}) {
  const user = String(options.username || options.user || 'octocat').trim() || 'octocat';
  const plugin = String(options.plugin || 'diagonal-heatmap').trim() || 'diagonal-heatmap';
  const theme = SUPPORTED_THEMES.includes(options.theme) ? options.theme : 'emerald';
  const alt = String(options.alt || `${user} ${plugin} Telemetry`).replace(/"/g, '&quot;');
  const width = String(options.width || '100%');
  const linkToStudio = options.linkToStudio !== false;
  const imgUrl = `${STUDIO_URL}/api/telemetry/svg?plugin=${encodeURIComponent(plugin)}&user=${encodeURIComponent(user)}&theme=${encodeURIComponent(theme)}`;
  const studioHref = `${STUDIO_URL}/en/visualizer?user=${encodeURIComponent(user)}&viz=${encodeURIComponent(plugin)}&theme=${encodeURIComponent(theme)}`;
  const imgTag = `<img src="${imgUrl}" alt="${alt}" width="${width}" />`;
  const markdown = linkToStudio
    ? `<p align="center">\n  <a href="${studioHref}">\n    ${imgTag}\n  </a>\n</p>`
    : `<p align="center">\n  ${imgTag}\n</p>`;
  return { imgUrl, studioHref, markdown };
}

export function buildInteractiveReadme(options = {}) {
  const user = String(options.username || options.u || 'octocat').trim() || 'octocat';
  const name = String(options.name || user);
  const role = String(options.role || 'Full-Stack Software Engineer & Open-Source Builder');
  const bio = String(
    options.bio ||
      'Architecting resilient systems, interactive developer tools, and open-source software with measurable engineering clarity.'
  );
  const location = options.location ? String(options.location) : '';
  const status = options.status ? String(options.status) : 'Shipping high-leverage developer tooling';
  const theme = SUPPORTED_THEMES.includes(options.theme) ? options.theme : 'emerald';
  const themeAccentHex =
    theme === 'amber'
      ? 'f59e0b'
      : theme === 'cyberpunk'
        ? 'd946ef'
        : theme === 'tokyonight'
          ? '7aa2f7'
          : theme === 'ocean'
            ? '0284c7'
            : theme === 'slate'
              ? '475569'
              : '10b981';

  const heroMascotMap = {
    hud: `${RAW_ASSET_BASE}/monkey-code-hud.svg`,
    wow: `${RAW_ASSET_BASE}/wow-profile-full.svg`,
    bento: `${RAW_ASSET_BASE}/bento-dashboard-full.svg`,
    bot: `${RAW_ASSET_BASE}/roaming-bot.svg`,
    unicorn: `${RAW_ASSET_BASE}/coding-unicorn.svg`,
    desk: `${RAW_ASSET_BASE}/developer-desk.svg`,
    owl: `${RAW_ASSET_BASE}/owl-confetti.svg`,
    terminal: `${RAW_ASSET_BASE}/terminal_animated.svg`,
  };
  const mascotKey = String(options.mascot || 'desk').toLowerCase();
  const mascotUrl = heroMascotMap[mascotKey] || heroMascotMap.desk;

  const stackIcons =
    Array.isArray(options.stack) && options.stack.length > 0
      ? options.stack.join(',')
      : String(options.stack || 'ts,react,nextjs,rust,go,python,docker,postgres,git,linux');

  const socialInput = Array.isArray(options.socials) ? options.socials : [];
  const defaultSocials =
    socialInput.length > 0
      ? socialInput
      : [
          { platform: 'github', url: `https://github.com/${user}`, label: 'GitHub', color: '1e293b' },
          { platform: 'linkedin', url: `https://linkedin.com/in/${user}`, label: 'LinkedIn', color: '0284c7' },
          { platform: 'x', url: `https://x.com/${user}`, label: 'X', color: '334155' },
        ];

  const socialButtonsHtml = defaultSocials
    .map((s) => {
      const p = String(s.platform || 'github').toLowerCase();
      const href = String(s.url || `https://github.com/${user}`);
      const label = String(s.label || p);
      const color = String(s.color || themeAccentHex).replace('#', '');
      return `  <a href="${href}"><img src="https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=for-the-badge&logo=${encodeURIComponent(p)}&logoColor=white" alt="${label}" /></a>`;
    })
    .join('\n');

  const ctaButtons = [
    `<a href="${STUDIO_URL}/en/developer?user=${encodeURIComponent(user)}"><img src="https://img.shields.io/badge/%E2%97%88_Edit_Profile_in_IDE-1e293b?style=for-the-badge&logo=visualstudiocode&logoColor=f59e0b" alt="Edit in MonoForge IDE" /></a>`,
    `<a href="${STUDIO_URL}/en/visualizer?user=${encodeURIComponent(user)}&theme=${encodeURIComponent(theme)}"><img src="https://img.shields.io/badge/%E2%96%B8_Launch_6--Act_Story-${themeAccentHex}?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Launch 6-Act Story" /></a>`,
    `<a href="${STUDIO_URL}/en/animator"><img src="https://img.shields.io/badge/%E2%9C%A6_ASCII_%26_Terminal_Kit-334155?style=for-the-badge&logo=windowsterminal&logoColor=34d399" alt="Open ASCII Terminal Kit" /></a>`,
  ];
  if (options.websiteUrl) {
    ctaButtons.unshift(
      `<a href="${options.websiteUrl}"><img src="https://img.shields.io/badge/Portfolio-0f172a?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio" /></a>`
    );
  }

  const telemetryViz = Array.isArray(options.visualizations) && options.visualizations.length > 0
    ? options.visualizations
    : ['diagonal-heatmap', 'whoami', 'city', 'radar'];

  const heroBanner =
    options.bannerStyle === 'capsule'
      ? `<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e293b,100:${themeAccentHex}&height=200&section=header&text=${encodeURIComponent(name)}&desc=${encodeURIComponent(role)}&fontSize=38&fontColor=ffffff&fontAlignY=40&descAlignY=63&descSize=16" width="100%" alt="${name} Header Banner" />`
      : `<a href="${STUDIO_URL}/en/templates?user=${encodeURIComponent(user)}">\n    <img src="${RAW_ASSET_BASE}/monkey-code-hud.svg" width="100%" alt="${name} Interactive Workstation Header" />\n  </a>`;

  const projects = Array.isArray(options.projects) && options.projects.length > 0
    ? options.projects
    : [
        { name: `${user}/core-platform`, summary: 'Primary architecture & high-throughput runtime engine', stack: 'TypeScript · Rust', url: `https://github.com/${user}` },
        { name: `${user}/devtools-cli`, summary: 'Zero-dependency developer automation and CLI workflows', stack: 'Node.js · Go', url: `https://github.com/${user}` },
      ];

  const projectsTableRows = projects
    .map(
      (p) =>
        `    <tr>\n      <td><a href="${p.url || `https://github.com/${user}`}"><b>${p.name}</b></a></td>\n      <td>${p.summary || ''}</td>\n      <td><code>${p.stack || 'OSS'}</code></td>\n    </tr>`
    )
    .join('\n');

  const heatmapUrl = `${STUDIO_URL}/api/telemetry/svg?plugin=diagonal-heatmap&user=${encodeURIComponent(user)}&theme=${encodeURIComponent(theme)}`;
  const whoamiUrl = `${STUDIO_URL}/api/telemetry/svg?plugin=whoami&user=${encodeURIComponent(user)}&theme=${encodeURIComponent(theme)}`;
  const secondaryPlugin = telemetryViz.find((v) => v !== 'diagonal-heatmap' && v !== 'whoami') || 'city';
  const secondaryUrl = `${STUDIO_URL}/api/telemetry/svg?plugin=${encodeURIComponent(secondaryPlugin)}&user=${encodeURIComponent(user)}&theme=${encodeURIComponent(theme)}`;
  const tertiaryPlugin = telemetryViz.find((v) => v !== 'diagonal-heatmap' && v !== 'whoami' && v !== secondaryPlugin) || 'radar';
  const tertiaryUrl = `${STUDIO_URL}/api/telemetry/svg?plugin=${encodeURIComponent(tertiaryPlugin)}&user=${encodeURIComponent(user)}&theme=${encodeURIComponent(theme)}`;

  const parts = [
    `<div align="center" id="top">\n  ${heroBanner}\n  <h1>◈ ${name}</h1>\n  <p><strong>${role}</strong></p>\n  <p>${bio}</p>\n  <p>\n    ${ctaButtons.join('\n    ')}\n  </p>\n</div>\n`,
    `<p align="center">\n  <img src="${RAW_ASSET_BASE}/digital-hands-divider.svg" width="100%" alt="Animated Section Divider" />\n</p>\n`,
    `<table>\n  <tr>\n    <td valign="top" width="62%">\n      <h3>▸ Operator Signal &amp; Telemetry</h3>\n      <ul>\n        <li><b>◈ Focus:</b> ${status}</li>${location ? `\n        <li><b>▸ Location:</b> ${location}</li>` : ''}\n        <li><b>✦ Stack:</b> <code>${stackIcons.split(',').slice(0, 8).join(' · ')}</code></li>\n        <li><b>⟐ Interactive Studio:</b> <a href="${STUDIO_URL}/en/visualizer?user=${encodeURIComponent(user)}">Open live 6-Act contribution canvas →</a></li>\n      </ul>\n      <br />\n      <p>\n${socialButtonsHtml}\n      </p>\n    </td>\n    <td valign="middle" width="38%" align="center">\n      <a href="${STUDIO_URL}/en/animator">\n        <img src="${mascotUrl}" width="250" alt="Animated Developer Character" />\n      </a>\n    </td>\n  </tr>\n</table>\n`,
    `<div align="center">\n  <h3>▸ Live Contribution Activity &amp; Terminal Identity</h3>\n  <a href="${STUDIO_URL}/en/visualizer?user=${encodeURIComponent(user)}&viz=diagonal-heatmap&theme=${encodeURIComponent(theme)}">\n    <img src="${heatmapUrl}" width="100%" alt="${user} Diagonal Contribution Heatmap" />\n  </a>\n  <br /><br />\n  <a href="${STUDIO_URL}/en/animator">\n    <img src="${whoamiUrl}" width="490" alt="${user} Terminal Whoami Card" />\n  </a>\n</div>\n`,
    `<div align="center">\n  <h3>✦ Engineering Stack</h3>\n  <a href="https://skillicons.dev">\n    <img src="https://skillicons.dev/icons?i=${encodeURIComponent(stackIcons)}&theme=dark&perline=10" alt="${user} Tech Stack" />\n  </a>\n</div>\n`,
    `<details>\n  <summary><b>◈ Interactive Deep Dive — 3D Telemetry, Architecture &amp; Featured Work</b> <em>(click to expand)</em></summary>\n\n<div align="center">\n  <br />\n  <a href="${STUDIO_URL}/en/visualizer?user=${encodeURIComponent(user)}&viz=${encodeURIComponent(secondaryPlugin)}&theme=${encodeURIComponent(theme)}">\n    <img src="${secondaryUrl}" width="49%" alt="${secondaryPlugin}" />\n  </a>\n  <a href="${STUDIO_URL}/en/visualizer?user=${encodeURIComponent(user)}&viz=${encodeURIComponent(tertiaryPlugin)}&theme=${encodeURIComponent(theme)}">\n    <img src="${tertiaryUrl}" width="49%" alt="${tertiaryPlugin}" />\n  </a>\n</div>\n\n<table>\n  <thead>\n    <tr>\n      <th>Project</th>\n      <th>Engineering Summary</th>\n      <th>Stack</th>\n    </tr>\n  </thead>\n  <tbody>\n${projectsTableRows}\n  </tbody>\n</table>`,
  ];

  if (options.includeMermaid !== false) {
    parts.push(
      `\n\`\`\`mermaid\nflowchart LR\n    Ideas([Ideas & Specs]) --> Build[Code & Tests]\n    Build --> Telemetry[Live GitHub Activity]\n    Telemetry --> Impact([Open-Source Releases])\n\`\`\``
    );
  }

  if (options.includeArcade !== false) {
    parts.push(
      `\n<p align="center">\n  <a href="${STUDIO_URL}/en/visualizer?user=${encodeURIComponent(user)}&viz=contribution-snake">\n    <img src="${RAW_ASSET_BASE}/snake.svg" width="85%" alt="Contribution Grid Snake Animation" />\n  </a>\n</p>`
    );
  }

  parts.push(`\n</details>\n`);

  if (options.includeFooter !== false) {
    parts.push(
      `---\n<p align="center">\n  <a href="#top"><img src="https://img.shields.io/badge/Back_to_Top-%E2%86%91-1e293b?style=flat-square" alt="Back to Top" /></a>\n  <a href="${STUDIO_URL}/en/developer?user=${encodeURIComponent(user)}"><img src="https://img.shields.io/badge/Remix_in-MonoForge-f59e0b?style=flat-square" alt="Remix in MonoForge" /></a>\n  <br /><br />\n  <sub>Forged with <a href="https://github.com/yuvraj-thakur-exe/MONOFORGE"><b>MonoForge</b></a> • Camo-Safe 60fps Vectors &amp; Real GitHub Telemetry</sub>\n</p>`
    );
  }

  return parts.join('\n');
}

// Helper to generate profile markdown with footer attribution
export function generateProfile(options) {
  if (options.interactive) {
    return buildInteractiveReadme(options);
  }
  const archetypeId = options.archetype || 'wow-3d-city-cat';
  const archetype =
    ARCHETYPES.find((a) => a.id === archetypeId || (archetypeId === 'metrics-telemetry-dashboard' && a.id === 'forge-telemetry-dashboard')) ||
    ARCHETYPES[0];
  const body = archetype.generator(options);
  const footer = `\n---\n<p align="center">\n  <sub>⚡ Powered by <a href="https://monoforge-studio.vercel.app"><b>MonoForge</b></a> — Forge a GitHub profile that gets noticed.</sub>\n</p>`;
  return body + footer;
}

// CLI Argument Parsing
function parseArgs(args) {
  const result = { _: [] };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const raw = arg.slice(2);
      const eqIdx = raw.indexOf('=');
      if (eqIdx !== -1) {
        result[raw.slice(0, eqIdx)] = raw.slice(eqIdx + 1);
      } else {
        const next = args[i + 1];
        if (next && (next === '-' || !next.startsWith('-'))) {
          result[raw] = next;
          i++;
        } else {
          result[raw] = true;
        }
      }
    } else if (arg.startsWith('-') && arg.length > 1) {
      const key = arg.slice(1);
      const next = args[i + 1];
      if (next && (next === '-' || !next.startsWith('-'))) {
        result[key] = next;
        i++;
      } else {
        result[key] = true;
      }
    } else {
      result._.push(arg);
    }
  }
  return result;
}

// Help message
function showHelp() {
  console.log(`
MonoForge — Forge a GitHub profile that gets noticed.
Autonomous Profile Generator, Interactive README Builder, AI Agent Skill & 7-Tool MCP Server.
Web Studio: https://monoforge-studio.vercel.app
Repository: https://github.com/yuvraj-thakur-exe/MONOFORGE

USAGE:
  npx github:yuvraj-thakur-exe/MONOFORGE build --username <handle> [options]
  npx github:yuvraj-thakur-exe/MONOFORGE generate --username <handle> [options]
  npx github:yuvraj-thakur-exe/MONOFORGE list
  npx github:yuvraj-thakur-exe/MONOFORGE visualizations
  npx github:yuvraj-thakur-exe/MONOFORGE skill-install [--target <dir>]
  npx github:yuvraj-thakur-exe/MONOFORGE mcp

  (Or locally after cloning: node bin/monoforge.js <command> [options])

COMMANDS:
  build             Build an interactive README.md with animated SVGs, buttons, <details>, & live telemetry
  generate          Forge a complete GitHub profile README.md from 40 archetypes
  list              List all 40 built-in CLI archetypes
  visualizations    List all 22+ live SVG telemetry endpoints and 7 themes
  skill-install     Install MonoForge as an AI Agent Skill (.agents/skills/monoforge/)
  mcp               Start Model Context Protocol (MCP) stdio server (7 tools)

OPTIONS:
  --username, -u    GitHub username (default: 'octocat')
  --archetype, -a   Archetype ID (default: 'wow-3d-city-cat')
  --output, -o      Output file path (default: 'README.md', use '-' for stdout)
  --name            Display name (default: auto-detected or persona name)
  --role            Developer headline or role
  --theme           Telemetry theme: emerald, matrix, cyberpunk, tokyonight, amber, slate, ocean
  --mascot          Animated SVG mascot: desk, bot, unicorn, owl, hud, terminal
  --interactive     Use interactive builder inside generate command
  --help, -h        Show help message

EXAMPLES:
  # 1-Liner: Build an interactive README with buttons, <details> accordions, SVGs & live telemetry
  npx github:yuvraj-thakur-exe/MONOFORGE build --username octocat --theme emerald

  # Generate #1 Wow Profile for your GitHub username
  npx github:yuvraj-thakur-exe/MONOFORGE generate --username octocat --archetype wow-3d-city-cat

  # Stream generated Markdown directly to stdout
  npx github:yuvraj-thakur-exe/MONOFORGE generate -u octocat -a bento-signal-dashboard -o -

  # Install AI Agent Skill into current workspace
  npx github:yuvraj-thakur-exe/MONOFORGE skill-install
`);
}

// Install agent skill files into target project
function installAgentSkill(targetDir = '.') {
  const destDir = path.resolve(targetDir, '.agents/skills/monoforge');
  fs.mkdirSync(destDir, { recursive: true });

  const skillContent = `---
name: monoforge
description: Autonomous AI Agent skill for forging interactive, Camo-compliant GitHub profile and project READMEs with 330 Web Studio archetypes, 40 CLI archetypes, 30+ SVG/Canvas telemetry engines, 6-Act Contribution Story, monochrome ASCII portrait converter, 53 core vector SVGs, and 47 verified social icons.
---

# MonoForge Agent Skill

Use this skill whenever asked to create, revamp, animate, or upgrade a developer's GitHub profile or project README.md.

## Available MCP Tools (7 Tools via .mcp.json / monoforge mcp)
- build_interactive_readme: Generates an interactive README with animated SVGs, clickable Studio buttons, verified social badges, live telemetry, <details> accordions, and Mermaid architecture diagrams.
- generate_profile_readme: Generates Markdown from 40 built-in archetypes.
- list_archetypes: Lists all 40 archetypes with descriptions.
- list_visualizations: Lists all live SVG telemetry engines (diagonal-heatmap, whoami, city, isocalendar, river, radar, blueprint, pulse, neofetch, synthwave) and 7 themes.
- search_assets: Searches 53 core vector SVGs and 47 verified social icons in public/assets/.
- inspect_asset: Checks real dimensions, viewBox, bytes, and Camo safety (0 <script>, 0 <foreignObject>).
- generate_telemetry_embed: Returns ready-to-embed SVG HTML wrapped in clickable MonoForge Studio deep-links.

## CLI Execution
\`\`\`bash
npx github:yuvraj-thakur-exe/MONOFORGE build --username <github-username> --theme emerald
npx github:yuvraj-thakur-exe/MONOFORGE generate --username <github-username> --archetype <archetype-id>
\`\`\`
`;

  fs.writeFileSync(path.join(destDir, 'SKILL.md'), skillContent, 'utf8');
  console.log(`MonoForge AI Agent Skill installed to ${destDir}/SKILL.md`);
}

// Model Context Protocol (MCP) stdio JSON-RPC 2.0 Server
function startMcpServer() {
  process.stdin.setEncoding('utf8');

  let buffer = '';
  process.stdin.on('data', (chunk) => {
    buffer += chunk;
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const req = JSON.parse(line.trim());
        handleMcpRequest(req);
      } catch (e) {
        // Ignore JSON parse errors on stream
      }
    }
  });

  function sendMcp(res) {
    process.stdout.write(JSON.stringify(res) + '\n');
  }

  function handleMcpRequest(req) {
    const { id, method, params } = req;

    if (method === 'initialize') {
      sendMcp({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'monoforge-mcp', version: '1.1.0' },
        },
      });
      return;
    }

    if (method === 'tools/list') {
      sendMcp({
        jsonrpc: '2.0',
        id,
        result: {
          tools: [
            {
              name: 'build_interactive_readme',
              description:
                'Build a richly customized, interactive, Camo-compliant GitHub profile README.md featuring animated SVG visuals/mascots, clickable Studio & social CTA buttons, verified symbols, diagonal-heatmap + whoami telemetry, collapsible <details> accordions, arcade Snake animation, and a native Mermaid architecture diagram.',
              inputSchema: {
                type: 'object',
                properties: {
                  username: { type: 'string', description: 'Target GitHub username' },
                  name: { type: 'string', description: 'Developer display name' },
                  role: { type: 'string', description: 'Developer headline or title' },
                  bio: { type: 'string', description: 'Short introduction or engineering mission' },
                  location: { type: 'string', description: 'Geographical location' },
                  status: { type: 'string', description: 'Current focus or active project' },
                  websiteUrl: { type: 'string', description: 'Optional portfolio/website URL for top CTA button' },
                  theme: {
                    type: 'string',
                    enum: SUPPORTED_THEMES,
                    description: 'Telemetry palette (emerald, matrix, cyberpunk, tokyonight, amber, slate, ocean)',
                  },
                  mascot: {
                    type: 'string',
                    enum: ['desk', 'bot', 'unicorn', 'owl', 'terminal', 'hud', 'wow', 'bento'],
                    description: 'Animated Camo-safe SVG character or workstation asset',
                  },
                  bannerStyle: {
                    type: 'string',
                    enum: ['hud', 'capsule'],
                    description: 'Top header style (MonoForge animated HUD or gradient capsule wave)',
                  },
                  stack: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'SkillIcons IDs (e.g. ["ts", "react", "rust", "docker"])',
                  },
                  visualizations: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Preferred telemetry plugin IDs (e.g. ["diagonal-heatmap", "whoami", "city", "radar"])',
                  },
                  includeMermaid: { type: 'boolean', description: 'Include collapsible Mermaid workflow diagram (default true)' },
                  includeArcade: { type: 'boolean', description: 'Include animated snake contribution SVG (default true)' },
                },
                required: ['username'],
              },
            },
            {
              name: 'generate_profile_readme',
              description: 'Generate a Camo-compliant GitHub profile README.md from any of the 40 MonoForge CLI archetypes.',
              inputSchema: {
                type: 'object',
                properties: {
                  username: { type: 'string', description: 'Target GitHub username' },
                  archetype: {
                    type: 'string',
                    description: 'Archetype ID (e.g. wow-3d-city-cat, bento-signal-dashboard, forge-telemetry-dashboard, neon-craftsman-owl, minimal-light-unicorn, constellation-devops-desk, isometric-terminal-connect, pinterest-lofi-aesthetic)',
                  },
                  name: { type: 'string', description: 'Developer display name' },
                  role: { type: 'string', description: 'Developer headline or title' },
                  interactive: { type: 'boolean', description: 'Set true to compose with interactive Studio buttons and <details> accordions' },
                },
                required: ['username'],
              },
            },
            {
              name: 'list_archetypes',
              description: 'List all 40 built-in MonoForge CLI visual archetypes (optionally filtered by category).',
              inputSchema: {
                type: 'object',
                properties: {
                  category: { type: 'string', description: 'Optional category filter (e.g. Popular, Design, DevOps, AI & Data)' },
                },
              },
            },
            {
              name: 'list_visualizations',
              description: 'List MonoForge Camo-safe live SVG telemetry endpoints, themes, and interactive Visualizer deep-links.',
              inputSchema: {
                type: 'object',
                properties: {
                  category: { type: 'string', description: 'Optional category filter (activity, architecture, skills, identity)' },
                },
              },
            },
            {
              name: 'search_assets',
              description: 'Search real MonoForge Camo-safe SVG visuals (mascots, banners, dividers, arcade animations, telemetry cards) and 47 verified social icons in public/assets/.',
              inputSchema: {
                type: 'object',
                properties: {
                  query: { type: 'string', description: 'Search keyword (e.g. "bot", "unicorn", "snake", "divider", "github")' },
                  kind: {
                    type: 'string',
                    enum: ['all', 'mascot', 'banner', 'telemetry', 'arcade', 'divider', 'branding', 'sticker', 'social'],
                    description: 'Filter by asset kind',
                  },
                  limit: { type: 'number', description: 'Maximum results to return (default 25)' },
                },
              },
            },
            {
              name: 'inspect_asset',
              description: 'Inspect a MonoForge SVG asset in public/assets/ to get its dimensions, viewBox, byte size, Camo safety validation, and copy-ready clickable HTML snippets.',
              inputSchema: {
                type: 'object',
                properties: {
                  asset: { type: 'string', description: 'Asset id, filename, or relative path (e.g. "roaming-bot", "digital-hands-divider.svg", "social-github")' },
                },
                required: ['asset'],
              },
            },
            {
              name: 'generate_telemetry_embed',
              description: 'Generate a ready-to-embed live Camo-safe telemetry SVG card optionally wrapped in an interactive Studio link.',
              inputSchema: {
                type: 'object',
                properties: {
                  username: { type: 'string', description: 'GitHub username' },
                  plugin: { type: 'string', description: 'Telemetry plugin ID (default: diagonal-heatmap)' },
                  theme: { type: 'string', enum: SUPPORTED_THEMES, description: 'Palette theme (default: emerald)' },
                  width: { type: 'string', description: 'HTML width attribute (e.g. "100%", "490")' },
                  linkToStudio: { type: 'boolean', description: 'Wrap image in a clickable link to the interactive MonoForge Visualizer (default true)' },
                },
                required: ['username'],
              },
            },
          ],
        },
      });
      return;
    }

    if (method === 'tools/call') {
      const { name, arguments: args = {} } = params || {};

      if (name === 'list_archetypes') {
        const cat = args.category ? String(args.category).toLowerCase() : '';
        const list = ARCHETYPES.filter((a) => !cat || a.category.toLowerCase().includes(cat)).map((a) => ({
          id: a.id,
          name: a.name,
          category: a.category,
          accent: a.accent,
          description: a.description,
        }));
        sendMcp({
          jsonrpc: '2.0',
          id,
          result: { content: [{ type: 'text', text: JSON.stringify(list, null, 2) }] },
        });
        return;
      }

      if (name === 'list_visualizations') {
        const cat = args.category ? String(args.category).toLowerCase() : '';
        const list = VISUALIZATION_CATALOG.filter((v) => !cat || v.category.toLowerCase().includes(cat));
        sendMcp({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    endpoint: `${STUDIO_URL}/api/telemetry/svg?plugin=<id>&user=<username>&theme=<theme>`,
                    themes: SUPPORTED_THEMES,
                    visualizations: list,
                  },
                  null,
                  2
                ),
              },
            ],
          },
        });
        return;
      }

      if (name === 'search_assets') {
        const matches = searchRepoAssets(args.query, args.kind, args.limit);
        sendMcp({
          jsonrpc: '2.0',
          id,
          result: { content: [{ type: 'text', text: JSON.stringify(matches, null, 2) }] },
        });
        return;
      }

      if (name === 'inspect_asset') {
        const info = inspectRepoAsset(args.asset);
        sendMcp({
          jsonrpc: '2.0',
          id,
          result: {
            isError: Boolean(info.error),
            content: [{ type: 'text', text: JSON.stringify(info, null, 2) }],
          },
        });
        return;
      }

      if (name === 'generate_telemetry_embed') {
        const embed = buildTelemetryEmbedSnippet(args);
        sendMcp({
          jsonrpc: '2.0',
          id,
          result: { content: [{ type: 'text', text: JSON.stringify(embed, null, 2) }] },
        });
        return;
      }

      if (name === 'build_interactive_readme') {
        const md = buildInteractiveReadme(args);
        sendMcp({
          jsonrpc: '2.0',
          id,
          result: { content: [{ type: 'text', text: md }] },
        });
        return;
      }

      if (name === 'generate_profile_readme') {
        const md = generateProfile(args);
        sendMcp({
          jsonrpc: '2.0',
          id,
          result: { content: [{ type: 'text', text: md }] },
        });
        return;
      }

      sendMcp({
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Unknown tool: ${name}` },
      });
      return;
    }

    // Default response for unhandled notifications/methods
    if (id !== undefined) {
      sendMcp({ jsonrpc: '2.0', id, result: {} });
    }
  }
}

// Main CLI Controller
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0] || (args.help || args.h ? 'help' : 'interactive');

  if (command === 'help' || args.help || args.h) {
    showHelp();
    return;
  }

  if (command === 'mcp' || args.mcp) {
    startMcpServer();
    return;
  }

  if (command === 'list') {
    console.log('\nMonoForge Visual Archetypes Catalog:\n');
    console.log(
      'ID'.padEnd(30) +
        'CATEGORY'.padEnd(14) +
        'ACCENT'.padEnd(10) +
        'NAME'
    );
    console.log('-'.repeat(80));
    for (const a of ARCHETYPES) {
      console.log(
        a.id.padEnd(30) +
          a.category.padEnd(14) +
          a.accent.padEnd(10) +
          a.name
      );
    }
    console.log('\nRun "npx github:yuvraj-thakur-exe/MONOFORGE generate --archetype <id>" or "build -u <handle>" to forge!\n');
    return;
  }

  if (command === 'visualizations' || command === 'viz') {
    console.log('\nMonoForge Live Telemetry & Visualization Endpoints:\n');
    console.log('PLUGIN ID'.padEnd(22) + 'CATEGORY'.padEnd(14) + 'NAME');
    console.log('-'.repeat(80));
    for (const v of VISUALIZATION_CATALOG) {
      console.log(v.id.padEnd(22) + v.category.padEnd(14) + v.name);
    }
    console.log(`\nThemes: ${SUPPORTED_THEMES.join(', ')}\n`);
    return;
  }

  if (command === 'skill-install') {
    const target = args.target || '.';
    installAgentSkill(target);
    return;
  }

  if (command === 'build') {
    const username = args.username || args.u || 'octocat';
    const outputFile = args.output || args.o || 'README.md';
    const md = buildInteractiveReadme({
      username,
      name: args.name,
      role: args.role,
      bio: args.bio,
      theme: args.theme,
      mascot: args.mascot,
      bannerStyle: args.banner,
      location: args.location,
      status: args.status,
      websiteUrl: args.website,
      stack: args.stack ? String(args.stack).split(',') : undefined,
    });
    if (outputFile === '-') {
      process.stdout.write(md + '\n');
    } else {
      fs.writeFileSync(outputFile, md, 'utf8');
      console.log(`Successfully built interactive README for @${username} -> ${path.resolve(outputFile)}`);
      console.log('⭐ If MonoForge elevated your GitHub profile, please give the repository a star on GitHub: https://github.com/yuvraj-thakur-exe/MONOFORGE');
    }
    return;
  }

  if (command === 'generate') {
    const username = args.username || args.u || 'octocat';
    const archetype = args.archetype || args.a || 'wow-3d-city-cat';
    const outputFile = args.output || args.o || 'README.md';

    const md = generateProfile({
      username,
      archetype,
      name: args.name,
      role: args.role,
      theme: args.theme,
      mascot: args.mascot,
      interactive: Boolean(args.interactive || args.i),
    });

    if (outputFile === '-') {
      process.stdout.write(md + '\n');
    } else {
      fs.writeFileSync(outputFile, md, 'utf8');
      console.log(`Successfully forged GitHub Profile README (${archetype}) for @${username}!`);
      console.log(`Saved to: ${path.resolve(outputFile)}`);
      console.log('⭐ If MonoForge elevated your GitHub profile, please give the repository a star on GitHub: https://github.com/yuvraj-thakur-exe/MONOFORGE');
    }
    return;
  }

  // If no arguments passed, display help with quick-run instructions
  showHelp();
}

if (!process.env.VITEST) {
  main().catch((err) => {
    console.error('MonoForge CLI Error:', err);
    process.exit(1);
  });
}
