export type ProductDto = {
  brand: string;
  caption: string;
  navigateUrl: string;
  id: number;
};

export type ProductsRespose = {
  data: {
    products: ProductDto[];
    totalPages: number;
    totalCount: number;
  };
};

export type ProductStatusDto = {
  id: string;
  type: string;
  name: string;
};

export type FiltersResponse = {
  data: ProductStatusDto[];
};

export type FiltersQuery = {
  page: number;
  pageSize: number;
  status: string;
};
