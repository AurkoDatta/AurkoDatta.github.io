export interface EducationEntry {
  school: string;
  credential: string;
  period: string;
  notes?: string[];
  courses?: string[];
}

export const education: EducationEntry[] = [
  {
    school: 'McMaster University',
    credential: 'B.Sc., Computer Science',
    period: 'Sept 2023 – 2027',
    notes: ['McMaster Award of Excellence ($3,000) — top 10% of Faculty admission average'],
    courses: [
      'Operating Systems',
      'Computer Architecture',
      'Computer Graphics',
      'Linear Optimization',
    ],
  },
  {
    school: 'Green Dale International School, Dhaka',
    credential: 'O Levels & A Levels, Cambridge',
    period: 'Aug 2013 – Aug 2023',
    notes: ['O Levels — 8 subjects, A* in all', 'A Levels — 3 subjects, A* in all'],
  },
];
