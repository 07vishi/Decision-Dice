import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomDice = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>("");
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddOption();
    }
  };

  return (
    <div className="min-h-screen bg-purple-900 flex flex-col items-center justify-start pt-12 px-4">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center transform rotate-45">
          <div className="transform -rotate-45">
            <span className="text-6xl">🎲</span>
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-bold text-purple-200 mb-4"
      >
        Decision Dice
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-purple-300 mb-12"
      >
        Roll the dice & let the magic happen! ✨
      </motion.p>

      {/* Input Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md"
      >
        <h2 className="text-xl text-purple-200 mb-4 flex items-center">
          <span className="mr-2">🎲</span> Custom Decision Dice
        </h2>
        
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your option..."
            className="flex-1 px-4 py-3 rounded-lg bg-purple-800/50 backdrop-blur-sm border border-purple-600/30 text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddOption}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium"
          >
            Add
          </motion.button>
        </div>

        {/* Options List */}
        <div className="space-y-2">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="px-4 py-3 rounded-lg bg-purple-800/30 backdrop-blur-sm border border-purple-600/20 text-purple-200"
            >
              {option}
            </motion.div>
          ))}
        </div>

        {/* Roll Button */}
        {options.length > 0 && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium text-lg shadow-lg flex items-center justify-center gap-2"
          >
            <span className="text-2xl">🎲</span>
            Roll the dice!
          </motion.button>
        )}
        
        {options.length === 0 && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full mt-8 px-6 py-4 bg-purple-800/50 backdrop-blur-sm text-purple-300 rounded-lg font-medium text-lg border border-purple-600/30 flex items-center justify-center gap-2"
          >
            <span className="text-2xl">🎲</span>
            Add options to roll!
          </motion.button>
        )}
      </motion.div>

      {/* Decorative Elements */}
      <div className="fixed top-8 left-8">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-4xl"
        >
          🎯
        </motion.span>
      </div>
      <div className="fixed top-8 right-8">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="text-4xl"
        >
          🎨
        </motion.span>
      </div>
      <div className="fixed bottom-8 right-8">
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl"
        >
          ✨
        </motion.span>
      </div>
    </div>
  );
};

export default CustomDice;
