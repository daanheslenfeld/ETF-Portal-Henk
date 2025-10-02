import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function NewAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [naam, setNaam] = useState('');
  const navigate = useNavigate();
  const { login } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = isLogin
      ? { email, password }
      : { email, password, naam };
    login(userData);
    navigate('/dashboard');
  };

  const handleDemo = () => {
    setEmail('demo@etf.nl');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-8">
          <TrendingUp className="w-12 h-12 text-blue-600" />
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setIsLogin(true)}
            variant={isLogin ? 'primary' : 'outline'}
            className="flex-1"
          >
            Inloggen
          </Button>
          <Button
            onClick={() => setIsLogin(false)}
            variant={!isLogin ? 'primary' : 'outline'}
            className="flex-1"
          >
            Registreren
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Naam
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  value={naam}
                  onChange={(e) => setNaam(e.target.value)}
                  placeholder="Uw naam"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="uw@email.nl"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wachtwoord
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {isLogin ? 'Inloggen' : 'Registreren'}
          </Button>

          {isLogin && (
            <Button
              type="button"
              variant="outline"
              onClick={handleDemo}
              className="w-full"
            >
              Demo Account
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
}
