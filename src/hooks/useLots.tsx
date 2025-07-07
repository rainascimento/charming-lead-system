
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Lot {
  id: string;
  opportunity_id: string;
  lot_number: number;
  title: string;
  description?: string;
  estimated_value?: number;
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
        .from('lots')
        .select('*')
        .eq('opportunity_id', opportunityId)
        .order('lot_number', { ascending: true });

      if (error) {
        console.error('Error fetching lots:', error);
        throw error;
      }

      console.log('Fetched lots:', data);
      return data as Lot[];
    },
    enabled: !!user && !!opportunityId,
  });

  const createLot = useMutation({
    mutationFn: async (newLot: Omit<Lot, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating lot:', newLot);
      const { data, error } = await supabase
        .from('lots')
        .insert([newLot])
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
      const { data, error } = await supabase
        .from('lots')
        .update(updates)
        .eq('id', id)
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
        .from('lots')
        .delete()
        .eq('id', id);

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
