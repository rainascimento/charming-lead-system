
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Download,
  FileText,
  TrendingUp,
  Users,
  Mail,
  Phone,
  MapPin,
  Building,
} from 'lucide-react';
import { ClientWithStats, useClientDetail } from '@/hooks/useClients';
import { toast } from 'sonner';

interface ClientDetailModalProps {
  client: ClientWithStats | null;
  isOpen: boolean;
  onClose: () => void;
}

const ClientDetailModal: React.FC<ClientDetailModalProps> = ({
  client,
  isOpen,
  onClose,
}) => {
  const { data: clientDetail, isLoading } = useClientDetail(client?.id || 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleExportPDF = () => {
    toast.success('Exportação para PDF em desenvolvimento');
  };

  const handleExportExcel = () => {
    toast.success('Exportação para Excel em desenvolvimento');
  };

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={client.logo_url} alt={client.nome} />
              <AvatarFallback>{getInitials(client.nome)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xl font-semibold">{client.nome}</div>
              <Badge
                variant={
                  client.status_cliente === 'ativo'
                    ? 'default'
                    : client.status_cliente === 'prospeccao'
                    ? 'secondary'
                    : 'outline'
                }
              >
                {client.status_cliente === 'prospeccao'
                  ? 'Prospecção'
                  : client.status_cliente === 'ativo'
                  ? 'Ativo'
                  : 'Antigo'}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Informações do Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {client.email_contato && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{client.email_contato}</span>
                </div>
              )}
              {client.telefone_contato && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{client.telefone_contato}</span>
                </div>
              )}
              {client.endereco && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{client.endereco}</span>
                </div>
              )}
              {client.cnpj && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">CNPJ: {client.cnpj}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Oportunidades
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {client.quantidade_oportunidades || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Projetos
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {client.quantidade_projetos || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor Global</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(client.valor_global_oportunidades || 0)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Oportunidades */}
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Oportunidades Vinculadas
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleExportPDF}>
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleExportExcel}>
                      <Download className="h-4 w-4 mr-2" />
                      Excel
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {clientDetail?.opportunities && clientDetail.opportunities.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Objeto</TableHead>
                        <TableHead>Número do Processo</TableHead>
                        <TableHead>Data de Abertura</TableHead>
                        <TableHead>Data de Entrega</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientDetail.opportunities.map((opportunity: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {opportunity.objeto || 'N/A'}
                          </TableCell>
                          <TableCell>{opportunity.numero_processo || 'N/A'}</TableCell>
                          <TableCell>
                            {opportunity.data_abertura
                              ? formatDate(opportunity.data_abertura)
                              : 'N/A'}
                          </TableCell>
                          <TableCell>
                            {opportunity.data_entrega
                              ? formatDate(opportunity.data_entrega)
                              : 'N/A'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Ativa</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    Nenhuma oportunidade vinculada a este cliente
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Projetos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Projetos Vinculados
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {clientDetail?.projects && clientDetail.projects.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Projeto</TableHead>
                      <TableHead>UF</TableHead>
                      <TableHead>Valor Global</TableHead>
                      <TableHead>Data de Início</TableHead>
                      <TableHead>Data de Fim</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientDetail.projects.map((project: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {project.nome_projeto || 'N/A'}
                        </TableCell>
                        <TableCell>{project.uf || 'N/A'}</TableCell>
                        <TableCell>
                          {project.valor_global
                            ? formatCurrency(project.valor_global)
                            : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {project.data_inicio
                            ? formatDate(project.data_inicio)
                            : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {project.data_fim ? formatDate(project.data_fim) : 'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  Nenhum projeto vinculado a este cliente
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDetailModal;
