import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useForecastMapa } from '@/hooks/useForecastAPI';
import { useForecastStore } from '@/hooks/useForecastStore';

// GeoJSON topology for Brazil states (simplified)
const geoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

interface TooltipData {
  uf: string;
  valorTotalMi: number;
  qtdOportunidades: number;
  foco: { ESTADUAL: number; MUNICIPAL: number };
  setoresTop3: Array<{ nome: string; valorMi: number }>;
  temperatura: { FRIA: number; QUENTE: number; MORNA: number };
  tiposContratacao: string[];
  linkLista: string;
}

interface TooltipProps {
  data: TooltipData;
  position: { x: number; y: number };
  onClose: () => void;
}

function MapTooltip({ data, position, onClose }: TooltipProps) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          position: 'fixed',
          left: position.x + 10,
          top: position.y - 10,
          zIndex: 1000,
          pointerEvents: 'auto'
        }}
        className="max-w-sm"
        role="dialog"
        aria-describedby="map-tooltip-content"
      >
        <Card className="rounded-2xl border bg-card shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">
              {data.uf} - Estado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" id="map-tooltip-content">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Quantidade de oportunidades</TableCell>
                  <TableCell className="text-right">{data.qtdOportunidades}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Valor total</TableCell>
                  <TableCell className="text-right">R$ {data.valorTotalMi.toFixed(1)} Mi</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Foco: Estadual</TableCell>
                  <TableCell className="text-right">R$ {data.foco.ESTADUAL.toFixed(1)} Mi</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Foco: Municipal</TableCell>
                  <TableCell className="text-right">R$ {data.foco.MUNICIPAL.toFixed(1)} Mi</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div>
              <h4 className="text-sm font-medium mb-2">Top 3 Setores</h4>
              <Table>
                <TableBody>
                  {data.setoresTop3.map((setor, index) => (
                    <TableRow key={setor.nome}>
                      <TableCell className="py-1">{setor.nome}</TableCell>
                      <TableCell className="text-right py-1">R$ {setor.valorMi.toFixed(1)} Mi</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Temperatura</h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-medium">Fria</div>
                  <div className="text-muted-foreground">R$ {data.temperatura.FRIA.toFixed(1)} Mi</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Quente</div>
                  <div className="text-muted-foreground">R$ {data.temperatura.QUENTE.toFixed(1)} Mi</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Morna</div>
                  <div className="text-muted-foreground">R$ {data.temperatura.MORNA.toFixed(1)} Mi</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Tipos de Contratação</h4>
              <div className="flex flex-wrap gap-1">
                {data.tiposContratacao.map(tipo => (
                  <Badge key={tipo} variant="secondary" className="text-xs">
                    {tipo}
                  </Badge>
                ))}
              </div>
            </div>

            <Button 
              size="sm" 
              className="w-full" 
              onClick={() => {
                // Navigate to filtered list
                window.location.href = data.linkLista;
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver oportunidades
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export function BrazilMap() {
  const { data: mapaData, isLoading } = useForecastMapa();
  const { setFilter } = useForecastStore();
  const [tooltip, setTooltip] = useState<{ data: TooltipData; position: { x: number; y: number } } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseEnter = (uf: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    const stateData = mapaData?.find(state => state.uf === uf);
    if (stateData) {
      setTooltip({
        data: stateData,
        position: mousePosition
      });
    }
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setTooltip(null);
    }, 200);
  };

  const handleStateClick = (uf: string) => {
    setFilter('uf', uf);
  };

  const getStateColor = (uf: string) => {
    const stateData = mapaData?.find(state => state.uf === uf);
    if (!stateData) return '#e5e7eb'; // gray-200
    
    const value = stateData.valorTotalMi;
    if (value > 80) return 'hsl(var(--primary))'; // primary
    if (value > 40) return 'hsl(var(--chart-2))'; // lighter purple
    if (value > 20) return 'hsl(var(--chart-3))'; // even lighter
    return 'hsl(var(--chart-4))'; // lightest
  };

  if (isLoading) {
    return (
      <Card className="col-span-12 lg:col-span-7 h-[520px] bg-background rounded-2xl border p-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight">
            Mapa de Projetos (Ata)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[400px] rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="col-span-12 lg:col-span-7 h-[520px] bg-background rounded-2xl border p-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight">
            Mapa de Projetos (Ata)
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          {/* Simplified Brazil Map Placeholder */}
          <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Sample Brazilian states as simplified shapes */}
              {[
                { id: 'RJ', d: 'M320,180 L340,180 L340,200 L320,200 Z', name: 'Rio de Janeiro' },
                { id: 'AM', d: 'M50,80 L120,80 L120,150 L50,150 Z', name: 'Amazonas' },
                { id: 'CE', d: 'M250,60 L280,60 L280,90 L250,90 Z', name: 'Ceará' },
                { id: 'ES', d: 'M310,160 L330,160 L330,180 L310,180 Z', name: 'Espírito Santo' },
                { id: 'RN', d: 'M270,40 L300,40 L300,70 L270,70 Z', name: 'Rio Grande do Norte' }
              ].map(state => (
                <path
                  key={state.id}
                  d={state.d}
                  fill={getStateColor(state.id)}
                  stroke="#ffffff"
                  strokeWidth="1"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onMouseEnter={() => handleMouseEnter(state.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleStateClick(state.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${state.name} - Clique para filtrar`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleStateClick(state.id);
                    }
                  }}
                />
              ))}
              
              {/* State Labels */}
              {[
                { id: 'RJ', x: 330, y: 195 },
                { id: 'AM', x: 85, y: 120 },
                { id: 'CE', x: 265, y: 80 },
                { id: 'ES', x: 320, y: 175 },
                { id: 'RN', x: 285, y: 60 }
              ].map(state => (
                <text
                  key={state.id}
                  x={state.x}
                  y={state.y}
                  textAnchor="middle"
                  className="text-xs font-medium fill-white"
                  pointerEvents="none"
                >
                  {state.id}
                </text>
              ))}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Tooltip */}
      {tooltip && (
        <MapTooltip
          data={tooltip.data}
          position={tooltip.position}
          onClose={() => setTooltip(null)}
        />
      )}
    </>
  );
}