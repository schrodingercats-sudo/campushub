export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  description?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}
