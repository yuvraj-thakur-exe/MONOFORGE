import type { TemplateItem } from '../catalog';

export type TemplateCategoryGroup =
  | 'Professional & Minimal'
  | 'Cyberpunk & Futuristic'
  | 'Nature & Aesthetic'
  | 'Anime & Creative'
  | 'Tech & AI'
  | 'Gaming & Retro'
  | 'Space & Science'
  | 'Developer Lifestyle'
  | 'Data, Cloud & Security'
  | 'Experimental & Art';

export interface Template100Item extends TemplateItem {
  number: number;
  categoryGroup: TemplateCategoryGroup;
}

