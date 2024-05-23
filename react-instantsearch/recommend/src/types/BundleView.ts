export type BaseObject = {
  objectID: string;
  name: string;
  price: { value: number };
};

export type BundleViewTranslations = Partial<{
  totalPrice: string;
  thisArticle: string;
  addToCart(count: number): string;
}>;
