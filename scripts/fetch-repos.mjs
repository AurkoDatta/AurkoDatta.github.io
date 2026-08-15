import { writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const USERNAME = process.env.VITE_GITHUB_USERNAME || 'AurkoDatta';
const TOKEN = process.env.GITHUB_TOKEN;
const OUTPUT_PATH = fileURLToPath(new URL('../src/data/repos.generated.json', import.meta.url));

async function main() {
  const headers = { Accept: 'application/vnd.github+json' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      { headers },
    );

    if (!res.ok) {
      throw new Error(`GitHub API responded ${res.status} ${res.statusText}`);
    }

    const repos = await res.json();
    await writeFile(OUTPUT_PATH, JSON.stringify(repos, null, 2) + '\n', 'utf-8');
    console.log(`fetch-repos: wrote ${repos.length} repos to src/data/repos.generated.json`);
  } catch (err) {
    console.warn(`fetch-repos: fetch failed (${err.message}), keeping existing generated file`);
    try {
      await readFile(OUTPUT_PATH, 'utf-8');
    } catch {
      await writeFile(OUTPUT_PATH, '[]\n', 'utf-8');
      console.warn('fetch-repos: no prior generated file found, wrote empty array');
    }
  }
}

main();
