
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, BarChart3, Users, Shield } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona automaticamente para o dashboard após 3 segundos
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const features = [
    {
      icon: FileText,
      title: "Gestão de Oportunidades",
      description: "Controle completo do ciclo de licitações"
    },
    {
      icon: BarChart3,
      title: "Inteligência de Negócios",
      description: "Análises e relatórios estratégicos"
    },
    {
      icon: Users,
      title: "Gestão de Equipes",
      description: "Controle de pareceres e responsabilidades"
    },
    {
      icon: Shield,
      title: "Controle de Permissões",
      description: "Segurança e controle de acesso"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            CRM Licitações
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Sistema completo para acompanhamento de oportunidades de licitação e pré-vendas. 
            Controle todo o ciclo desde a identificação até a finalização do processo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 text-lg"
            >
              Acessar Dashboard
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/opportunities')}
              className="px-8 py-3 text-lg"
            >
              Ver Oportunidades
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>Redirecionando para o dashboard em 3 segundos...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
