
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const code = location.state?.code || '';
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  // Validação da força da senha
  useEffect(() => {
    const password = formData.password;
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  }, [formData.password]);

  const isPasswordValid = Object.values(passwordStrength).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isPasswordValid) {
      setError('A senha não atende aos critérios de segurança.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulação de redefinição de senha
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      
      // Redirecionar para login após alguns segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Erro ao redefinir senha. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  // Redirecionar se não tiver email e código
  useEffect(() => {
    if (!email || !code) {
      navigate('/forgot-password');
    }
  }, [email, code, navigate]);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-white w-8 h-8" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">Senha Redefinida!</CardTitle>
            <CardDescription>
              Sua senha foi redefinida com sucesso. Você será redirecionado para a página de login.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Ir para o login
              </Button>
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
            <Lock className="text-white w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Nova Senha</CardTitle>
          <CardDescription>
            Defina uma nova senha segura para sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Nova senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua nova senha"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* Indicadores de força da senha */}
              <div className="space-y-1 text-xs">
                <p className="font-medium">Critérios de segurança:</p>
                <div className="grid grid-cols-2 gap-1">
                  <div className={`flex items-center space-x-1 ${passwordStrength.length ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordStrength.length ? 'bg-green-600' : 'bg-gray-300'}`} />
                    <span>Mín. 8 caracteres</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordStrength.uppercase ? 'bg-green-600' : 'bg-gray-300'}`} />
                    <span>Letra maiúscula</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordStrength.lowercase ? 'bg-green-600' : 'bg-gray-300'}`} />
                    <span>Letra minúscula</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${passwordStrength.number ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordStrength.number ? 'bg-green-600' : 'bg-gray-300'}`} />
                    <span>Número</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${passwordStrength.special ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordStrength.special ? 'bg-green-600' : 'bg-gray-300'}`} />
                    <span>Símbolo</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme sua nova senha"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !isPasswordValid || formData.password !== formData.confirmPassword}
            >
              {isLoading ? (
                <>Redefinindo senha...</>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Redefinir senha
                </>
              )}
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Voltar ao login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
