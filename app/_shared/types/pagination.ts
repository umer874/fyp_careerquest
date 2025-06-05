type ListingInterface = {
  page?: number;
  limit?: number;
  search?: string;
};

type Meta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};
