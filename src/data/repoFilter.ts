import type { GithubRepo } from '../types/github';

const EXCLUDED_NAMES = new Set([
  'AurkoDatta',
  'AurkoDatta.github.io',
  'PortfolioUpdated',
  'Leetcode',
  'FlappyBird',
]);

export function filterRepos(repos: GithubRepo[]): GithubRepo[] {
  return repos
    .filter((repo) => !repo.fork && !EXCLUDED_NAMES.has(repo.name))
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
}
