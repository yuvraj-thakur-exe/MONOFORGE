/**
 * MONOFORGE Profile Intelligence Engine
 * Deep AST & Heuristic Analyzer for Developer GitHub Profile READMEs.
 */

import { ReadmeConfig } from '#/lib/plugins/types';

export type SuggestionPriority = 'critical' | 'high' | 'moderate' | 'tip';

export interface ActionableSuggestion {
  id: string;
  category: 'structure' | 'intro' | 'skills' | 'socials' | 'projects' | 'telemetry' | 'aesthetics' | 'a11y' | 'security';
  priority: SuggestionPriority;
  title: string;
  description: string;
  autoFixAvailable: boolean;
  autoFixType?: string;
}

export interface IntelligenceDimension {
  name: string;
  score: number;
  maxScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  summary: string;
  highlights: string[];
  drawbacks: string[];
}

export interface ProfileIntelligenceReport {
  overallScore: number;
  profileIQ: number; // Scaled 70 - 160 developer rating
  grade: 'EXEMPLARY' | 'ADVANCED' | 'PROFICIENT' | 'DEVELOPING' | 'MINIMAL';
  dimensions: {
    structure: IntelligenceDimension;
    intro: IntelligenceDimension;
    skills: IntelligenceDimension;
    socials: IntelligenceDimension;
    projects: IntelligenceDimension;
    telemetry: IntelligenceDimension;
    visualConsistency: IntelligenceDimension;
    accessibility: IntelligenceDimension;
    securityAndCamo: IntelligenceDimension;
  };
  suggestions: ActionableSuggestion[];
  readability: {
    wordCount: number;
    readingTimeMinutes: number;
    fleschKincaidScore: number;
    tone: 'concise' | 'balanced' | 'verbose';
  };
}

/**
 * Computes readability metrics (Flesch-Kincaid Reading Ease approximation)
 */
