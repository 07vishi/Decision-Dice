import React, { useState } from "react";
import { motion } from "framer-motion";

const CustomDice = ({ theme, onShowConfetti }) => {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isRolling, setIsRolling] = useState(false);

  const themeClasses = {
    dark: {
      text: 'text-gray-200',
      textSecondary: 'text-gray-400',
      bg: 'bg-gray-800',
      border: 'border-gray-700',
      input: 'bg-gray-700 text-gray-200 placeholder-gray-400',
      optionBg: 'bg-gray-700/90',
      button: {
        primary: 'bg-indigo-600 hover:bg-indigo-700',
        secondary: 'bg-purple-600 hover:bg-purple-700',
        success: 'bg-green-600 hover:bg-green-700',
        danger: 'bg-red-600 hover:bg-red-700',
      }
    },
    light: {
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      bg: 'bg-white',
      border: 'border-gray-200',
      input: 'bg-gray-50 text-gray-800 placeholder-gray-500',
      optionBg: 'bg-white shadow-sm',
      button: {
        primary: 'bg-indigo-600 hover:bg-indigo-700',
        secondary: 'bg-purple-600 hover:bg-purple-700',
        success: 'bg-green-600 hover:bg-green-700',
        danger: 'bg-red-500 hover:bg-red-600',
      }
    }
  };

  const rollDice = () => {
    if (options.length === 0 || isRolling) return;
    
    setIsRolling(true);
    
    let rolls = 0;
    const maxRolls = 20;
    const interval = setInterval(() => {
      const selectedOption = options[Math.floor(Math.random() * options.length)];
      setResult(selectedOption);
      rolls++;
      
      if (rolls >= maxRolls) {
        clearInterval(interval);
        setIsRolling(false);
        onShowConfetti();
      }
    }, 100);
  };

  const addOption = () => {
    if (input.trim()) {
      setOptions([...options, input.trim()]);
      setInput("");
    }
  };

  const deleteOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-bold ${themeClasses[theme].text}`}>🎲 Custom Decision Dice</h2>

      {/* Add Options */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Enter an option"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`border ${themeClasses[theme].border} p-2 rounded-lg w-full ${themeClasses[theme].input}`}
        />
        <button 
          onClick={addOption}
          className={`${themeClasses[theme].button.primary} text-white px-4 py-2 rounded-lg w-full`}
        >
          Add Option
        </button>
      </div>

      {/* Options List */}
      <div className="space-y-2">
        <AnimatePresence>
          {options.map((opt, idx) => (
            <motion.div
              key={opt}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`${themeClasses[theme].optionBg} p-3 rounded-lg flex justify-between items-center border ${themeClasses[theme].border}`}
            >
              <span className={`${themeClasses[theme].text}`}>{opt}</span>
              <button
                onClick={() => deleteOption(idx)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Roll Button */}
      <button
        onClick={rollDice}
        disabled={options.length === 0 || isRolling}
        className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition-all ${
          options.length === 0 || isRolling
            ? "bg-gray-400 cursor-not-allowed"
            : themeClasses[theme].button.success
        }`}
      >
        {isRolling ? "Rolling..." : "Roll the Dice!"}
      </button>

      {/* Result */}
      {result && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`${themeClasses[theme].optionBg} p-6 rounded-lg border ${themeClasses[theme].border}`}
        >
          <div className={`${themeClasses[theme].textSecondary} text-lg mb-1`}>
            🎉 The chosen one is:
          </div>
          <div className={`${themeClasses[theme].text} text-2xl font-bold`}>
            {result}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CustomDice;
