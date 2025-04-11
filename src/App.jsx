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
      bg: 'from-indigo-950 via-purple-950 to-slate-900',
      text: 'text-gray-100',
      textSecondary: 'text-gray-400',
      button: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
      overlay: 'bg-black/30'
    },
    light: {
      bg: 'from-pink-200 via-purple-200 to-indigo-200',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      button: 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600',
      overlay: 'bg-white/80'
    },
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-gray-900'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        {theme === 'dark' ? (
          <>
            <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 -left-4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
          </>
        )}
        <div className={`absolute w-full h-full ${
          theme === 'dark'
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-purple-900/30 to-slate-900/30'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-300/40 via-purple-300/40 to-indigo-300/40'
        }`}></div>
      </div>

      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-3 rounded-full z-50
          ${theme === 'dark'
            ? 'bg-indigo-900/80 hover:bg-indigo-800/80 text-yellow-300 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500/20 backdrop-blur-sm'
            : 'bg-white hover:bg-white/90 text-pink-500 shadow-lg shadow-pink-500/20 ring-1 ring-pink-500/20 backdrop-blur-sm'
          } transition-all`}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </motion.button>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-6">
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1.1, 1.1, 1.1, 1]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className={`text-8xl md:text-9xl filter ${theme === 'light' ? 'drop-shadow-[0_0_25px_rgba(236,72,153,0.5)]' : 'drop-shadow-[0_0_15px_rgba(139,92,246,0.2)]'}`}
            >
              🎲
            </motion.div>
          </div>
          <motion.h1 
            className={`text-5xl md:text-6xl font-bold mb-4 ${
              theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'
            } tracking-tight`}
            animate={{ 
              scale: [1, 1.02, 1],
              rotate: [0, -1, 1, -1, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            Decision Dice
          </motion.h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-indigo-200' : 'text-gray-600'
          }`}>
            Roll the dice & let the magic happen! ✨
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`max-w-xl mx-auto ${
            theme === 'dark'
              ? 'bg-indigo-900/30 border border-indigo-800/30 shadow-2xl shadow-indigo-500/10 ring-1 ring-indigo-500/20 backdrop-blur-md'
              : 'bg-white/60 shadow-2xl shadow-pink-500/10 ring-1 ring-pink-400/20 backdrop-blur-md'
          } rounded-2xl p-8`}
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
          numberOfPieces={300}
          gravity={0.3}
          colors={theme === 'dark' 
            ? ['#8B5CF6', '#6366F1', '#A78BFA', '#818CF8', '#4F46E5'] 
            : ['#EC4899', '#D946EF', '#A855F7', '#6366F1', '#F472B6']
          }
        />
      )}

      {/* Add some floating elements for fun */}
      {theme === 'dark' ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 text-4xl animate-float text-indigo-400">🎯</div>
          <div className="absolute top-40 right-20 text-4xl animate-float animation-delay-2000 text-purple-400">🎨</div>
          <div className="absolute bottom-20 left-1/4 text-4xl animate-float animation-delay-1000 text-violet-400">🌈</div>
          <div className="absolute bottom-40 right-1/4 text-4xl animate-float animation-delay-3000 text-indigo-400">✨</div>
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 text-4xl animate-float">🎯</div>
          <div className="absolute top-40 right-20 text-4xl animate-float animation-delay-2000">🎨</div>
          <div className="absolute bottom-20 left-1/4 text-4xl animate-float animation-delay-1000">🌈</div>
          <div className="absolute bottom-40 right-1/4 text-4xl animate-float animation-delay-3000">✨</div>
        </div>
      )}
    </div>
  );
}

export default App;
