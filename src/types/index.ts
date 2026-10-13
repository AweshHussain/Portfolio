export interface ProfileConfig {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  biography: string;
  heroQuote: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  location?: string;
  github: string;
  linkedin: string;
  portraitPath: string;
  availabilityStatus: string;
  themePreference: 'light' | 'dark' | 'system';
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  status: string;
  githubUrl: string;
  liveDemoUrl?: string;
  screenshots?: string[];
  overview?: string;
  problemStatement?: string;
  approach?: string;
  technicalWorkflow?: string[];
  implementedCapabilities?: string[];
  limitations?: string[];
  accentColor?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface TimelineEntry {
  date: string;
  title: string;
  organization: string;
  description: string;
  link?: string;
  type: 'education' | 'milestone' | 'project';
}

export interface LeadershipActivity {
  id: string;
  title: string;
  role: string;
  period: string;
  category: 'Community' | 'Hackathon' | 'Technical Fest' | 'Leadership' | 'Achievement';
  iconType: 'gdg' | 'hackathon' | 'trophy' | 'fest' | 'club' | 'career' | 'sih';
  description: string;
  highlights: string[];
  skills: string[];
  badgeColor?: string;
  logo?: string;
  image?: string;
}

export type CertificateCategory =
  | 'All'
  | 'Machine Learning'
  | 'Data Science'
  | 'Artificial Intelligence'
  | 'Computer Science'
  | 'Web Development'
  | 'Tools & Platforms';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: Exclude<CertificateCategory, 'All'>;
  issueDate: string;
  image: string;
  pdfUrl?: string;
  credentialId?: string;
  verificationUrl?: string;
  description?: string;
  skills?: string[];
  featured?: boolean;
}

