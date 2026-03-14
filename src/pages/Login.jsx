import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Lock, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Secure Login Data:", data);
    setIsLoading(false);
    navigate('/');
  };
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex"
    >
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12">
         <img 
            src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1200&q=80" 
            alt="Premium Headphones" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
         
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 max-w-md"
         >
           <h1 className="text-4xl font-headings font-extrabold text-white mb-6 leading-tight">
             Elevate Your Shopping Experience.
           </h1>
           <p className="text-white/80 font-medium text-lg leading-relaxed">
             Access exclusive drops, personalized recommendations, and world-class support.
           </p>
         </motion.div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-neutral relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm">
          <ArrowLeft size={18} /> Back to Store
        </Link>
        
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl font-headings font-extrabold text-textDark mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-8 font-medium">Please enter your details to sign in.</p>
            
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={20} className={`transition-colors ${errors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`}/>
                  </div>
                  <input 
                    type="email" 
                    {...register("email")}
                    placeholder="Email Address" 
                    className={`w-full bg-white border rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 transition-all font-medium text-textDark placeholder:text-gray-400 shadow-sm ${errors.email ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className={`transition-colors ${errors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`}/>
                  </div>
                  <input 
                    type="password" 
                    {...register("password")}
                    placeholder="Password" 
                    className={`w-full bg-white border rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 transition-all font-medium text-textDark placeholder:text-gray-400 shadow-sm ${errors.password ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'}`}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm font-bold">
                <label className="flex items-center gap-2 cursor-pointer group">
                   <div className="relative flex items-center justify-center">
                      <input type="checkbox" {...register("rememberMe")} className="peer sr-only" />
                      <div className="w-4 h-4 rounded bg-white border border-gray-300 peer-checked:border-primary transition-colors flex items-center justify-center">
                         <div className="w-2 h-2 rounded-sm bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                   </div>
                   <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:text-accent transition-colors">Forgot Password?</a>
              </div>

              <motion.button 
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center mt-6 ${isLoading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:shadow-primary/30'}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Sign In to Platform"
                )}
              </motion.button>
            </form>

            <p className="text-center text-sm font-medium text-gray-500 mt-8">
              Don't have an account? <Link to="/signup" className="text-primary hover:text-accent font-bold transition-colors">Create one now</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
