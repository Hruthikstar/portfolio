export interface VideoProject {
  id: string;
  video_title: string;
  video_description: string;
  tags: string[];
  cover_image: string;
  publish_date: string;
  client_name: string;
  client_image: string;
  client_feedback: string;
  video_link: string;
  project_images: string[];
  category: string[];
  duration?: string;
  software_used?: string[];
  is_instagram_reel: boolean;
  is_google_drive?: boolean;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
}
