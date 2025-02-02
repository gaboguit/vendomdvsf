export type Category = {
  id: string;
  name: string;
  slug: string;
  items?: Category[];
  parent?: Category;
};

export type CategorySearchResult = {
  root: Category;
  current: Category;
};

export type GetCategoryParams = {
  categorySlug: string;
  vendorId: string;
};
