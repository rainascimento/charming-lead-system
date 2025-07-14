
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Check, Tag } from 'lucide-react';

interface EtapaCategorizacaoProps {
  categorias: string[];
  observacoes: string;
  onCategoriasChange: (categorias: string[]) => void;
  onObservacoesChange: (observacoes: string) => void;
}

const categoriasDisponiveis = [
  { id: 'ti-hardware', nome: 'TI - Hardware', cor: 'bg-blue-100 text-blue-800' },
  { id: 'ti-software', nome: 'TI - Software', cor: 'bg-blue-100 text-blue-800' },
  { id: 'ti-servicos', nome: 'TI - Serviços', cor: 'bg-blue-100 text-blue-800' },
  { id: 'consultoria', nome: 'Consultoria', cor: 'bg-green-100 text-green-800' },
  { id: 'terceirizacao', nome: 'Terceirização', cor: 'bg-purple-100 text-purple-800' },
  { id: 'obras', nome: 'Obras', cor: 'bg-orange-100 text-orange-800' },
  { id: 'saude', nome: 'Saúde', cor: 'bg-red-100 text-red-800' },
  { id: 'educacao', nome: 'Educação', cor: 'bg-yellow-100 text-yellow-800' },
  { id: 'seguranca', nome: 'Segurança', cor: 'bg-gray-100 text-gray-800' },
  { id: 'limpeza', nome: 'Limpeza', cor: 'bg-teal-100 text-teal-800' },
  { id: 'alimentacao', nome: 'Alimentação', cor: 'bg-pink-100 text-pink-800' },
  { id: 'transporte', nome: 'Transporte', cor: 'bg-indigo-100 text-indigo-800' },
  { id: 'manutencao', nome: 'Manutenção', cor: 'bg-amber-100 text-amber-800' },
  { id: 'comunicacao', nome: 'Comunicação', cor: 'bg-cyan-100 text-cyan-800' },
  { id: 'mobiliario', nome: 'Mobiliário', cor: 'bg-lime-100 text-lime-800' },
  { id: 'energia', nome: 'Energia', cor: 'bg-emerald-100 text-emerald-800' }
];

const EtapaCategorizacao: React.FC<EtapaCategorizacaoProps> = ({
  categorias,
  observacoes,
  onCategoriasChange,
  onObservacoesChange
}) => {
  const toggleCategoria = (categoriaId: string) => {
    if (categorias.includes(categoriaId)) {
      onCategoriasChange(categorias.filter(c => c !== categoriaId));
    } else {
      onCategoriasChange([...categorias, categoriaId]);
    }
  };

  const getCategoriaInfo = (categoriaId: string) => {
    return categoriasDisponiveis.find(c => c.id === categoriaId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Tag className="h-12 w-12 mx-auto text-primary" />
        <h2 className="text-2xl font-bold">Categorização da Oportunidade</h2>
        <p className="text-muted-foreground">
          Selecione uma ou mais categorias que melhor representem esta oportunidade de licitação
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Categorias Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categoriasDisponiveis.map((categoria) => {
              const isSelected = categorias.includes(categoria.id);
              return (
                <Button
                  key={categoria.id}
                  variant={isSelected ? "default" : "outline"}
                  className={`
                    h-auto p-4 justify-start text-left relative
                    ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
                  `}
                  onClick={() => toggleCategoria(categoria.id)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className={`w-3 h-3 rounded-full ${categoria.cor.split(' ')[0]}`} />
                    <span className="flex-1 text-sm font-medium">{categoria.nome}</span>
                    {isSelected && (
                      <Check className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {categorias.length === 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                <span className="font-medium">Atenção:</span> É necessário selecionar pelo menos uma categoria antes de finalizar o cadastro.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {categorias.length > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Categorias Selecionadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categorias.map((categoriaId) => {
                const categoria = getCategoriaInfo(categoriaId);
                if (!categoria) return null;
                
                return (
                  <Badge
                    key={categoriaId}
                    variant="secondary"
                    className={`${categoria.cor} cursor-pointer hover:opacity-80`}
                    onClick={() => toggleCategoria(categoriaId)}
                  >
                    {categoria.nome}
                    <Check className="h-3 w-3 ml-1" />
                  </Badge>
                );
              })}
            </div>
            <p className="text-sm text-green-600 mt-2">
              Clique em uma categoria selecionada para removê-la.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Observações Adicionais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="observacoes">
              Observações sobre a categorização (opcional)
            </Label>
            <Textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => onObservacoesChange(e.target.value)}
              placeholder="Adicione informações complementares sobre a categorização desta oportunidade, justificativas para as categorias escolhidas, ou outras observações relevantes..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Essas observações ajudarão a equipe a entender melhor o contexto da oportunidade.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white rounded-full p-1 mt-0.5">
              <Check className="h-3 w-3" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">
                Quase finalizado!
              </p>
              <p className="text-sm text-blue-700">
                Após selecionar as categorias apropriadas, você poderá finalizar o cadastro da oportunidade. 
                Certifique-se de que todas as informações estão corretas antes de salvar.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {categorias.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-4">
            <div className="text-center space-y-2">
              <div className="flex justify-center items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Pronto para finalizar!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Categorias selecionadas: <strong>{categorias.length}</strong> | 
                Clique em "Salvar Oportunidade" para concluir o cadastro.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EtapaCategorizacao;
