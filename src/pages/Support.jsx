import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail, Phone, MessageCircle } from 'lucide-react';
import { useSeo } from '../seo';
import { getOrderById } from '../services/orders';
import { sanitizeText } from '../utils';
import { trackEvent } from '../services/analytics';

const FAQS = [
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery arrives in 3-5 business days. Express delivery arrives next day by 8 PM.',
  },
  {
    question: 'What is your return policy?',
    answer: 'You can return eligible items within 14 days for a refund. We will arrange pickup.',
  },
  {
    question: 'Can I change my order after checkout?',
    answer: 'We can help within 1 hour of placing your order. Contact support with your order ID.',
  },
];

const Support = () => {
  useSeo({
    title: 'Support — myShop',
    description: 'Get help with orders, shipping, returns, and account questions.',
  });

  const [orderId, setOrderId] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const [messageSent, setMessageSent] = useState(false);

  const handleTrackOrder = (event) => {
    event.preventDefault();
    const sanitized = sanitizeText(orderId);
    const result = getOrderById(sanitized);
    setOrderResult(result || { id: sanitized, status: 'not_found' });
    trackEvent('track_order', { orderId: sanitized, found: Boolean(result) });
  };

  const handleContact = (event) => {
    event.preventDefault();
    setMessageSent(true);
    trackEvent('support_contact', { channel: 'form' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container-xl py-10 md:py-14"
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div>
            <p className="section-kicker">Support center</p>
            <h1 className="text-3xl font-extrabold text-ink md:text-4xl">We’re here to help.</h1>
            <p className="mt-3 text-sm text-muted">
              Track orders, manage returns, or reach our team anytime.
            </p>
          </div>

          <div id="track" className="surface-card p-6">
            <h2 className="text-lg font-extrabold text-ink">Track your order</h2>
            <form onSubmit={handleTrackOrder} className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-3.5 text-muted" />
                <input
                  value={orderId}
                  onChange={(event) => setOrderId(event.target.value)}
                  placeholder="Enter order ID"
                  className="input-field pl-9"
                />
              </div>
              <button className="btn-primary">Track order</button>
            </form>
            {orderResult && (
              <div className="mt-4 rounded-xl border border-line bg-brand-50 p-4 text-sm text-ink">
                {orderResult.status === 'not_found' ? (
                  <p>We couldn’t find that order ID. Double-check and try again.</p>
                ) : (
                  <div className="space-y-1">
                    <div className="font-bold">Order {orderResult.id}</div>
                    <div className="text-muted">Status: {orderResult.status}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div id="faq" className="space-y-4">
            <h2 className="text-lg font-extrabold text-ink">FAQs</h2>
            {FAQS.map((faq) => (
              <div key={faq.question} className="surface-card p-5">
                <div className="text-sm font-bold text-ink">{faq.question}</div>
                <p className="mt-2 text-sm text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <h2 className="text-lg font-extrabold text-ink">Contact support</h2>
            <p className="mt-2 text-sm text-muted">We respond within 24 hours.</p>
            <form onSubmit={handleContact} className="mt-4 space-y-3">
              <input placeholder="Your name" className="input-field" />
              <input type="email" placeholder="Email" className="input-field" />
              <textarea rows={4} placeholder="How can we help?" className="input-field resize-none" />
              <button className="btn-primary w-full">Send message</button>
            </form>
            {messageSent && (
              <div className="mt-3 rounded-xl border border-brand-100 bg-brand-50 p-3 text-xs font-semibold text-brand-700">
                Thanks! Your message has been sent.
              </div>
            )}
          </div>

          <div id="returns" className="surface-card p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted">Returns</h3>
            <p className="mt-2 text-sm text-muted">
              Start a return within 14 days of delivery. We’ll arrange pickup and keep you updated.
            </p>
          </div>

          <div id="shipping" className="surface-card p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted">Shipping</h3>
            <p className="mt-2 text-sm text-muted">
              Standard delivery is free over NPR 2000. Express delivery is NPR 450.
            </p>
          </div>

          <div className="surface-card p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted">Direct line</h3>
            <div className="mt-3 space-y-2 text-sm text-ink">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-brand-600" /> support@myshop.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-brand-600" /> +977 9800000000
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-brand-600" /> Live chat available 9 AM–9 PM
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Support;
