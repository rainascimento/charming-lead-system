
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import EtapaIdentificacao from '@/components/oportunidade/EtapaIdentificacao';
import EtapaLotesItens from '@/components/oportunidade/EtapaLotesItens';
import EtapaCategorizacao from '@/components/oportunidade/EtapaCategorizacao';
import { useToast } from '@/hooks/use-toast';

interface OportunidadeData {
  identificacao: {
    titulo: string;
    numeroProcesso: string;
    orgao: string;
    valorEstimado: string;
    modalidade: string;
    portalCompras: string;
    dataAbertura: string;
    dataEntrega: string;
    objeto: string;
  };
  lotes: Array<{
    id: string;
    nome: string;
    itens: Array<{
      id: string;
      descricao: string;
      quantidade: number;
      valorUnitario: number;
    }>;
  }>;
  categorias: string[];
  observacoes: string;
}

const etapas = [
  { id: 1, nome: 'Identificação', desc: 'Dados básicos da oportunidade' },
  { id: 2, nome: 'Lotes e Itens', desc: 'Detalhamento dos lotes' },
  { id: 3, nome: 'Categorização', desc: 'Classificação da oportunidade' }
];

const CadastroOportunidade = () => {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [dadosOportunidade, setDadosOportunidade] = useState<OportunidadeData>({
    identificacao: {
      titulo: '',
      numeroProcesso: '',
      orgao: '',
      valorEstimado: '',
      modalidade: '',
      portalCompras: '',
      dataAbertura: '',
      dataEntrega: '',
      objeto: ''
    },
    lotes: [],
    categorias: [],
    observacoes: ''
  });
  const { toast } = useToast();

  const atualizarDados = (secao: keyof OportunidadeData, dados: any) => {
    setDadosOportunidade(prev => ({
      ...prev,
      [secao]: dados
    }));
  };

  const validarEtapaAtual = () => {
    switch (etapaAtual) {
      case 1:
        const { identificacao } = dadosOportunidade;
        const camposObrigatorios = ['titulo', 'numeroProcesso', 'orgao', 'valorEstimado', 'modalidade', 'dataAbertura', 'dataEntrega'];
        const camposVazios = camposObrigatorios.filter(campo => !identificacao[campo as keyof typeof identificacao]);
        
        if (camposVazios.length > 0) {
          toast({
            title: "Campos obrigatórios não preenchidos",
            description: "Por favor, preencha todos os campos obrigatórios antes de continuar.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      
      case 2:
        if (dadosOportunidade.lotes.length === 0) {
          toast({
            title: "Nenhum lote cadastrado",
            description: "É necessário cadastrar pelo menos um lote para continuar.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      
      case 3:
        if (dadosOportunidade.categorias.length === 0) {
          toast({
            title: "Nenhuma categoria selecionada",
            description: "É necessário selecionar pelo menos uma categoria para finalizar.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      
      default:
        return true;
    }
  };

  const proximaEtapa = () => {
    if (validarEtapaAtual() && etapaAtual < 3) {
      setEtapaAtual(etapaAtual + 1);
      toast({
        title: "Etapa avançada",
        description: `Você está agora na etapa: ${etapas[etapaAtual].nome}`
      });
    }
  };

  const etapaAnterior = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const salvarOportunidade = () => {
    if (validarEtapaAtual()) {
      console.log('Salvando oportunidade:', dadosOportunidade);
      toast({
        title: "Oportunidade salva com sucesso!",
        description: "A nova oportunidade foi cadastrada no sistema."
      });
      // Aqui implementaria a chamada para API
    }
  };

  const cancelarCadastro = () => {
    if (confirm('Tem certeza que deseja cancelar o cadastro? Todos os dados serão perdidos.')) {
      window.history.back();
    }
  };

  const renderizarEtapa = () => {
    switch (etapaAtual) {
      case 1:
        return (
          <EtapaIdentificacao
            dados={dadosOportunidade.identificacao}
            onDadosChange={(dados) => atualizarDados('identificacao', dados)}
          />
        );
      case 2:
        return (
          <EtapaLotesItens
            lotes={dadosOportunidade.lotes}
            onLotesChange={(lotes) => atualizarDados('lotes', lotes)}
          />
        );
      case 3:
        return (
          <EtapaCategorizacao
            categorias={dadosOportunidade.categorias}
            observacoes={dadosOportunidade.observacoes}
            onCategoriasChange={(categorias) => atualizarDados('categorias', categorias)}
            onObservacoesChange={(observacoes) => atualizarDados('observacoes', observacoes)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">Nova Oportunidade</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={cancelarCadastro}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6">
            {etapas.map((etapa, index) => (
              <div key={etapa.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                      ${etapaAtual >= etapa.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    {etapa.id}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${etapaAtual >= etapa.id ? 'text-primary' : 'text-muted-foreground'}`}>
                      {etapa.nome}
                    </p>
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      {etapa.desc}
                    </p>
                  </div>
                </div>
                {index < etapas.length - 1 && (
                  <div
                    className={`
                      flex-1 h-px mx-4 mt-5
                      ${etapaAtual > etapa.id ? 'bg-primary' : 'bg-muted'}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">
                {etapaAtual}
              </span>
              {etapas[etapaAtual - 1].nome}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderizarEtapa()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Button
            variant="outline"
            onClick={etapaAnterior}
            disabled={etapaAtual === 1}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          <div className="flex gap-2 w-full sm:w-auto">
            {etapaAtual < 3 ? (
              <Button
                onClick={proximaEtapa}
                className="flex-1 sm:flex-none"
              >
                Próximo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={salvarOportunidade}
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
              >
                Salvar Oportunidade
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroOportunidade;
