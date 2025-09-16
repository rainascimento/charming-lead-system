import { create } from 'zustand';

export interface Filters {
  foco: string[];
  regiao: string[];
  tipoContratacao: string[];
  natureza: 'farming' | 'hunting' | null;
  uf: string | null;
  setor: string | null;
  temperatura: string | null;
  estagio: string | null;
}

interface ForecastStore {
  filters: Filters;
  setFilter: (key: keyof Filters, value: any) => void;
  clearFilters: () => void;
  addFilterValue: (key: 'foco' | 'regiao' | 'tipoContratacao', value: string) => void;
  removeFilterValue: (key: 'foco' | 'regiao' | 'tipoContratacao', value: string) => void;
  getActiveFiltersCount: () => number;
}

const initialFilters: Filters = {
  foco: [],
  regiao: [],
  tipoContratacao: [],
  natureza: null,
  uf: null,
  setor: null,
  temperatura: null,
  estagio: null,
};

export const useForecastStore = create<ForecastStore>((set, get) => ({
  filters: initialFilters,
  
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
  
  clearFilters: () => set({ filters: initialFilters }),
  
  addFilterValue: (key, value) => set((state) => ({
    filters: {
      ...state.filters,
      [key]: state.filters[key].includes(value) 
        ? state.filters[key] 
        : [...state.filters[key], value]
    }
  })),
  
  removeFilterValue: (key, value) => set((state) => ({
    filters: {
      ...state.filters,
      [key]: state.filters[key].filter(v => v !== value)
    }
  })),
  
  getActiveFiltersCount: () => {
    const { filters } = get();
    return Object.values(filters).reduce((count, value) => {
      if (Array.isArray(value)) return count + value.length;
      if (value !== null) return count + 1;
      return count;
    }, 0);
  }
}));