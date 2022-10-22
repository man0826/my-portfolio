type Images = {
  thumbnail: string;
  display: string;
  screenshot: string | null;
};

export type Work = {
  id: string;
  title: string;
  content: string;
  category: string;
  url: string;
  imageName: string;
  images?: Images;
  github?: string;
};

export type Skill = {
  id: string;
  name: string;
  percent: string;
};
