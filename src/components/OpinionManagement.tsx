
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, User, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { toast } from "sonner";

interface Opinion {
  id: string;
  type: 'licitacao' | 'pre-vendas' | 'negocios' | 'diretoria';
  decision: 'favoravel' | 'nao-favoravel' | 'pendente';
  reason: string;
  status: 'pronto' | 'pendente' | 'em-analise';
  observations: string;
  swot: {
    strengths: string;
    weaknesses: string;
    opportunities: string;
    threats: string;
  };
  responsible: {
    name: string;
    email: string;
    phone: string;
    position: string;
    organization: string;
    location: string;
    language: string;
    avatar?: string;
  };
  history: Array<{
    date: string;
    action: string;
    user: string;
    status: string;
  }>;
  lastUpdated: string;
}

const opinionTypes = [
  { id: 'licitacao', name: 'Licitação', icon: '📋' },
  { id: 'pre-vendas', name: 'Pré-vendas', icon: '💼' },
  { id: 'negocios', name: 'Negócios', icon: '📈' },
  { id: 'diretoria', name: 'Diretoria', icon: '👔' }
];

const reasons = [
  'Valor adequado ao mercado',
  'Experiência técnica suficiente',
  'Capacidade de entrega confirmada',
  'Riscos técnicos baixos',
  'Margem de lucro adequada',
  'Prazo viável',
  'Equipe disponível',
  'Valor abaixo do esperado',
  'Complexidade técnica alta',
  'Prazo inadequado',
  'Recursos insuficientes',
  'Riscos elevados'
];

