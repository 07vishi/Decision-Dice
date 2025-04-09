import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomDice = ({ theme, onShowConfetti }) => {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isRolling, setIsRolling] = useState(false);

  const themeClasses = {
    dark: {
      input: 'bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400',
      button: {
        primary: 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700',
        danger: 'text-red-400 hover:text-red-300',
        disabled: 'bg-gray-700/50 text-gray-400'
      },
      option: 'bg-gray-800/50 border-gray-700/50 text-white',
      result: 'bg-gray-800/50 border-gray-700/50'
    },
    light: {
      input: 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500',
      button: {
        primary: 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black active:from-black active:to-gray-900 shadow-xl shadow-gray-300/20',
        danger: 'text-red-500 hover:text-red-400',
        disabled: 'bg-gray-200/50 text-gray-400'
      },
      option: 'bg-white/50 border-gray-200 text-gray-900',
      result: 'bg-white/50 border-gray-200'
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      addOption();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-xl font-bold ${themeClasses[theme].text}`}>🎲 Custom Decision Dice</h2>

      {/* Add Options */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your option..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-all ${themeClasses[theme].input}`}
          />
          <motion.button
            onClick={addOption}
            disabled={!input.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg 
              ${input.trim() ? themeClasses[theme].button.primary : themeClasses[theme].button.disabled}
              transition-all shadow-lg`}
          >
            Add
          </motion.button>
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {options.map((opt, idx) => (
            <motion.div
              key={opt}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className={`group flex items-center justify-between p-3 rounded-xl border backdrop-blur-sm ${themeClasses[theme].option}`}
            >
              <span className="flex-1 truncate pr-2">{opt}</span>
              <motion.button
                onClick={() => deleteOption(idx)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${themeClasses[theme].button.danger} opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                ×
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Roll Button */}
      <motion.button
        onClick={rollDice}
        disabled={options.length === 0 || isRolling}
        whileHover={options.length > 0 && !isRolling ? { scale: 1.02 } : {}}
        whileTap={options.length > 0 && !isRolling ? { scale: 0.98 } : {}}
        className={`w-full px-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all
          ${options.length === 0 || isRolling
            ? themeClasses[theme].button.disabled
            : `${themeClasses[theme].button.primary} ${theme === 'light' ? 'ring-1 ring-gray-200' : ''}`}`}
      >
        <span className="flex items-center justify-center gap-2">
          {isRolling ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-xl"
              >
                🎲
              </motion.span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                Rolling...
              </span>
            </>
          ) : (
            <>
              <span className="text-xl">🎲</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                Roll the Dice!
              </span>
            </>
          )}
        </span>
      </motion.button>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`p-6 rounded-xl border backdrop-blur-sm ${themeClasses[theme].result}`}
          >
            <div className="text-lg opacity-75 mb-2">
              🎉 The chosen one is:
            </div>
            <div className="text-2xl font-bold">
              {result}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDice;
