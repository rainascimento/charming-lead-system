export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      categorias: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      cliente_oportunidades: {
        Row: {
          cliente_id: number | null
          data_vinculacao: string | null
          id: number
          oportunidade_id: number | null
        }
        Insert: {
          cliente_id?: number | null
          data_vinculacao?: string | null
          id?: number
          oportunidade_id?: number | null
        }
        Update: {
          cliente_id?: number | null
          data_vinculacao?: string | null
          id?: number
          oportunidade_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cliente_oportunidades_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cliente_oportunidades_oportunidade_id_fkey"
            columns: ["oportunidade_id"]
            isOneToOne: false
            referencedRelation: "oportunidades"
            referencedColumns: ["id"]
          },
        ]
      }
      cliente_projetos: {
        Row: {
          cliente_id: number | null
          data_vinculacao: string | null
          id: number
          projeto_id: number | null
        }
        Insert: {
          cliente_id?: number | null
          data_vinculacao?: string | null
          id?: number
          projeto_id?: number | null
        }
        Update: {
          cliente_id?: number | null
          data_vinculacao?: string | null
          id?: number
          projeto_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cliente_projetos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cliente_projetos_projeto_id_fkey"
            columns: ["projeto_id"]
            isOneToOne: false
            referencedRelation: "projetos"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          cnpj: string | null
          data_criacao: string | null
          data_ultima_interacao: string | null
          email_contato: string | null
          endereco: string | null
          id: number
          logo_url: string | null
          nome: string
          status_cliente: string | null
          telefone_contato: string | null
        }
        Insert: {
          cnpj?: string | null
          data_criacao?: string | null
          data_ultima_interacao?: string | null
          email_contato?: string | null
          endereco?: string | null
          id?: number
          logo_url?: string | null
          nome: string
          status_cliente?: string | null
          telefone_contato?: string | null
        }
        Update: {
          cnpj?: string | null
          data_criacao?: string | null
          data_ultima_interacao?: string | null
          email_contato?: string | null
          endereco?: string | null
          id?: number
          logo_url?: string | null
          nome?: string
          status_cliente?: string | null
          telefone_contato?: string | null
        }
        Relationships: []
      }
      decisoes_parecer: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      documentos_oportunidade: {
        Row: {
          caminho_arquivo: string
          data_upload: string | null
          id: number
          nome_arquivo: string
          observacoes: string | null
          oportunidade_id: number
          tipo_arquivo: string | null
          usuario_id: number | null
        }
        Insert: {
          caminho_arquivo: string
          data_upload?: string | null
          id?: number
          nome_arquivo: string
          observacoes?: string | null
          oportunidade_id: number
          tipo_arquivo?: string | null
          usuario_id?: number | null
        }
        Update: {
          caminho_arquivo?: string
          data_upload?: string | null
          id?: number
          nome_arquivo?: string
          observacoes?: string | null
          oportunidade_id?: number
          tipo_arquivo?: string | null
          usuario_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "documentos_oportunidade_oportunidade_id_fkey"
            columns: ["oportunidade_id"]
            isOneToOne: false
            referencedRelation: "oportunidades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_oportunidade_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      esferas_administrativas: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      fases_pipeline: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      funcoes: {
        Row: {
          descricao: string | null
          id: number
          nome: string
        }
        Insert: {
          descricao?: string | null
          id?: number
          nome: string
        }
        Update: {
          descricao?: string | null
          id?: number
          nome?: string
        }
        Relationships: []
      }
      inteligencia_negocio: {
        Row: {
          caminho_pasta: string | null
          cnpj_vencedor: string
          id: number
          numero_participantes: number | null
          oportunidade_id: number
          posicao_empresa: number | null
          reducao: number | null
          valor_adjudicado: number | null
          valor_lance_vencedor: number | null
          vencedor: string
        }
        Insert: {
          caminho_pasta?: string | null
          cnpj_vencedor: string
          id?: number
          numero_participantes?: number | null
          oportunidade_id: number
          posicao_empresa?: number | null
          reducao?: number | null
          valor_adjudicado?: number | null
          valor_lance_vencedor?: number | null
          vencedor: string
        }
        Update: {
          caminho_pasta?: string | null
          cnpj_vencedor?: string
          id?: number
          numero_participantes?: number | null
          oportunidade_id?: number
          posicao_empresa?: number | null
          reducao?: number | null
          valor_adjudicado?: number | null
          valor_lance_vencedor?: number | null
          vencedor?: string
        }
        Relationships: [
          {
            foreignKeyName: "inteligencia_negocio_oportunidade_id_fkey"
            columns: ["oportunidade_id"]
            isOneToOne: false
            referencedRelation: "oportunidades"
            referencedColumns: ["id"]
          },
        ]
      }
      itens: {
        Row: {
          descricao: string | null
          id: number
          lote_id: number
          nome: string
          quantidade: number | null
          unidade_id: number
          valor_unitario: number
        }
        Insert: {
          descricao?: string | null
          id?: number
          lote_id: number
          nome: string
          quantidade?: number | null
          unidade_id: number
          valor_unitario: number
        }
        Update: {
          descricao?: string | null
          id?: number
          lote_id?: number
          nome?: string
          quantidade?: number | null
          unidade_id?: number
          valor_unitario?: number
        }
        Relationships: [
          {
            foreignKeyName: "itens_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "lotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
      lotes: {
        Row: {
          descricao: string | null
          id: number
          nome: string
          oportunidade_id: number
        }
        Insert: {
          descricao?: string | null
          id?: number
          nome: string
          oportunidade_id: number
        }
        Update: {
          descricao?: string | null
          id?: number
          nome?: string
          oportunidade_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "lotes_oportunidade_id_fkey"
            columns: ["oportunidade_id"]
            isOneToOne: false
            referencedRelation: "oportunidades"
            referencedColumns: ["id"]
          },
        ]
      }
      mercados: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      modalidades: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      motivos_parecer: {
        Row: {
          descricao: string
          id: number
        }
        Insert: {
          descricao: string
          id?: number
        }
        Update: {
          descricao?: string
          id?: number
        }
        Relationships: []
      }
      oportunidade_categoria: {
        Row: {
          categoria_id: number
          oportunidade_id: number
        }
        Insert: {
          categoria_id: number
          oportunidade_id: number
        }
        Update: {
          categoria_id?: number
          oportunidade_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "oportunidade_categoria_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "oportunidade_categoria_oportunidade_id_fkey"
            columns: ["oportunidade_id"]
            isOneToOne: false
            referencedRelation: "oportunidades"
            referencedColumns: ["id"]
          },
        ]
      }
      oportunidades: {
        Row: {
          data_abertura: string
          data_entrega: string
          esfera_id: number
          fase_pipeline_id: number
          id: number
          mercado_id: number
          modalidade_id: number
          numero_processo: string
          objeto: string
          orgao_id: number
          portal_id: number
          setor_id: number
          status_id: number
          uasg: string
          uf: string
        }
        Insert: {
          data_abertura: string
          data_entrega: string
          esfera_id: number
          fase_pipeline_id: number
          id?: number
          mercado_id: number
          modalidade_id: number
          numero_processo: string
          objeto: string
          orgao_id: number
          portal_id: number
          setor_id: number
          status_id: number
          uasg: string
          uf: string
        }
        Update: {
          data_abertura?: string
          data_entrega?: string
          esfera_id?: number
          fase_pipeline_id?: number
          id?: number
          mercado_id?: number
          modalidade_id?: number
          numero_processo?: string
          objeto?: string
          orgao_id?: number
          portal_id?: number
          setor_id?: number
          status_id?: number
          uasg?: string
          uf?: string
        }
        Relationships: [
          {
            foreignKeyName: "oportunidades_esfera_id_fkey"
            columns: ["esfera_id"]
            isOneToOne: false
            referencedRelation: "esferas_administrativas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "oportunidades_fase_pipeline_id_fkey"
            columns: ["fase_pipeline_id"]
            isOneToOne: false
            referencedRelation: "fases_pipeline"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "oportunidades_mercado_id_fkey"
            columns: ["mercado_id"]
            isOneToOne: false
            referencedRelation: "mercados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "oportunidades_modalidade_id_fkey"
            columns: ["modalidade_id"]
            isOneToOne: false
            referencedRelation: "modalidades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "oportunidades_orgao_id_fkey"
            columns: ["orgao_id"]
            isOneToOne: false
            referencedRelation: "orgaos_publicos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "oportunidades_portal_id_fkey"
            columns: ["portal_id"]
            isOneToOne: false
            referencedRelation: "portais_compra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "oportunidades_setor_id_fkey"
            columns: ["setor_id"]
            isOneToOne: false
            referencedRelation: "setores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "oportunidades_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "status_oportunidade"
            referencedColumns: ["id"]
          },
        ]
      }
      orgaos_publicos: {
        Row: {
          cnpj: string
          email_institucional: string
          email_responsavel: string | null
          esfera_adm_id: number
          id: number
          logo_orgao: string | null
          nome: string
          nome_responsavel: string | null
          sigla: string
          site_oficial: string | null
          status_orgao_id: number
          telefone_geral: string | null
          telefone_responsavel: string | null
          tipo_orgao_id: number
        }
        Insert: {
          cnpj: string
          email_institucional: string
          email_responsavel?: string | null
          esfera_adm_id: number
          id?: number
          logo_orgao?: string | null
          nome: string
          nome_responsavel?: string | null
          sigla: string
          site_oficial?: string | null
          status_orgao_id: number
          telefone_geral?: string | null
          telefone_responsavel?: string | null
          tipo_orgao_id: number
        }
        Update: {
          cnpj?: string
          email_institucional?: string
          email_responsavel?: string | null
          esfera_adm_id?: number
          id?: number
          logo_orgao?: string | null
          nome?: string
          nome_responsavel?: string | null
          sigla?: string
          site_oficial?: string | null
          status_orgao_id?: number
          telefone_geral?: string | null
          telefone_responsavel?: string | null
          tipo_orgao_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orgaos_publicos_esfera_adm_id_fkey"
            columns: ["esfera_adm_id"]
            isOneToOne: false
            referencedRelation: "esferas_administrativas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orgaos_publicos_status_orgao_id_fkey"
            columns: ["status_orgao_id"]
            isOneToOne: false
            referencedRelation: "status_orgao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orgaos_publicos_tipo_orgao_id_fkey"
            columns: ["tipo_orgao_id"]
            isOneToOne: false
            referencedRelation: "tipos_orgao"
            referencedColumns: ["id"]
          },
        ]
      }
      pareceres: {
        Row: {
          ameacas: string | null
          data_criacao: string | null
          decisao_id: number
          forcas: string | null
          fraquezas: string | null
          id: number
          motivo_id: number
          observacoes: string | null
          oportunidade_id: number
          oportunidades: string | null
          responsavel_id: number
          status_id: number
          tipo_parecer_id: number
        }
        Insert: {
          ameacas?: string | null
          data_criacao?: string | null
          decisao_id: number
          forcas?: string | null
          fraquezas?: string | null
          id?: number
          motivo_id: number
          observacoes?: string | null
          oportunidade_id: number
          oportunidades?: string | null
          responsavel_id: number
          status_id: number
          tipo_parecer_id: number
        }
        Update: {
          ameacas?: string | null
          data_criacao?: string | null
          decisao_id?: number
          forcas?: string | null
          fraquezas?: string | null
          id?: number
          motivo_id?: number
          observacoes?: string | null
          oportunidade_id?: number
          oportunidades?: string | null
          responsavel_id?: number
          status_id?: number
          tipo_parecer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "pareceres_decisao_id_fkey"
            columns: ["decisao_id"]
            isOneToOne: false
            referencedRelation: "decisoes_parecer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pareceres_motivo_id_fkey"
            columns: ["motivo_id"]
            isOneToOne: false
            referencedRelation: "motivos_parecer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pareceres_oportunidade_id_fkey"
            columns: ["oportunidade_id"]
            isOneToOne: false
            referencedRelation: "oportunidades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pareceres_responsavel_id_fkey"
            columns: ["responsavel_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pareceres_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "status_parecer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pareceres_tipo_parecer_id_fkey"
            columns: ["tipo_parecer_id"]
            isOneToOne: false
            referencedRelation: "tipos_parecer"
            referencedColumns: ["id"]
          },
        ]
      }
      perfis_acesso: {
        Row: {
          descricao: string | null
          id: number
          nome: string
        }
        Insert: {
          descricao?: string | null
          id?: number
          nome: string
        }
        Update: {
          descricao?: string | null
          id?: number
          nome?: string
        }
        Relationships: []
      }
      perfis_permissoes: {
        Row: {
          perfil_id: number
          permissao_id: number
        }
        Insert: {
          perfil_id: number
          permissao_id: number
        }
        Update: {
          perfil_id?: number
          permissao_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "perfis_permissoes_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis_acesso"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "perfis_permissoes_permissao_id_fkey"
            columns: ["permissao_id"]
            isOneToOne: false
            referencedRelation: "permissoes"
            referencedColumns: ["id"]
          },
        ]
      }
      permissoes: {
        Row: {
          descricao: string | null
          id: number
          nome: string
        }
        Insert: {
          descricao?: string | null
          id?: number
          nome: string
        }
        Update: {
          descricao?: string | null
          id?: number
          nome?: string
        }
        Relationships: []
      }
      portais_compra: {
        Row: {
          id: number
          nome: string
          url: string | null
        }
        Insert: {
          id?: number
          nome: string
          url?: string | null
        }
        Update: {
          id?: number
          nome?: string
          url?: string | null
        }
        Relationships: []
      }
      projetos: {
        Row: {
          data_fim: string | null
          data_inicio: string | null
          descricao: string | null
          id: number
          macro_regiao_id: number
          nome_projeto: string
          orgao_id: number
          regiao_comercial_id: number
          temperatura_id: number
          tipo_comercial_id: number
          tipo_contratacao_id: number
          uf: string
          valor_global: number | null
          valor_mensal: number | null
        }
        Insert: {
          data_fim?: string | null
          data_inicio?: string | null
          descricao?: string | null
          id?: number
          macro_regiao_id: number
          nome_projeto: string
          orgao_id: number
          regiao_comercial_id: number
          temperatura_id: number
          tipo_comercial_id: number
          tipo_contratacao_id: number
          uf: string
          valor_global?: number | null
          valor_mensal?: number | null
        }
        Update: {
          data_fim?: string | null
          data_inicio?: string | null
          descricao?: string | null
          id?: number
          macro_regiao_id?: number
          nome_projeto?: string
          orgao_id?: number
          regiao_comercial_id?: number
          temperatura_id?: number
          tipo_comercial_id?: number
          tipo_contratacao_id?: number
          uf?: string
          valor_global?: number | null
          valor_mensal?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projetos_macro_regiao_id_fkey"
            columns: ["macro_regiao_id"]
            isOneToOne: false
            referencedRelation: "regioes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projetos_orgao_id_fkey"
            columns: ["orgao_id"]
            isOneToOne: false
            referencedRelation: "orgaos_publicos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projetos_regiao_comercial_id_fkey"
            columns: ["regiao_comercial_id"]
            isOneToOne: false
            referencedRelation: "tipos_regiao_com"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projetos_temperatura_id_fkey"
            columns: ["temperatura_id"]
            isOneToOne: false
            referencedRelation: "tipos_temperatura"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projetos_tipo_comercial_id_fkey"
            columns: ["tipo_comercial_id"]
            isOneToOne: false
            referencedRelation: "tipos_comercial"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projetos_tipo_contratacao_id_fkey"
            columns: ["tipo_contratacao_id"]
            isOneToOne: false
            referencedRelation: "tipos_contratacao"
            referencedColumns: ["id"]
          },
        ]
      }
      regioes: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      setores: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      status_oportunidade: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      status_orgao: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      status_parecer: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      status_usuario: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      tipos_comercial: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      tipos_contratacao: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      tipos_orgao: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      tipos_parecer: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      tipos_regiao_com: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      tipos_temperatura: {
        Row: {
          id: number
          nome: string
        }
        Insert: {
          id?: number
          nome: string
        }
        Update: {
          id?: number
          nome?: string
        }
        Relationships: []
      }
      unidades: {
        Row: {
          descricao: string
          id: number
          sigla: string
        }
        Insert: {
          descricao: string
          id?: number
          sigla: string
        }
        Update: {
          descricao?: string
          id?: number
          sigla?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          email: string
          foto_avatar: string | null
          funcao_id: number
          id: number
          nome_usuario: string
          perfil_id: number
          senha_acesso: string
          status_id: number
          ultimo_acesso: string | null
        }
        Insert: {
          email: string
          foto_avatar?: string | null
          funcao_id: number
          id?: number
          nome_usuario: string
          perfil_id: number
          senha_acesso: string
          status_id: number
          ultimo_acesso?: string | null
        }
        Update: {
          email?: string
          foto_avatar?: string | null
          funcao_id?: number
          id?: number
          nome_usuario?: string
          perfil_id?: number
          senha_acesso?: string
          status_id?: number
          ultimo_acesso?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_funcao_id_fkey"
            columns: ["funcao_id"]
            isOneToOne: false
            referencedRelation: "funcoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_perfil_id_fkey"
            columns: ["perfil_id"]
            isOneToOne: false
            referencedRelation: "perfis_acesso"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "status_usuario"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      bidding_type:
        | "pregao_eletronico"
        | "pregao_presencial"
        | "concorrencia"
        | "tomada_precos"
        | "convite"
        | "dispensa"
        | "inexigibilidade"
      execution_mode:
        | "menor_preco"
        | "melhor_tecnica"
        | "tecnica_preco"
        | "maior_lance"
      opinion_status:
        | "pendente"
        | "em_analise"
        | "aprovado"
        | "rejeitado"
        | "revisao"
      opinion_type: "tecnico" | "juridico" | "financeiro" | "comercial"
      opportunity_status:
        | "identificacao"
        | "analise_tecnica"
        | "parecer"
        | "proposta"
        | "em_andamento"
        | "finalizada"
        | "cancelada"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      bidding_type: [
        "pregao_eletronico",
        "pregao_presencial",
        "concorrencia",
        "tomada_precos",
        "convite",
        "dispensa",
        "inexigibilidade",
      ],
      execution_mode: [
        "menor_preco",
        "melhor_tecnica",
        "tecnica_preco",
        "maior_lance",
      ],
      opinion_status: [
        "pendente",
        "em_analise",
        "aprovado",
        "rejeitado",
        "revisao",
      ],
      opinion_type: ["tecnico", "juridico", "financeiro", "comercial"],
      opportunity_status: [
        "identificacao",
        "analise_tecnica",
        "parecer",
        "proposta",
        "em_andamento",
        "finalizada",
        "cancelada",
      ],
    },
  },
} as const
