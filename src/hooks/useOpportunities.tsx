
import { useState, useEffect } from 'react';
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
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching opportunities:', error);
        throw error;
      }

      console.log('Fetched opportunities:', data);
      return data as Opportunity[];
    },
    enabled: !!user,
  });

  const createOpportunity = useMutation({
    mutationFn: async (newOpportunity: Omit<Opportunity, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating opportunity:', newOpportunity);
      const { data, error } = await supabase
        .from('opportunities')
        .insert([{
          ...newOpportunity,
          created_by: user?.id,
        }])
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
      const { data, error } = await supabase
        .from('opportunities')
        .update(updates)
        .eq('id', id)
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
        .from('opportunities')
        .delete()
        .eq('id', id);

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

export const useOpportunity = (id: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['opportunity', id],
    queryFn: async () => {
      console.log('Fetching opportunity:', id);
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching opportunity:', error);
        throw error;
      }

      console.log('Fetched opportunity:', data);
      return data as Opportunity;
    },
    enabled: !!user && !!id,
  });
};
