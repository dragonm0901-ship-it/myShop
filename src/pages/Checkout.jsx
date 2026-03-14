import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  CheckCircle2,
  MapPin,
  Truck,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  ShoppingCart,
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { calculateTotals } from '../services/pricing';
import { createOrder } from '../services/orders';
import { sanitizeText } from '../utils';
import { trackEvent } from '../services/analytics';
import { useSeo } from '../seo';

const addressSchema = z.object({
  fullName: z.string().min(3, { message: 'Required' }),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z.string().min(10, { message: 'Invalid phone number' }),
  city: z.string().min(2, { message: 'Required' }),
  street: z.string().min(5, { message: 'Required' }),
  instructions: z.string().optional(),
});

const STEPS = [
  { id: 1, name: 'Shipping', icon: MapPin },
  { id: 2, name: 'Delivery', icon: Truck },
  { id: 3, name: 'Payment', icon: CreditCard },
];

const Checkout = () => {
  const { items, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  useSeo({
    title: 'Checkout — myShop',
    description: 'Secure checkout with fast delivery and transparent pricing.',
  });

  React.useEffect(() => {
    trackEvent('checkout_step', { step: currentStep });
  }, [currentStep]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
  });

  const onAddressSubmit = (data) => {
    const sanitized = {
      fullName: sanitizeText(data.fullName),
      email: sanitizeText(data.email),
      phone: sanitizeText(data.phone),
      city: sanitizeText(data.city),
      street: sanitizeText(data.street),
      instructions: sanitizeText(data.instructions || ''),
    };
    setCustomerInfo(sanitized);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setCheckoutError('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const totals = calculateTotals(items, deliveryMethod);
      const order = createOrder({
        items,
        totals,
        customer: customerInfo,
        deliveryMethod,
        paymentMethod,
      });
      trackEvent('order_placed', {
        orderId: order.id,
        total: totals.total,
        items: items.length,
      });
      setOrderConfirmation(order);
      clearCart();
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setCheckoutError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const totals = calculateTotals(items, deliveryMethod);

  if (items.length === 0 && currentStep !== 4) {
    return (
      <div className="min-h-[60vh] bg-canvas flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <ShoppingCart size={26} />
        </div>
        <h2 className="text-2xl font-extrabold text-ink">Your cart is empty</h2>
        <p className="text-sm text-muted">Add items to your cart before checking out.</p>
        <Link to="/shop" className="btn-primary">
          Return to shop
        </Link>
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[70vh] bg-canvas flex flex-col items-center justify-center px-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600"
        >
          <CheckCircle2 size={40} />
        </motion.div>
        <h1 className="mt-6 text-3xl font-extrabold text-ink">Order confirmed</h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          Thanks for your purchase. We&apos;ve sent a confirmation email with your order details.
        </p>
          <div className="surface-card mt-8 w-full max-w-md p-6 text-left text-sm text-muted">
            <div className="flex justify-between border-b border-line pb-3">
              <span>Order number</span>
              <span className="font-bold text-ink">{orderConfirmation?.id || 'Order placed'}</span>
            </div>
          <div className="flex justify-between pt-3">
            <span>Estimated delivery</span>
            <span className="font-bold text-ink">
              {deliveryMethod === 'express' ? 'Tomorrow' : '3-5 business days'}
            </span>
          </div>
        </div>
        <Link to="/shop" className="btn-primary mt-6">
          Continue shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="container-xl py-8 md:py-12">
      <div className="text-center">
        <p className="section-kicker">Checkout</p>
        <h1 className="text-3xl font-extrabold text-ink md:text-4xl">Secure checkout</h1>
      </div>

      <div className="mt-10 flex justify-center">
        <div className="relative flex w-full max-w-2xl items-center justify-between">
          <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-line" />
          <div
            className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand-600 transition-all"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep >= step.id;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                    isActive
                      ? 'border-brand-600 bg-brand-600 text-white shadow-soft'
                      : 'border-line bg-white text-muted'
                  }`}
                >
                  <Icon size={18} />
                </div>
                <span className={`text-xs font-bold ${isActive ? 'text-ink' : 'text-muted'}`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-10 lg:flex-row">
        <div className="flex-1 space-y-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="surface-card p-6 md:p-8"
              >
                <h2 className="text-xl font-extrabold text-ink">Shipping details</h2>
                <form id="address-form" onSubmit={handleSubmit(onAddressSubmit)} className="mt-6 space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
                        Full name
                      </label>
                      <input
                        {...register('fullName')}
                        autoComplete="name"
                        className="input-field mt-2"
                      />
                      {errors.fullName && (
                        <p className="mt-2 text-xs font-semibold text-red-500">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
                        Phone number
                      </label>
                      <input
                        {...register('phone')}
                        autoComplete="tel"
                        className="input-field mt-2"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-xs font-semibold text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.28em] text-muted">Email</label>
                    <input
                      type="email"
                      {...register('email')}
                      autoComplete="email"
                      className="input-field mt-2"
                    />
                    {errors.email && (
                      <p className="mt-2 text-xs font-semibold text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-[0.28em] text-muted">City</label>
                      <input
                        {...register('city')}
                        autoComplete="address-level2"
                        className="input-field mt-2"
                      />
                      {errors.city && (
                        <p className="mt-2 text-xs font-semibold text-red-500">{errors.city.message}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
                        Street address
                      </label>
                      <input
                        {...register('street')}
                        autoComplete="address-line1"
                        className="input-field mt-2"
                      />
                      {errors.street && (
                        <p className="mt-2 text-xs font-semibold text-red-500">{errors.street.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.28em] text-muted">
                      Delivery notes
                    </label>
                    <textarea
                      {...register('instructions')}
                      rows={3}
                      className="input-field mt-2 resize-none"
                    />
                  </div>
                </form>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="surface-card p-6 md:p-8"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="rounded-full bg-brand-50 p-2 text-brand-700"
                    aria-label="Back to shipping"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <h2 className="text-xl font-extrabold text-ink">Delivery method</h2>
                </div>

                <div className="mt-6 space-y-4">
                  <label
                    className={`block rounded-2xl border-2 p-5 transition ${
                      deliveryMethod === 'standard'
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-line bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-ink">Standard delivery</div>
                        <div className="text-sm text-muted">3-5 business days</div>
                      </div>
                      <span className="font-extrabold text-brand-700">Free</span>
                    </div>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'standard'}
                      onChange={() => setDeliveryMethod('standard')}
                      className="hidden"
                    />
                  </label>

                  <label
                    className={`block rounded-2xl border-2 p-5 transition ${
                      deliveryMethod === 'express'
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-line bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-ink">Express delivery</div>
                        <div className="text-sm text-muted">Delivered tomorrow by 8 PM</div>
                      </div>
                      <span className="font-extrabold text-ink">NPR 450</span>
                    </div>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'express'}
                      onChange={() => setDeliveryMethod('express')}
                      className="hidden"
                    />
                  </label>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="surface-card p-6 md:p-8"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="rounded-full bg-brand-50 p-2 text-brand-700"
                    aria-label="Back to delivery"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <h2 className="text-xl font-extrabold text-ink">Payment method</h2>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <button
                    onClick={() => setPaymentMethod('wallet')}
                    className={`rounded-2xl border-2 p-4 text-left transition ${
                      paymentMethod === 'wallet'
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-line bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-ink">Digital wallet</div>
                    <div className="text-xs text-muted">Pay instantly with your wallet.</div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`rounded-2xl border-2 p-4 text-left transition ${
                      paymentMethod === 'card'
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-line bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-ink">Credit or debit card</div>
                    <div className="text-xs text-muted">Visa, Mastercard, and more.</div>
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
                      <div className="mt-6 space-y-4 border-t border-line pt-6">
                        <input type="text" placeholder="Card number" className="input-field" />
                        <div className="grid gap-4 md:grid-cols-2">
                          <input type="text" placeholder="MM/YY" className="input-field" />
                          <input type="text" placeholder="CVC" className="input-field" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {paymentMethod === 'wallet' && (
                  <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-700">
                    You will be redirected to your wallet provider to complete payment securely.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="surface-card sticky top-28 p-6">
            <h3 className="text-lg font-extrabold text-ink">Order summary</h3>
            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-brand-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-ink truncate">{item.name}</div>
                    <div className="text-xs text-muted">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-sm font-extrabold text-brand-700">
                    NPR {(item.priceNPR * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-line pt-4 text-sm text-muted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>NPR {totals.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{totals.shipping === 0 ? 'Free' : `NPR ${totals.shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (13% VAT)</span>
                <span>NPR {totals.tax.toLocaleString()}</span>
              </div>
              <div className="flex items-end justify-between border-t border-line pt-3 text-ink">
                <span className="font-bold">Total</span>
                <span className="text-xl font-extrabold text-brand-700">
                  NPR {totals.total.toLocaleString()}
                </span>
              </div>
            </div>

            {checkoutError && (
              <div
                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600"
                role="alert"
              >
                {checkoutError}
              </div>
            )}

            {currentStep === 1 && (
              <button type="submit" form="address-form" className="btn-primary mt-6 w-full">
                Continue to delivery <ArrowRight size={18} />
              </button>
            )}

            {currentStep === 2 && (
              <button onClick={() => setCurrentStep(3)} className="btn-primary mt-6 w-full">
                Continue to payment <ArrowRight size={18} />
              </button>
            )}

            {currentStep === 3 && (
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="btn-primary mt-6 w-full"
              >
                {isProcessing ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>Place order <ArrowRight size={18} /></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
