export type PromptCategory =
  | 'image'
  | 'code'
  | 'writing'
  | 'business'
  | 'video'
  | 'research'
  | 'custom';

export interface PromptVariable {
  name: string;
  defaultValue: string;
  description?: string;
}

export interface PromptBreakdown {
  role: string;
  directives: string;
  specifications: string[];
  qualities: string[];
  negativeConstraints?: string[];
  disclaimer: string;
  invocation: string;
}

export interface GeneratedPrompt {
  id: string;
  title: string;
  category: PromptCategory;
  rolePersona: string;
  fullPrompt: string;
  breakdown: PromptBreakdown;
  recommendedSettings: string;
  variables?: PromptVariable[];
  engineeringNotes?: string;
  targetAi?: string;
  createdAt: number;
  tags?: string[];
  isFavorite?: boolean;
}

export interface RefinedPromptResult {
  originalPrompt: string;
  refinedFullPrompt: string;
  originalScore: number;
  refinedScore: number;
  diagnostics: string[];
  keyImprovements: string[];
  rolePersona: string;
  recommendedSettings?: string;
}

export interface TestExecutionResult {
  output: string;
  executionTimeMs: number;
  modelUsed: string;
  testedAt: string;
}
