import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import LotsAndItems from '@/components/LotsAndItems';
import DocumentUpload from '@/components/DocumentUpload';
import OpinionManagement from '@/components/OpinionManagement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Save, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export default function OpportunityDetail() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - em um app real, isso viria de uma API
  const opportunity = {
    id: 1,
    title: "Pregão Eletrônico nº 001/2024 - Sistema de Gestão",
    organ: "Ministério da Educação",
    uasg: "154789",
    status: "Em Andamento",
    processNumber: "23000.001234/2024-45",
    modality: "Pregão Eletrônico",
    value: "R$ 2.500.000,00",
    monthlyValue: "R$ 208.333,33",
    deadline: "2024-01-15",
    publicationDate: "2023-12-15",
    portal: "Comprasnet",
    uf: "DF",
    categories: ["CAS", "CLOUD", "INOV"]
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{opportunity.title}</h1>
            <p className="text-muted-foreground">{opportunity.organ} - {opportunity.uf}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="mr-2 h-4 w-4" />
              {isEditing ? 'Cancelar' : 'Editar'}
            </Button>
            {isEditing && (
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="identification" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="identification">Identificação</TabsTrigger>
            <TabsTrigger value="object">Objeto</TabsTrigger>
            <TabsTrigger value="lots">Lotes/Itens</TabsTrigger>
            <TabsTrigger value="categorization">Categorização</TabsTrigger>
            <TabsTrigger value="opinions">Pareceres</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="intelligence">Inteligência</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          {/* Aba Identificação */}
          <TabsContent value="identification">
            <Card>
              <CardHeader>
                <CardTitle>Dados Básicos da Oportunidade</CardTitle>
                <CardDescription>Informações gerais do processo licitatório</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="organ">Órgão</Label>
                      <Input
                        id="organ"
                        defaultValue={opportunity.organ}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="uasg">UASG</Label>
                      <Input
                        id="uasg"
                        defaultValue={opportunity.uasg}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="processNumber">Número do Processo</Label>
                      <Input
                        id="processNumber"
                        defaultValue={opportunity.processNumber}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="modality">Modalidade</Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue placeholder={opportunity.modality} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pregao-eletronico">Pregão Eletrônico</SelectItem>
                          <SelectItem value="pregao-presencial">Pregão Presencial</SelectItem>
                          <SelectItem value="concorrencia">Concorrência</SelectItem>
                          <SelectItem value="tomada-precos">Tomada de Preços</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Badge variant="secondary" className="bg-blue-500 text-white block w-fit">
                        {opportunity.status}
                      </Badge>
                    </div>

                    <div>
                      <Label htmlFor="publicationDate">Data de Publicação</Label>
                      <Input
                        id="publicationDate"
                        type="date"
                        defaultValue="2023-12-15"
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="deadline">Prazo Final</Label>
                      <Input
                        id="deadline"
                        type="datetime-local"
                        defaultValue="2024-01-15T14:00"
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="portal">Portal de Compras</Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue placeholder={opportunity.portal} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comprasnet">Comprasnet</SelectItem>
                          <SelectItem value="licitacoes-e">Licitações-e</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Objeto da Licitação */}
          <TabsContent value="object">
            <Card>
              <CardHeader>
                <CardTitle>Objeto da Licitação</CardTitle>
                <CardDescription>Descrição geral do objeto licitado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="objectDescription">Descrição do Objeto</Label>
                  <Textarea
                    id="objectDescription"
                    placeholder="Descreva o objeto da licitação..."
                    disabled={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                    defaultValue="Contratação de empresa especializada para desenvolvimento, implementação e manutenção de sistema de gestão integrado."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nova Aba Lotes e Itens */}
          <TabsContent value="lots">
            <LotsAndItems />
          </TabsContent>

          {/* Aba Categorização */}
          <TabsContent value="categorization">
            <Card>
              <CardHeader>
                <CardTitle>Categorização da Oportunidade</CardTitle>
                <CardDescription>Classificação e parâmetros da oportunidade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Categorias Técnicas</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['CAS', 'CDS', 'CLOUD', 'INOV', 'BI', 'MOBILE', 'WEB'].map((category) => (
                      <Badge
                        key={category}
                        variant={opportunity.categories.includes(category) ? "default" : "outline"}
                        className="cursor-pointer"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sphere">Esfera</Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a esfera" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="federal">Federal</SelectItem>
                          <SelectItem value="estadual">Estadual</SelectItem>
                          <SelectItem value="municipal">Municipal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="market">Mercado</Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o mercado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="educacao">Educação</SelectItem>
                          <SelectItem value="saude">Saúde</SelectItem>
                          <SelectItem value="justica">Justiça</SelectItem>
                          <SelectItem value="seguranca">Segurança</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sector">Setor</Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o setor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="publico">Público</SelectItem>
                          <SelectItem value="privado">Privado</SelectItem>
                          <SelectItem value="misto">Misto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="contractModel">Modelo de Contratação</Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o modelo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fabrica">Fábrica de Software</SelectItem>
                          <SelectItem value="produto">Produto</SelectItem>
                          <SelectItem value="consultoria">Consultoria</SelectItem>
                          <SelectItem value="manutencao">Manutenção</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Pareceres Atualizada */}
          <TabsContent value="opinions">
            <OpinionManagement />
          </TabsContent>

          {/* Nova Aba Documentos */}
          <TabsContent value="documents">
            <DocumentUpload />
          </TabsContent>

          {/* Aba Inteligência */}
          <TabsContent value="intelligence">
            <Card>
              <CardHeader>
                <CardTitle>Inteligência de Negócios</CardTitle>
                <CardDescription>Dados estratégicos e análise competitiva</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="winner">Vencedor (se finalizado)</Label>
                      <Input
                        id="winner"
                        placeholder="Razão social do vencedor"
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="cnpj">CNPJ do Vencedor</Label>
                      <Input
                        id="cnpj"
                        placeholder="00.000.000/0000-00"
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="bidValue">Valor do Lance Vencedor</Label>
                      <Input
                        id="bidValue"
                        placeholder="R$ 0,00"
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="participants">Número de Participantes</Label>
                      <Input
                        id="participants"
                        placeholder="0"
                        type="number"
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="companyPosition">Posição da Empresa</Label>
                      <Input
                        id="companyPosition"
                        placeholder="Ex: 2º lugar"
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="adjudicatedValue">Valor Adjudicado</Label>
                      <Input
                        id="adjudicatedValue"
                        placeholder="R$ 0,00"
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="reduction">Redução (%)</Label>
                      <Input
                        id="reduction"
                        placeholder="0%"
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor="sharedFolder">Pasta de Arquivos Compartilhados</Label>
                      <Input
                        id="sharedFolder"
                        placeholder="Link ou caminho da pasta"
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Timeline */}
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Linha do Tempo</CardTitle>
                <CardDescription>Histórico de atividades e marcos importantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Oportunidade cadastrada</h4>
                        <span className="text-xs text-muted-foreground">15/12/2023 14:30</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Por: Admin - Sistema</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Parecer técnico aprovado</h4>
                        <span className="text-xs text-muted-foreground">16/12/2023 09:15</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Por: João Silva - Área Técnica</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Questionamento enviado</h4>
                        <span className="text-xs text-muted-foreground">17/12/2023 11:00</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Por: Maria Santos - Pré-vendas</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Documentos anexados</h4>
                        <span className="text-xs text-muted-foreground">18/12/2023 16:45</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Por: Carlos Oliveira - Documentação</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
