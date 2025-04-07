import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import InputForm from './components/InputForm';

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

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [windowSize.width, windowSize.height];
}

function App() {
  const [choices, setChoices] = useState([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [history, setHistory] = useState([]);
  const [isDeciding, setIsDeciding] = useState(false);
  const [windowWidth, windowHeight] = useWindowSize();
  const [theme, setTheme] = useState('dark'); // Changed default to dark

  // Load saved choices and theme from localStorage
  useEffect(() => {
    const savedChoices = localStorage.getItem('decisionDiceChoices');
    const savedTheme = localStorage.getItem('decisionDiceTheme') || 'dark'; // Default to 'dark' if no theme in localStorage
    if (savedChoices) {
      setChoices(JSON.parse(savedChoices));
    }
    setTheme(savedTheme);
  }, []);

  // Save choices and theme to localStorage
  useEffect(() => {
    localStorage.setItem('decisionDiceChoices', JSON.stringify(choices));
    localStorage.setItem('decisionDiceTheme', theme);
  }, [choices, theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setChoices([...choices, input.trim()]);
      setInput('');
    }
  };

  const deleteChoice = (index) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const shuffleChoices = () => {
    setChoices([...choices].sort(() => Math.random() - 0.5));
  };

  const clearAll = () => {
    setChoices([]);
    setResult('');
  };

  const decide = () => {
    if (choices.length === 0) return;
    
    setIsDeciding(true);
    let currentIndex = 0;
    const interval = setInterval(() => {
      setResult(choices[currentIndex]);
      currentIndex = (currentIndex + 1) % choices.length;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalChoice = choices[Math.floor(Math.random() * choices.length)];
      setResult(finalChoice);
      setHistory((prevHistory) => [finalChoice, ...prevHistory].slice(0, 10)); // Limit history to 10 items
      setShowConfetti(true);
      setIsDeciding(false);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 2000);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const themeClasses = {
    dark: {
      bg: 'from-gray-900 via-gray-800 to-gray-900',
      text: 'text-gray-200',
      border: 'border-gray-700/20',
      shadow: 'shadow-gray-900/10',
      gradient: 'from-gray-700 to-gray-800',
      glass: 'bg-gray-900/30',
    },
    light: {
      bg: 'from-blue-50 via-indigo-50 to-purple-50',
      text: 'text-gray-800',
      border: 'border-gray-300/20',
      shadow: 'shadow-gray-400/10',
      gradient: 'from-blue-400 to-indigo-500',
      glass: 'bg-white/30',
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            🎲 Decision Dice
          </h1>
          <p className="text-white/80 text-lg">Let fate decide for you!</p>
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="glass-effect rounded-2xl p-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add your choice..."
              className="w-full bg-transparent text-white placeholder-white/60 px-4 py-3 rounded-xl focus:outline-none"
            />
          </div>
        </form>

        {/* Choices */}
        <div className="space-y-3 mb-6">
          {choices.map((choice, index) => (
            <div
              key={index}
              className="choice-card flex items-center justify-between group"
            >
              <span className="text-white">{choice}</span>
              <button
                onClick={() => deleteChoice(index)}
                className="text-white/60 hover:text-white/90 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Decision button */}
        <button
          onClick={decide}
          disabled={choices.length === 0 || isDeciding}
          className="primary-button w-full"
        >
          {isDeciding ? 'Deciding...' : choices.length === 0 ? 'Add some choices first!' : 'Decide For Me!'}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-8 text-center animate-float">
            <div className="glass-effect rounded-2xl p-6 inline-block">
              <div className="text-white/80 text-lg mb-2">🎉 The chosen one is:</div>
              <div className="text-white text-2xl font-bold">{result}</div>
            </div>
          </div>
        )}

        {/* Confetti effect */}
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        )}
      </div>
    </div>
  );
}

export default App;
