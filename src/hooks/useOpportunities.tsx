
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Opportunity {
  id: string;
  title: string;
  description?: string;
  organ: string;
  bidding_number?: string;
  bidding_type?: string;
  execution_mode?: string;
  estimated_value?: number;
  publication_date?: string;
  deadline_date?: string;
  opening_date?: string;
  status: string;
  created_by?: string;
  assigned_to?: string;
  category?: string;
  tags?: string[];
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export const useOpportunities = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: opportunities = [], isLoading, error } = useQuery({
    queryKey: ['opportunities'],
    queryFn: async () => {
      console.log('Fetching opportunities from database...');
      const { data, error } = await supabase
        .from('oportunidades')
        .select(`
          *,
          orgaos_publicos(nome, sigla)
        `)
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching opportunities:', error);
        throw error;
      }

      console.log('Fetched opportunities:', data);
      // Mapear os dados do banco para o formato esperado
      return data.map(opp => ({
        id: opp.id.toString(),
        title: opp.objeto,
        description: opp.objeto,
        organ: opp.orgaos_publicos?.nome || 'Órgão não informado',
        bidding_number: opp.numero_processo,
        bidding_type: 'pregao_eletronico', // Valor padrão
        execution_mode: 'menor_preco', // Valor padrão
        estimated_value: 0, // Não disponível no schema atual
        publication_date: opp.data_abertura,
        deadline_date: opp.data_entrega,
        opening_date: opp.data_abertura,
        status: getStatusFromPipeline(opp.fase_pipeline_id),
        created_by: user?.id,
        assigned_to: user?.id,
        category: 'outros',
        tags: [],
        notes: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })) as Opportunity[];
    },
    enabled: !!user,
  });

  const createOpportunity = useMutation({
    mutationFn: async (newOpportunity: Omit<Opportunity, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating opportunity:', newOpportunity);
      
      // Para criar uma oportunidade, precisamos de dados mínimos
      // Como o schema é complexo, vou usar valores padrão para campos obrigatórios
      const opportunityData = {
        objeto: newOpportunity.title,
        numero_processo: newOpportunity.bidding_number || `PROC-${Date.now()}`,
        data_abertura: newOpportunity.opening_date || new Date().toISOString().split('T')[0],
        data_entrega: newOpportunity.deadline_date || new Date().toISOString().split('T')[0],
        uasg: '000000', // Valor padrão
        uf: 'SP', // Valor padrão
        orgao_id: 1, // Valor padrão - ajustar conforme necessário
        portal_id: 1, // Valor padrão
        esfera_id: 1, // Valor padrão
        modalidade_id: 1, // Valor padrão
        mercado_id: 1, // Valor padrão
        setor_id: 1, // Valor padrão
        fase_pipeline_id: 1, // Identificação
        status_id: 1, // Valor padrão
      };

      const { data, error } = await supabase
        .from('oportunidades')
        .insert([opportunityData])
        .select()
        .single();

      if (error) {
        console.error('Error creating opportunity:', error);
        throw error;
      }

      console.log('Created opportunity:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      toast.success('Oportunidade criada com sucesso!');
    },
    onError: (error) => {
      console.error('Error in createOpportunity:', error);
      toast.error('Erro ao criar oportunidade');
    },
  });

  const updateOpportunity = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Opportunity> & { id: string }) => {
      console.log('Updating opportunity:', id, updates);
      
      // Mapear apenas os campos que podem ser atualizados
      const updateData: any = {};
      if (updates.title) updateData.objeto = updates.title;
      if (updates.bidding_number) updateData.numero_processo = updates.bidding_number;
      if (updates.opening_date) updateData.data_abertura = updates.opening_date;
      if (updates.deadline_date) updateData.data_entrega = updates.deadline_date;

      const { data, error } = await supabase
        .from('oportunidades')
        .update(updateData)
        .eq('id', Number(id))
        .select()
        .single();

      if (error) {
        console.error('Error updating opportunity:', error);
        throw error;
      }

      console.log('Updated opportunity:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      toast.success('Oportunidade atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Error in updateOpportunity:', error);
      toast.error('Erro ao atualizar oportunidade');
    },
  });

  const deleteOpportunity = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting opportunity:', id);
      const { error } = await supabase
        .from('oportunidades')
        .delete()
        .eq('id', Number(id));

      if (error) {
        console.error('Error deleting opportunity:', error);
        throw error;
      }

      console.log('Deleted opportunity:', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
      toast.success('Oportunidade excluída com sucesso!');
    },
    onError: (error) => {
      console.error('Error in deleteOpportunity:', error);
      toast.error('Erro ao excluir oportunidade');
    },
  });

  return {
    opportunities,
    isLoading,
    error,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
  };
};

// Função auxiliar para mapear fase do pipeline para status
function getStatusFromPipeline(faseId: number): string {
  const statusMap: { [key: number]: string } = {
    1: 'identificacao',
    2: 'analise_tecnica',
    3: 'parecer',
    4: 'proposta',
    5: 'em_andamento',
  };
  return statusMap[faseId] || 'identificacao';
}

export const useOpportunity = (id: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['opportunity', id],
    queryFn: async () => {
      console.log('Fetching opportunity:', id);
      const { data, error } = await supabase
        .from('oportunidades')
        .select(`
          *,
          orgaos_publicos(nome, sigla)
        `)
        .eq('id', Number(id))
        .single();

      if (error) {
        console.error('Error fetching opportunity:', error);
        throw error;
      }

      console.log('Fetched opportunity:', data);
      // Mapear para o formato esperado
      return {
        id: data.id.toString(),
        title: data.objeto,
        description: data.objeto,
        organ: data.orgaos_publicos?.nome || 'Órgão não informado',
        bidding_number: data.numero_processo,
        bidding_type: 'pregao_eletronico',
        execution_mode: 'menor_preco',
        estimated_value: 0,
        publication_date: data.data_abertura,
        deadline_date: data.data_entrega,
        opening_date: data.data_abertura,
        status: getStatusFromPipeline(data.fase_pipeline_id),
        created_by: user?.id,
        assigned_to: user?.id,
        category: 'outros',
        tags: [],
        notes: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Opportunity;
    },
    enabled: !!user && !!id,
  });
};
