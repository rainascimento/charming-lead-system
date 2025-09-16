import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useForecastUf, useForecastFocus, useForecastSetores, useForecastTemperatura } from '@/hooks/useForecastAPI';
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

function HorizontalBarChart({ data, title, isLoading, onBarClick }: {
  data: Array<{ uf?: string; setor?: string; valorMi: number }>;
  title: string;
  isLoading: boolean;
  onBarClick?: (value: string) => void;
}) {
  if (isLoading) {
    return (
      <Card className="rounded-2xl border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-6 flex-1" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const maxValue = Math.max(...data.map(d => d.valorMi));

  return (
    <Card className="rounded-2xl border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((item, index) => {
          const label = item.uf || item.setor || '';
          const percentage = (item.valorMi / maxValue) * 100;
          
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 text-sm font-medium text-muted-foreground">
                {label}
              </div>
              <div className="flex-1 relative">
                <div 
                  className="h-6 bg-primary rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ width: `${percentage}%` }}
                  onClick={() => onBarClick && onBarClick(label)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${label}: R$ ${item.valorMi.toFixed(1)} Mi`}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && onBarClick) {
                      onBarClick(label);
                    }
                  }}
                />
              </div>
              <div className="w-16 text-sm text-right text-muted-foreground">
                {item.valorMi.toFixed(1)} Mi
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function ColumnChart({ data, title, isLoading, onColumnClick }: {
  data: Record<string, number>;
  title: string;
  isLoading: boolean;
  onColumnClick?: (key: string) => void;
}) {
  if (isLoading) {
    return (
      <Card className="rounded-2xl border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end space-x-4 h-40">
            {[1, 2].map(i => (
              <div key={i} className="flex-1 flex flex-col items-center space-y-2">
                <Skeleton className="w-full h-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxValue = Math.max(...Object.values(data));
  const entries = Object.entries(data);

  return (
    <Card className="rounded-2xl border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end space-x-4 h-40">
          {entries.map(([key, value], index) => {
            const percentage = (value / maxValue) * 100;
            const colors = ['hsl(var(--primary))', 'hsl(var(--chart-2))'];
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 flex flex-col items-center space-y-2"
              >
                <div
                  className="w-full rounded-t-sm cursor-pointer hover:opacity-80 transition-opacity flex items-end justify-center text-xs font-medium text-white p-2"
                  style={{ 
                    height: `${percentage}%`,
                    backgroundColor: colors[index % colors.length],
                    minHeight: '20px'
                  }}
                  onClick={() => onColumnClick && onColumnClick(key)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${key}: R$ ${value.toFixed(1)} Mi`}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && onColumnClick) {
                      onColumnClick(key);
                    }
                  }}
                >
                  {value.toFixed(1)} Mi
                </div>
                <div className="text-sm text-center text-muted-foreground">
                  {key}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function Charts() {
  const { data: ufData, isLoading: ufLoading } = useForecastUf();
  const { data: focusData, isLoading: focusLoading } = useForecastFocus();
  const { data: setoresData, isLoading: setoresLoading } = useForecastSetores();
  const { data: temperaturaData, isLoading: temperaturaLoading } = useForecastTemperatura();
  const { setFilter } = useForecastStore();

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="col-span-12 lg:col-span-5 space-y-6"
    >
      <motion.div variants={item}>
        <HorizontalBarChart
          data={ufData || []}
          title="Valor por UF"
          isLoading={ufLoading}
          onBarClick={(uf) => setFilter('uf', uf)}
        />
      </motion.div>

      <motion.div variants={item}>
        <ColumnChart
          data={focusData || {}}
          title="Valor por Foco"
          isLoading={focusLoading}
          onColumnClick={(foco) => setFilter('foco', [foco])}
        />
      </motion.div>

      <motion.div variants={item}>
        <HorizontalBarChart
          data={setoresData || []}
          title="Valor por SETORES"
          isLoading={setoresLoading}
          onBarClick={(setor) => setFilter('setor', setor)}
        />
      </motion.div>

      <motion.div variants={item}>
        <ColumnChart
          data={temperaturaData || {}}
          title="PROJETO por TEMPERATURA"
          isLoading={temperaturaLoading}
          onColumnClick={(temperatura) => setFilter('temperatura', temperatura)}
        />
      </motion.div>
    </motion.div>
  );
}