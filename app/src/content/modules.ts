import raw from "./modules.json";
import type { BranchSlug, Module } from "../types/content";

export const modules = raw as Module[];

export const BRANCH_ORDER: BranchSlug[] = ["chat", "cowork", "code"];

export const BRANCH_META: Record<
  BranchSlug,
  { name: string; blurb: string; audience: string }
> = {
  chat: {
    name: "Claude Chat",
    blurb: "Conversational, chat-native skills.",
    audience: "Start here if you live in the chat window.",
  },
  cowork: {
    name: "Cowork",
    blurb: "Practice-facing, not classroom-facing.",
    audience: "For freelancers, consultants, anyone running their own work.",
  },
  code: {
    name: "Claude Code",
    blurb: "Technical, agentic, building-focused.",
    audience: "For directing Claude to build real things.",
  },
};

export function modulesByBranch(branch: BranchSlug): Module[] {
  return modules
    .filter((m) => m.branch === branch)
    .sort((a, b) => a.order - b.order);
}

export function getModule(
  branch: string | undefined,
  slug: string | undefined
): Module | undefined {
  return modules.find((m) => m.branch === branch && m.slug === slug);
}

export function adjacentModule(
  m: Module,
  dir: -1 | 1
): Module | undefined {
  const siblings = modulesByBranch(m.branch);
  const i = siblings.findIndex((s) => s.slug === m.slug);
  return siblings[i + dir];
}
