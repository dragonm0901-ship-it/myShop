import React from 'react';
import { motion } from 'framer-motion';
import { useSeo } from '../seo';
import {
  HeroSection,
  ValueProps,
  CategoryGrid,
  FeaturedShelf,
  FlashSales,
  BestSellers,
  LimitedDrop,
  NewArrivals,
} from '../components/home/HomeComponents';

const Home = () => {
  useSeo({
    title: 'myShop — Modern Marketplace',
    description:
      'Shop a refined selection of electronics, fashion, home, and grocery essentials with fast delivery and secure checkout.',
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <ValueProps />
      <CategoryGrid />
      <FeaturedShelf />
      <BestSellers />
      <LimitedDrop />
      <FlashSales />
      <NewArrivals />
    </motion.div>
  );
};

export default Home;
