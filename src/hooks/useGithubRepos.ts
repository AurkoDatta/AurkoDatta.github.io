import { useEffect, useState } from 'react';
import type { GithubRepo } from '../types/github';
import { filterRepos } from '../data/repoFilter';
import generatedRepos from '../data/repos.generated.json';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME ?? 'AurkoDatta';

interface UseGithubReposResult {
  repos: GithubRepo[];
  isLoading: boolean;
}

export function useGithubRepos(): UseGithubReposResult {
  const seeded = filterRepos(generatedRepos as GithubRepo[]);
  const [repos, setRepos] = useState<GithubRepo[]>(seeded);
  const [isLoading, setIsLoading] = useState(seeded.length === 0);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.statusText))))
      .then((data: GithubRepo[]) => {
        if (cancelled) return;
        const fresh = filterRepos(data);
        setRepos((current) =>
          JSON.stringify(fresh) === JSON.stringify(current) ? current : fresh,
        );
      })
      .catch(() => {
        /* keep build-time generated data on failure */
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { repos, isLoading };
}
