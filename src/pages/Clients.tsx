
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Users, TrendingUp, FileText, Download } from 'lucide-react';
import { useClients, ClientWithStats } from '@/hooks/useClients';
import ClientsDataTable from '@/components/ClientsDataTable';
import ClientDetailModal from '@/components/ClientDetailModal';

const Clients = () => {
  const [activeTab, setActiveTab] = useState('prospeccao');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientWithStats | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { clients: prospeccaoClients, isLoading: loadingProspeccao } = useClients('prospeccao');
  const { clients: ativosClients, isLoading: loadingAtivos } = useClients('ativo');
  const { clients: antigosClients, isLoading: loadingAntigos } = useClients('antigo');

  const handleClientClick = (client: ClientWithStats) => {
    setSelectedClient(client);
    setIsDetailModalOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'prospeccao':
        return 'secondary';
      case 'ativo':
        return 'default';
      case 'antigo':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'prospeccao':
        return 'Prospecção';
      case 'ativo':
        return 'Ativo';
      case 'antigo':
        return 'Antigo';
      default:
        return status;
    }
  };

  const getTabStats = (clients: ClientWithStats[]) => {
    return {
      total: clients.length,
      totalValue: clients.reduce((sum, client) => sum + (client.valor_global_oportunidades || 0), 0),
      totalOpportunities: clients.reduce((sum, client) => sum + (client.quantidade_oportunidades || 0), 0),
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestão de Clientes</h1>
            <p className="text-muted-foreground">
              Gerencie e acompanhe seus clientes por categoria
            </p>
          </div>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-sm"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prospeccao" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Prospecção ({prospeccaoClients.length})
            </TabsTrigger>
            <TabsTrigger value="ativo" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Ativos ({ativosClients.length})
            </TabsTrigger>
            <TabsTrigger value="antigo" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Antigos ({antigosClients.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prospeccao" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(() => {
                const stats = getTabStats(prospeccaoClients);
                return (
                  <>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Valor Global</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.totalOpportunities}</div>
                      </CardContent>
                    </Card>
                  </>
                );
              })()}
            </div>
            
            <ClientsDataTable
              clients={prospeccaoClients}
              searchTerm={searchTerm}
              onClientClick={handleClientClick}
              isLoading={loadingProspeccao}
            />
          </TabsContent>

          <TabsContent value="ativo" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(() => {
                const stats = getTabStats(ativosClients);
                return (
                  <>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Valor Global</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.totalOpportunities}</div>
                      </CardContent>
                    </Card>
                  </>
                );
              })()}
            </div>

            <ClientsDataTable
              clients={ativosClients}
              searchTerm={searchTerm}
              onClientClick={handleClientClick}
              isLoading={loadingAtivos}
            />
          </TabsContent>

          <TabsContent value="antigo" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(() => {
                const stats = getTabStats(antigosClients);
                return (
                  <>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Valor Global</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.totalOpportunities}</div>
                      </CardContent>
                    </Card>
                  </>
                );
              })()}
            </div>

            <ClientsDataTable
              clients={antigosClients}
              searchTerm={searchTerm}
              onClientClick={handleClientClick}
              isLoading={loadingAntigos}
            />
          </TabsContent>
        </Tabs>

        <ClientDetailModal
          client={selectedClient}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedClient(null);
          }}
        />
      </div>
    </Layout>
  );
};

export default Clients;
