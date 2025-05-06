export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    createdAt: string;
    author?: string;
  }
  
  export interface GenerateBlogRequest {
    topic: string;
    tone: 'professional' | 'casual' | 'humorous';
  }
  
  export interface GenerateBlogResponse {
    content: string;
  }