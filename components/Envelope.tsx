import React, { useState } from 'react';

interface EnvelopeProps {
  isOpen: boolean;
  onToggle: () => void;
  message: string;
  imageUrl: string;
}

type FocusMode = 'none' | 'letter' | 'photo';

const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onToggle, message, imageUrl }) => {
  const [focus, setFocus] = useState<FocusMode>('none');

  const handleItemClick = (mode: FocusMode, e: React.MouseEvent) => {
    e.stopPropagation();
    setFocus(focus === mode ? 'none' : mode);
  };

  return (
    <div className="relative w-[320px] h-[220px] md:w-[600px] md:h-[400px] flex items-center justify-center">
      
      {/* Cinematic Blur Backdrop */}
      <div 
        className={`fixed inset-0 bg-[#020617]/95 backdrop-blur-xl transition-opacity duration-1000 pointer-events-none ${focus !== 'none' ? 'opacity-100 z-[50]' : 'opacity-0 z-0'}`}
      />

      {/* 
        ========================================
        THE LETTER
        ========================================
      */}
      <div 
        onClick={(e) => handleItemClick('letter', e)}
        className={`absolute bg-[#fffef5] transition-all duration-1000 cubic-bezier(0.19,1,0.22,1) cursor-pointer
          ${isOpen 
            ? (focus === 'letter' 
                ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] md:w-[680px] h-[85vh] md:h-[880px] z-[60] rotate-0 scale-100 shadow-[0_80px_150px_rgba(0,0,0,1)]' 
                : (focus === 'photo' 
                    ? 'opacity-0 scale-50 pointer-events-none z-0'
                    : 'top-1/2 left-1/2 -translate-x-[95%] -translate-y-[85%] md:-translate-x-[115%] md:-translate-y-[95%] w-[250px] md:w-[480px] h-[340px] md:h-[650px] z-[30] rotate-[-14deg] scale-100 opacity-100 shadow-2xl hover:rotate-[-6deg] hover:-translate-y-[100%] md:hover:-translate-y-[110%]'))
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 scale-50 z-0 pointer-events-none'}
        `}
      >
        <div className="w-full h-full flex flex-col p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-4 border-[3px] border-amber-600/20 pointer-events-none"></div>
          
          <div className="flex-shrink-0 text-center mb-10 relative">
            <h2 className="font-['Playfair_Display'] text-rose-950 text-4xl md:text-7xl italic font-bold tracking-tight mb-4">Dearest Nutty</h2>
            <div className="w-40 md:w-80 h-[1.5px] bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mx-auto"></div>
          </div>

          <div className={`flex-grow overflow-y-auto scrollbar-hide px-4 md:px-12 text-center transition-opacity duration-700 ${focus === 'letter' ? 'opacity-100' : 'opacity-40'}`}>
            <p className="font-['Dancing_Script'] text-slate-900 text-3xl md:text-5xl leading-relaxed md:leading-[2.4] font-bold whitespace-pre-wrap pb-16">
              {message}
            </p>
            <div className="mt-12 mb-16 flex flex-col items-center">
               <div className="text-5xl animate-pulse">🥂</div>
               <span className="font-['Montserrat'] text-[10px] md:text-sm tracking-[1em] uppercase text-amber-900 font-black mt-8">My Nutty Always</span>
            </div>
          </div>

          {focus === 'letter' && (
            <button 
              onClick={(e) => { e.stopPropagation(); setFocus('none'); }}
              className="absolute top-8 right-8 w-12 h-12 bg-rose-950 text-white rounded-full flex items-center justify-center font-bold z-[70] border-2 border-amber-500/20 shadow-xl"
            >✕</button>
          )}
        </div>
      </div>

      {/* 
        ========================================
        THE PHOTO
        ========================================
      */}
      <div 
        onClick={(e) => handleItemClick('photo', e)}
        className={`absolute bg-white p-5 md:p-10 pb-20 md:pb-36 transition-all duration-1000 cubic-bezier(0.19,1,0.22,1) cursor-pointer
          ${isOpen 
            ? (focus === 'photo' 
                ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88vw] md:w-[580px] aspect-[3/4.2] z-[60] rotate-0 scale-100 shadow-[0_80px_150px_rgba(0,0,0,1)]' 
                : (focus === 'letter' 
                    ? 'opacity-0 scale-50 pointer-events-none z-0'
                    : 'top-1/2 left-1/2 -translate-x-[5%] -translate-y-[80%] md:-translate-x-[0%] md:-translate-y-[90%] w-[230px] md:w-[420px] aspect-[4/5.5] z-[31] rotate-[18deg] scale-100 opacity-100 shadow-2xl hover:rotate-[8deg] hover:-translate-y-[90%] md:hover:-translate-y-[100%]'))
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 scale-50 z-0 pointer-events-none'}
        `}
      >
        <div className="w-full h-full bg-slate-100 overflow-hidden relative shadow-inner border border-slate-200">
           <img src={imageUrl} alt="Memory" className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div className="absolute bottom-6 md:bottom-12 left-0 w-full text-center">
           <span className="font-['Dancing_Script'] text-4xl md:text-7xl text-slate-900 font-bold block mb-2">My Nutty</span>
           <span className="font-['Montserrat'] text-[8px] md:text-xs tracking-[0.8em] text-rose-800 uppercase font-black opacity-60">2026 MASTERPIECE</span>
        </div>
        {focus === 'photo' && (
          <button 
            onClick={(e) => { e.stopPropagation(); setFocus('none'); }}
            className="absolute top-8 right-8 w-12 h-12 bg-white text-rose-950 rounded-full flex items-center justify-center font-bold z-[70] border-2 border-slate-200 shadow-xl"
          >✕</button>
        )}
      </div>

      {/* ENVELOPE BODY */}
      <div 
        className={`absolute inset-0 bg-[#801b1b] rounded-b-[30px] md:rounded-b-[50px] shadow-[0_40px_100px_rgba(0,0,0,0.9)] cursor-pointer transition-all duration-1000 ${focus !== 'none' ? 'opacity-0 scale-90 blur-3xl pointer-events-none' : 'opacity-100 z-[20]'}`}
        onClick={onToggle}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        {/* Front Flap Clip */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: 'polygon(0% 0%, 50% 70%, 100% 0%, 100% 100%, 0% 100%)',
            background: 'linear-gradient(145deg, #a81c1c, #5c0000)',
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
          }}
        >
          {/* THE SEAL */}
          <div className={`absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${isOpen ? 'opacity-0 scale-150 blur-lg' : 'opacity-100 scale-100 rotate-[-5deg]'}`}>
            <div className="w-24 h-24 md:w-40 md:h-40 bg-[#ffcc33] rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.7)] border-[8px] border-[#f59e0b] flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-black/20"></div>
               <span className="font-['Great_Vibes'] text-rose-950 text-5xl md:text-9xl relative z-10 drop-shadow-md">N</span>
               {/* Seal shimmer effect */}
               <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-[45deg] animate-[shimmer_3s_infinite] transition-transform"></div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP FLAP */}
      <div 
        className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out origin-top
          ${isOpen ? 'rotate-x-180 z-0 opacity-0' : 'rotate-x-0 z-[30]'}
        `}
      >
        <div className="w-full h-0 border-l-[160px] md:border-l-[300px] border-l-transparent border-r-[160px] md:border-r-[300px] border-r-transparent border-t-[130px] md:border-t-[230px] border-t-[#8c1313]"></div>
      </div>

    </div>
  );
};

export default Envelope;