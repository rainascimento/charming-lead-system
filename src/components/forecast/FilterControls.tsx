import React from 'react';
import { motion } from 'framer-motion';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { X, Filter } from 'lucide-react';
import { useForecastStore } from '@/hooks/useForecastStore';

const focoOptions = ['ESTADUAL', 'FEDERAL', 'MUNICIPAL'];
const regiaoOptions = ['R1', 'R2', 'R3', 'R4'];
const tipoContratacaoOptions = [
  'Selecionar tudo',
  'ADESÃO',
  'ATA',
  'PREGÃO',
  'DISPENSA',
  'CONCORRÊNCIA'
];

export function FilterControls() {
  const { 
    filters, 
    addFilterValue, 
    removeFilterValue, 
    setFilter, 
    clearFilters,
    getActiveFiltersCount 
  } = useForecastStore();

  const handleFocoChange = (value: string[]) => {
    setFilter('foco', value);
  };

  const handleRegiaoChange = (value: string[]) => {
    setFilter('regiao', value);
  };

  const handleTipoContratacaoChange = (tipo: string, checked: boolean) => {
    if (tipo === 'Selecionar tudo') {
      if (checked) {
        setFilter('tipoContratacao', tipoContratacaoOptions.slice(1));
      } else {
        setFilter('tipoContratacao', []);
      }
    } else {
      if (checked) {
        addFilterValue('tipoContratacao', tipo);
      } else {
        removeFilterValue('tipoContratacao', tipo);
      }
    }
  };

  const handleNaturezaChange = (value: string) => {
    setFilter('natureza', value ? value as 'farming' | 'hunting' : null);
  };

  const removeFilter = (key: keyof typeof filters, value?: string) => {
    if (Array.isArray(filters[key]) && value) {
      removeFilterValue(key as any, value);
    } else {
      setFilter(key, Array.isArray(filters[key]) ? [] : null);
    }
  };

  const getActiveFilterChips = () => {
    const chips: Array<{ key: keyof typeof filters; value: string; label: string }> = [];
    
    filters.foco.forEach(value => chips.push({ key: 'foco', value, label: `Foco: ${value}` }));
    filters.regiao.forEach(value => chips.push({ key: 'regiao', value, label: `Região: ${value}` }));
    filters.tipoContratacao.forEach(value => chips.push({ key: 'tipoContratacao', value, label: `Tipo: ${value}` }));
    
    if (filters.natureza) chips.push({ key: 'natureza', value: filters.natureza, label: `Natureza: ${filters.natureza}` });
    if (filters.uf) chips.push({ key: 'uf', value: filters.uf, label: `UF: ${filters.uf}` });
    if (filters.setor) chips.push({ key: 'setor', value: filters.setor, label: `Setor: ${filters.setor}` });
    if (filters.temperatura) chips.push({ key: 'temperatura', value: filters.temperatura, label: `Temp: ${filters.temperatura}` });
    if (filters.estagio) chips.push({ key: 'estagio', value: filters.estagio, label: `Estágio: ${filters.estagio}` });
    
    return chips;
  };

  return (
    <Card className="rounded-2xl border bg-card shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold tracking-tight">Filtros</h2>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="text-xs">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </div>
        {getActiveFiltersCount() > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Limpar filtros
          </Button>
        )}
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Foco Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Filtro por Foco</h3>
          <ToggleGroup 
            type="multiple" 
            value={filters.foco} 
            onValueChange={handleFocoChange}
            className="flex-wrap justify-start"
          >
            {focoOptions.map(option => (
              <ToggleGroupItem 
                key={option} 
                value={option} 
                size="sm"
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {option}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Região Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Filtro por Região</h3>
          <ToggleGroup 
            type="multiple" 
            value={filters.regiao} 
            onValueChange={handleRegiaoChange}
            className="flex-wrap justify-start"
          >
            {regiaoOptions.map(option => (
              <ToggleGroupItem 
                key={option} 
                value={option} 
                size="sm"
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {option}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Natureza Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Filtro por Oportunidades</h3>
          <ToggleGroup 
            type="single" 
            value={filters.natureza || ''} 
            onValueChange={handleNaturezaChange}
            className="flex-wrap justify-start"
          >
            <ToggleGroupItem 
              value="farming" 
              size="sm"
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              FARMING
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="hunting" 
              size="sm"
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              HUNTING
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Tipo Contratação Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Filtro por Tipo de Contratação</h3>
          <div className="space-y-2">
            {tipoContratacaoOptions.map(tipo => (
              <div key={tipo} className="flex items-center space-x-2">
                <Checkbox
                  id={tipo}
                  checked={
                    tipo === 'Selecionar tudo' 
                      ? filters.tipoContratacao.length === tipoContratacaoOptions.length - 1
                      : filters.tipoContratacao.includes(tipo)
                  }
                  onCheckedChange={(checked) => handleTipoContratacaoChange(tipo, !!checked)}
                />
                <label 
                  htmlFor={tipo} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {tipo}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {getActiveFilterChips().length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 pt-4 border-t"
        >
          {getActiveFilterChips().map(({ key, value, label }, index) => (
            <motion.div
              key={`${key}-${value}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Badge 
                variant="secondary" 
                className="text-xs flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20"
              >
                {label}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => removeFilter(key, value)}
                />
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      )}
    </Card>
  );
}