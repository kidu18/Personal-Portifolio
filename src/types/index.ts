export interface Project {
  _id?: string;
  title: string;
  description: string;
  link: string;
  image: string;
  tags?: string[];
  features?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BlogPost {
  _id?: string;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  message: string;
  read?: boolean;
  createdAt?: Date;
}

export interface Settings {
  _id?: string;
  profile: {
    name: string;
    title: string;
    bio: string;
    avatarUrl: string;
    resumeUrl: string;
    email: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  features: {
    showBlog: boolean;
    showProjects: boolean;
    showTestimonials: boolean;
    openToWork: boolean;
  };
  theme: {
    primaryColor?: string;
    mode: 'light' | 'dark';
  };
  integrations: {
    googleAnalyticsId: string;
    openaiApiKey?: string; // Optional, stored securely
  };
  createdAt?: Date;
  updatedAt?: Date;
}
