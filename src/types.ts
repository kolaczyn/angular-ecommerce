export type ProductDto = {
  brand: string;
  caption: string;
  navigateUrl: string;
};

export type ProductsRespose = {
  data: {
    products: ProductDto[];
    totalPages: number;
    totalCount: number;
  };
};
