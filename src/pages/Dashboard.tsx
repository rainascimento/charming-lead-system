
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { FilterControls } from '@/components/forecast/FilterControls';
import { KPICards } from '@/components/forecast/KPICards';
import { BrazilMap } from '@/components/forecast/BrazilMap';
import { Charts } from '@/components/forecast/Charts';
import { Pipeline } from '@/components/forecast/Pipeline';
import { BarChart3 } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  return (
    <Layout>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container mx-auto py-6 space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Inteligência de Negócios
              </h1>
              <p className="text-lg text-muted-foreground">Análise de Forecast</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants}>
          <FilterControls />
        </motion.div>

        {/* KPIs */}
        <motion.div variants={itemVariants}>
          <KPICards />
        </motion.div>

        {/* Main Grid: Map + Charts */}
        <div className="grid grid-cols-12 gap-6">
          <BrazilMap />
          <Charts />
        </div>

        {/* Pipeline & Opportunities */}
        <Pipeline />
      </motion.div>
    </Layout>
  );
}
