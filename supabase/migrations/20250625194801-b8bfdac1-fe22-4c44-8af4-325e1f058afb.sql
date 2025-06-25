
-- Criar enum para status das oportunidades
CREATE TYPE public.opportunity_status AS ENUM (
  'identificacao',
  'analise_tecnica', 
  'parecer',
  'proposta',
  'em_andamento',
  'finalizada',
  'cancelada'
);

-- Criar enum para tipos de licitação
CREATE TYPE public.bidding_type AS ENUM (
  'pregao_eletronico',
  'pregao_presencial',
  'concorrencia',
  'tomada_precos',
  'convite',
  'dispensa',
  'inexigibilidade'
);

-- Criar enum para modalidades de execução
CREATE TYPE public.execution_mode AS ENUM (
  'menor_preco',
  'melhor_tecnica',
  'tecnica_preco',
  'maior_lance'
);

-- Criar enum para tipos de parecer
CREATE TYPE public.opinion_type AS ENUM (
  'tecnico',
  'juridico',
  'financeiro',
  'comercial'
);

-- Criar enum para status do parecer
CREATE TYPE public.opinion_status AS ENUM (
  'pendente',
  'em_analise',
  'aprovado',
  'rejeitado',
  'revisao'
);

-- Tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user',
  department TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Tabela de oportunidades de licitação
CREATE TABLE public.opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  organ TEXT NOT NULL,
  bidding_number TEXT,
  bidding_type public.bidding_type,
  execution_mode public.execution_mode,
  estimated_value DECIMAL(15,2),
  publication_date DATE,
  deadline_date DATE,
  opening_date DATE,
  status public.opportunity_status DEFAULT 'identificacao',
  created_by UUID REFERENCES public.profiles(id),
  assigned_to UUID REFERENCES public.profiles(id),
  category TEXT,
  tags TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de lotes
CREATE TABLE public.lots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
  lot_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  estimated_value DECIMAL(15,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(opportunity_id, lot_number)
);

-- Tabela de itens
CREATE TABLE public.items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lot_id UUID REFERENCES public.lots(id) ON DELETE CASCADE,
  item_number INTEGER NOT NULL,
  description TEXT NOT NULL,
  unit TEXT,
  quantity DECIMAL(10,2),
  unit_price DECIMAL(15,2),
  total_price DECIMAL(15,2),
  specifications TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lot_id, item_number)
);

-- Tabela de pareceres
CREATE TABLE public.opinions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
  type public.opinion_type NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  status public.opinion_status DEFAULT 'pendente',
  created_by UUID REFERENCES public.profiles(id),
  reviewed_by UUID REFERENCES public.profiles(id),
  review_date TIMESTAMP WITH TIME ZONE,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de documentos
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  uploaded_by UUID REFERENCES public.profiles(id),
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de atividades/log
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opinions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para opportunities
CREATE POLICY "Users can view all opportunities" ON public.opportunities
  FOR SELECT USING (true);

CREATE POLICY "Users can create opportunities" ON public.opportunities
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update opportunities" ON public.opportunities
  FOR UPDATE USING (auth.uid() = created_by OR auth.uid() = assigned_to);

CREATE POLICY "Users can delete own opportunities" ON public.opportunities
  FOR DELETE USING (auth.uid() = created_by);

-- Políticas RLS para lots
CREATE POLICY "Users can view lots" ON public.lots
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.opportunities 
      WHERE id = opportunity_id
    )
  );

CREATE POLICY "Users can manage lots" ON public.lots
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.opportunities 
      WHERE id = opportunity_id 
      AND (created_by = auth.uid() OR assigned_to = auth.uid())
    )
  );

-- Políticas RLS para items
CREATE POLICY "Users can view items" ON public.items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.lots l
      JOIN public.opportunities o ON l.opportunity_id = o.id
      WHERE l.id = lot_id
    )
  );

CREATE POLICY "Users can manage items" ON public.items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.lots l
      JOIN public.opportunities o ON l.opportunity_id = o.id
      WHERE l.id = lot_id
      AND (o.created_by = auth.uid() OR o.assigned_to = auth.uid())
    )
  );

-- Políticas RLS para opinions
CREATE POLICY "Users can view opinions" ON public.opinions
  FOR SELECT USING (true);

CREATE POLICY "Users can create opinions" ON public.opinions
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own opinions" ON public.opinions
  FOR UPDATE USING (auth.uid() = created_by OR auth.uid() = reviewed_by);

-- Políticas RLS para documents
CREATE POLICY "Users can view documents" ON public.documents
  FOR SELECT USING (true);

CREATE POLICY "Users can upload documents" ON public.documents
  FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can manage own documents" ON public.documents
  FOR ALL USING (auth.uid() = uploaded_by);

-- Políticas RLS para activities
CREATE POLICY "Users can view activities" ON public.activities
  FOR SELECT USING (true);

CREATE POLICY "Users can create activities" ON public.activities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger nas tabelas relevantes
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_opportunities_updated_at
  BEFORE UPDATE ON public.opportunities
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_lots_updated_at
  BEFORE UPDATE ON public.lots
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON public.items
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_opinions_updated_at
  BEFORE UPDATE ON public.opinions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Função para criar perfil automaticamente quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Índices para melhor performance
CREATE INDEX idx_opportunities_status ON public.opportunities(status);
CREATE INDEX idx_opportunities_created_by ON public.opportunities(created_by);
CREATE INDEX idx_opportunities_assigned_to ON public.opportunities(assigned_to);
CREATE INDEX idx_opportunities_deadline ON public.opportunities(deadline_date);
CREATE INDEX idx_lots_opportunity_id ON public.lots(opportunity_id);
CREATE INDEX idx_items_lot_id ON public.items(lot_id);
CREATE INDEX idx_opinions_opportunity_id ON public.opinions(opportunity_id);
CREATE INDEX idx_documents_opportunity_id ON public.documents(opportunity_id);
CREATE INDEX idx_activities_opportunity_id ON public.activities(opportunity_id);
