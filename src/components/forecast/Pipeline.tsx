import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { usePipelineEstagios, useOportunidadesRecentes } from '@/hooks/useForecastAPI';
import { useForecastStore } from '@/hooks/useForecastStore';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'em andamento':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'análise':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'finalizado':
      return 'bg-green-500 hover:bg-green-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
}

function getPriorityColor(prioridade: number) {
  switch (prioridade) {
    case 1:
      return 'bg-red-500';
    case 2:
      return 'bg-orange-500';
    case 3:
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

export function Pipeline() {
  const { data: estagios, isLoading: estagiosLoading } = usePipelineEstagios();
  const { data: oportunidades, isLoading: oportunidadesLoading } = useOportunidadesRecentes();
  const { setFilter } = useForecastStore();

  const totalOportunidades = estagios?.reduce((sum, estagio) => sum + estagio.quantidade, 0) || 0;

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="col-span-12 grid lg:grid-cols-2 gap-6"
    >
      {/* Pipeline */}
      <motion.div variants={item}>
        <Card className="rounded-2xl border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight">Pipeline de Vendas</CardTitle>
            <CardDescription>Progresso das oportunidades por estágio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {estagiosLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              estagios?.map((estagio, index) => {
                const percentage = totalOportunidades > 0 ? (estagio.quantidade / totalOportunidades) * 100 : 0;
                
                return (
                  <motion.div
                    key={estagio.nome}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span 
                        className="cursor-pointer hover:text-primary transition-colors"
                        onClick={() => setFilter('estagio', estagio.nome)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setFilter('estagio', estagio.nome);
                          }
                        }}
                      >
                        {estagio.nome}
                      </span>
                      <span className="text-muted-foreground">
                        {estagio.quantidade} oportunidades
                      </span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2"
                      aria-label={`${estagio.nome}: ${percentage.toFixed(1)}%`}
                    />
                  </motion.div>
                );
              })
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Oportunidades Recentes */}
      <motion.div variants={item}>
        <Card className="rounded-2xl border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight">Oportunidades Recentes</CardTitle>
            <CardDescription>Lista das últimas oportunidades cadastradas</CardDescription>
          </CardHeader>
          <CardContent>
            {oportunidadesLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-2 p-4 border rounded-lg">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {oportunidades?.items.map((oportunidade, index) => (
                  <motion.div
                    key={oportunidade.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => {
                      // Navigate to opportunity detail
                      window.location.href = `/opportunities/${oportunidade.id}`;
                    }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium text-sm hover:text-primary transition-colors">
                            {oportunidade.titulo}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {oportunidade.orgao}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className={`w-2 h-2 rounded-full ${getPriorityColor(oportunidade.prioridade)}`}
                            title={`Prioridade ${oportunidade.prioridade}`}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getStatusColor(oportunidade.status)}`}
                          >
                            {oportunidade.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {oportunidade.estagio}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-primary">
                          R$ {oportunidade.valorMi.toFixed(1)} Mi
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}