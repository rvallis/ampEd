export type BranchSlug = "chat" | "cowork" | "code";

export interface WhatBlock {
  heading: string;
  body: string;
}

export interface QuickCheck {
  prompt: string;
  answer: string;
}

export interface HowStory {
  title: string;
  audience: string;
  body: string;
}

export interface Module {
  order: number;
  slug: string;
  branch: BranchSlug;
  branchName: string;
  title: string;
  leadIn: string[];
  objective: string;
  what: {
    hook: string;
    hookIntro: string;
    blocks: WhatBlock[];
    quickCheck: QuickCheck;
  };
  how: {
    stories: HowStory[];
  };
  closing: {
    bridge: string;
    hook: string;
  };
}
