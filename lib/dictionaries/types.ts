export type Locale = 'ko' | 'en';

export interface Dictionary {
  common: {
    themeChange: string;
    loading: string;
  };
  nav: {
    about: string;
    history: string;
    skills: string;
    projects: string;
    gallery: string;
    contact: string;
    github: string;
    linkedin: string;
    blog: string;
  };
  hero: {
    typingSequence: string[];
    profileBadge: string;
    profileAlt: string;
    description1: string;
    description2: string;
    motto: string;
    mottoSub: string;
    viewProfile: string;
    viewProjects: string;
  };
  about: {
    title: string;
    subtitle: string;
    name: string;
    profileAlt: string;
    location: string;
    locationValue: string;
    education: string;
    educationValue: string;
    academic: string;
    academicValue: string;
    email: string;
    github: string;
    linkedin: string;
    velog: string;
    coreKeywords: string;
    keywords: string[];
  };
  history: {
    title: string;
    subtitle: string;
    done: string;
    inProgress: string;
    todo: string;
  };
  skills: {
    title: string;
    subtitle: string;
    levels: {
      [key: number]: string;
    };
    categories: {
      category: string;
      skills: {
        name: string;
        level: 1 | 2 | 3;
        description: string;
        icon: string;
      }[];
    }[];
  };
  projects: {
    title: string;
    subtitle: string;
    viewDetail: string;
    teamSize: string;
    tabs: {
      overview: string;
      technical: string;
      problem: string;
      gallery: string;
    };
    overview: {
      intro: string;
      goals: string;
      team: string;
      teamSubtitle: string;
    };
    technical: {
      stack: string;
      features: string;
    };
    problem: {
      challenges: string;
      retrospective: string;
      improvements: string;
      lessons: string;
    };
    gallery: {
      screenshots: string;
      viewOriginal: string;
    };
  };
  gallery: {
    title: string;
    subtitle: string;
    youtubeView: string;
    emptyTitle: string;
    emptyDescription: string;
  };
  contact: {
    title: string;
    subtitle: string;
    motto: string;
    description: string;
    sendEmail: string;
  };
  footer: {
    rights: string;
    backToTop: string;
  };
}
