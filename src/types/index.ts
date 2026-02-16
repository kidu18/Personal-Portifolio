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