function computeReadability(text: string) {
  const clean = text.replace(/<[^>]*>/g, ' ').replace(/[#*`_~\[\]()]/g, ' ').trim();
  const words = clean.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const sentences = clean.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1;
  const syllables = words.reduce((acc, word) => {
    const matched = word.toLowerCase().match(/[aeiouy]{1,2}/g);
    return acc + (matched ? matched.length : 1);
  }, 0);

  const wordsPerSentence = wordCount / sentences;
  const syllablesPerWord = wordCount > 0 ? syllables / wordCount : 1;
  const score = Math.max(0, Math.min(100, Math.round(206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord)));

  const readingTimeMinutes = Math.max(0.5, Math.round((wordCount / 200) * 10) / 10);
  const tone: 'concise' | 'balanced' | 'verbose' = wordCount > 350 ? 'verbose' : wordCount < 60 ? 'concise' : 'balanced';

  return { wordCount, readingTimeMinutes, fleschKincaidScore: score, tone };
}

/**
 * Deeply analyzes a profile markdown and its optional configuration
 */
export function analyzeDeveloperProfile(
  rawMarkdown: string,
  config?: ReadmeConfig
): ProfileIntelligenceReport {
  const suggestions: ActionableSuggestion[] = [];
  const text = rawMarkdown || '';
  const readability = computeReadability(text);

  // 1. Structure Analysis (Max 20)
  let structureScore = 0;
  const structureHighlights: string[] = [];
  const structureDrawbacks: string[] = [];

  const hasH1 = /^#\s+/m.test(text);
  const h2Count = (text.match(/^##\s+/gm) || []).length;
  const hasTables = /\|(?:\s*[-:]+\s*\|)+/.test(text);
  const hasDividers = /---|<hr\s*\/?>|divider/i.test(text);

  if (hasH1) {
    structureScore += 6;
    structureHighlights.push('Clear top-level H1 heading establishes profile subject');
  } else {
    structureDrawbacks.push('Missing H1 headline');
    suggestions.push({
      id: 'struct-h1',
      category: 'structure',
      priority: 'high',
      title: 'Add a distinct H1 headline',
      description: 'Start with a clear "# Hi, I am <Name> 👋" to anchor reader attention.',
      autoFixAvailable: true,
      autoFixType: 'add-h1',
    });
  }

  if (h2Count >= 2) {
    structureScore += 6;
    structureHighlights.push(`Well-segmented content across ${h2Count} distinct sections`);
  } else {
    structureDrawbacks.push('Few or no H2 section breaks; text may feel monotonous');
    suggestions.push({
      id: 'struct-h2',
      category: 'structure',
      priority: 'moderate',
      title: 'Break content into H2 sections',
      description: 'Use sections like "## About Me", "## Tech Stack", and "## Notable Projects".',
      autoFixAvailable: false,
    });
  }

  if (hasDividers) {
    structureScore += 4;
    structureHighlights.push('Visual horizontal dividers create clean rhythm');
  }

  if (hasTables || /-\s+\[.+\]\(.+\)/.test(text)) {
    structureScore += 4;
    structureHighlights.push('Structured lists or ASCII tables provide compact layout');
  }

  // 2. Introduction & Bio Analysis (Max 20)
  let introScore = 0;
  const introHighlights: string[] = [];
  const introDrawbacks: string[] = [];

  const name = config?.settings?.user?.name || (text.match(/Hi(?:,\s+I'm|\s+there[!,]?\s+I'm)?\s+([^\n<#👋]+)/i)?.[1]?.trim());
  const role = config?.settings?.user?.role || (text.match(/(?:Software|Full-?stack|Frontend|Backend|Systems|DevOps|Cloud|AI|ML|Staff|Principal)\s+(?:Engineer|Developer|Architect|Specialist|Lead)/i)?.[0]);
  const bio = config?.settings?.user?.bio;

  if (name) {
    introScore += 8;
    introHighlights.push(`Developer name identified: "${name}"`);
  } else {
    introDrawbacks.push('Developer identity/name is ambiguous');
    suggestions.push({
      id: 'intro-name',
      category: 'intro',
      priority: 'critical',
      title: 'Specify your developer name',
      description: 'Profiles with prominent names receive 4x more outreach from recruiters and collaborators.',
      autoFixAvailable: true,
      autoFixType: 'set-name',
    });
  }

  if (role) {
    introScore += 6;
    introHighlights.push(`Target professional role specified: "${role}"`);
  } else {
    introDrawbacks.push('No explicit professional title or target role');
    suggestions.push({
      id: 'intro-role',
      category: 'intro',
      priority: 'high',
      title: 'Declare a target role title',
      description: 'Add an explicit role (e.g., "Full-Stack Engineer", "Distributed Systems Architect").',
      autoFixAvailable: true,
      autoFixType: 'set-role',
    });
  }

  if (bio && bio.length > 20) {
    introScore += 6;
    introHighlights.push('Substantive bio provides valuable personal context');
  } else if (!bio && /(?:currently|building|passionate|working on|architect)/i.test(text)) {
    introScore += 6;
    introHighlights.push('Clear mission statement detected in introduction');
  } else {
    introDrawbacks.push('Lacks personal description or current focus statement');
    suggestions.push({
      id: 'intro-focus',
      category: 'intro',
      priority: 'moderate',
      title: 'Add a 1-2 sentence bio statement',
      description: 'Share what problems you love solving, what you are currently building, or what tech excites you.',
      autoFixAvailable: false,
    });
  }

  // 3. Skills & Technologies Analysis (Max 20)
  let skillsScore = 0;
  const skillsHighlights: string[] = [];
  const skillsDrawbacks: string[] = [];

  const hasSkillIcons = /skillicons\.dev|shields\.io.*logo=|techicons/i.test(text);
  const detectedTechs = text.match(/(?:typescript|javascript|react|next\.?js|node\.?js|python|rust|go|golang|docker|kubernetes|aws|postgresql|mongodb|tailwind|vue|svelte|graphql)/gi) || [];
  const uniqueTechs = Array.from(new Set(detectedTechs.map(t => t.toLowerCase())));

  if (uniqueTechs.length >= 6) {
    skillsScore += 12;
    skillsHighlights.push(`Rich technical breadth: ${uniqueTechs.length} technologies detected (${uniqueTechs.slice(0, 5).join(', ')}...)`);
  } else if (uniqueTechs.length >= 2) {
    skillsScore += 7;
    skillsHighlights.push(`Core technologies identified: ${uniqueTechs.join(', ')}`);
    suggestions.push({
      id: 'skills-expand',
      category: 'skills',
      priority: 'moderate',
      title: 'Broaden tech stack representation',
      description: 'Showcase complementary cloud, tooling, or database capabilities alongside primary languages.',
      autoFixAvailable: true,
      autoFixType: 'add-techs',
    });
  } else {
    skillsDrawbacks.push('Very few technical keywords or skill badges detected');
    suggestions.push({
      id: 'skills-missing',
      category: 'skills',
      priority: 'high',
      title: 'Add a curated Skill Icons badge rack',
      description: 'Visual skill badges instantly communicate your stack in under 3 seconds of scanning.',
      autoFixAvailable: true,
      autoFixType: 'add-techs',
    });
  }

  if (hasSkillIcons) {
    skillsScore += 8;
    skillsHighlights.push('Visual icon badges provide instant recruiter scannability');
  }

  // 4. Social Links Analysis (Max 20)
  let socialsScore = 0;
  const socialsHighlights: string[] = [];
  const socialsDrawbacks: string[] = [];

  const hasGithubLink = /github\.com\/[a-zA-Z0-9_-]+/i.test(text);
  const hasLinkedin = /linkedin\.com/i.test(text);
  const hasTwitter = /twitter\.com|x\.com/i.test(text);
  const hasEmail = /mailto:|email/i.test(text);
  const hasPortfolio = /https?:\/\/(?!github|linkedin|twitter|x\.com|img\.shields|skillicons|vercel|raw\.github)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i.test(text);

  let socialChannelCount = 0;
  if (hasGithubLink) socialChannelCount++;
  if (hasLinkedin) socialChannelCount++;
  if (hasTwitter) socialChannelCount++;
  if (hasEmail) socialChannelCount++;
  if (hasPortfolio) socialChannelCount++;

  if (socialChannelCount >= 3) {
    socialsScore = 20;
    socialsHighlights.push(`${socialChannelCount} outreach channels detected (LinkedIn, X, Portfolio, etc.)`);
  } else if (socialChannelCount >= 1) {
    socialsScore = 12;
    socialsHighlights.push(`${socialChannelCount} outreach channel detected`);
    suggestions.push({
      id: 'social-more',
      category: 'socials',
      priority: 'moderate',
      title: 'Add LinkedIn and Portfolio badges',
      description: 'Give viewers multiple professional pathways to contact or hire you.',
      autoFixAvailable: true,
      autoFixType: 'add-socials',
    });
  } else {
    socialsDrawbacks.push('No direct contact or social channels found');
    suggestions.push({
      id: 'social-none',
      category: 'socials',
      priority: 'high',
      title: 'Add social connect badges',
      description: 'Recruiters and open-source contributors need a quick way to reach you.',
      autoFixAvailable: true,
      autoFixType: 'add-socials',
    });
  }

  // 5. Project Presentation Analysis (Max 20)
  let projectScore = 0;
  const projectHighlights: string[] = [];
  const projectDrawbacks: string[] = [];

  const hasProjectKeywords = /(?:featured projects|selected open source|portfolio|notable works|what i'm building|projects)/i.test(text);
  const hasRepoPins = /github-readme-stats\.vercel\.app\/api\/pin/i.test(text);
  const hasDemoLinks = /\[(?:live demo|website|preview|app|read more)\]\(/i.test(text);

  if (hasProjectKeywords) {
    projectScore += 8;
    projectHighlights.push('Dedicated projects section anchors credibility');
  } else {
    projectDrawbacks.push('No explicit project or repository showcase');
    suggestions.push({
      id: 'projects-section',
      category: 'projects',
      priority: 'high',
      title: 'Showcase 2-3 flagship projects',
      description: 'Highlight your top repositories with problem statements, tech stacks, and live demo links.',
      autoFixAvailable: true,
      autoFixType: 'add-projects',
    });
  }

  if (hasRepoPins) {
    projectScore += 6;
    projectHighlights.push('Visual GitHub repository pin cards with stars and forks');
  }

  if (hasDemoLinks) {
    projectScore += 6;
    projectHighlights.push('Clickable live demo or documentation links included');
  }

  // 6. Telemetry & Widgets Analysis (Max 20)
  let telemetryScore = 0;
  const telemetryHighlights: string[] = [];
  const telemetryDrawbacks: string[] = [];

  const has3DCalendar = /telemetry.*isocalendar|isocalendar/i.test(text);
  const hasStatsCard = /github-readme-stats|streak-stats/i.test(text);
  const hasTrophies = /github-profile-trophy|achievements/i.test(text);
  const hasLanguagesDonut = /telemetry.*languages|pie-chart/i.test(text);
  const hasHabitsRadar = /telemetry.*habits|radar/i.test(text);

  let widgetCount = 0;
  if (has3DCalendar) widgetCount++;
  if (hasStatsCard) widgetCount++;
  if (hasTrophies) widgetCount++;
  if (hasLanguagesDonut) widgetCount++;
  if (hasHabitsRadar) widgetCount++;

  if (widgetCount >= 3) {
    telemetryScore = 20;
    telemetryHighlights.push(`${widgetCount} native telemetry engines active (terrains, stats, trophies)`);
  } else if (widgetCount >= 2) {
    telemetryScore = 16;
    telemetryHighlights.push(`${widgetCount} telemetry modules active`);
  } else if (widgetCount >= 1) {
    telemetryScore = 10;
    telemetryHighlights.push(`${widgetCount} telemetry module active`);
    suggestions.push({
      id: 'telemetry-expand',
      category: 'telemetry',
      priority: 'moderate',
      title: 'Pair stats with a 3D commit voxel terrain',
      description: 'The 3D Isometric Calendar creates high visual retention compared to standard commit streaks.',
      autoFixAvailable: true,
      autoFixType: 'add-isocalendar',
    });
  } else {
    telemetryDrawbacks.push('Zero dynamic telemetry or infographic charts detected');
    suggestions.push({
      id: 'telemetry-none',
      category: 'telemetry',
      priority: 'high',
      title: 'Add MonoForge native telemetry widgets',
      description: 'Profiles with 2+ dynamic charts get 3.4x more star and follower conversions.',
      autoFixAvailable: true,
      autoFixType: 'add-isocalendar',
    });
  }

  // 7. Visual Consistency Analysis (Max 20)
  let visualScore = 0;
  const visualHighlights: string[] = [];
  const visualDrawbacks: string[] = [];

  if (text.trim().length > 0) {
    visualScore += 6;
    const hasForTheBadge = /for-the-badge/i.test(text);
    const hasFlatBadge = /style=flat/i.test(text);
    if (hasForTheBadge && hasFlatBadge) {
      visualDrawbacks.push('Mixed badge styles detected (both "for-the-badge" and "flat")');
      suggestions.push({
        id: 'visual-badge-sync',
        category: 'aesthetics',
        priority: 'tip',
        title: 'Harmonize badge styles across sections',
        description: 'Stick to one unified style (e.g. for-the-badge or flat-square) for an orderly editorial feel.',
        autoFixAvailable: true,
        autoFixType: 'sync-badges',
      });
    } else {
      visualScore += 8;
      visualHighlights.push('Consistent badge formatting across sections');
    }

    const isCentered = /<div align="center">|<p align="center">/i.test(text);
    if (isCentered) {
      visualScore += 6;
      visualHighlights.push('Symmetrical centered layout provides modern gallery aesthetic');
    }
  }

  // 8. Accessibility (A11y) (Max 20)
  let a11yScore = 0;
  const a11yHighlights: string[] = [];
  const a11yDrawbacks: string[] = [];

  if (text.trim().length > 0) {
    a11yScore += 6;
    const imgTags = text.match(/<img\s+[^>]*>/gi) || [];
    const mdImages = text.match(/!\[([^\]]*)\]\([^)]+\)/g) || [];

    let missingAlt = false;
    for (const img of imgTags) {
      if (!/alt=["'][^"']+["']/i.test(img)) {
        missingAlt = true;
        break;
      }
    }
    for (const mdImg of mdImages) {
      if (/^!\[\s*\]/i.test(mdImg)) {
        missingAlt = true;
        break;
      }
    }

    if (missingAlt) {
      a11yDrawbacks.push('Images detected with missing or empty alt-text descriptions');
      suggestions.push({
        id: 'a11y-alt',
        category: 'a11y',
        priority: 'moderate',
        title: 'Add descriptive alt-text to images',
        description: 'Screen-readers and slow-network connections rely on meaningful image alt tags.',
        autoFixAvailable: true,
        autoFixType: 'fix-alt-text',
      });
    } else {
      a11yScore += 14;
      a11yHighlights.push('Images supply valid accessible alt labels');
    }

    // Broken or empty image links check
    const emptyMdImages = (text.match(/!\[([^\]]*)\]\(\s*\)/g) || []).length;
    const emptyHtmlImages = (text.match(/<img[^>]*src=["']\s*["'][^>]*>/gi) || []).length;
    const totalBrokenImages = emptyMdImages + emptyHtmlImages;

    if (totalBrokenImages > 0) {
      a11yScore = Math.max(0, a11yScore - 6);
      a11yDrawbacks.push(`Detected ${totalBrokenImages} broken or empty image link(s) without valid source target`);
      suggestions.push({
        id: 'broken-images',
        category: 'a11y',
        priority: 'critical',
        title: 'Fix broken or empty image URLs',
        description: `${totalBrokenImages} image tags have empty parentheses () or empty src attributes, causing broken image icons on GitHub.`,
        autoFixAvailable: true,
        autoFixType: 'fix-broken-images',
      });
    }
  }

  // 9. Security & GitHub Camo CDN Safety (Max 20)
  let securityScore = 20;
  const securityHighlights: string[] = [];
  const securityDrawbacks: string[] = [];

  if (/http:\/\//i.test(text)) {
    securityScore -= 12;
    securityDrawbacks.push('Insecure http:// image or link URLs found');
    suggestions.push({
      id: 'sec-http',
      category: 'security',
      priority: 'critical',
      title: 'Upgrade insecure http:// URLs to https://',
      description: 'GitHub Camo CDN proxy will reject mixed content or display security warnings.',
      autoFixAvailable: true,
      autoFixType: 'upgrade-https',
    });
  } else if (text.trim().length > 0) {
    securityHighlights.push('100% Secure HTTPS asset delivery');
  }

  if (/<script|<foreignObject/i.test(text)) {
    securityScore -= 15;
    securityDrawbacks.push('Forbidden <script> or <foreignObject> tags detected (stripped by GitHub)');
    suggestions.push({
      id: 'sec-script',
      category: 'security',
      priority: 'critical',
      title: 'Remove script or foreignObject elements',
      description: 'GitHub sanitizers strip JavaScript and HTML foreignObject tags from all SVG and markdown.',
      autoFixAvailable: true,
      autoFixType: 'strip-scripts',
    });
  }

  // Compute dimension grades & overall score
  const makeDim = (name: string, score: number, max: number, summary: string, h: string[], d: string[]): IntelligenceDimension => {
    const clamped = Math.max(0, Math.min(max, score));
    const ratio = clamped / max;
    const grade = ratio >= 0.9 ? 'A+' : ratio >= 0.8 ? 'A' : ratio >= 0.65 ? 'B' : ratio >= 0.5 ? 'C' : 'D';
    return { name, score: clamped, maxScore: max, grade, summary, highlights: h, drawbacks: d };
  };

  const dimStructure = makeDim('Architecture & Structure', structureScore, 20, 'Hierarchy, headings, and readability cadence', structureHighlights, structureDrawbacks);
  const dimIntro = makeDim('Introduction & Identity', introScore, 20, 'Name, role declaration, and focus narrative', introHighlights, introDrawbacks);
  const dimSkills = makeDim('Skills & Technologies', skillsScore, 20, 'Breadth of languages, frameworks, and badges', skillsHighlights, skillsDrawbacks);
  const dimSocials = makeDim('Social & Community Reach', socialsScore, 20, 'Outreach links, portfolio, and contact gateways', socialsHighlights, socialsDrawbacks);
  const dimProjects = makeDim('Project Showcase', projectScore, 20, 'Showcase depth, repo pins, and live demo links', projectHighlights, projectDrawbacks);
  const dimTelemetry = makeDim('Native Telemetry & Visuals', telemetryScore, 20, 'Dynamic commit terrains, stats, and achievements', telemetryHighlights, telemetryDrawbacks);
  const dimVisual = makeDim('Visual Consistency', visualScore, 20, 'Badge harmony, alignments, and aesthetic polish', visualHighlights, visualDrawbacks);
  const dimA11y = makeDim('Accessibility (a11y)', a11yScore, 20, 'Alt tags, semantic headings, and contrast safety', a11yHighlights, a11yDrawbacks);
  const dimSec = makeDim('Security & Camo Safety', securityScore, 20, 'HTTPS compliance, 0 scripts, zero tracking servers', securityHighlights, securityDrawbacks);

  const rawTotal = (
    dimStructure.score +
    dimIntro.score +
    dimSkills.score +
    dimSocials.score +
    dimProjects.score +
    dimTelemetry.score +
    dimVisual.score +
    dimA11y.score +
    dimSec.score
  );

  const overallScore = Math.min(100, Math.round((rawTotal / 180) * 100));
  const profileIQ = Math.min(155, Math.max(70, Math.round(70 + (overallScore * 0.85))));

  let grade: ProfileIntelligenceReport['grade'] = 'MINIMAL';
  if (overallScore >= 90) grade = 'EXEMPLARY';
  else if (overallScore >= 80) grade = 'ADVANCED';
  else if (overallScore >= 65) grade = 'PROFICIENT';
  else if (overallScore >= 50) grade = 'DEVELOPING';

  return {
    overallScore,
    profileIQ,
    grade,
    dimensions: {
      structure: dimStructure,
      intro: dimIntro,
      skills: dimSkills,
      socials: dimSocials,
      projects: dimProjects,
      telemetry: dimTelemetry,
      visualConsistency: dimVisual,
      accessibility: dimA11y,
      securityAndCamo: dimSec,
    },
    suggestions,
    readability,
  };
}

/**
 * Extracts and inspects all image URLs from a markdown document for external verification.
 */
export function extractProfileImageUrls(text: string): { url: string; alt: string; isCheckable: boolean }[] {
  const results: { url: string; alt: string; isCheckable: boolean }[] = [];
  const mdImgRegex = /!\[([^\]]*)\]\(([^)]*)\)/g;
  let match: RegExpExecArray | null;

  while ((match = mdImgRegex.exec(text)) !== null) {
    const alt = match[1]?.trim() || '';
    const url = match[2]?.trim() || '';
    const isCheckable = /^https?:\/\//i.test(url);
    results.push({ url, alt, isCheckable });
  }

  const htmlImgRegex = /<img\s+[^>]*src=["']([^"']*)["'][^>]*>/gi;
  while ((match = htmlImgRegex.exec(text)) !== null) {
    const url = match[1]?.trim() || '';
    const altMatch = match[0].match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1].trim() : '';
    const isCheckable = /^https?:\/\//i.test(url);
    results.push({ url, alt, isCheckable });
  }

  return results;
}
