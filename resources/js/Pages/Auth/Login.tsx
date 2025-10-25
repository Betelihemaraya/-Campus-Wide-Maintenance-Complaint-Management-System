import { Head, useForm } from '@inertiajs/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';

declare function route(name: string, params?: any): string;

interface Props {
  canResetPassword: boolean;
  status?: string;
}

export default function Login({ canResetPassword, status }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('login'), {
      onSuccess: () => {
        reset('password');
      },
      preserveScroll: true
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400">
      <Card className="max-w-md w-full shadow-2xl rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center text-blue-800">Welcome Back</CardTitle>
          <CardDescription className="text-center text-gray-600">Sign in to continue to your account</CardDescription>
        </CardHeader>
        <CardContent>
          {status && (
            <div className="mb-4 text-sm font-medium text-green-600">
              {status}
            </div>
          )}
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={data.email}
                autoComplete="username"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={data.password}
                autoComplete="current-password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('password', e.target.value)}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white" disabled={processing}>
              {processing ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-3">
          {canResetPassword && (
            <a href={route('password.request')} className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </a>
          )}
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href={route('register')} className="text-blue-700 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
