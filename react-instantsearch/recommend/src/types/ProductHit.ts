import { Hit } from '@algolia/client-search';

export type ProductRecord = {
  brand: string;
  image_urls: string[];
  hierarchical_categories: {
    lvl0: string;
    lvl1?: string;
    lvl2?: string;
    lvl3?: string;
    lvl4?: string;
    lvl5?: string;
  };
  name: string;
  price: { value: number };
  url: string;
  gender: string;
  reviews: ProductReviews;
  color: {
    original_name: string;
    filter_group: string;
  };
};
export type ProductReviews = {
  bayesian_avg: number;
  count: number;
  rating: number;
};

type WithInsights<THit> = THit & {
  __position: string;
  __indexName: string;
  __queryID: string;
};

export type ProductHit = WithInsights<Hit<ProductRecord>>;
