
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Lot {
  id: string;
  opportunity_id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export const useLots = (opportunityId: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: lots = [], isLoading, error } = useQuery({
    queryKey: ['lots', opportunityId],
    queryFn: async () => {
      console.log('Fetching lots for opportunity:', opportunityId);
      const { data, error } = await supabase
        .from('lotes')
        .select('*')
        .eq('oportunidade_id', opportunityId)
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching lots:', error);
        throw error;
      }

      console.log('Fetched lots:', data);
      // Mapear os dados do banco para o formato esperado
      return data.map(lot => ({
        id: lot.id.toString(),
        opportunity_id: lot.oportunidade_id.toString(),
        name: lot.nome,
        description: lot.descricao || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })) as Lot[];
    },
    enabled: !!user && !!opportunityId,
  });

  const createLot = useMutation({
    mutationFn: async (newLot: Omit<Lot, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating lot:', newLot);
      
      // Mapear para o formato do banco
      const lotData = {
        oportunidade_id: Number(newLot.opportunity_id),
        nome: newLot.name,
        descricao: newLot.description || '',
      };

      const { data, error } = await supabase
        .from('lotes')
        .insert([lotData])
        .select()
        .single();

      if (error) {
        console.error('Error creating lot:', error);
        throw error;
      }

      console.log('Created lot:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lots', opportunityId] });
      toast.success('Lote criado com sucesso!');
    },
    onError: (error) => {
      console.error('Error in createLot:', error);
      toast.error('Erro ao criar lote');
    },
  });

  const updateLot = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Lot> & { id: string }) => {
      console.log('Updating lot:', id, updates);
      
      // Mapear para o formato do banco
      const updateData: any = {};
      if (updates.name) updateData.nome = updates.name;
      if (updates.description !== undefined) updateData.descricao = updates.description;

      const { data, error } = await supabase
        .from('lotes')
        .update(updateData)
        .eq('id', Number(id))
        .select()
        .single();

      if (error) {
        console.error('Error updating lot:', error);
        throw error;
      }

      console.log('Updated lot:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lots', opportunityId] });
      toast.success('Lote atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Error in updateLot:', error);
      toast.error('Erro ao atualizar lote');
    },
  });

  const deleteLot = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting lot:', id);
      const { error } = await supabase
        .from('lotes')
        .delete()
        .eq('id', Number(id));

      if (error) {
        console.error('Error deleting lot:', error);
        throw error;
      }

      console.log('Deleted lot:', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lots', opportunityId] });
      toast.success('Lote excluído com sucesso!');
    },
    onError: (error) => {
      console.error('Error in deleteLot:', error);
      toast.error('Erro ao excluir lote');
    },
  });

  return {
    lots,
    isLoading,
    error,
    createLot,
    updateLot,
    deleteLot,
  };
};