export default function OpinionManagement() {
  const [selectedType, setSelectedType] = useState<string>('licitacao');
  const [opinions, setOpinions] = useState<Opinion[]>([
    {
      id: '1',
      type: 'licitacao',
      decision: 'favoravel',
      reason: 'Valor adequado ao mercado',
      status: 'pronto',
      observations: 'Análise jurídica aprovada. Todos os documentos estão em conformidade.',
      swot: {
        strengths: 'Experiência comprovada em projetos similares',
        weaknesses: 'Equipe limitada para este porte de projeto',
        opportunities: 'Possibilidade de contratos futuros com o órgão',
        threats: 'Concorrência acirrada com empresas maiores'
      },
      responsible: {
        name: 'Ana Silva',
        email: 'ana.silva@empresa.com',
        phone: '(11) 9999-9999',
        position: 'Analista Jurídica',
        organization: 'Área Jurídica',
        location: 'São Paulo, SP',
        language: 'Português',
        avatar: ''
      },
      history: [
        {
          date: '2024-01-15 10:30',
          action: 'Parecer criado',
          user: 'Ana Silva',
          status: 'pendente'
        },
        {
          date: '2024-01-16 14:20',
          action: 'Parecer finalizado',
          user: 'Ana Silva',
          status: 'pronto'
        }
      ],
      lastUpdated: '2024-01-16'
    }
  ]);

  const [currentOpinion, setCurrentOpinion] = useState<Opinion | null>(null);

  const getOpinionByType = (type: string) => {
    return opinions.find(opinion => opinion.type === type);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pronto':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pendente':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'em-analise':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'favoravel':
        return 'bg-green-500';
      case 'nao-favoravel':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const createOrUpdateOpinion = (type: string, data: Partial<Opinion>) => {
    const existingOpinion = getOpinionByType(type);
    const now = new Date().toISOString();
    const user = 'Usuário Atual';

    if (existingOpinion) {
      const updatedOpinion = {
        ...existingOpinion,
        ...data,
        lastUpdated: now.split('T')[0],
        history: [
          ...existingOpinion.history,
          {
            date: now.split('T')[0] + ' ' + now.split('T')[1].substring(0, 5),
            action: 'Parecer atualizado',
            user,
            status: data.status || existingOpinion.status
          }
        ]
      };
      setOpinions(opinions.map(op => op.id === existingOpinion.id ? updatedOpinion : op));
    } else {
      const newOpinion: Opinion = {
        id: Date.now().toString(),
        type: type as any,
        decision: data.decision || 'pendente',
        reason: data.reason || '',
        status: data.status || 'pendente',
        observations: data.observations || '',
        swot: data.swot || { strengths: '', weaknesses: '', opportunities: '', threats: '' },
        responsible: data.responsible || {
          name: user,
          email: 'usuario@empresa.com',
          phone: '(11) 0000-0000',
          position: 'Analista',
          organization: 'Área Responsável',
          location: 'São Paulo, SP',
          language: 'Português'
        },
        history: [{
          date: now.split('T')[0] + ' ' + now.split('T')[1].substring(0, 5),
          action: 'Parecer criado',
          user,
          status: data.status || 'pendente'
        }],
        lastUpdated: now.split('T')[0]
      };
      setOpinions([...opinions, newOpinion]);
    }
    toast.success('Parecer salvo com sucesso!');
  };

  const OpinionForm = ({ type }: { type: string }) => {
    const opinion = getOpinionByType(type);
    const [formData, setFormData] = useState({
      decision: opinion?.decision || 'pendente',
      reason: opinion?.reason || '',
      status: opinion?.status || 'pendente',
      observations: opinion?.observations || '',
      swot: opinion?.swot || { strengths: '', weaknesses: '', opportunities: '', threats: '' }
    });

    const handleSave = () => {
      createOrUpdateOpinion(type, formData);
    };

    return (
      <div className="space-y-6">
        {/* Responsible Info */}
        {opinion && (
          <Card>
            <CardHeader>
              <CardTitle>Responsável pelo Parecer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={opinion.responsible.avatar} />
                  <AvatarFallback>{opinion.responsible.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{opinion.responsible.name}</h3>
                  <p className="text-gray-600">{opinion.responsible.position}</p>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{opinion.responsible.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{opinion.responsible.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{opinion.responsible.organization}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{opinion.responsible.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span>{opinion.responsible.language}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Opinion Form */}
        <Card>
          <CardHeader>
            <CardTitle>Parecer - {opinionTypes.find(t => t.id === type)?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="decision">Decisão</Label>
                <Select value={formData.decision} onValueChange={(value) => setFormData({...formData, decision: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="favoravel">Favorável</SelectItem>
                    <SelectItem value="nao-favoravel">Não Favorável</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="reason">Motivo</Label>
                <Select value={formData.reason} onValueChange={(value) => setFormData({...formData, reason: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    {reasons.map(reason => (
                      <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pronto">Pronto</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="em-analise">Em Análise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                value={formData.observations}
                onChange={(e) => setFormData({...formData, observations: e.target.value})}
                placeholder="Observações detalhadas sobre o parecer..."
                className="min-h-[100px]"
              />
            </div>

            {/* SWOT Analysis */}
            <div>
              <Label>Análise SWOT (Opcional)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="strengths" className="text-green-600 font-medium">Forças (S)</Label>
                  <Textarea
                    id="strengths"
                    value={formData.swot.strengths}
                    onChange={(e) => setFormData({
                      ...formData, 
                      swot: {...formData.swot, strengths: e.target.value}
                    })}
                    placeholder="Pontos fortes da oportunidade..."
                    className="border-green-200"
                  />
                </div>
                <div>
                  <Label htmlFor="weaknesses" className="text-red-600 font-medium">Fraquezas (W)</Label>
                  <Textarea
                    id="weaknesses"
                    value={formData.swot.weaknesses}
                    onChange={(e) => setFormData({
                      ...formData, 
                      swot: {...formData.swot, weaknesses: e.target.value}
                    })}
                    placeholder="Pontos fracos ou limitações..."
                    className="border-red-200"
                  />
                </div>
                <div>
                  <Label htmlFor="opportunities" className="text-blue-600 font-medium">Oportunidades (O)</Label>
                  <Textarea
                    id="opportunities"
                    value={formData.swot.opportunities}
                    onChange={(e) => setFormData({
                      ...formData, 
                      swot: {...formData.swot, opportunities: e.target.value}
                    })}
                    placeholder="Oportunidades identificadas..."
                    className="border-blue-200"
                  />
                </div>
                <div>
                  <Label htmlFor="threats" className="text-orange-600 font-medium">Ameaças (T)</Label>
                  <Textarea
                    id="threats"
                    value={formData.swot.threats}
                    onChange={(e) => setFormData({
                      ...formData, 
                      swot: {...formData.swot, threats: e.target.value}
                    })}
                    placeholder="Ameaças e riscos..."
                    className="border-orange-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={handleSave}>Salvar Parecer</Button>
            </div>
          </CardContent>
        </Card>

        {/* History */}
        {opinion && opinion.history.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Alterações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opinion.history.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-4 pb-4 border-b last:border-b-0">
                    {getStatusIcon(entry.status)}
                    <div className="flex-1">
                      <p className="font-medium">{entry.action}</p>
                      <p className="text-sm text-gray-500">
                        Por {entry.user} em {entry.date}
                      </p>
                    </div>
                    <Badge variant="outline">{entry.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {opinionTypes.map((type) => {
          const opinion = getOpinionByType(type.id);
          return (
            <Card key={type.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedType(type.id)}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl">{type.icon}</p>
                    <p className="font-semibold">{type.name}</p>
                  </div>
                  <div className="text-right">
                    {opinion ? (
                      <>
                        {getStatusIcon(opinion.status)}
                        <Badge className={`mt-2 text-white ${getDecisionColor(opinion.decision)}`}>
                          {opinion.decision === 'favoravel' ? 'Favorável' : 
                           opinion.decision === 'nao-favoravel' ? 'Não Favorável' : 'Pendente'}
                        </Badge>
                      </>
                    ) : (
                      <Badge variant="outline">Não iniciado</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs for each opinion type */}
      <Tabs value={selectedType} onValueChange={setSelectedType}>
        <TabsList className="grid w-full grid-cols-4">
          {opinionTypes.map((type) => (
            <TabsTrigger key={type.id} value={type.id}>
              {type.icon} {type.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {opinionTypes.map((type) => (
          <TabsContent key={type.id} value={type.id}>
            <OpinionForm type={type.id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
