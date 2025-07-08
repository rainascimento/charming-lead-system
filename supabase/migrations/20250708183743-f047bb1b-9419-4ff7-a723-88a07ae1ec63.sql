
-- Criar tabela de clientes
CREATE TABLE public.clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  logo_url VARCHAR(500),
  email_contato VARCHAR(255),
  telefone_contato VARCHAR(50),
  endereco TEXT,
  cnpj VARCHAR(18),
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_ultima_interacao TIMESTAMP WITH TIME ZONE,
  status_cliente VARCHAR(50) DEFAULT 'prospeccao' CHECK (status_cliente IN ('prospeccao', 'ativo', 'antigo'))
);

-- Criar tabela de relacionamento entre clientes e oportunidades
CREATE TABLE public.cliente_oportunidades (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES public.clientes(id) ON DELETE CASCADE,
  oportunidade_id INTEGER REFERENCES public.oportunidades(id) ON DELETE CASCADE,
  data_vinculacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(cliente_id, oportunidade_id)
);

-- Criar tabela de relacionamento entre clientes e projetos
CREATE TABLE public.cliente_projetos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES public.clientes(id) ON DELETE CASCADE,
  projeto_id INTEGER REFERENCES public.projetos(id) ON DELETE CASCADE,
  data_vinculacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(cliente_id, projeto_id)
);

-- Inserir alguns dados de exemplo
INSERT INTO public.clientes (nome, logo_url, email_contato, telefone_contato, cnpj, status_cliente) VALUES
('Empresa Alpha Ltda', 'https://via.placeholder.com/50', 'contato@alpha.com.br', '(11) 99999-0001', '12.345.678/0001-90', 'prospeccao'),
('Beta Soluções S.A.', 'https://via.placeholder.com/50', 'vendas@beta.com.br', '(11) 99999-0002', '23.456.789/0001-01', 'ativo'),
('Gamma Tecnologia', 'https://via.placeholder.com/50', 'info@gamma.com.br', '(11) 99999-0003', '34.567.890/0001-12', 'prospeccao'),
('Delta Consulting', 'https://via.placeholder.com/50', 'comercial@delta.com.br', '(11) 99999-0004', '45.678.901/0001-23', 'antigo'),
('Epsilon Corp', 'https://via.placeholder.com/50', 'contato@epsilon.com.br', '(11) 99999-0005', '56.789.012/0001-34', 'ativo');

-- Criar índices para melhor performance
CREATE INDEX idx_clientes_status ON public.clientes(status_cliente);
CREATE INDEX idx_cliente_oportunidades_cliente_id ON public.cliente_oportunidades(cliente_id);
CREATE INDEX idx_cliente_projetos_cliente_id ON public.cliente_projetos(cliente_id);

-- Habilitar RLS nas novas tabelas
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cliente_oportunidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cliente_projetos ENABLE ROW LEVEL SECURITY;

-- Criar políticas básicas (permitir acesso completo por enquanto)
CREATE POLICY "Allow all access to clientes" ON public.clientes FOR ALL USING (true);
CREATE POLICY "Allow all access to cliente_oportunidades" ON public.cliente_oportunidades FOR ALL USING (true);
CREATE POLICY "Allow all access to cliente_projetos" ON public.cliente_projetos FOR ALL USING (true);
