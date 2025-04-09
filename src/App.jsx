import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import CustomDice from './components/CustomDice';

// Define the useWindowSize Hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [windowSize.width, windowSize.height];
}

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowWidth, windowHeight] = useWindowSize();
  const [theme, setTheme] = useState('dark');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('decisionDiceTheme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('decisionDiceTheme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const themeClasses = {
    dark: {
      bg: 'from-gray-900 via-gray-800 to-gray-900',
      text: 'text-gray-200',
      textSecondary: 'text-gray-400',
      button: 'bg-gray-800/50 hover:bg-gray-700/50',
      overlay: 'bg-black/30'
    },
    light: {
      bg: 'from-sky-100 via-blue-50 to-indigo-100',
      text: 'text-slate-800',
      textSecondary: 'text-slate-600',
      button: 'bg-white/80 hover:bg-white shadow-lg ring-1 ring-slate-200/50',
      overlay: 'bg-gradient-to-b from-white/60 to-blue-50/30'
    },
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-[#0f172a] text-white' 
        : 'bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 text-slate-900'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute w-full h-full ${
          theme === 'dark'
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-purple-900/20 to-pink-900/20'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400/10 via-sky-300/10 to-indigo-300/10'
        }`}></div>
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className={`absolute inset-0 opacity-30 ${
            theme === 'dark'
              ? "bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"
              : "bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%230EA5E9%22%20fill-opacity%3D%220.2%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"
          }`}
        />
      </div>

      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-3 rounded-full backdrop-blur-md
          ${theme === 'dark'
            ? 'bg-gray-800/50 hover:bg-gray-700/50 text-yellow-300 shadow-lg'
            : 'bg-white hover:bg-white/90 text-sky-500 shadow-lg ring-1 ring-slate-200/50'
          } transition-all`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </motion.button>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              className="text-6xl md:text-7xl filter drop-shadow-2xl"
            >
              🎲
            </motion.div>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          } tracking-tight drop-shadow-sm`}>
            Decision Dice
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Let fate decide for you!
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`max-w-md mx-auto ${
            theme === 'dark'
              ? 'bg-gray-800/40 border border-gray-700/50'
              : 'bg-white/90 shadow-xl shadow-sky-100 ring-1 ring-sky-100'
          } backdrop-blur-md rounded-2xl p-6`}
        >
          <CustomDice theme={theme} onShowConfetti={() => setShowConfetti(true)} />
        </motion.div>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowWidth}
          height={windowHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          colors={theme === 'dark' 
            ? ['#60A5FA', '#818CF8', '#A78BFA', '#F472B6', '#34D399'] 
            : ['#0EA5E9', '#38BDF8', '#2563EB', '#6366F1', '#0284C7']
          }
        />
      )}
    </div>
  );
}

export default App;
