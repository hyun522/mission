export interface RatingTs {
  rate: number;
  count: number;
}

export interface BaseProductTs {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: RatingTs;
}

export interface ProductTs extends BaseProductTs {
  description: string;
  category: string;
}
