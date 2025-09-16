import { useQuery } from '@tanstack/react-query';
import { useForecastStore } from './useForecastStore';

// Mock data
const mockOverview = { quantidade: 7, valorGlobalMi: 249.8 };

const mockUfData = [
  { uf: 'RJ', valorMi: 104.0, qtd: 3 },
  { uf: 'AM', valorMi: 52.0, qtd: 2 },
  { uf: 'CE', valorMi: 48.0, qtd: 1 },
  { uf: 'ES', valorMi: 26.0, qtd: 1 },
  { uf: 'RN', valorMi: 19.8, qtd: 1 }
];

const mockFocusData = { ESTADUAL: 230.0, MUNICIPAL: 19.8 };

const mockSetoresData = [
  { setor: 'TECNOLOGIA', valorMi: 80.0 },
  { setor: 'EDUCAÇÃO', valorMi: 52.0 },
  { setor: 'TRÂNSITO', valorMi: 50.0 },
  { setor: 'DEMAIS', valorMi: 67.8 }
];

const mockTemperaturaData = { FRIA: 104.0, QUENTE: 100.0, MORNA: 45.8 };

const mockMapaData = [
  {
    uf: 'RJ',
    valorTotalMi: 104.0,
    qtdOportunidades: 3,
    foco: { ESTADUAL: 90.2, MUNICIPAL: 13.8 },
    setoresTop3: [
      { nome: 'TECNOLOGIA', valorMi: 55.0 },
      { nome: 'EDUCAÇÃO', valorMi: 24.0 },
      { nome: 'TRÂNSITO', valorMi: 20.0 }
    ],
    temperatura: { FRIA: 44.0, QUENTE: 48.0, MORNA: 12.0 },
    tiposContratacao: ['ADESÃO', 'ATA'],
    linkLista: '/oportunidades?uf=RJ'
  },
  {
    uf: 'AM',
    valorTotalMi: 52.0,
    qtdOportunidades: 2,
    foco: { ESTADUAL: 42.0, MUNICIPAL: 10.0 },
    setoresTop3: [
      { nome: 'EDUCAÇÃO', valorMi: 28.0 },
      { nome: 'TECNOLOGIA', valorMi: 15.0 },
      { nome: 'SAÚDE', valorMi: 9.0 }
    ],
    temperatura: { FRIA: 20.0, QUENTE: 22.0, MORNA: 10.0 },
    tiposContratacao: ['PREGÃO', 'DISPENSA'],
    linkLista: '/oportunidades?uf=AM'
  }
];

const mockPipelineKpis = {
  total: 24,
  andamento: 12,
  finalizadas: 8,
  valorTotalMi: 15.2,
  variacaoPercent: 12
};

const mockEstagios = [
  { nome: 'Identificação', quantidade: 4 },
  { nome: 'Análise Técnica', quantidade: 6 },
  { nome: 'Parecer', quantidade: 3 },
  { nome: 'Proposta', quantidade: 2 }
];

const mockOportunidadesRecentes = {
  items: [
    {
      id: '001/2024',
      titulo: 'Sistema de Gestão',
      orgao: 'Ministério da Educação',
      status: 'Em Andamento',
      estagio: 'Análise Técnica',
      prioridade: 1,
      valorMi: 2.3
    },
    {
      id: '002/2024',
      titulo: 'Infraestrutura Cloud',
      orgao: 'Tribunal de Justiça',
      status: 'Análise',
      estagio: 'Questionamentos',
      prioridade: 2,
      valorMi: 1.8
    },
    {
      id: '003/2024',
      titulo: 'Licenças de Software',
      orgao: 'Prefeitura Municipal',
      status: 'Finalizado',
      estagio: 'Homologado',
      prioridade: 3,
      valorMi: 0.85
    }
  ],
  total: 24
};

export const useForecastOverview = () => {
  const filters = useForecastStore(state => state.filters);
  
  return useQuery({
    queryKey: ['forecast-overview', filters],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockOverview;
    }
  });
};

export const useForecastUf = () => {
  const filters = useForecastStore(state => state.filters);
  
  return useQuery({
    queryKey: ['forecast-uf', filters],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockUfData;
    }
  });
};

export const useForecastFocus = () => {
  const filters = useForecastStore(state => state.filters);
  
  return useQuery({
    queryKey: ['forecast-focus', filters],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockFocusData;
    }
  });
};

export const useForecastSetores = () => {
  const filters = useForecastStore(state => state.filters);
  
  return useQuery({
    queryKey: ['forecast-setores', filters],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockSetoresData;
    }
  });
};

export const useForecastTemperatura = () => {
  const filters = useForecastStore(state => state.filters);
  
  return useQuery({
    queryKey: ['forecast-temperatura', filters],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockTemperaturaData;
    }
  });
};

export const useForecastMapa = () => {
  const filters = useForecastStore(state => state.filters);
  
  return useQuery({
    queryKey: ['forecast-mapa', filters],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockMapaData;
    }
  });
};

export const usePipelineKpis = () => {
  const filters = useForecastStore(state => state.filters);
  
  return useQuery({
    queryKey: ['pipeline-kpis', filters],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockPipelineKpis;
    }
  });
};

export const usePipelineEstagios = () => {
  const filters = useForecastStore(state => state.filters);
  
  return useQuery({
    queryKey: ['pipeline-estagios', filters],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockEstagios;
    }
  });
};

export const useOportunidadesRecentes = (page = 1, pageSize = 10) => {
  const filters = useForecastStore(state => state.filters);
  
  return useQuery({
    queryKey: ['oportunidades-recentes', filters, page, pageSize],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockOportunidadesRecentes;
    }
  });
};