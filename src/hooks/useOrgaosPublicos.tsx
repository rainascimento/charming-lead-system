
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface OrgaoPublico {
  id: number;
  nome: string;
  sigla: string;
  logo_orgao: string | null;
  cnpj: string;
  email_institucional: string;
  site_oficial: string | null;
  esfera_adm_id: number;
  status_orgao_id: number;
  tipo_orgao_id: number;
  oportunidades_count: number;
  projetos_count: number;
  valor_total_oportunidades: number;
}

export const useOrgaosPublicos = () => {
  return useQuery({
    queryKey: ["orgaos-publicos"],
    queryFn: async () => {
      console.log("Fetching órgãos públicos...");
      
      const { data, error } = await supabase
        .from("orgaos_publicos")
        .select(`
          id,
          nome,
          sigla,
          logo_orgao,
          cnpj,
          email_institucional,
          site_oficial,
          esfera_adm_id,
          status_orgao_id,
          tipo_orgao_id
        `);

      if (error) {
        console.error("Error fetching órgãos públicos:", error);
        throw error;
      }

      // Para cada órgão, buscar estatísticas
      const orgaosWithStats = await Promise.all(
        (data || []).map(async (orgao) => {
          // Contar oportunidades
          const { count: oportunidadesCount } = await supabase
            .from("oportunidades")
            .select("*", { count: "exact", head: true })
            .eq("orgao_id", orgao.id);

          // Contar projetos
          const { count: projetosCount } = await supabase
            .from("projetos")
            .select("*", { count: "exact", head: true })
            .eq("orgao_id", orgao.id);

          // Calcular valor total das oportunidades através dos lotes
          const { data: lotes } = await supabase
            .from("lotes")
            .select(`
              id,
              oportunidade_id,
              itens (
                valor_unitario,
                quantidade
              )
            `)
            .in("oportunidade_id", 
              await supabase
                .from("oportunidades")
                .select("id")
                .eq("orgao_id", orgao.id)
                .then(({ data }) => data?.map(o => o.id) || [])
            );

          let valorTotal = 0;
          lotes?.forEach(lote => {
            lote.itens?.forEach((item: any) => {
              valorTotal += (item.valor_unitario || 0) * (item.quantidade || 0);
            });
          });

          return {
            ...orgao,
            oportunidades_count: oportunidadesCount || 0,
            projetos_count: projetosCount || 0,
            valor_total_oportunidades: valorTotal,
          };
        })
      );

      console.log("Órgãos públicos fetched:", orgaosWithStats);
      return orgaosWithStats;
    },
  });
};

export const useOrgaoOportunidades = (orgaoId: number) => {
  return useQuery({
    queryKey: ["orgao-oportunidades", orgaoId],
    queryFn: async () => {
      console.log(`Fetching oportunidades for órgão ${orgaoId}...`);
      
      const { data, error } = await supabase
        .from("oportunidades")
        .select(`
          id,
          numero_processo,
          objeto,
          data_abertura,
          data_entrega,
          uf,
          uasg,
          modalidades (nome),
          status_oportunidade (nome),
          fases_pipeline (nome),
          lotes (
            id,
            nome,
            itens (
              valor_unitario,
              quantidade
            )
          )
        `)
        .eq("orgao_id", orgaoId);

      if (error) {
        console.error("Error fetching oportunidades:", error);
        throw error;
      }

      // Calcular valor total para cada oportunidade
      const oportunidadesWithValues = (data || []).map(oportunidade => {
        let valorTotal = 0;
        oportunidade.lotes?.forEach((lote: any) => {
          lote.itens?.forEach((item: any) => {
            valorTotal += (item.valor_unitario || 0) * (item.quantidade || 0);
          });
        });

        return {
          ...oportunidade,
          valor_total: valorTotal,
        };
      });

      console.log("Oportunidades fetched:", oportunidadesWithValues);
      return oportunidadesWithValues;
    },
    enabled: !!orgaoId,
  });
};
