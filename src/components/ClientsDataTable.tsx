
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { ClientWithStats } from '@/hooks/useClients';

interface ClientsDataTableProps {
  clients: ClientWithStats[];
  searchTerm: string;
  onClientClick: (client: ClientWithStats) => void;
  isLoading: boolean;
}

type SortField = 'nome' | 'quantidade_oportunidades' | 'quantidade_projetos' | 'valor_global_oportunidades';
type SortDirection = 'asc' | 'desc';

const ClientsDataTable: React.FC<ClientsDataTableProps> = ({
  clients,
  searchTerm,
  onClientClick,
  isLoading,
}) => {
  const [sortField, setSortField] = useState<SortField>('nome');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients.filter((client) =>
      client.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [clients, searchTerm, sortField, sortDirection]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (filteredAndSortedClients.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            {searchTerm
              ? `Nenhum cliente encontrado para "${searchTerm}"`
              : 'Nenhum cliente encontrado nesta categoria'}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('nome')}
                  className="flex items-center gap-2 hover:bg-transparent p-0"
                >
                  Cliente
                  {getSortIcon('nome')}
                </Button>
              </TableHead>
              <TableHead className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('quantidade_oportunidades')}
                  className="flex items-center gap-2 hover:bg-transparent p-0"
                >
                  Oportunidades
                  {getSortIcon('quantidade_oportunidades')}
                </Button>
              </TableHead>
              <TableHead className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('quantidade_projetos')}
                  className="flex items-center gap-2 hover:bg-transparent p-0"
                >
                  Projetos
                  {getSortIcon('quantidade_projetos')}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('valor_global_oportunidades')}
                  className="flex items-center gap-2 hover:bg-transparent p-0 ml-auto"
                >
                  Valor Global
                  {getSortIcon('valor_global_oportunidades')}
                </Button>
              </TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedClients.map((client) => (
              <TableRow
                key={client.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onClientClick(client)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={client.logo_url} alt={client.nome} />
                      <AvatarFallback>{getInitials(client.nome)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{client.nome}</div>
                      <div className="text-sm text-muted-foreground">
                        {client.email_contato}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">
                    {client.quantidade_oportunidades || 0}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">
                    {client.quantidade_projetos || 0}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(client.valor_global_oportunidades || 0)}
                </TableCell>
                <TableCell className="text-center">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientsDataTable;
