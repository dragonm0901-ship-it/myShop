import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, MapPin, Truck, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const addressSchema = z.object({
  fullName: z.string().min(3, { message: "Required" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().min(10, { message: "Invalid phone number" }),
  city: z.string().min(2, { message: "Required" }),
  street: z.string().min(5, { message: "Required" }),
  instructions: z.string().optional(),
});

const STEPS = [
  { id: 1, name: "Shipping", icon: MapPin },
  { id: 2, name: "Delivery", icon: Truck },
  { id: 3, name: "Payment", icon: CreditCard },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [isProcessing, setIsProcessing] = useState(false);

  // Address Form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(addressSchema),
  });

  const onAddressSubmit = (data) => {
    console.log("Shipping Data Verified:", data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API Processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    setIsProcessing(false);
    setCurrentStep(4); // Success Step
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If cart is empty and not on success page, redirect
  if (items.length === 0 && currentStep !== 4) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-20">
        <div className="w-20 h-20 bg-neutral rounded-full flex items-center justify-center text-gray-300 mb-6">
          <ShoppingCart size={32} />
        </div>
        <h2 className="text-2xl font-headings font-extrabold text-textDark mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some items before checking out.</p>
        <Link to="/shop" className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-accent transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  // Success Step Rendering
  if (currentStep === 4) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="text-4xl font-headings font-extrabold text-textDark mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md">
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </p>
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm text-left w-full max-w-md mb-8">
           <div className="flex justify-between text-sm text-gray-500 border-b border-gray-100 pb-3 mb-3">
             <span>Order Number:</span>
             <span className="font-bold text-textDark">#ORD-{Math.floor(Math.random() * 90000) + 10000}</span>
           </div>
           <div className="flex justify-between text-sm text-gray-500">
             <span>Estimated Delivery:</span>
             <span className="font-bold text-textDark">{deliveryMethod === 'express' ? 'Tomorrow' : '3-5 Business Days'}</span>
           </div>
        </div>
        <Link to="/shop" className="bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-accent hover:shadow-primary/30 active:scale-95 transition-all outline-none focus:ring-4 focus:ring-primary/20">
          Continue Shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-headings font-extrabold text-textDark mb-8 md:text-center">Secure Checkout</h1>
      
      {/* Stepper */}
      <div className="flex justify-center mb-12 relative max-w-2xl mx-auto">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full"></div>
         <div 
           className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 rounded-full transition-all duration-300"
           style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
         ></div>
         
         <div className="flex justify-between w-full z-10 relative">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.id;
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-300 ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 text-gray-400 border-2 border-white'}`}>
                    <Icon size={20} />
                  </div>
                  <span className={`text-xs font-bold ${isActive ? 'text-textDark' : 'text-gray-400'}`}>{step.name}</span>
                </div>
              );
            })}
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content Area */}
        <div className="flex-1 lg:w-2/3">
          <AnimatePresence mode="wait">
            {/* STEP 1: SHIPPING ADDRESS */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100"
              >
                <h2 className="text-2xl font-bold font-headings text-textDark mb-6">Shipping Details</h2>
                <form id="address-form" onSubmit={handleSubmit(onAddressSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name *</label>
                       <input 
                         {...register("fullName")}
                         className={`w-full bg-neutral border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all text-textDark ${errors.fullName ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'}`}
                       />
                       {errors.fullName && <p className="text-red-500 text-xs font-bold mt-1">{errors.fullName.message}</p>}
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number *</label>
                       <input 
                         {...register("phone")}
                         className={`w-full bg-neutral border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all text-textDark ${errors.phone ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'}`}
                       />
                       {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone.message}</p>}
                     </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Email *</label>
                    <input 
                      type="email"
                      {...register("email")}
                      className={`w-full bg-neutral border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all text-textDark ${errors.email ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs font-bold mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                     <div className="md:col-span-1">
                       <label className="block text-sm font-bold text-gray-700 mb-1.5">City *</label>
                       <input 
                         {...register("city")}
                         className={`w-full bg-neutral border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all text-textDark ${errors.city ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'}`}
                       />
                       {errors.city && <p className="text-red-500 text-xs font-bold mt-1">{errors.city.message}</p>}
                     </div>
                     <div className="md:col-span-2">
                       <label className="block text-sm font-bold text-gray-700 mb-1.5">Street Address *</label>
                       <input 
                         {...register("street")}
                         className={`w-full bg-neutral border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all text-textDark ${errors.street ? 'border-red-400 focus:ring-red-400/20' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'}`}
                       />
                       {errors.street && <p className="text-red-500 text-xs font-bold mt-1">{errors.street.message}</p>}
                     </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Delivery Instructions (Optional)</label>
                    <textarea 
                      {...register("instructions")}
                      rows={3}
                      className="w-full bg-neutral border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-textDark resize-none"
                    />
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 2: DELIVERY OPTIONS */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <button onClick={() => setCurrentStep(1)} className="p-2 bg-neutral rounded-full hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="text-2xl font-bold font-headings text-textDark">Delivery Method</h2>
                </div>
                
                <div className="space-y-4">
                  <label className={`block border-2 rounded-2xl p-5 cursor-pointer transition-all ${deliveryMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${deliveryMethod === 'standard' ? 'border-primary' : 'border-gray-300'}`}>
                           {deliveryMethod === 'standard' && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                        </div>
                        <div>
                          <h4 className="font-bold text-textDark">Standard Delivery</h4>
                          <p className="text-sm text-gray-500">Delivered in 3-5 business days</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-primary">Free</span>
                    </div>
                  </label>

                  <label className={`block border-2 rounded-2xl p-5 cursor-pointer transition-all ${deliveryMethod === 'express' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${deliveryMethod === 'express' ? 'border-primary' : 'border-gray-300'}`}>
                            {deliveryMethod === 'express' && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                         </div>
                         <div>
                           <h4 className="font-bold text-textDark">Express Delivery</h4>
                           <p className="text-sm text-gray-500">Delivered tomorrow by 8 PM</p>
                         </div>
                       </div>
                       <span className="font-extrabold text-textDark">NPR 450</span>
                    </div>
                  </label>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PAYMENT OPTIONS */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <button onClick={() => setCurrentStep(2)} className="p-2 bg-neutral rounded-full hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="text-2xl font-bold font-headings text-textDark">Payment Method</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button 
                    onClick={() => setPaymentMethod('esewa')}
                    className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors ${paymentMethod === 'esewa' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                     <img src="https://esewa.com.np/common/images/esewa_logo.png" alt="eSewa" className="h-8 object-contain" />
                     <span className={`text-sm font-bold ${paymentMethod === 'esewa' ? 'text-primary' : 'text-gray-500'}`}>eSewa</span>
                  </button>

                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                     <CreditCard size={32} className={paymentMethod === 'card' ? 'text-primary' : 'text-gray-400'} />
                     <span className={`text-sm font-bold ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-500'}`}>Credit/Debit Card</span>
                  </button>
                </div>

                <AnimatePresence>
                  {paymentMethod === 'card' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div>
                          <input type="text" placeholder="Card Number" className="w-full bg-neutral border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-textDark" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <input type="text" placeholder="MM/YY" className="w-full bg-neutral border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-textDark" />
                           <input type="text" placeholder="CVC" className="w-full bg-neutral border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-textDark" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {paymentMethod === 'esewa' && (
                  <div className="bg-green-50 p-4 rounded-xl text-green-800 text-sm font-medium border border-green-100">
                    You will be securely redirected to eSewa to complete your payment upon placing the order.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-1/3">
           <div className="bg-white p-6 rounded-3xl shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-gray-100 sticky top-28">
             <h3 className="text-xl font-bold font-headings text-textDark mb-6">Order Summary</h3>
             
             <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto no-scrollbar">
               {items.map(item => (
                 <div key={item.id} className="flex gap-4">
                   <div className="w-16 h-16 bg-neutral rounded-lg flex-shrink-0">
                     <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
                   </div>
                   <div className="flex-1">
                     <h4 className="text-sm font-bold text-textDark line-clamp-1">{item.name}</h4>
                     <p className="text-xs text-gray-500 mb-1">Qty: {item.quantity}</p>
                     <p className="text-sm font-extrabold text-primary">NPR {(item.priceNPR * item.quantity).toLocaleString()}</p>
                   </div>
                 </div>
               ))}
             </div>

             <div className="space-y-3 pt-6 border-t border-gray-100 mb-6">
               <div className="flex justify-between text-gray-500 font-medium text-sm">
                 <span>Subtotal</span>
                 <span>NPR {getCartTotal().toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-gray-500 font-medium text-sm">
                 <span>Shipping</span>
                 <span>{deliveryMethod === 'standard' ? 'Free' : 'NPR 450'}</span>
               </div>
               <div className="flex justify-between text-gray-500 font-medium text-sm">
                 <span>Tax (13% VAT)</span>
                 <span>NPR {Math.floor(getCartTotal() * 0.13).toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-end pt-3 border-t border-gray-100 mt-3">
                 <span className="text-gray-900 font-bold">Total</span>
                 <span className="text-2xl font-extrabold text-accent">
                   NPR {(getCartTotal() + (deliveryMethod === 'express' ? 450 : 0) + Math.floor(getCartTotal() * 0.13)).toLocaleString()}
                 </span>
               </div>
             </div>

             {/* Action Button */}
             {currentStep === 1 && (
               <button 
                 type="submit" 
                 form="address-form"
                 className="w-full bg-textDark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-black/20 flex justify-center items-center gap-2 active:scale-95 transition-all"
               >
                 Continue to Delivery <ArrowRight size={18} />
               </button>
             )}

             {currentStep === 2 && (
               <button 
                 onClick={() => setCurrentStep(3)}
                 className="w-full bg-textDark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-black/20 flex justify-center items-center gap-2 active:scale-95 transition-all"
               >
                 Continue to Payment <ArrowRight size={18} />
               </button>
             )}

             {currentStep === 3 && (
               <button 
                 onClick={handlePlaceOrder}
                 disabled={isProcessing}
                 className={`w-full text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 transition-all ${isProcessing ? 'bg-primary/70 cursor-wait' : 'bg-primary shadow-lg hover:shadow-primary/30 active:scale-95'}`}
               >
                 {isProcessing ? (
                   <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 ) : (
                   <>Pay via {paymentMethod === 'esewa' ? 'eSewa' : 'Card'} <ArrowRight size={18} /></>
                 )}
               </button>
             )}
             
             <div className="text-center mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                <CreditCard size={14} /> 256-bit Secure Encryption
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
