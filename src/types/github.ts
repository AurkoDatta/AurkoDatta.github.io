export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  pushed_at: string;
  homepage: string | null;
}
