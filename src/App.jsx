import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import CustomDice from './components/CustomDice';
import "./App.css";

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
  const [theme, setTheme] = useState(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    // Check if user has a system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Return saved theme, or system preference, or default to light
    return savedTheme || (prefersDark ? "dark" : "light");
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [diceHistory, setDiceHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [customOptions, setCustomOptions] = useState([]);
  const [showCustomOptions, setShowCustomOptions] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [windowWidth, windowHeight] = useWindowSize();
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showMeme, setShowMeme] = useState(false);
  const [showFortune, setShowFortune] = useState(false);
  const [fortune, setFortune] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [shareText, setShareText] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [achievements, setAchievements] = useState({
    firstRoll: false,
    tenRolls: false,
    customOptions: false,
    allOptions: false
  });
  const [rollCount, setRollCount] = useState(0);

  // Apply theme class to document element
  useEffect(() => {
    // Remove both classes first
    document.documentElement.classList.remove("light", "dark");
    // Add the current theme class
    document.documentElement.classList.add(theme);
    // Save theme preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check for achievements
  useEffect(() => {
    const newAchievements = { ...achievements };
    
    // First roll achievement
    if (rollCount === 1) {
      newAchievements.firstRoll = true;
    }
    
    // Ten rolls achievement
    if (rollCount === 10) {
      newAchievements.tenRolls = true;
    }
    
    // Custom options achievement
    if (customOptions.length > 0) {
      newAchievements.customOptions = true;
    }
    
    // All options achievement (default + custom)
    if (customOptions.length + 6 >= 12) {
      newAchievements.allOptions = true;
    }
    
    setAchievements(newAchievements);
  }, [rollCount, customOptions.length]);

  // Easter egg - Konami code
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setShowEasterEgg(true);
          konamiIndex = 0;
          setTimeout(() => setShowEasterEgg(false), 5000);
        }
      } else {
        konamiIndex = 0;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  const handleShowConfetti = () => {
    setShowConfetti(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => setShowConfetti(false), 1000);
  };

  const handleDiceRoll = (result) => {
    setDiceHistory((prev) => [
      { result, timestamp: new Date().toISOString() },
      ...prev,
    ].slice(0, 10));
    
    setRollCount(prev => prev + 1);
    
    // Random chance for meme or fortune
    if (Math.random() < 0.1) {
      setShowMeme(true);
      setTimeout(() => setShowMeme(false), 5000);
    } else if (Math.random() < 0.15) {
      const fortunes = [
        "Today is your lucky day!",
        "Trust your instincts on this one.",
        "The stars are aligned in your favor.",
        "Take a leap of faith!",
        "Patience will lead to success.",
        "A surprise is waiting around the corner.",
        "Your creativity will solve this problem.",
        "The answer is closer than you think.",
        "Sometimes the best decision is to wait.",
        "Your intuition is spot on today."
      ];
      setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
      setShowFortune(true);
      setTimeout(() => setShowFortune(false), 5000);
    }
    
    // Generate share text
    setShareText(`I just rolled "${result}" on Decision Dice! What will you roll? 🎲`);
  };

  const addCustomOption = () => {
    if (newOption.trim()) {
      setCustomOptions((prev) => [...prev, newOption.trim()]);
      setNewOption("");
    }
  };

  const removeCustomOption = (index) => {
    setCustomOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const getStats = () => {
    const stats = {};
    diceHistory.forEach(roll => {
      stats[roll.result] = (stats[roll.result] || 0) + 1;
    });
    return stats;
  };

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Decision Dice Result',
        text: shareText,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareText)
        .then(() => alert('Result copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
    }
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
    <div className={`min-h-screen ${theme}`}>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Floating Emojis */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["🎯", "🎨", "🌈", "✨", "🎲", "🎮", "🎪", "🎭", "🎪", "🎨", "🎯", "✨"].map((emoji, index) => (
            <motion.div
              key={emoji + index}
              className="absolute text-4xl"
              initial={{ 
                x: Math.random() * windowWidth,
                y: Math.random() * windowHeight,
                scale: 0.5 + Math.random() * 0.5
              }}
              animate={{
                y: [null, Math.random() * -100],
                x: [null, Math.random() * 100],
                rotate: [null, Math.random() * 360],
                scale: [null, 0.5 + Math.random() * 0.5]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        {/* Easter Egg */}
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-6xl animate-pulse-slow"
            >
              🎉 YOU FOUND THE EASTER EGG! 🎉
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meme */}
        <AnimatePresence>
          {showMeme && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-10 right-10 z-50 glass p-4 rounded-xl max-w-xs"
            >
              <p className="text-center font-bold mb-2">Random Meme:</p>
              <p className="text-center">When the dice says "Maybe" for the 5th time in a row... 🤔</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fortune */}
        <AnimatePresence>
          {showFortune && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-10 left-10 z-50 glass p-4 rounded-xl max-w-xs"
            >
              <p className="text-center font-bold mb-2">🔮 Fortune Teller:</p>
              <p className="text-center">{fortune}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <motion.h1 
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-pink-400 dark:via-purple-400 dark:to-indigo-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Decision Dice
            </motion.h1>
            <div className="flex gap-2">
              <motion.button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📜
              </motion.button>
              <motion.button
                onClick={() => setShowStats(!showStats)}
                className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📊
              </motion.button>
              <motion.button
                onClick={() => setShowCustomOptions(!showCustomOptions)}
                className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ⚙️
              </motion.button>
              <motion.button
                onClick={() => setShowAchievements(!showAchievements)}
                className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏆
              </motion.button>
              <motion.button
                onClick={() => setShowTutorial(!showTutorial)}
                className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ❓
              </motion.button>
              <motion.button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {soundEnabled ? "🔊" : "🔇"}
              </motion.button>
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </motion.button>
            </div>
          </div>

          <motion.p 
            className="text-center text-lg mb-8 text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Roll the dice & let the magic happen! ✨
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <CustomDice 
                theme={theme} 
                onShowConfetti={handleShowConfetti}
                onRoll={handleDiceRoll}
                customOptions={customOptions}
                soundEnabled={soundEnabled}
              />
              
              {diceHistory.length > 0 && (
                <motion.button
                  onClick={shareResult}
                  className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Share Result 📤
                </motion.button>
              )}
            </div>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="glass rounded-xl p-6"
                >
                  <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    Roll History
                  </h2>
                  <div className="space-y-2">
                    {diceHistory.map((roll, index) => (
                      <motion.div
                        key={roll.timestamp}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-slate-800/50"
                      >
                        <span className="text-lg">🎲 {roll.result}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {new Date(roll.timestamp).toLocaleTimeString()}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {showStats && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="glass rounded-xl p-6"
                >
                  <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    Statistics
                  </h2>
                  <div className="space-y-4">
                    {Object.entries(getStats()).map(([result, count], index) => (
                      <motion.div
                        key={result}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-lg">{result}</span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {count} times
                          </span>
                        </div>
                        <div className="h-2 bg-white/50 dark:bg-slate-800/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(count / diceHistory.length) * 100}%` }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {showCustomOptions && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="glass rounded-xl p-6"
                >
                  <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    Custom Options
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addCustomOption()}
                        placeholder="Add new option..."
                        className="flex-1 p-2 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <motion.button
                        onClick={addCustomOption}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add
                      </motion.button>
                    </div>
                    <div className="space-y-2">
                      {customOptions.map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex justify-between items-center p-2 rounded-lg bg-white/50 dark:bg-slate-800/50"
                        >
                          <span>{option}</span>
                          <motion.button
                            onClick={() => removeCustomOption(index)}
                            className="text-red-500 hover:text-red-600"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            ✕
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {showAchievements && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="glass rounded-xl p-6"
                >
                  <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    Achievements
                  </h2>
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`flex justify-between items-center p-3 rounded-lg ${achievements.firstRoll ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-white/50 dark:bg-slate-800/50'}`}
                    >
                      <span className="flex items-center">
                        {achievements.firstRoll ? '🏆' : '🔒'} First Roll
                      </span>
                      {achievements.firstRoll ? '✅' : '❌'}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`flex justify-between items-center p-3 rounded-lg ${achievements.tenRolls ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-white/50 dark:bg-slate-800/50'}`}
                    >
                      <span className="flex items-center">
                        {achievements.tenRolls ? '🏆' : '🔒'} Roll 10 Times
                      </span>
                      {achievements.tenRolls ? '✅' : '❌'}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`flex justify-between items-center p-3 rounded-lg ${achievements.customOptions ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-white/50 dark:bg-slate-800/50'}`}
                    >
                      <span className="flex items-center">
                        {achievements.customOptions ? '🏆' : '🔒'} Add Custom Option
                      </span>
                      {achievements.customOptions ? '✅' : '❌'}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`flex justify-between items-center p-3 rounded-lg ${achievements.allOptions ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-white/50 dark:bg-slate-800/50'}`}
                    >
                      <span className="flex items-center">
                        {achievements.allOptions ? '🏆' : '🔒'} Have 12+ Options
                      </span>
                      {achievements.allOptions ? '✅' : '❌'}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {showTutorial && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="glass rounded-xl p-6"
                >
                  <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    How to Use
                  </h2>
                  <div className="space-y-4 text-left">
                    <div className="p-2 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <p className="font-semibold">1. Ask a Question</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Type your question in the input field that appears.</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <p className="font-semibold">2. Roll the Dice</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Click the "Roll the Dice" button to get your answer.</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <p className="font-semibold">3. Add Custom Options</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Click the ⚙️ button to add your own options.</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <p className="font-semibold">4. View History & Stats</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Use the 📜 and 📊 buttons to see your roll history and statistics.</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <p className="font-semibold">5. Earn Achievements</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Complete various tasks to unlock achievements!</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <p className="font-semibold">6. Try the Konami Code</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">↑↑↓↓←→←→BA</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
