import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useParameters, type ParameterEntity, type Parameter, getEntityFields } from '@/hooks/useParameters';

interface ParameterCRUDProps {
  entity: ParameterEntity;
  title: string;
}

export const ParameterCRUD: React.FC<ParameterCRUDProps> = ({ entity, title }) => {
  const { getParameters, createParameter, updateParameter, deleteParameter, isLoading } = useParameters();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingParameter, setEditingParameter] = useState<Parameter | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const parameters = getParameters(entity);
  const fields = getEntityFields(entity);

  const handleCreate = async () => {
    try {
      await createParameter(entity, formData);
      toast({
        title: "Sucesso",
        description: "Parâmetro criado com sucesso!",
      });
      setIsCreateDialogOpen(false);
      setFormData({});
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar parâmetro",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async () => {
    if (!editingParameter) return;
    
    try {
      await updateParameter(entity, editingParameter.id, formData);
      toast({
        title: "Sucesso",
        description: "Parâmetro atualizado com sucesso!",
      });
      setIsEditDialogOpen(false);
      setEditingParameter(null);
      setFormData({});
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar parâmetro",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este parâmetro?')) return;
    
    try {
      await deleteParameter(entity, id);
      toast({
        title: "Sucesso",
        description: "Parâmetro excluído com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir parâmetro",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (parameter: Parameter) => {
    setEditingParameter(parameter);
    const initialData: Record<string, string> = {};
    fields.forEach(field => {
      initialData[field] = (parameter as any)[field] || '';
    });
    setFormData(initialData);
    setIsEditDialogOpen(true);
  };

  const getFieldLabel = (field: string): string => {
    const labels: Record<string, string> = {
      nome: 'Nome',
      url: 'URL',
      sigla: 'Sigla',
      descricao: 'Descrição'
    };
    return labels[field] || field;
  };

  const renderTableHeaders = () => {
    return (
      <TableRow>
        {fields.map(field => (
          <TableHead key={field}>{getFieldLabel(field)}</TableHead>
        ))}
        <TableHead className="w-[100px]">Ações</TableHead>
      </TableRow>
    );
  };

  const renderTableRow = (parameter: Parameter) => {
    return (
      <TableRow key={parameter.id}>
        {fields.map(field => (
          <TableCell key={field} className="font-medium">
            {(parameter as any)[field]}
          </TableCell>
        ))}
        <TableCell>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => openEditDialog(parameter)}
              disabled={isLoading}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleDelete(parameter.id)}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  const renderFormFields = () => {
    return fields.map(field => (
      <div key={field} className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={field} className="text-right">
          {getFieldLabel(field)}
        </Label>
        <Input
          id={field}
          value={formData[field] || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
          className="col-span-3"
          type={field === 'url' ? 'url' : 'text'}
          placeholder={field === 'url' ? 'https://exemplo.com' : `Digite o ${getFieldLabel(field).toLowerCase()}`}
        />
      </div>
    ));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar {title}</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar um novo item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {renderFormFields()}
            </div>
            <DialogFooter>
              <Button onClick={handleCreate} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Criar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {renderTableHeaders()}
          </TableHeader>
          <TableBody>
            {parameters.map(parameter => renderTableRow(parameter))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar {title}</DialogTitle>
            <DialogDescription>
              Altere os campos que deseja atualizar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {renderFormFields()}
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Atualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};