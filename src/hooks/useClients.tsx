
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Cliente {
  id: number;
  nome: string;
  logo_url: string | null;
  cnpj: string | null;
  email_contato: string | null;
  telefone_contato: string | null;
  endereco: string | null;
  status_cliente: string | null;
  data_criacao: string | null;
  data_ultima_interacao: string | null;
}

export const useClients = () => {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: async () => {
      console.log("Fetching clientes...");
      
      const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .order("nome");

      if (error) {
        console.error("Error fetching clientes:", error);
        throw error;
      }

      console.log("Clientes fetched:", data);
      return data as Cliente[];
    },
  });
};
