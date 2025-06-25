
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de envio de email
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsEmailSent(true);
      
      // Redirecionar para a página de código após alguns segundos
      setTimeout(() => {
        navigate('/reset-password-code', { state: { email } });
      }, 3000);
    } catch (err) {
      console.error('Erro ao enviar email:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-white w-8 h-8" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">E-mail Enviado!</CardTitle>
            <CardDescription>
              Se o e-mail {email} estiver cadastrado em nosso sistema, você receberá um código de verificação em alguns minutos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  Verifique sua caixa de entrada e também a pasta de spam.
                </AlertDescription>
              </Alert>
              
              <Button
                onClick={() => navigate('/reset-password-code', { state: { email } })}
                className="w-full"
              >
                Já recebi o código
              </Button>
              
              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Voltar ao login
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
            <Mail className="text-white w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Recuperar Senha</CardTitle>
          <CardDescription>
            Digite seu e-mail para receber um código de verificação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail cadastrado</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>Enviando código...</>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar código de verificação
                </>
              )}
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar ao login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
