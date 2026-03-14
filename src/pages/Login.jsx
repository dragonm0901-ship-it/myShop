import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, Lock, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sanitizeText } from '../utils';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: location.state?.email || '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const sanitized = {
      ...data,
      email: sanitizeText(data.email),
    };
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    navigate('/', { state: { email: sanitized.email } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-canvas"
    >
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 p-12 text-white lg:flex">
          <div className="absolute -top-16 -right-20 h-56 w-56 rounded-full bg-brand-500/40 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-400/30 blur-[140px]" />
          <div className="relative z-10 max-w-md space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">Welcome back</p>
            <h1 className="text-4xl font-extrabold">Sign in to keep shopping faster.</h1>
            <p className="text-lg text-white/70">
              Track orders, save favorites, and enjoy a smoother checkout every time.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="relative w-full max-w-md">
            <Link
              to="/"
              className="absolute -top-10 left-0 flex items-center gap-2 text-sm font-semibold text-muted hover:text-brand-700"
            >
              <ArrowLeft size={16} /> Back to store
            </Link>

            <div className="surface-card p-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-ink">Welcome back</h2>
                <p className="text-sm text-muted">Enter your details to continue.</p>
              </div>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
                    Email
                  </label>
                  <div className="relative mt-2">
                    <User size={18} className="absolute left-3 top-3.5 text-muted" />
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="you@email.com"
                      autoComplete="email"
                      className="input-field pl-10"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-red-500">
                      <AlertCircle size={12} /> {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
                    Password
                  </label>
                  <div className="relative mt-2">
                    <Lock size={18} className="absolute left-3 top-3.5 text-muted" />
                    <input
                      type="password"
                      {...register('password')}
                      placeholder="Minimum 8 characters"
                      autoComplete="current-password"
                      className="input-field pl-10"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-red-500">
                      <AlertCircle size={12} /> {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm font-semibold text-muted">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" {...register('rememberMe')} className="accent-brand-600" />
                    Remember me
                  </label>
                  <Link to="#" className="text-brand-700 hover:text-brand-800">
                    Forgot password?
                  </Link>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.01 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  className="btn-primary w-full"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    'Sign in'
                  )}
                </motion.button>
              </form>

              <p className="mt-6 text-center text-sm text-muted">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="font-bold text-brand-700 hover:text-brand-800">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
