"use client";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function KiboPage() {
  const [noButtonPosition, setNoButtonPosition] = useState(null);
  const [yesScale, setYesScale] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);

  // Sound effects
  const playSound = (url) => {
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Sound error:", e));
  };

  const handleNoInteraction = () => {
    // Play funny sound
    playSound("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3");

    // 1. Perbesar tombol YES
    setYesScale((prev) => prev + 0.4);

    // 2. Pindahkan tombol NO ke posisi acak
    const randomTop = Math.floor(Math.random() * 80) + "%";
    const randomLeft = Math.floor(Math.random() * 80) + "%";
    setNoButtonPosition({ top: randomTop, left: randomLeft });
  };

  const handleYesClick = () => {
    setIsAccepted(true);
    playSound("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3");

    // Confetti effect
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  if (isAccepted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-orange-200 via-pink-100 to-yellow-100 text-center p-6 transition-colors duration-500">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-8 animate-bounce drop-shadow-md">Alhamdulillah! See you pas bukber!!!!!🌙✨</h1>
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3RjZGs4ejVydjd6MWthaDRhaHVteWU4MjdyNGt4bnZscDVvZTZoMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ME9KbRwo2wJGLs2P1d/giphy.gif" alt="Happy" className="rounded-3xl shadow-[0_20px_50px_rgba(255,165,0,0.4)] max-w-xs border-8 border-white transform hover:rotate-3 transition-transform" />
      </div>
    );
  }

  return (
    <main className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-tr from-rose-50 via-pink-50 to-orange-50 p-4 transition-colors duration-500">
      <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWU3OXZpZmdpenZueHplMno2emJydWg1ZjlydjIzc3o1dWU5dHowciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HS8bD9MoiR1moAclgf/giphy.gif" alt="Cute" className="w-56 mb-10 rounded-3xl shadow-[0_15px_35px_rgba(255,182,193,0.3)] border-8 border-white hover:scale-110 transition-transform duration-300" />

      <h1 className="text-2xl md:text-3xl font-extrabold mb-10 text-pink-700 px-6 text-center drop-shadow-sm">
        Mau gak bukber sama aku? 🥺🙏
      </h1>

      <div className="flex items-center gap-6">
        <button
          onClick={handleYesClick}
          style={{ transform: `scale(${yesScale})` }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-10 rounded-full transition-transform duration-200 shadow-lg z-10"
        >
          MAU!
        </button>

        <button
          onMouseEnter={handleNoInteraction}
          onClick={handleNoInteraction}
          style={noButtonPosition ? {
            position: "absolute",
            top: noButtonPosition.top,
            left: noButtonPosition.left,
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
          } : {
            position: "relative",
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-10 rounded-full shadow-md transition-all duration-200"
        >
          Enggak
        </button>
      </div>
    </main>
  );
}