export type ListingInterface = {
  page?: number;
  limit?: number;
  search?: string;
};

export type Meta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};
