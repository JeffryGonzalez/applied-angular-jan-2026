export type SortBy = 'title' | 'author' | 'year';

export interface BookEntity {
  id: number;
  title: string;
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  year: number;
}
