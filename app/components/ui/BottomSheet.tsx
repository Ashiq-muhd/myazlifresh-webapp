'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function BottomSheet({ isOpen, onClose, children, className = '' }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg z-50 p-5 ${className}`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
