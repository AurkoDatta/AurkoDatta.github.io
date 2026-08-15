export interface ExperienceEntry {
  role: string;
  org: string;
  team?: string;
  period: string;
  points: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Application Developer Co-op',
    org: 'CIBC',
    team: 'Commercial Banking & Payment Technology',
    period: 'May 2025 – Aug 2025',
    points: [
      'Maintained Excel-based documentation and tracking used by the team for finance expense reconciliation.',
      'Contributed to an international B2B payments project alongside the wider team.',
      'Researched MFA options and delivered recommendations for the team.',
      'Independently built a Resource Management Tool — a React demo UI with a proposed Spring Web / PostgreSQL backend — handed off pending approval delays.',
      'Built Spring Boot services against an H2 dummy database and wrote QA-handoff documentation.',
    ],
  },
  {
    role: 'Application Developer Co-op',
    org: 'CIBC',
    team: 'WISE, Wealth Management Technology',
    period: 'May 2024 – Aug 2024',
    points: [
      'Built with Java and Spring on a cross-application error-code management solution.',
      'Developed a Spring Boot web application with search and file-management functionality.',
      'Acted as liaison between the WISE and Standard Policy teams.',
    ],
  },
  {
    role: 'Founding Team',
    org: 'Version Originale',
    team: 'Dhaka',
    period: 'Jan 2022 – Sep 2022',
    points: [
      'Contributed design input for an early-stage clothing brand.',
      'Helped shape marketing and operational strategy.',
    ],
  },
];
