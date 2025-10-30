import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface to-primary/10 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/20 mb-4"
        >
          <ApperIcon name="Cake" size={64} className="text-primary" />
        </motion.div>

        <h1 className="font-display text-6xl font-bold text-secondary mb-2">404</h1>
        
        <h2 className="font-display text-3xl font-semibold text-secondary mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 text-lg mb-8">
          Oops! The page you're looking for seems to have been eaten by our hungry bakers. 
          Let's get you back to something sweet!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              <ApperIcon name="Home" size={20} />
              Back to Home
            </Button>
          </Link>
          
          <Link to="/gallery">
            <Button variant="outline" className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              <ApperIcon name="ImageIcon" size={20} />
              View Gallery
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-8 border-t border-gray-200 mt-8"
        >
          <p className="text-sm text-gray-500">
            Need help? <Link to="/" className="text-primary hover:underline font-semibold">Contact us</Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NotFound;