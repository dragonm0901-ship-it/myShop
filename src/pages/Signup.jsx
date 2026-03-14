import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Lock, Mail, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const signupSchema = z.object({
  firstName: z.string().min(2, { message: "Required" }),
  lastName: z.string().min(2, { message: "Required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Min 8 chars" }),
});

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API registration call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Secure Signup Data:", data);
    setIsLoading(false);
    navigate('/login');
  };
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-row-reverse"
    >
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-textDark relative overflow-hidden items-center justify-center p-12">
         <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80" 
            alt="Sneakers" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
         
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 max-w-md"
         >
           <h1 className="text-4xl font-headings font-extrabold text-white mb-6 leading-tight">
             Join the Evolution.
           </h1>
           <p className="text-white/80 font-medium text-lg leading-relaxed">
             Create your account and unlock priority shipping, early sale access, and premium rewards.
           </p>
         </motion.div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-neutral relative">
        <Link to="/" className="absolute top-8 right-8 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm">
          <ArrowLeft size={18} /> Back to Store
        </Link>
        
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl font-headings font-extrabold text-textDark mb-2">Create Account</h2>
            <p className="text-gray-500 mb-8 font-medium">Join us for a premium shopping experience.</p>
            
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="relative group">
                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <User size={18} className={`transition-colors ${errors.firstName ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`}/>
                       </div>
                       <input 
                         type="text" 
                         {...register("firstName")}
                         placeholder="First Name" 
                         className={`w-full bg-white border rounded-xl pl-10 pr-3 py-3.5 focus:outline-none focus:ring-2 transition-all font-medium text-sm text-textDark placeholder:text-gray-400 shadow-sm ${errors.firstName ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'}`} 
                       />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-xs font-bold mt-1 text-right">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <div className="relative group">
                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <User size={18} className={`transition-colors ${errors.lastName ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`}/>
                       </div>
                       <input 
                         type="text" 
                         {...register("lastName")}
                         placeholder="Last Name" 
                         className={`w-full bg-white border rounded-xl pl-10 pr-3 py-3.5 focus:outline-none focus:ring-2 transition-all font-medium text-sm text-textDark placeholder:text-gray-400 shadow-sm ${errors.lastName ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'}`} 
                       />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-xs font-bold mt-1 text-right">{errors.lastName.message}</p>}
                  </div>
               </div>

              <div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className={`transition-colors ${errors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`}/>
                  </div>
                  <input 
                    type="email" 
                    {...register("email")}
                    placeholder="Email Address" 
                    className={`w-full bg-white border rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 transition-all font-medium text-textDark placeholder:text-gray-400 shadow-sm ${errors.email ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs font-bold mt-1 text-right">{errors.email.message}</p>}
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
                {errors.password && <p className="text-red-500 text-xs font-bold mt-1 text-right">{errors.password.message}</p>}
              </div>

              <motion.button 
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center mt-8 ${isLoading ? 'bg-textDark/70 cursor-not-allowed' : 'bg-textDark hover:shadow-black/20'}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Register Account"
                )}
              </motion.button>
            </form>

            <p className="text-center text-sm font-medium text-gray-500 mt-8">
              Already have an account? <Link to="/login" className="text-textDark hover:text-primary font-bold transition-colors">Sign in here</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
