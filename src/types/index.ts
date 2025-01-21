export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  read_time_minutes: string;
  publish_date: string;
  published: boolean;
  middle_cta_enabled: boolean;
  bottom_cta_enabled: boolean;
  cta_title: string;
  cta_description: string;
  cta_button_text: string;
  created_at?: string;
  updated_at?: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface MetricData {
  value: number;
  trend: number;
  label: string;
}

export interface DataPoint {
  engagement: number;
  carts: number;
  conversions: number;
}