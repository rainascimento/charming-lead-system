
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockOpportunities = [
  {
    id: 1,
    title: "Pregão Eletrônico nº 001/2024 - Sistema de Gestão",
    organ: "Ministério da Educação",
    uasg: "154789",
    status: "Em Andamento",
    value: "R$ 2.500.000,00",
    deadline: "2024-01-15",
    modality: "Pregão Eletrônico",
    category: ["CAS", "CLOUD"]
  },
  {
    id: 2,
    title: "Pregão Eletrônico nº 002/2024 - Infraestrutura Cloud",
    organ: "Tribunal de Justiça",
    uasg: "158234",
    status: "Análise",
    value: "R$ 1.800.000,00",
    deadline: "2024-01-20",
    modality: "Pregão Eletrônico",
    category: ["CLOUD", "INOV"]
  },
  {
    id: 3,
    title: "Pregão Eletrônico nº 003/2024 - Licenças de Software",
    organ: "Prefeitura Municipal",
    uasg: "147852",
    status: "Finalizado",
    value: "R$ 850.000,00",
    deadline: "2024-01-10",
    modality: "Pregão Eletrônico",
    category: ["CDS", "BI"]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Em Andamento':
      return 'bg-blue-500';
    case 'Análise':
      return 'bg-yellow-500';
    case 'Finalizado':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export default function Opportunities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOpportunities = mockOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.organ.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || opportunity.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Oportunidades</h1>
            <p className="text-muted-foreground">Gerencie todas as oportunidades de licitação</p>
          </div>
          <Link to="/opportunities/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Oportunidade
            </Button>
          </Link>
        </div>

        {/* Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por título ou órgão..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Análise">Análise</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros Avançados
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Oportunidades */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Oportunidades ({filteredOpportunities.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Oportunidade</TableHead>
                  <TableHead>Órgão</TableHead>
                  <TableHead>UASG</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Modalidade</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Categorias</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOpportunities.map((opportunity) => (
                  <TableRow key={opportunity.id}>
                    <TableCell>
                      <Link to={`/opportunities/${opportunity.id}`} className="font-medium hover:underline">
                        {opportunity.title}
                      </Link>
                    </TableCell>
                    <TableCell>{opportunity.organ}</TableCell>
                    <TableCell>{opportunity.uasg}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(opportunity.status)}>
                        {opportunity.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{opportunity.modality}</TableCell>
                    <TableCell>{new Date(opportunity.deadline).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{opportunity.value}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {opportunity.category.map((cat, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/opportunities/${opportunity.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
