// Utility types for the application
export type ApiResponse<T> = {
  data: T;
  error?: string;
  loading?: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

export type FilterOptions = {
  category?: string;
  priceRange?: { min: number; max: number };
  searchTerm?: string;
  sortBy?: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
};

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Event handler types
export type ChangeHandler<T = string> = (value: T) => void;
export type SubmitHandler<T = unknown> = (data: T) => Promise<void> | void;

// Common props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface WithLoading {
  loading?: boolean;
}

export interface WithError {
  error?: string | null;
}
