export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'C', 'C++', 'Haskell', 'Elm'],
  },
  {
    label: 'Frameworks',
    items: ['Spring', 'Flask', 'React', 'JUnit', 'OpenGL'],
  },
  {
    label: 'Data',
    items: ['MongoDB', 'PostgreSQL'],
  },
  {
    label: 'Tools',
    items: ['Microsoft Office Suite'],
  },
];
