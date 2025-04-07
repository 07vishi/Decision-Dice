import React, { useState, useRef } from 'react';

export default function InputForm({ addChoice, theme, themeClasses }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(); // Reference to input for auto-focus

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addChoice(input.trim());
      setInput('');
      inputRef.current.focus(); // Auto-focus after submit
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
      <input
        ref={inputRef} // Reference to input for auto-focus
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a choice..."
        className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl glass-effect ${themeClasses.text} ${themeClasses.placeholder} focus:outline-none focus:ring-2 ${themeClasses.focus} focus:border-transparent transition-all duration-300 hover-lift text-sm sm:text-base backdrop-blur-sm border ${themeClasses.border} shadow-lg ${themeClasses.shadow}`}
      />
      <button 
        type="submit"
        disabled={!input.trim()}
        className={`px-4 sm:px-6 py-2.5 sm:py-3 glass-effect ${themeClasses.text} rounded-xl hover:${themeClasses.glass} transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover-lift text-sm sm:text-base backdrop-blur-sm border ${themeClasses.border} shadow-lg ${themeClasses.shadow} relative overflow-hidden group`}
      >
        <span className="relative z-10">Add</span>
        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
    </form>
  );
}
