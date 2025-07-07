
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
        .from('itens')
        .select('*')
        .eq('lote_id', Number(lotId))
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching items:', error);
        throw error;
      }

      console.log('Fetched items:', data);
      // Mapear os dados do banco para o formato esperado
      return data.map(item => ({
        id: item.id.toString(),
        lot_id: item.lote_id.toString(),
        item_number: 1, // Será incrementado conforme necessário
        description: item.nome,
        unit: 'UN', // Valor padrão, pode ser ajustado
        quantity: item.quantidade || 0,
        unit_price: Number(item.valor_unitario) || 0,
        total_price: (item.quantidade || 0) * (Number(item.valor_unitario) || 0),
        specifications: item.descricao || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })) as Item[];
    },
    enabled: !!user && !!lotId,
  });

  const createItem = useMutation({
    mutationFn: async (newItem: Omit<Item, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating item:', newItem);
      
      // Mapear para o formato do banco
      const itemData = {
        lote_id: Number(newItem.lot_id),
        nome: newItem.description,
        descricao: newItem.specifications || '',
        quantidade: newItem.quantity || 0,
        valor_unitario: newItem.unit_price || 0,
        unidade_id: 1, // Valor padrão, ajustar conforme necessário
      };

      const { data, error } = await supabase
        .from('itens')
        .insert([itemData])
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
      
      // Mapear para o formato do banco
      const updateData: any = {};
      if (updates.description) updateData.nome = updates.description;
      if (updates.specifications) updateData.descricao = updates.specifications;
      if (updates.quantity !== undefined) updateData.quantidade = updates.quantity;
      if (updates.unit_price !== undefined) updateData.valor_unitario = updates.unit_price;

      const { data, error } = await supabase
        .from('itens')
        .update(updateData)
        .eq('id', Number(id))
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
        .from('itens')
        .delete()
        .eq('id', Number(id));

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
