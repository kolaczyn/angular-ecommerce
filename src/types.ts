export type ProductDto = {
  brand: string;
  caption: string;
  navigateUrl: string;
  id: number;
};

export type ProductsListResponse = {
  data: {
    products: ProductDto[];
    totalPages: number;
    totalCount: number;
  };
};

export type ProductResponse = {
  data: ProductDto;
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
