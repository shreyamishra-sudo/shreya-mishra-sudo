import React from 'react';
import { Database, AlertTriangle, ArrowLeft, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound({ onReturn }) {
  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary flex flex-col items-center justify-center p-6 bg-dashboard-grid space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-8"
      >
        <img 
          src="/assets/404-illustration.png" 
          alt="404 - Page Not Found" 
          className="mx-auto w-full max-w-[480px] h-auto"
        />

        <button
          onClick={onReturn || (() => window.location.href = '/')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-dark transition-all duration-200 shadow-lg shadow-accent/25 focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back Home</span>
        </button>
      </motion.div>
    </div>
  );
}
