import { ExternalLink, Star } from 'lucide-react';
import { useGithubRepos } from '../../hooks/useGithubRepos';
import { useReveal } from '../../hooks/useReveal';
import type { GithubRepo } from '../../types/github';
import styles from './Projects.module.css';

function techTags(repo: GithubRepo): string[] {
  const tags = new Set<string>();
  if (repo.language) tags.add(repo.language);
  repo.topics.forEach((topic) => tags.add(topic));
  return Array.from(tags).slice(0, 4);
}

function ProjectCard({ repo, delayMs }: { repo: GithubRepo; delayMs: number }) {
  const ref = useReveal<HTMLAnchorElement>(delayMs);
  const tags = techTags(repo);

  return (
    <a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={`View ${repo.name} on GitHub`}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.name}>{repo.name}</h3>
        <ExternalLink aria-hidden="true" size={16} className={styles.linkIcon} />
      </div>

      <p className={styles.description}>{repo.description ?? 'No description provided.'}</p>

      <div className={styles.footer}>
        {tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
        {repo.stargazers_count > 0 && (
          <span className={styles.stars}>
            <Star aria-hidden="true" size={14} />
            {repo.stargazers_count}
          </span>
        )}
      </div>
    </a>
  );
}

function ProjectSkeletons() {
  return (
    <div className={styles.grid} aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={styles.skeleton} />
      ))}
    </div>
  );
}

export function Projects() {
  const headingRef = useReveal<HTMLDivElement>();
  const { repos, isLoading } = useGithubRepos();

  return (
    <section id="projects" className={styles.projects} aria-label="Projects">
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.heading}>
          <p className={styles.label}>04 — Projects</p>
          <h2 className={styles.title}>Selected Work</h2>
          <p className={styles.subtitle}>Live from GitHub, sorted by most recently updated.</p>
        </div>

        {isLoading && repos.length === 0 ? (
          <ProjectSkeletons />
        ) : (
          <div className={styles.grid}>
            {repos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} delayMs={(index % 3) * 80} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
