import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BRAND_NAME = 'myShop';

const FOOTER_LINKS = [
  {
    title: 'Shop',
    links: [
      { label: 'Electronics', to: '/shop' },
      { label: 'Fashion', to: '/shop' },
      { label: 'Home', to: '/shop' },
      { label: 'Grocery', to: '/shop' },
      { label: 'New arrivals', to: '/shop' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/support' },
      { label: 'Careers', to: '/support' },
      { label: 'Press', to: '/support' },
      { label: 'Affiliate program', to: '/support' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help center', to: '/support' },
      { label: 'Returns', to: '/support#returns' },
      { label: 'Shipping', to: '/support#shipping' },
      { label: 'Contact', to: '/support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', to: '/support' },
      { label: 'Terms', to: '/support' },
      { label: 'Accessibility', to: '/support' },
    ],
  },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-brand-950 text-white"
    >
      <div className="container-xl py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <div className="text-2xl font-extrabold">{BRAND_NAME}</div>
            <p className="max-w-md text-sm text-white/70">
              A refined, modern marketplace built around speed, clarity, and trust. Curated products,
              transparent pricing, and support you can count on.
            </p>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-white/70">
                Join the weekly edit
              </h4>
              <p className="mt-3 text-sm text-white/60">
                Product drops, curated picks, and exclusive deals.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  aria-label="Email address"
                />
                <button className="btn-primary whitespace-nowrap" aria-label="Subscribe to newsletter">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {FOOTER_LINKS.map((column) => (
              <div key={column.title} className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-[0.28em] text-white/70">
                  {column.title}
                </h4>
                <ul className="space-y-2 text-sm text-white/60">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-xl flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/60 md:flex-row">
          <span>
            &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </span>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/20 px-3 py-1">Visa</span>
            <span className="rounded-full border border-white/20 px-3 py-1">Mastercard</span>
            <span className="rounded-full border border-white/20 px-3 py-1">Stripe</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
