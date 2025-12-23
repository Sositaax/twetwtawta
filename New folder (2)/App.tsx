import React, { useState, useEffect, useCallback } from 'react';
import Envelope from './components/Envelope.tsx';
import Firework from './components/Firework.tsx';
import Snow from './components/Snow.tsx';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number, type: string }[]>([]);
  
  // High-quality placeholder image if the Discord link is broken, 
  // but keeping your original URL as requested.
  const imageUrl = "https://media.discordapp.net/attachments/773103472127508504/1452838010826653706/IMG_20251223_023551_306.jpg?ex=694b4456&is=6949f2d6&hm=25909b2111bf74a30bf33f2a014dbd59e5019b1eb81b4fc8096ad5f3b6a9aeb6&=&format=webp&width=688&height=1224";

  const message = `My Dearest Nutty,

As 2025 fades and 2026 begins, my heart is full of only one thing: You.

Every single day we spend together feels like a Masterpiece. You are the sparkle in my fireworks and the warmth in my winter. Thank you for being the most incredible person in my life.

My only wish for 2026 is to hold your hand, make you laugh, and love you more than I ever have before. 

You are my everything, Nutty. Let's make this new year as beautiful as you are.

Happy New Year, my love! Forever yours.`;
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    const types = ['❤️', '✨', '⭐', '❄️'];
    const newClick = { 
      id: Date.now(), 
      x: e.clientX, 
      y: e.clientY, 
      type: types[Math.floor(Math.random() * types.length)] 
    };
    setClicks(prev => [...prev.slice(-12), newClick]);
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== newClick.id));
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => setShowFireworks(true), 1200);
    } else {
      setShowFireworks(false);
    }
  };

  return (
    <div 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-[#020617] p-4 overflow-hidden touch-none"
      onClick={handleClick}
      style={{ cursor: 'none' }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_#064e3b_0%,_#450a0a_40%,_#020617_100%)] opacity-80 transition-opacity duration-1000"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>

      <Snow />

      {clicks.map(click => (
        <div 
          key={click.id}
          className="fixed pointer-events-none animate-ping z-[9999] text-2xl md:text-4xl opacity-90"
          style={{ left: click.x - 20, top: click.y - 20 }}
        >
          {click.type}
        </div>
      ))}

      <div 
        className="fixed w-16 h-16 z-[9999] pointer-events-none transition-transform duration-75 ease-out hidden md:flex items-center justify-center" 
        style={{ left: cursorPos.x - 32, top: cursorPos.y - 32 }} 
      >
        <div className="relative">
          <div className="absolute inset-0 animate-spin text-amber-300/30 text-6xl" style={{ animationDuration: '8s' }}>✦</div>
          <div className="text-white text-3xl animate-pulse drop-shadow-[0_0_15px_#fff]">💖</div>
        </div>
      </div>

      {showFireworks && <Firework />}

      <div className={`z-10 text-center transition-all duration-1000 ease-in-out ${isOpen ? 'translate-y-[-20vh] opacity-20 scale-75 blur-[2px]' : 'translate-y-0 opacity-100 scale-100'} mb-8 pointer-events-none`}>
        <div className="flex items-center justify-center gap-2 mb-[-15px]">
          <span className="text-3xl animate-bounce">🎇</span>
          <span className="text-3xl animate-bounce delay-150">🥂</span>
          <span className="text-3xl animate-bounce delay-300">🎉</span>
        </div>
        <h1 className="text-8xl md:text-[13rem] font-['Great_Vibes'] gold-shimmer drop-shadow-2xl leading-tight py-4">
          Nutty
        </h1>
        <div className="flex items-center justify-center gap-6 mt-[-10px]">
          <span className="h-[1px] w-12 md:w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></span>
          <p className="text-amber-100/90 font-['Montserrat'] tracking-[0.8em] uppercase text-[10px] md:text-sm font-black italic">
            A 2026 Masterpiece
          </p>
          <span className="h-[1px] w-12 md:w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></span>
        </div>
      </div>

      <div className="relative z-20 flex items-center justify-center">
        <Envelope 
          isOpen={isOpen} 
          onToggle={toggleEnvelope} 
          message={message}
          imageUrl={imageUrl}
        />
      </div>

      <div className={`mt-24 md:mt-32 z-30 transition-all duration-700 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <p className="text-amber-200/90 font-['Montserrat'] tracking-[0.5em] text-[10px] md:text-xs uppercase font-black animate-pulse text-center">
              Tap the seal, Nutty
            </p>
          </div>
          <div className="text-4xl animate-bounce mt-2 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">👇</div>
        </div>
      </div>

      <footer className="absolute bottom-6 w-full text-center text-amber-200/20 font-['Montserrat'] tracking-[1.2em] text-[8px] md:text-[10px] uppercase font-black">
        HAPPY NEW YEAR 2026 • FOR NUTTY
      </footer>
    </div>
  );
};

export default App;