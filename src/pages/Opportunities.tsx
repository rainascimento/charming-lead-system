
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Plus, Search, Eye, Mail, MoreHorizontal, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const pipelineStages = [
  { id: 'leads', name: 'LEADS', count: 0, subtitle: 'Prospecções', color: 'bg-gray-100' },
  { id: 'qualification', name: 'QUALIFICAÇÃO', count: 1, subtitle: 'Prospectados', color: 'bg-blue-100' },
  { id: 'disputa', name: 'DISPUTA', count: 2, subtitle: 'Preparados', color: 'bg-yellow-100' },
  { id: 'decisao', name: 'DECISÃO', count: 3, subtitle: 'Disputados', color: 'bg-orange-100' },
  { id: 'win', name: 'WIN', count: 4, subtitle: 'Vencedores', color: 'bg-green-100' },
];

const mockOpportunities = [
  {
    id: '5089',
    title: 'MPMT-PGI',
    subtitle: 'Alocação de Recursos',
    logo: '/lovable-uploads/a29e9cd8-9052-4b84-99a1-8b801d1cf370.png',
    uf: 'MT',
    valor: 'R$453.077,00',
    dataAbertura: '09 May 2022',
    parecer: { licitacao: 'approved', comercial: 'pending', diretoria: 'pending' },
    status: 'GO',
    diretoria: 'GO'
  },
  {
    id: '5041',
    title: 'SEFAZ',
    subtitle: 'Fábrica de Software',
    logo: '/lovable-uploads/a29e9cd8-9052-4b84-99a1-8b801d1cf370.png',
    uf: 'CE',
    valor: 'R$223.077,50',
    dataAbertura: '19 Nov 2022',
    parecer: { licitacao: 'rejected', comercial: 'rejected', diretoria: 'pending' },
    status: 'NOGO',
    diretoria: 'NOGO'
  },
  {
    id: '5027',
    title: 'DETRAN - AM',
    subtitle: 'Fábrica de Software',
    logo: '/lovable-uploads/a29e9cd8-9052-4b84-99a1-8b801d1cf370.png',
    uf: 'AM',
    valor: 'R$278.778,55',
    dataAbertura: '25 Sep 2022',
    parecer: { licitacao: 'approved', comercial: 'pending', diretoria: 'pending' },
    status: 'ANÁLISE',
    diretoria: 'ANÁLISE'
  },
  {
    id: '5024',
    title: 'SEBRAE',
    subtitle: 'Infraestrutura',
    logo: '/lovable-uploads/a29e9cd8-9052-4b84-99a1-8b801d1cf370.png',
    uf: 'DF',
    valor: 'R$528.578,00',
    dataAbertura: '15 Dec 2022',
    parecer: { licitacao: 'approved', comercial: 'approved', diretoria: 'approved' },
    status: 'GO',
    diretoria: 'GO'
  },
  {
    id: '5020',
    title: 'INEP',
    subtitle: 'Serviços de nuvem',
    logo: '/lovable-uploads/a29e9cd8-9052-4b84-99a1-8b801d1cf370.png',
    uf: 'DF',
    valor: 'R$483.665,00',
    dataAbertura: '09 Jun 2022',
    parecer: { licitacao: 'approved', comercial: 'approved', diretoria: 'approved' },
    status: 'GO',
    diretoria: 'GO'
  },
  {
    id: '5024',
    title: 'AGU',
    subtitle: 'DevOps',
    logo: '/lovable-uploads/a29e9cd8-9052-4b84-99a1-8b801d1cf370.png',
    uf: 'DF',
    valor: 'R$456.778,00',
    dataAbertura: '01 Aug 2022',
    parecer: { licitacao: 'approved', comercial: 'approved', diretoria: 'approved' },
    status: 'GO',
    diretoria: 'GO'
  },
  {
    id: '5027',
    title: 'PETROBRAS',
    subtitle: 'Business Intelligence',
    logo: '/lovable-uploads/a29e9cd8-9052-4b84-99a1-8b801d1cf370.png',
    uf: 'RJ',
    valor: 'R$16.000.878,00',
    dataAbertura: '22 Oct 2022',
    parecer: { licitacao: 'rejected', comercial: 'pending', diretoria: 'pending' },
    status: 'GO',
    diretoria: 'GO'
  },
  {
    id: '5041',
    title: 'BB TEC',
    subtitle: 'Alocação de Recursos',
    logo: '/lovable-uploads/a29e9cd8-9052-4b84-99a1-8b801d1cf370.png',
    uf: 'SP',
    valor: 'R$521.988,00',
    dataAbertura: '23 Sep 2020',
    parecer: { licitacao: 'approved', comercial: 'approved', diretoria: 'approved' },
    status: 'GO',
    diretoria: 'GO'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'GO':
      return 'bg-green-500 text-white';
    case 'NOGO':
      return 'bg-red-500 text-white';
    case 'ANÁLISE':
      return 'bg-yellow-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getParecerIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return '✓';
    case 'rejected':
      return '✗';
    case 'pending':
      return '○';
    default:
      return '○';
  }
};

const getParecerColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'text-green-600';
    case 'rejected':
      return 'text-red-600';
    case 'pending':
      return 'text-gray-400';
    default:
      return 'text-gray-400';
  }
};

export default function Opportunities() {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Pipeline</h1>
        </div>

        {/* Pipeline Stage Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {pipelineStages.map((stage, index) => (
            <div key={stage.id} className="relative">
              <Card className={cn("text-center", stage.color)}>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-gray-900">{stage.count}</div>
                  <div className="font-semibold text-gray-900">{stage.name}</div>
                  <div className="text-sm text-gray-600">{stage.subtitle}</div>
                </CardContent>
              </Card>
              {index < pipelineStages.length - 1 && (
                <ChevronRight className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Select defaultValue="10">
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            
            <Link to="/opportunities/new">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Nova Oportunidade
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar"
                className="pl-10 w-64"
              />
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status do Certame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status do Certame</SelectItem>
                <SelectItem value="go">GO</SelectItem>
                <SelectItem value="nogo">NOGO</SelectItem>
                <SelectItem value="analise">ANÁLISE</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conlicitação
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Órgão
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      UF
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Global
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data de Abertura
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parecer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diretoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockOpportunities.map((opportunity) => (
                    <tr key={opportunity.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link 
                          to={`/opportunities/${opportunity.id}`}
                          className="text-purple-600 hover:text-purple-800 font-medium"
                        >
                          #{opportunity.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Avatar className="w-8 h-8 mr-3">
                            <AvatarImage src={opportunity.logo} />
                            <AvatarFallback>{opportunity.title.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">{opportunity.title}</div>
                            <div className="text-sm text-gray-500">{opportunity.subtitle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {opportunity.uf}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {opportunity.valor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {opportunity.dataAbertura}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <span className={cn("text-lg", getParecerColor(opportunity.parecer.licitacao))}>
                            {getParecerIcon(opportunity.parecer.licitacao)}
                          </span>
                          <span className={cn("text-lg", getParecerColor(opportunity.parecer.comercial))}>
                            {getParecerIcon(opportunity.parecer.comercial)}
                          </span>
                          <span className={cn("text-lg", getParecerColor(opportunity.parecer.diretoria))}>
                            {getParecerIcon(opportunity.parecer.diretoria)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={cn("text-xs font-medium px-2 py-1", getStatusColor(opportunity.diretoria))}>
                          {opportunity.diretoria}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Link to={`/opportunities/${opportunity.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing 1 to 8 of 100 entries
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Layout>
  );
}
