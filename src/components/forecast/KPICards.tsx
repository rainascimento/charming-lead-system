import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, FileText, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { useForecastOverview, usePipelineKpis } from '@/hooks/useForecastAPI';

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

export function KPICards() {
  const { data: overview, isLoading: overviewLoading } = useForecastOverview();
  const { data: pipeline, isLoading: pipelineLoading } = usePipelineKpis();

  const kpis = [
    {
      title: 'Quantidade',
      value: overview?.quantidade?.toString() || '0',
      description: '+2 desde o mês passado',
      icon: FileText,
      loading: overviewLoading
    },
    {
      title: 'Valor Global',
      value: overview ? `R$ ${overview.valorGlobalMi.toFixed(1)} Mi` : 'R$ 0 Mi',
      description: '+12% desde o mês passado',
      icon: DollarSign,
      loading: overviewLoading
    },
    {
      title: 'Em Andamento',
      value: pipeline?.andamento?.toString() || '0',
      description: `${pipeline ? Math.round((pipeline.andamento / pipeline.total) * 100) : 0}% do total`,
      icon: Clock,
      loading: pipelineLoading
    },
    {
      title: 'Finalizadas',
      value: pipeline?.finalizadas?.toString() || '0',
      description: `Taxa de ${pipeline ? Math.round((pipeline.finalizadas / pipeline.total) * 100) : 0}% de sucesso`,
      icon: CheckCircle,
      loading: pipelineLoading
    }
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      {kpis.map((kpi, index) => (
        <motion.div key={kpi.title} variants={item}>
          <Card className="rounded-2xl border bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {kpi.loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ) : (
                <>
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {kpi.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {kpi.description}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}