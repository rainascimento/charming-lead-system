
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Item {
  id: string;
  lot_id: string;
  item_number: number;
  description: string;
  unit?: string;
  quantity?: number;
  unit_price?: number;
  total_price?: number;
  specifications?: string;
  created_at?: string;
  updated_at?: string;
}

export const useItems = (lotId: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading, error } = useQuery({
    queryKey: ['items', lotId],
    queryFn: async () => {
      console.log('Fetching items for lot:', lotId);
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('lot_id', lotId)
        .order('item_number', { ascending: true });

      if (error) {
        console.error('Error fetching items:', error);
        throw error;
      }

      console.log('Fetched items:', data);
      return data as Item[];
    },
    enabled: !!user && !!lotId,
  });

  const createItem = useMutation({
    mutationFn: async (newItem: Omit<Item, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating item:', newItem);
      const { data, error } = await supabase
        .from('items')
        .insert([newItem])
        .select()
        .single();

      if (error) {
        console.error('Error creating item:', error);
        throw error;
      }

      console.log('Created item:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', lotId] });
      toast.success('Item criado com sucesso!');
    },
    onError: (error) => {
      console.error('Error in createItem:', error);
      toast.error('Erro ao criar item');
    },
  });

  const updateItem = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Item> & { id: string }) => {
      console.log('Updating item:', id, updates);
      const { data, error } = await supabase
        .from('items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating item:', error);
        throw error;
      }

      console.log('Updated item:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', lotId] });
      toast.success('Item atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Error in updateItem:', error);
      toast.error('Erro ao atualizar item');
    },
  });

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting item:', id);
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting item:', error);
        throw error;
      }

      console.log('Deleted item:', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', lotId] });
      toast.success('Item excluído com sucesso!');
    },
    onError: (error) => {
      console.error('Error in deleteItem:', error);
      toast.error('Erro ao excluir item');
    },
  });

  return {
    items,
    isLoading,
    error,
    createItem,
    updateItem,
    deleteItem,
  };
};
