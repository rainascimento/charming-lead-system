
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Client {
  id: number;
  nome: string;
  logo_url?: string;
  email_contato?: string;
  telefone_contato?: string;
  endereco?: string;
  cnpj?: string;
  data_criacao: string;
  data_ultima_interacao?: string;
  status_cliente: 'prospeccao' | 'ativo' | 'antigo';
  quantidade_oportunidades?: number;
  quantidade_projetos?: number;
  valor_global_oportunidades?: number;
}

export interface ClientWithStats extends Client {
  quantidade_oportunidades: number;
  quantidade_projetos: number;
  valor_global_oportunidades: number;
}

export const useClients = (status?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: clients = [], isLoading, error } = useQuery({
    queryKey: ['clients', status],
    queryFn: async () => {
      console.log('Fetching clients with status:', status);
      
      let query = supabase
        .from('clientes')
        .select(`
          *,
          cliente_oportunidades!inner(oportunidade_id),
          cliente_projetos!inner(projeto_id)
        `);

      if (status) {
        query = query.eq('status_cliente', status);
      }

      const { data, error } = await query.order('nome', { ascending: true });

      if (error) {
        console.error('Error fetching clients:', error);
        throw error;
      }

      console.log('Fetched clients:', data);

      // Calcular estatísticas para cada cliente
      const clientsWithStats = await Promise.all(
        data.map(async (client) => {
          // Buscar quantidade de oportunidades
          const { data: oportunidades } = await supabase
            .from('cliente_oportunidades')
            .select('oportunidade_id')
            .eq('cliente_id', client.id);

          // Buscar quantidade de projetos
          const { data: projetos } = await supabase
            .from('cliente_projetos')
            .select('projeto_id')
            .eq('cliente_id', client.id);

          // Para calcular valor global, precisaríamos somar valores das oportunidades
          // Por enquanto, usando um valor mock baseado na quantidade
          const quantidadeOportunidades = oportunidades?.length || 0;
          const quantidadeProjetos = projetos?.length || 0;
          const valorGlobal = quantidadeOportunidades * 50000; // Valor mock

          return {
            ...client,
            quantidade_oportunidades: quantidadeOportunidades,
            quantidade_projetos: quantidadeProjetos,
            valor_global_oportunidades: valorGlobal,
          } as ClientWithStats;
        })
      );

      return clientsWithStats;
    },
    enabled: !!user,
  });

  const createClient = useMutation({
    mutationFn: async (newClient: Omit<Client, 'id' | 'data_criacao'>) => {
      console.log('Creating client:', newClient);
      
      const { data, error } = await supabase
        .from('clientes')
        .insert([newClient])
        .select()
        .single();

      if (error) {
        console.error('Error creating client:', error);
        throw error;
      }

      console.log('Created client:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Cliente criado com sucesso!');
    },
    onError: (error) => {
      console.error('Error in createClient:', error);
      toast.error('Erro ao criar cliente');
    },
  });

  const updateClient = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Client> & { id: number }) => {
      console.log('Updating client:', id, updates);
      
      const { data, error } = await supabase
        .from('clientes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating client:', error);
        throw error;
      }

      console.log('Updated client:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Cliente atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Error in updateClient:', error);
      toast.error('Erro ao atualizar cliente');
    },
  });

  return {
    clients,
    isLoading,
    error,
    createClient,
    updateClient,
  };
};

export const useClientDetail = (clientId: number) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['client-detail', clientId],
    queryFn: async () => {
      console.log('Fetching client detail for ID:', clientId);
      
      // Buscar dados do cliente
      const { data: client, error: clientError } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', clientId)
        .single();

      if (clientError) {
        console.error('Error fetching client:', clientError);
        throw clientError;
      }

      // Buscar oportunidades do cliente
      const { data: clientOpportunities, error: opError } = await supabase
        .from('cliente_oportunidades')
        .select(`
          *,
          oportunidades(*)
        `)
        .eq('cliente_id', clientId);

      if (opError) {
        console.error('Error fetching client opportunities:', opError);
        throw opError;
      }

      // Buscar projetos do cliente
      const { data: clientProjects, error: projError } = await supabase
        .from('cliente_projetos')
        .select(`
          *,
          projetos(*)
        `)
        .eq('cliente_id', clientId);

      if (projError) {
        console.error('Error fetching client projects:', projError);
        throw projError;
      }

      const opportunities = clientOpportunities?.map(co => co.oportunidades).filter(Boolean) || [];
      const projects = clientProjects?.map(cp => cp.projetos).filter(Boolean) || [];

      return {
        client,
        opportunities,
        projects,
        stats: {
          totalOpportunities: opportunities.length,
          totalProjects: projects.length,
          totalValue: opportunities.length * 50000, // Valor mock
        }
      };
    },
    enabled: !!user && !!clientId,
  });
};
