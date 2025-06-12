
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import LotsAndItems from '@/components/LotsAndItems';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const categorias = ['CAS', 'CDS', 'CLOUD', 'INOV', 'BI', 'DevOps', 'Infraestrutura'];
const modalidades = ['Pregão Eletrônico', 'Concorrência', 'Tomada de Preços', 'RDC'];
const portais = ['Comprasnet', 'BEC', 'Licitações-e', 'Portal do Fornecedor'];

export default function NewOpportunity() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dataAbertura, setDataAbertura] = useState<Date>();
  const [dataEntrega, setDataEntrega] = useState<Date>();
  const [activeTab, setActiveTab] = useState('identificacao');

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faria a lógica de salvamento
    navigate('/opportunities');
  };

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Nova Oportunidade</h1>
          <p className="text-gray-600">Cadastre uma nova oportunidade de licitação</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="identificacao">Identificação</TabsTrigger>
              <TabsTrigger value="lotes-itens">Lotes e Itens</TabsTrigger>
              <TabsTrigger value="categorizacao">Categorização</TabsTrigger>
            </TabsList>

            <TabsContent value="identificacao" className="space-y-6">
              {/* Identificação da Oportunidade */}
              <Card>
                <CardHeader>
                  <CardTitle>Identificação da Oportunidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="numeroProcesso">Número do Processo *</Label>
                      <Input id="numeroProcesso" placeholder="Ex: 001/2024" required />
                    </div>
                    <div>
                      <Label htmlFor="uasg">UASG</Label>
                      <Input id="uasg" placeholder="Ex: 154789" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="orgao">Órgão *</Label>
                      <Input id="orgao" placeholder="Ex: Ministério da Educação" required />
                    </div>
                    <div>
                      <Label htmlFor="uf">UF *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ac">AC</SelectItem>
                          <SelectItem value="al">AL</SelectItem>
                          <SelectItem value="ap">AP</SelectItem>
                          <SelectItem value="am">AM</SelectItem>
                          <SelectItem value="ba">BA</SelectItem>
                          <SelectItem value="ce">CE</SelectItem>
                          <SelectItem value="df">DF</SelectItem>
                          <SelectItem value="es">ES</SelectItem>
                          <SelectItem value="go">GO</SelectItem>
                          <SelectItem value="ma">MA</SelectItem>
                          <SelectItem value="mt">MT</SelectItem>
                          <SelectItem value="ms">MS</SelectItem>
                          <SelectItem value="mg">MG</SelectItem>
                          <SelectItem value="pa">PA</SelectItem>
                          <SelectItem value="pb">PB</SelectItem>
                          <SelectItem value="pr">PR</SelectItem>
                          <SelectItem value="pe">PE</SelectItem>
                          <SelectItem value="pi">PI</SelectItem>
                          <SelectItem value="rj">RJ</SelectItem>
                          <SelectItem value="rn">RN</SelectItem>
                          <SelectItem value="rs">RS</SelectItem>
                          <SelectItem value="ro">RO</SelectItem>
                          <SelectItem value="rr">RR</SelectItem>
                          <SelectItem value="sc">SC</SelectItem>
                          <SelectItem value="sp">SP</SelectItem>
                          <SelectItem value="se">SE</SelectItem>
                          <SelectItem value="to">TO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="modalidade">Modalidade *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a modalidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {modalidades.map(modalidade => (
                            <SelectItem key={modalidade} value={modalidade.toLowerCase()}>
                              {modalidade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="portal">Portal de Compras</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o portal" />
                        </SelectTrigger>
                        <SelectContent>
                          {portais.map(portal => (
                            <SelectItem key={portal} value={portal.toLowerCase()}>
                              {portal}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Data de Abertura *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dataAbertura && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dataAbertura ? format(dataAbertura, "dd/MM/yyyy") : "Selecione a data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dataAbertura}
                            onSelect={setDataAbertura}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>Data de Entrega</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dataEntrega && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dataEntrega ? format(dataEntrega, "dd/MM/yyyy") : "Selecione a data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dataEntrega}
                            onSelect={setDataEntrega}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="logo">Logo do Órgão</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                            <span>Fazer upload</span>
                            <input id="logo-upload" name="logo-upload" type="file" className="sr-only" accept="image/*" />
                          </label>
                          <p className="pl-1">ou arraste e solte</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Objeto da Licitação */}
              <Card>
                <CardHeader>
                  <CardTitle>Objeto da Licitação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="objeto">Objeto *</Label>
                    <Textarea 
                      id="objeto" 
                      placeholder="Descreva o objeto da licitação..."
                      className="min-h-[100px]"
                      required 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lotes-itens">
              <LotsAndItems />
            </TabsContent>

            <TabsContent value="categorizacao" className="space-y-6">
              {/* Categorização */}
              <Card>
                <CardHeader>
                  <CardTitle>Categorização</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Categorias</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {categorias.map(categoria => (
                        <Badge
                          key={categoria}
                          variant={selectedCategories.includes(categoria) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleCategoryToggle(categoria)}
                        >
                          {categoria}
                          {selectedCategories.includes(categoria) && (
                            <X className="ml-1 h-3 w-3" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="esfera">Esfera</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="federal">Federal</SelectItem>
                          <SelectItem value="estadual">Estadual</SelectItem>
                          <SelectItem value="municipal">Municipal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="mercado">Mercado</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="publico">Público</SelectItem>
                          <SelectItem value="privado">Privado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="setor">Setor</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="educacao">Educação</SelectItem>
                          <SelectItem value="saude">Saúde</SelectItem>
                          <SelectItem value="justica">Justiça</SelectItem>
                          <SelectItem value="fazenda">Fazenda</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Botões de navegação */}
          <div className="flex justify-between mt-6">
            <div>
              {activeTab !== 'identificacao' && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    const tabs = ['identificacao', 'lotes-itens', 'categorizacao'];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1]);
                    }
                  }}
                >
                  Anterior
                </Button>
              )}
            </div>
            
            <div className="space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate('/opportunities')}>
                Cancelar
              </Button>
              
              {activeTab !== 'categorizacao' ? (
                <Button 
                  type="button" 
                  onClick={() => {
                    const tabs = ['identificacao', 'lotes-itens', 'categorizacao'];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1]);
                    }
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Próximo
                </Button>
              ) : (
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Salvar Oportunidade
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
