import { useState, useCallback } from 'react';

// Mock data for all parameter entities
const mockParametersData = {
  categorias: [
    { id: 1, nome: 'Tecnologia da Informação' },
    { id: 2, nome: 'Construção Civil' },
    { id: 3, nome: 'Serviços Gerais' }
  ],
  decisoes_parecer: [
    { id: 1, nome: 'Participar' },
    { id: 2, nome: 'Não Participar' },
    { id: 3, nome: 'Aguardar Informações' }
  ],
  esferas_administrativas: [
    { id: 1, nome: 'Federal' },
    { id: 2, nome: 'Estadual' },
    { id: 3, nome: 'Municipal' }
  ],
  tipos_orgao: [
    { id: 1, nome: 'Ministério' },
    { id: 2, nome: 'Autarquia' },
    { id: 3, nome: 'Empresa Pública' },
    { id: 4, nome: 'Prefeitura' }
  ],
  status_orgao: [
    { id: 1, nome: 'Ativo' },
    { id: 2, nome: 'Inativo' },
    { id: 3, nome: 'Suspenso' }
  ],
  modalidades: [
    { id: 1, nome: 'Pregão Eletrônico' },
    { id: 2, nome: 'Pregão Presencial' },
    { id: 3, nome: 'Concorrência' },
    { id: 4, nome: 'Tomada de Preços' }
  ],
  portais_compra: [
    { id: 1, nome: 'Compras.gov.br', url: 'https://comprasgovernamentais.gov.br' },
    { id: 2, nome: 'BEC - SP', url: 'https://www.bec.sp.gov.br' },
    { id: 3, nome: 'Portal de Compras RJ', url: 'https://www.compras.rj.gov.br' }
  ],
  mercados: [
    { id: 1, nome: 'Governo Federal' },
    { id: 2, nome: 'Governo Estadual' },
    { id: 3, nome: 'Governo Municipal' }
  ],
  setores: [
    { id: 1, nome: 'Saúde' },
    { id: 2, nome: 'Educação' },
    { id: 3, nome: 'Segurança' },
    { id: 4, nome: 'Infraestrutura' }
  ],
  status_oportunidade: [
    { id: 1, nome: 'Identificada' },
    { id: 2, nome: 'Em Análise' },
    { id: 3, nome: 'Aprovada' },
    { id: 4, nome: 'Rejeitada' }
  ],
  fases_pipeline: [
    { id: 1, nome: 'Identificação' },
    { id: 2, nome: 'Análise Técnica' },
    { id: 3, nome: 'Parecer' },
    { id: 4, nome: 'Proposta' },
    { id: 5, nome: 'Em Andamento' },
    { id: 6, nome: 'Finalizada' }
  ],
  funcoes: [
    { id: 1, nome: 'Analista' },
    { id: 2, nome: 'Coordenador' },
    { id: 3, nome: 'Gerente' },
    { id: 4, nome: 'Diretor' }
  ],
  perfis_acesso: [
    { id: 1, nome: 'Administrador' },
    { id: 2, nome: 'Gestor' },
    { id: 3, nome: 'Analista' },
    { id: 4, nome: 'Consulta' }
  ],
  status_usuario: [
    { id: 1, nome: 'Ativo' },
    { id: 2, nome: 'Inativo' },
    { id: 3, nome: 'Bloqueado' }
  ],
  unidades: [
    { id: 1, sigla: 'UN', descricao: 'Unidade' },
    { id: 2, sigla: 'KG', descricao: 'Quilograma' },
    { id: 3, sigla: 'M', descricao: 'Metro' },
    { id: 4, sigla: 'L', descricao: 'Litro' }
  ],
  motivos_parecer: [
    { id: 1, descricao: 'Falta de capacidade técnica' },
    { id: 2, descricao: 'Valor muito baixo' },
    { id: 3, descricao: 'Prazo inadequado' },
    { id: 4, descricao: 'Concorrência elevada' }
  ],
  tipos_parecer: [
    { id: 1, nome: 'Técnico' },
    { id: 2, nome: 'Jurídico' },
    { id: 3, nome: 'Financeiro' },
    { id: 4, nome: 'Comercial' }
  ],
  status_parecer: [
    { id: 1, nome: 'Pendente' },
    { id: 2, nome: 'Em Análise' },
    { id: 3, nome: 'Aprovado' },
    { id: 4, nome: 'Rejeitado' }
  ],
  permissoes: [
    { id: 1, nome: 'Criar' },
    { id: 2, nome: 'Visualizar' },
    { id: 3, nome: 'Editar' },
    { id: 4, nome: 'Excluir' },
    { id: 5, nome: 'Gerenciar' }
  ],
  regioes: [
    { id: 1, nome: 'Norte' },
    { id: 2, nome: 'Nordeste' },
    { id: 3, nome: 'Centro-Oeste' },
    { id: 4, nome: 'Sudeste' },
    { id: 5, nome: 'Sul' }
  ],
  tipos_regiao_com: [
    { id: 1, nome: 'Regional' },
    { id: 2, nome: 'Nacional' },
    { id: 3, nome: 'Internacional' }
  ],
  tipos_comercial: [
    { id: 1, nome: 'Venda Direta' },
    { id: 2, nome: 'Parceria' },
    { id: 3, nome: 'Revenda' }
  ],
  tipos_contratacao: [
    { id: 1, nome: 'CLT' },
    { id: 2, nome: 'PJ' },
    { id: 3, nome: 'Terceirizado' }
  ],
  tipos_temperatura: [
    { id: 1, nome: 'Frio' },
    { id: 2, nome: 'Morno' },
    { id: 3, nome: 'Quente' }
  ]
};

