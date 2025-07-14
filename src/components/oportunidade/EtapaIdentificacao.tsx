
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IdentificacaoData {
  titulo: string;
  numeroProcesso: string;
  orgao: string;
  valorEstimado: string;
  modalidade: string;
  portalCompras: string;
  dataAbertura: string;
  dataEntrega: string;
  objeto: string;
}

interface EtapaIdentificacaoProps {
  dados: IdentificacaoData;
  onDadosChange: (dados: IdentificacaoData) => void;
}

const EtapaIdentificacao: React.FC<EtapaIdentificacaoProps> = ({ dados, onDadosChange }) => {
  const handleChange = (campo: keyof IdentificacaoData, valor: string) => {
    onDadosChange({
      ...dados,
      [campo]: valor
    });
  };

  const camposObrigatorios = ['titulo', 'numeroProcesso', 'orgao', 'valorEstimado', 'modalidade', 'dataAbertura', 'dataEntrega'];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="titulo" className="text-sm font-medium">
            Título da Oportunidade *
          </Label>
          <Input
            id="titulo"
            value={dados.titulo}
            onChange={(e) => handleChange('titulo', e.target.value)}
            placeholder="Digite o título da oportunidade"
            className={!dados.titulo ? 'border-red-300 focus:border-red-500' : ''}
          />
          {!dados.titulo && (
            <p className="text-xs text-red-500">Este campo é obrigatório</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="numeroProcesso" className="text-sm font-medium">
            Número do Processo *
          </Label>
          <Input
            id="numeroProcesso"
            value={dados.numeroProcesso}
            onChange={(e) => handleChange('numeroProcesso', e.target.value)}
            placeholder="Ex: 123456/2024"
            className={!dados.numeroProcesso ? 'border-red-300 focus:border-red-500' : ''}
          />
          {!dados.numeroProcesso && (
            <p className="text-xs text-red-500">Este campo é obrigatório</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="orgao" className="text-sm font-medium">
            Órgão Responsável *
          </Label>
          <Select value={dados.orgao} onValueChange={(value) => handleChange('orgao', value)}>
            <SelectTrigger className={!dados.orgao ? 'border-red-300 focus:border-red-500' : ''}>
              <SelectValue placeholder="Selecione o órgão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ministerio-saude">Ministério da Saúde</SelectItem>
              <SelectItem value="ministerio-educacao">Ministério da Educação</SelectItem>
              <SelectItem value="ministerio-defesa">Ministério da Defesa</SelectItem>
              <SelectItem value="ministerio-fazenda">Ministério da Fazenda</SelectItem>
              <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
          </Select>
          {!dados.orgao && (
            <p className="text-xs text-red-500">Este campo é obrigatório</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="valorEstimado" className="text-sm font-medium">
            Valor Estimado (R$) *
          </Label>
          <Input
            id="valorEstimado"
            type="text"
            value={dados.valorEstimado}
            onChange={(e) => handleChange('valorEstimado', e.target.value)}
            placeholder="0,00"
            className={!dados.valorEstimado ? 'border-red-300 focus:border-red-500' : ''}
          />
          {!dados.valorEstimado && (
            <p className="text-xs text-red-500">Este campo é obrigatório</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="modalidade" className="text-sm font-medium">
            Modalidade *
          </Label>
          <Select value={dados.modalidade} onValueChange={(value) => handleChange('modalidade', value)}>
            <SelectTrigger className={!dados.modalidade ? 'border-red-300 focus:border-red-500' : ''}>
              <SelectValue placeholder="Selecione a modalidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pregao-eletronico">Pregão Eletrônico</SelectItem>
              <SelectItem value="pregao-presencial">Pregão Presencial</SelectItem>
              <SelectItem value="concorrencia">Concorrência</SelectItem>
              <SelectItem value="tomada-precos">Tomada de Preços</SelectItem>
              <SelectItem value="convite">Convite</SelectItem>
              <SelectItem value="dispensa">Dispensa</SelectItem>
              <SelectItem value="inexigibilidade">Inexigibilidade</SelectItem>
            </SelectContent>
          </Select>
          {!dados.modalidade && (
            <p className="text-xs text-red-500">Este campo é obrigatório</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="portalCompras" className="text-sm font-medium">
            Portal de Compras
          </Label>
          <Select value={dados.portalCompras} onValueChange={(value) => handleChange('portalCompras', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o portal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comprasnet">ComprasNet</SelectItem>
              <SelectItem value="bbm">BBM</SelectItem>
              <SelectItem value="licitacoes-e">Licitações-e</SelectItem>
              <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dataAbertura" className="text-sm font-medium">
            Data de Abertura *
          </Label>
          <Input
            id="dataAbertura"
            type="date"
            value={dados.dataAbertura}
            onChange={(e) => handleChange('dataAbertura', e.target.value)}
            className={!dados.dataAbertura ? 'border-red-300 focus:border-red-500' : ''}
          />
          {!dados.dataAbertura && (
            <p className="text-xs text-red-500">Este campo é obrigatório</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataEntrega" className="text-sm font-medium">
            Data de Entrega *
          </Label>
          <Input
            id="dataEntrega"
            type="date"
            value={dados.dataEntrega}
            onChange={(e) => handleChange('dataEntrega', e.target.value)}
            className={!dados.dataEntrega ? 'border-red-300 focus:border-red-500' : ''}
          />
          {!dados.dataEntrega && (
            <p className="text-xs text-red-500">Este campo é obrigatório</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="objeto" className="text-sm font-medium">
          Descrição do Objeto
        </Label>
        <Textarea
          id="objeto"
          value={dados.objeto}
          onChange={(e) => handleChange('objeto', e.target.value)}
          placeholder="Descreva detalhadamente o objeto da licitação..."
          rows={4}
        />
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Dica:</span> Campos marcados com * são obrigatórios. 
            Preencha todas as informações com atenção para garantir o correto cadastro da oportunidade.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EtapaIdentificacao;
