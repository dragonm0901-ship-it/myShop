import React from 'react';
import { motion } from 'framer-motion';

const BRAND_NAME = "myShop";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-black text-white pt-16 pb-8 border-t-[6px] border-primary relative overflow-hidden"
    >
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Columns (similar to previous, but refined styling) */}
          <div className="space-y-4">
            <h4 className="font-headings font-bold text-lg text-gray-100">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-ui font-medium">
              {['Help Center', 'Track Order', 'Return Policy', 'Contact Us'].map(l => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition-colors relative group block w-fit">
                    {l}
                    <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-headings font-bold text-lg text-gray-100">About {BRAND_NAME}</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-ui font-medium">
              {['Our Story', 'Careers', 'Press', 'Investor Relations'].map(l => (
                 <li key={l}>
                 <a href="#" className="hover:text-white transition-colors relative group block w-fit">
                   {l}
                   <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                 </a>
               </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-headings font-bold text-lg text-gray-100">Earn with Us</h4>
            <ul className="space-y-2 text-sm text-gray-400 font-ui font-medium">
              {['Sell on Platform', 'Affiliates', 'Advertise'].map(l => (
                  <li key={l}>
                  <a href="#" className="hover:text-white transition-colors relative group block w-fit">
                    {l}
                    <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-headings font-bold text-lg text-gray-100">Get the App</h4>
            <div className="space-y-3">
              <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all rounded-lg p-3 flex items-center justify-center gap-3 active:scale-95 group">
                <div className="text-left w-full">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">Download on the</div>
                  <div className="text-sm font-bold text-white group-hover:text-accent transition-colors">App Store</div>
                </div>
              </button>
              <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all rounded-lg p-3 flex items-center justify-center gap-3 active:scale-95 group">
                <div className="text-left w-full">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">GET IT ON</div>
                  <div className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} {BRAND_NAME} Inc. All rights reserved. Registered in Kathmandu, Nepal.
          </div>
          
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <div className="bg-white/10 px-3 py-1.5 rounded-md text-xs font-bold font-ui text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer">Stripe</div>
            <div className="bg-white/10 px-3 py-1.5 rounded-md text-xs font-bold font-ui text-green-400 hover:bg-green-500/20 transition-colors cursor-pointer">eSewa</div>
            <div className="bg-white/10 px-3 py-1.5 rounded-md text-xs font-bold font-ui text-purple-400 hover:bg-purple-500/20 transition-colors cursor-pointer">Khalti</div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