export type ParameterEntity = keyof typeof mockParametersData;

export interface Parameter {
  id: number;
  nome?: string;
  url?: string;
  sigla?: string;
  descricao?: string;
}

export const useParameters = () => {
  const [data, setData] = useState(mockParametersData);
  const [isLoading, setIsLoading] = useState(false);

  const getParameters = useCallback((entity: ParameterEntity) => {
    return data[entity] || [];
  }, [data]);

  const createParameter = useCallback(async (entity: ParameterEntity, parameter: Omit<Parameter, 'id'>) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newId = Math.max(...data[entity].map(p => p.id), 0) + 1;
    const newParameter = { id: newId, ...parameter };
    
    setData(prev => ({
      ...prev,
      [entity]: [...prev[entity], newParameter]
    }));
    
    setIsLoading(false);
    return newParameter;
  }, [data]);

  const updateParameter = useCallback(async (entity: ParameterEntity, id: number, updates: Partial<Parameter>) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setData(prev => ({
      ...prev,
      [entity]: prev[entity].map(p => 
        p.id === id ? { ...p, ...updates } : p
      )
    }));
    
    setIsLoading(false);
  }, []);

  const deleteParameter = useCallback(async (entity: ParameterEntity, id: number) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setData(prev => ({
      ...prev,
      [entity]: prev[entity].filter(p => p.id !== id)
    }));
    
    setIsLoading(false);
  }, []);

  return {
    getParameters,
    createParameter,
    updateParameter,
    deleteParameter,
    isLoading
  };
};

export const getEntityDisplayName = (entity: ParameterEntity): string => {
  const displayNames: Record<ParameterEntity, string> = {
    categorias: 'Categorias',
    decisoes_parecer: 'Decisões de Parecer',
    esferas_administrativas: 'Esferas Administrativas',
    tipos_orgao: 'Tipos de Órgão',
    status_orgao: 'Status de Órgão',
    modalidades: 'Modalidades',
    portais_compra: 'Portais de Compra',
    mercados: 'Mercados',
    setores: 'Setores',
    status_oportunidade: 'Status de Oportunidade',
    fases_pipeline: 'Fases do Pipeline',
    funcoes: 'Funções',
    perfis_acesso: 'Perfis de Acesso',
    status_usuario: 'Status de Usuário',
    unidades: 'Unidades de Medida',
    motivos_parecer: 'Motivos de Parecer',
    tipos_parecer: 'Tipos de Parecer',
    status_parecer: 'Status de Parecer',
    permissoes: 'Permissões',
    regioes: 'Regiões',
    tipos_regiao_com: 'Tipos de Região Comercial',
    tipos_comercial: 'Tipos Comerciais',
    tipos_contratacao: 'Tipos de Contratação',
    tipos_temperatura: 'Tipos de Temperatura'
  };
  
  return displayNames[entity] || entity;
};

export const getEntityFields = (entity: ParameterEntity): string[] => {
  const specialFields: Partial<Record<ParameterEntity, string[]>> = {
    portais_compra: ['nome', 'url'],
    unidades: ['sigla', 'descricao'],
    motivos_parecer: ['descricao']
  };
  
  return specialFields[entity] || ['nome'];
};