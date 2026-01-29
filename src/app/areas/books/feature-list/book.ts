export interface Book {
  id: string; // matches your data (string, not number)
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number; // can be negative (BCE years)
}
