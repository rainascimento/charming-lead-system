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
  },
  {
    uf: 'CE',
    valorTotalMi: 48.0,
    qtdOportunidades: 2,
    foco: { ESTADUAL: 35.0, MUNICIPAL: 13.0 },
    setoresTop3: [
      { nome: 'TRÂNSITO', valorMi: 20.0 },
      { nome: 'TECNOLOGIA', valorMi: 18.0 },
      { nome: 'EDUCAÇÃO', valorMi: 10.0 }
    ],
    temperatura: { FRIA: 18.0, QUENTE: 20.0, MORNA: 10.0 },
    tiposContratacao: ['PREGÃO', 'ATA'],
    linkLista: '/oportunidades?uf=CE'
  },
  {
    uf: 'ES',
    valorTotalMi: 26.0,
    qtdOportunidades: 1,
    foco: { ESTADUAL: 20.0, MUNICIPAL: 6.0 },
    setoresTop3: [
      { nome: 'TECNOLOGIA', valorMi: 15.0 },
      { nome: 'EDUCAÇÃO', valorMi: 8.0 },
      { nome: 'SAÚDE', valorMi: 3.0 }
    ],
    temperatura: { FRIA: 10.0, QUENTE: 12.0, MORNA: 4.0 },
    tiposContratacao: ['ADESÃO'],
    linkLista: '/oportunidades?uf=ES'
  },
  {
    uf: 'RN',
    valorTotalMi: 19.8,
    qtdOportunidades: 1,
    foco: { ESTADUAL: 15.0, MUNICIPAL: 4.8 },
    setoresTop3: [
      { nome: 'EDUCAÇÃO', valorMi: 12.0 },
      { nome: 'TECNOLOGIA', valorMi: 5.0 },
      { nome: 'SAÚDE', valorMi: 2.8 }
    ],
    temperatura: { FRIA: 8.0, QUENTE: 7.8, MORNA: 4.0 },
    tiposContratacao: ['PREGÃO'],
    linkLista: '/oportunidades?uf=RN'
  },
  {
    uf: 'SP',
    valorTotalMi: 85.0,
    qtdOportunidades: 4,
    foco: { ESTADUAL: 65.0, MUNICIPAL: 20.0 },
    setoresTop3: [
      { nome: 'TECNOLOGIA', valorMi: 40.0 },
      { nome: 'TRÂNSITO', valorMi: 25.0 },
      { nome: 'EDUCAÇÃO', valorMi: 20.0 }
    ],
    temperatura: { FRIA: 30.0, QUENTE: 35.0, MORNA: 20.0 },
    tiposContratacao: ['PREGÃO', 'ATA', 'ADESÃO'],
    linkLista: '/oportunidades?uf=SP'
  },
  {
    uf: 'MG',
    valorTotalMi: 72.0,
    qtdOportunidades: 3,
    foco: { ESTADUAL: 50.0, MUNICIPAL: 22.0 },
    setoresTop3: [
      { nome: 'TECNOLOGIA', valorMi: 35.0 },
      { nome: 'EDUCAÇÃO', valorMi: 22.0 },
      { nome: 'TRÂNSITO', valorMi: 15.0 }
    ],
    temperatura: { FRIA: 25.0, QUENTE: 30.0, MORNA: 17.0 },
    tiposContratacao: ['PREGÃO', 'ATA'],
    linkLista: '/oportunidades?uf=MG'
  },
  {
    uf: 'BA',
    valorTotalMi: 58.0,
    qtdOportunidades: 2,
    foco: { ESTADUAL: 42.0, MUNICIPAL: 16.0 },
    setoresTop3: [
      { nome: 'EDUCAÇÃO', valorMi: 25.0 },
      { nome: 'TECNOLOGIA', valorMi: 20.0 },
      { nome: 'SAÚDE', valorMi: 13.0 }
    ],
    temperatura: { FRIA: 22.0, QUENTE: 24.0, MORNA: 12.0 },
    tiposContratacao: ['PREGÃO', 'DISPENSA'],
    linkLista: '/oportunidades?uf=BA'
  },
  {
    uf: 'PR',
    valorTotalMi: 44.0,
    qtdOportunidades: 2,
    foco: { ESTADUAL: 32.0, MUNICIPAL: 12.0 },
    setoresTop3: [
      { nome: 'TRÂNSITO', valorMi: 18.0 },
      { nome: 'TECNOLOGIA', valorMi: 15.0 },
      { nome: 'EDUCAÇÃO', valorMi: 11.0 }
    ],
    temperatura: { FRIA: 16.0, QUENTE: 18.0, MORNA: 10.0 },
    tiposContratacao: ['PREGÃO', 'ATA'],
    linkLista: '/oportunidades?uf=PR'
  },
  {
    uf: 'RS',
    valorTotalMi: 36.0,
    qtdOportunidades: 2,
    foco: { ESTADUAL: 26.0, MUNICIPAL: 10.0 },
    setoresTop3: [
      { nome: 'TECNOLOGIA', valorMi: 16.0 },
      { nome: 'EDUCAÇÃO', valorMi: 12.0 },
      { nome: 'TRÂNSITO', valorMi: 8.0 }
    ],
    temperatura: { FRIA: 14.0, QUENTE: 15.0, MORNA: 7.0 },
    tiposContratacao: ['PREGÃO', 'ADESÃO'],
    linkLista: '/oportunidades?uf=RS'
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