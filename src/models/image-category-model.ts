export interface ImageCategoryModel {
  category: string;
  images: string[];
}

export interface ForDatabase {
  name: string;
  email?: string;
  score: number;
  id?: IDBValidKey;
}
