"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, ArrowLeft, Gift, Sparkles, Star, Baby } from "lucide-react";
import Link from "next/link";

const teddyMessages = [
  {
    id: 1,
    name: "Cuddly Bear",
    emoji: "🧸",
    message: "I want to be your teddy bear - always here to hug you when you're sad",
    color: "from-brown-400 to-amber-400"
  },
  {
    id: 2,
    name: "Protective Bear", 
    emoji: "🐻",
    message: "Like a teddy bear, I'll always protect you from bad dreams",
    color: "from-amber-400 to-yellow-400"
  },
  {
    id: 3,
    name: "Soft Teddy",
    emoji: "🐻‍❄️",
    message: "You're softer than the fluffiest teddy bear I've ever held",
    color: "from-blue-400 to-cyan-400"
  },
  {
    id: 4,
    name: "Forever Bear",
    emoji: "🧸",
    message: "Teddy bears last forever, just like my love for you",
    color: "from-pink-400 to-rose-400"
  },
  {
    id: 5,
    name: "Sleepy Bear",
    emoji: "😴",
    message: "I want to be the last thing you hold like a teddy bear every night",
    color: "from-purple-400 to-indigo-400"
  }
];

export default function TeddyDay() {
  const [floatingTeddies, setFloatingTeddies] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);
  const [selectedTeddy, setSelectedTeddy] = useState<typeof teddyMessages[0] | null>(null);
  const [cuddleMode, setCuddleMode] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const teddies = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      emoji: ["🧸", "🐻", "🐻‍❄️", "🧸", "🧺"][Math.floor(Math.random() * 5)]
    }));
    setFloatingTeddies(teddies);

    const heartArray = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10
    }));
    setHearts(heartArray);
  }, []);

  const triggerTeddyConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#8B4513', '#D2691E', '#FF69B4', '#FFB6C1', '#DDA0DD']
    });
  };

  const handleTeddyClick = (teddy: typeof teddyMessages[0]) => {
    setSelectedTeddy(teddy);
    triggerTeddyConfetti();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 overflow-hidden relative">
      {/* Floating Hearts Background */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-300 opacity-40"
          style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          animate={{ 
            scale: [0, 1.2, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{ 
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          <Heart size={20} fill="currentColor" />
        </motion.div>
      ))}

      {/* Floating Teddy Bears */}
      {floatingTeddies.map((teddy) => (
        <motion.div
          key={teddy.id}
          className="absolute text-4xl opacity-60 cursor-pointer"
          style={{ left: `${teddy.x}%`, top: `${teddy.y}%` }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        >
          {teddy.emoji}
        </motion.div>
      ))}

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ArrowLeft size={20} className="text-blue-500" />
              <span className="text-gray-700 font-medium">Back to Valentine Week</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Main Content */}
        <div className="text-center max-w-6xl mx-auto">
          {/* Date Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full shadow-lg">
              <Baby size={24} />
              <span className="font-bold text-lg">February 10 - Teddy Day</span>
              <Baby size={24} />
            </div>
          </motion.div>

          {/* Main Teddy Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-9xl"
            >
              🧸
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4"
          >
            My Cuddly Teddy Bear, Anuu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 mb-8"
          >
            Choose your teddy bear and discover why I want to be your forever cuddle buddy 💕
          </motion.p>

          {/* Teddy Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          >
            {teddyMessages.map((teddy) => (
              <motion.button
                key={teddy.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleTeddyClick(teddy)}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border-2 border-blue-200 hover:border-blue-400"
              >
                <div className="text-4xl mb-2">{teddy.emoji}</div>
                <div className="font-semibold text-gray-800 text-sm">{teddy.name}</div>
              </motion.button>
            ))}
          </motion.div>

          {/* Selected Teddy Message */}
          <AnimatePresence>
            {selectedTeddy && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-8"
              >
                <div className={`bg-gradient-to-r ${selectedTeddy.color} rounded-2xl p-8 shadow-xl text-white`}>
                  <div className="text-6xl mb-4">{selectedTeddy.emoji}</div>
                  
                  <h3 className="text-2xl font-bold mb-4">
                    {selectedTeddy.name} Teddy! 🧸
                  </h3>
                  
                  <p className="text-lg leading-relaxed mb-6">
                    {selectedTeddy.message}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCuddleMode(true)}
                    className="px-6 py-3 bg-white text-gray-800 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    Cuddle With Me! 🤗
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cuddle Mode */}
          <AnimatePresence>
            {cuddleMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setCuddleMode(false)}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-12 max-w-2xl w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-8xl mb-6"
                    >
                      🧸🤗💕
                    </motion.div>

                    <h2 className="text-3xl font-bold text-purple-700 mb-4">
                      Virtual Cuddle Mode! 🤗
                    </h2>
                    
                    <p className="text-xl text-gray-700 leading-relaxed mb-6">
                      Imagine I'm wrapping my arms around you right now, my sweet Anuu. 
                      Like your favorite teddy bear, I'm here to:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
                      <div className="bg-white/80 rounded-xl p-4">
                        <Heart size={24} className="text-red-500 mb-2" fill="currentColor" />
                        <p className="font-semibold text-gray-800">Keep you warm</p>
                      </div>
                      <div className="bg-white/80 rounded-xl p-4">
                        <Star size={24} className="text-yellow-500 mb-2" fill="currentColor" />
                        <p className="font-semibold text-gray-800">Make you feel safe</p>
                      </div>
                      <div className="bg-white/80 rounded-xl p-4">
                        <Sparkles size={24} className="text-purple-500 mb-2" />
                        <p className="font-semibold text-gray-800">Comfort you always</p>
                      </div>
                      <div className="bg-white/80 rounded-xl p-4">
                        <Gift size={24} className="text-pink-500 mb-2" />
                        <p className="font-semibold text-gray-800">Love you forever</p>
                      </div>
                    </div>
                    
                    <p className="text-2xl font-bold text-purple-600 mb-4">
                      I love cuddling with you, Anuu! 🧸💕
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCuddleMode(false)}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Best Cuddle Ever! 🤗💕
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation to Next Day */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/promise-day">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
              >
                <span>Tomorrow: Promise Day 🤝</span>
                <span>→</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
