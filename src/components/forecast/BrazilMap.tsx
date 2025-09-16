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
          {/* Brazil Map */}
          <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
            <svg viewBox="0 0 500 400" className="w-full h-full">
              {/* Brazil outline with states */}
              {[
                // Amazonas
                { 
                  id: 'AM', 
                  d: 'M40,80 L140,70 L160,90 L150,130 L120,140 L90,130 L60,120 L40,100 Z', 
                  name: 'Amazonas',
                  labelX: 100,
                  labelY: 110
                },
                // Pará
                { 
                  id: 'PA', 
                  d: 'M140,70 L200,75 L210,100 L190,130 L160,135 L150,130 L160,90 Z', 
                  name: 'Pará',
                  labelX: 175,
                  labelY: 105
                },
                // Ceará
                { 
                  id: 'CE', 
                  d: 'M250,80 L290,75 L300,95 L280,110 L250,105 Z', 
                  name: 'Ceará',
                  labelX: 270,
                  labelY: 95
                },
                // Rio Grande do Norte
                { 
                  id: 'RN', 
                  d: 'M290,75 L320,70 L325,85 L300,95 Z', 
                  name: 'Rio Grande do Norte',
                  labelX: 310,
                  labelY: 82
                },
                // Paraíba
                { 
                  id: 'PB', 
                  d: 'M300,95 L325,85 L330,100 L310,105 Z', 
                  name: 'Paraíba',
                  labelX: 315,
                  labelY: 97
                },
                // Pernambuco
                { 
                  id: 'PE', 
                  d: 'M280,110 L310,105 L330,100 L335,120 L300,125 Z', 
                  name: 'Pernambuco',
                  labelX: 305,
                  labelY: 115
                },
                // Bahia
                { 
                  id: 'BA', 
                  d: 'M210,130 L280,110 L300,125 L290,180 L240,190 L210,170 Z', 
                  name: 'Bahia',
                  labelX: 250,
                  labelY: 150
                },
                // Minas Gerais
                { 
                  id: 'MG', 
                  d: 'M240,190 L290,180 L310,200 L290,240 L250,245 L220,230 Z', 
                  name: 'Minas Gerais',
                  labelX: 260,
                  labelY: 215
                },
                // Espírito Santo
                { 
                  id: 'ES', 
                  d: 'M310,200 L330,195 L335,220 L320,225 Z', 
                  name: 'Espírito Santo',
                  labelX: 325,
                  labelY: 210
                },
                // Rio de Janeiro
                { 
                  id: 'RJ', 
                  d: 'M290,240 L320,225 L335,220 L340,240 L320,250 L300,245 Z', 
                  name: 'Rio de Janeiro',
                  labelX: 315,
                  labelY: 238
                },
                // São Paulo
                { 
                  id: 'SP', 
                  d: 'M220,230 L250,245 L290,240 L300,245 L280,270 L240,275 L200,260 Z', 
                  name: 'São Paulo',
                  labelX: 250,
                  labelY: 252
                },
                // Paraná
                { 
                  id: 'PR', 
                  d: 'M200,260 L240,275 L280,270 L270,300 L220,305 L180,290 Z', 
                  name: 'Paraná',
                  labelX: 230,
                  labelY: 285
                },
                // Santa Catarina
                { 
                  id: 'SC', 
                  d: 'M180,290 L220,305 L270,300 L265,320 L200,325 L170,310 Z', 
                  name: 'Santa Catarina',
                  labelX: 215,
                  labelY: 310
                },
                // Rio Grande do Sul
                { 
                  id: 'RS', 
                  d: 'M170,310 L200,325 L265,320 L260,350 L190,360 L140,340 Z', 
                  name: 'Rio Grande do Sul',
                  labelX: 200,
                  labelY: 340
                },
                // Mato Grosso do Sul
                { 
                  id: 'MS', 
                  d: 'M150,220 L200,215 L220,230 L200,260 L180,290 L130,280 L120,250 Z', 
                  name: 'Mato Grosso do Sul',
                  labelX: 165,
                  labelY: 245
                },
                // Mato Grosso
                { 
                  id: 'MT', 
                  d: 'M90,130 L150,130 L190,130 L210,130 L200,180 L150,185 L120,170 L100,150 Z', 
                  name: 'Mato Grosso',
                  labelX: 150,
                  labelY: 155
                },
                // Goiás
                { 
                  id: 'GO', 
                  d: 'M200,180 L240,190 L220,230 L200,215 L150,185 Z', 
                  name: 'Goiás',
                  labelX: 200,
                  labelY: 205
                },
                // Distrito Federal
                { 
                  id: 'DF', 
                  d: 'M205,200 L215,195 L220,205 L210,210 Z', 
                  name: 'Distrito Federal',
                  labelX: 212,
                  labelY: 203
                },
                // Tocantins
                { 
                  id: 'TO', 
                  d: 'M190,130 L240,125 L250,160 L240,190 L200,180 L190,150 Z', 
                  name: 'Tocantins',
                  labelX: 215,
                  labelY: 155
                },
                // Maranhão
                { 
                  id: 'MA', 
                  d: 'M190,90 L250,85 L280,110 L240,125 L200,120 L190,100 Z', 
                  name: 'Maranhão',
                  labelX: 230,
                  labelY: 105
                },
                // Piauí
                { 
                  id: 'PI', 
                  d: 'M240,125 L280,110 L250,160 Z', 
                  name: 'Piauí',
                  labelX: 255,
                  labelY: 132
                },
                // Alagoas
                { 
                  id: 'AL', 
                  d: 'M325,125 L340,120 L345,140 L330,145 Z', 
                  name: 'Alagoas',
                  labelX: 335,
                  labelY: 132
                },
                // Sergipe
                { 
                  id: 'SE', 
                  d: 'M320,145 L335,140 L340,160 L325,165 Z', 
                  name: 'Sergipe',
                  labelX: 330,
                  labelY: 152
                },
                // Rondônia
                { 
                  id: 'RO', 
                  d: 'M60,120 L90,130 L100,150 L80,160 L60,140 Z', 
                  name: 'Rondônia',
                  labelX: 80,
                  labelY: 140
                },
                // Acre
                { 
                  id: 'AC', 
                  d: 'M20,110 L60,120 L60,140 L40,145 L20,130 Z', 
                  name: 'Acre',
                  labelX: 40,
                  labelY: 128
                },
                // Roraima
                { 
                  id: 'RR', 
                  d: 'M100,20 L140,15 L150,40 L120,45 L90,35 Z', 
                  name: 'Roraima',
                  labelX: 120,
                  labelY: 32
                },
                // Amapá
                { 
                  id: 'AP', 
                  d: 'M200,40 L230,35 L240,60 L210,65 L190,55 Z', 
                  name: 'Amapá',
                  labelX: 215,
                  labelY: 50
                }
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
              
              {/* State Labels - Only show for main states */}
              {[
                { id: 'RJ', x: 315, y: 238 },
                { id: 'AM', x: 100, y: 110 },
                { id: 'CE', x: 270, y: 95 },
                { id: 'ES', x: 325, y: 210 },
                { id: 'RN', x: 310, y: 82 },
                { id: 'SP', x: 250, y: 252 },
                { id: 'MG', x: 260, y: 215 },
                { id: 'BA', x: 250, y: 150 },
                { id: 'PR', x: 230, y: 285 },
                { id: 'RS', x: 200, y: 340 }
              ].map(state => (
                <text
                  key={state.id}
                  x={state.x}
                  y={state.y}
                  textAnchor="middle"
                  className="text-xs font-bold fill-white drop-shadow-sm"
                  pointerEvents="none"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
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