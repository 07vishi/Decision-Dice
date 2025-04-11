import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomDice = ({ theme, onShowConfetti }) => {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isRolling, setIsRolling] = useState(false);

  const themeClasses = {
    dark: {
      input: 'bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400',
      button: {
        primary: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-900/20',
        danger: 'text-red-400 hover:text-red-300',
        disabled: 'bg-slate-800/30 text-slate-500 border border-slate-700/50 shadow-lg shadow-slate-900/10'
      },
      option: 'bg-slate-800/50 border-slate-700/50 text-white',
      result: 'bg-slate-800/50 border-slate-700/50 text-white'
    },
    light: {
      input: 'bg-white/80 border-blue-200/50 text-slate-900 placeholder-slate-400',
      button: {
        primary: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-lg shadow-pink-500/30 ring-1 ring-pink-500/20 hover:shadow-xl hover:shadow-pink-500/40 hover:ring-2 hover:ring-pink-500/30',
        danger: 'text-red-500 hover:text-red-400',
        disabled: 'bg-white/60 text-slate-400 border border-slate-200/50 shadow-lg shadow-slate-500/10'
      },
      option: 'bg-white/80 border-blue-200/50 text-slate-900',
      result: 'bg-white/80 border-blue-200/50 text-slate-900'
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
      <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
        <span className="mr-2">🎲</span>
        Custom Decision Dice
      </h2>

      {/* Add Options */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your option..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`w-full px-4 py-3 rounded-xl border backdrop-blur-sm transition-all focus:ring-2 ${
              theme === 'light' 
                ? 'focus:ring-blue-400/50 focus:border-blue-400/50' 
                : 'focus:ring-violet-500/50 focus:border-violet-500/50'
            } ${themeClasses[theme].input}`}
          />
          <motion.button
            onClick={addOption}
            disabled={!input.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg 
              ${input.trim() ? themeClasses[theme].button.primary : themeClasses[theme].button.disabled}
              transition-all`}
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
              className={`group flex items-center justify-between p-3 rounded-xl border backdrop-blur-sm hover:shadow-lg hover:scale-[1.02] transition-all ${themeClasses[theme].option}`}
            >
              <span className="flex-1 truncate pr-2">{opt}</span>
              <motion.button
                onClick={() => deleteOption(idx)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${themeClasses[theme].button.danger} opacity-0 group-hover:opacity-100 transition-opacity text-xl font-semibold`}
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
        whileHover={options.length > 0 && !isRolling ? { scale: 1.05 } : {}}
        whileTap={options.length > 0 && !isRolling ? { scale: 0.95 } : {}}
        className={`w-full px-6 py-4 rounded-xl font-semibold transition-all relative overflow-hidden
          ${options.length === 0 || isRolling
            ? themeClasses[theme].button.disabled
            : themeClasses[theme].button.primary}`}
      >
        <span className="flex items-center justify-center gap-2 relative z-10">
          {isRolling ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-xl"
              >
                🎲
              </motion.span>
              <span className="text-white">
                Rolling...
              </span>
            </>
          ) : (
            <>
              <span className="text-xl">🎲</span>
              <span className={options.length === 0 ? 'text-slate-400' : 'text-white'}>
                {options.length === 0 ? 'Add options to roll!' : 'Roll the Dice!'}
              </span>
            </>
          )}
        </span>
        {theme === 'light' && !isRolling && options.length > 0 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </motion.button>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`p-6 rounded-xl border backdrop-blur-sm ${themeClasses[theme].result} ${
              theme === 'light' ? 'shadow-lg shadow-blue-500/5' : ''
            }`}
          >
            <div className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mb-2`}>
              🎉 The chosen one is:
            </div>
            <div className={`text-2xl font-bold ${
              theme === 'light' 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600' 
                : 'text-white'
            }`}>
              {result}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDice;
