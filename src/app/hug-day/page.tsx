"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, ArrowLeft, Users, Sparkles, Star } from "lucide-react";
import Link from "next/link";

const hugTypes = [
  {
    id: 1,
    name: "Warm Hug",
    emoji: "🤗",
    description: "A hug that warms your heart and soul",
    color: "from-orange-400 to-red-400",
    image: "/images/hug1.jpg"
  },
  {
    id: 2,
    name: "Tight Hug",
    emoji: "🫂",
    description: "When I never want to let you go",
    color: "from-red-400 to-pink-400",
    image: "/images/hug2.jpg"
  },
  {
    id: 3,
    name: "Gentle Hug",
    emoji: "🤗",
    description: "Soft and caring, just for my Anuu",
    color: "from-pink-400 to-rose-400",
    image: "/images/hug3.jpg"
  },
  {
    id: 4,
    name: "Bear Hug",
    emoji: "🐻",
    description: "Big and strong, to keep you safe",
    color: "from-brown-400 to-amber-400",
    image: "/images/hug4.jpg"
  },
  {
    id: 5,
    name: "Surprise Hug",
    emoji: "💝",
    description: "When you least expect it but need it most",
    color: "from-purple-400 to-indigo-400",
    image: "/images/hug5.jpg"
  }
];

export default function HugDay() {
  const [selectedHug, setSelectedHug] = useState<typeof hugTypes[0] | null>(null);
  const [hugMode, setHugMode] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [specialHugMode, setSpecialHugMode] = useState(false);

  useEffect(() => {
    const hearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10
    }));
    setFloatingHearts(hearts);
  }, []);

  const triggerHugConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#FF6B9D', '#FFA500', '#FFB6C1']
    });
  };

  const handleHugClick = (hug: typeof hugTypes[0]) => {
    setSelectedHug(hug);
    triggerHugConfetti();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-100 overflow-hidden relative">
      {/* Floating Hearts Background */}
      {floatingHearts.map(heart => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-300 opacity-50"
          style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0, 0.6, 0],
            x: [0, 30, -30, 0]
          }}
          transition={{ 
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          <Heart size={20} fill="currentColor" />
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
              <ArrowLeft size={20} className="text-orange-500" />
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
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full shadow-lg">
              <Users size={24} />
              <span className="font-bold text-lg">February 12 - Hug Day</span>
              <Users size={24} />
            </div>
          </motion.div>

          {/* Main Hug Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-9xl"
            >
              🤗
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4"
          >
            Warm Hugs for My Anuu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 mb-8"
          >
            Choose your favorite hug and feel my warmth 💕
          </motion.p>

          {/* Hug Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          >
            {hugTypes.map((hug) => (
              <motion.button
                key={hug.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleHugClick(hug)}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border-2 border-orange-200 hover:border-orange-400"
              >
                <div className="text-4xl mb-2">{hug.emoji}</div>
                <div className="font-semibold text-gray-800 text-sm">{hug.name}</div>
              </motion.button>
            ))}
          </motion.div>

          {/* Selected Hug Message */}
          <AnimatePresence>
            {selectedHug && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-8"
              >
                <div className={`bg-gradient-to-r ${selectedHug.color} rounded-2xl p-8 shadow-xl text-white`}>
                  <div className="text-6xl mb-4">{selectedHug.emoji}</div>
                  
                  <h3 className="text-2xl font-bold mb-4">
                    {selectedHug.name} Hug! 🤗
                  </h3>
                  
                  <p className="text-lg leading-relaxed mb-6">
                    {selectedHug.description}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setHugMode(true)}
                    className="px-6 py-3 bg-white text-gray-800 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    Give Me This Hug! 🤗
                  </motion.button>
                  
                  {selectedHug.image && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6"
                    >
                      <img 
                        src={selectedHug.image} 
                        alt={selectedHug.name}
                        className="w-full h-48 object-cover rounded-xl shadow-lg"
                        onError={(e) => {
                          e.currentTarget.src = `https://picsum.photos/seed/${selectedHug.name}/400/300.jpg`;
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Virtual Hug Mode */}
          <AnimatePresence>
            {hugMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setHugMode(false)}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-12 max-w-2xl w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.4, 1],
                        rotate: [0, 15, -15, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-8xl mb-6"
                    >
                      🤗💕
                    </motion.div>

                    <h2 className="text-3xl font-bold text-orange-700 mb-4">
                      Virtual Hug Mode! 🤗
                    </h2>
                    
                    <p className="text-xl text-gray-700 leading-relaxed mb-6">
                      Close your eyes and imagine I'm wrapping my arms around you right now, my sweet Anuu. 
                      Feel the warmth, the safety, the love...
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
                      <div className="bg-white/80 rounded-xl p-4">
                        <Heart size={24} className="text-red-500 mb-2" />
                        <p className="font-semibold text-gray-800">Warmth of my love</p>
                      </div>
                      <div className="bg-white/80 rounded-xl p-4">
                        <Star size={24} className="text-yellow-500 mb-2" />
                        <p className="font-semibold text-gray-800">Safety in my arms</p>
                      </div>
                      <div className="bg-white/80 rounded-xl p-4">
                        <Sparkles size={24} className="text-orange-500 mb-2" />
                        <p className="font-semibold text-gray-800">Comfort for your heart</p>
                      </div>
                      <div className="bg-white/80 rounded-xl p-4">
                        <Users size={24} className="text-pink-500 mb-2" />
                        <p className="font-semibold text-gray-800">Forever together</p>
                      </div>
                    </div>
                    
                    <p className="text-2xl font-bold text-orange-600 mb-4">
                      I love hugging you, Anuu! 🤗💕
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setHugMode(false);
                        setSpecialHugMode(true);
                        triggerHugConfetti();
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Best Hug Ever! 🤗💕
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Special Tight Hug Message */}
          <AnimatePresence>
            {specialHugMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setSpecialHugMode(false)}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="bg-gradient-to-br from-pink-50 via-red-50 to-orange-50 rounded-3xl p-12 max-w-3xl w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.4, 1],
                        rotate: [0, 15, -15, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="mb-8"
                    >
                      <div className="text-9xl">��🤗💕</div>
                    </motion.div>

                    <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent mb-6">
                      My Special Promise, Anuu
                    </h2>
                    
                    <div className="bg-white/90 rounded-2xl p-8 mb-6">
                      <p className="text-2xl text-gray-800 leading-relaxed mb-6">
                        Whenever I meet you, I'm going to give you the tightest hug ever! 🫂
                      </p>
                      
                      <p className="text-xl text-gray-700 leading-relaxed mb-4">
                        I'll hold you so close that you can feel my heartbeat, so warm that you'll never be cold, 
                        and so tight that all your worries will disappear.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-xl p-4">
                          <div className="text-3xl mb-2">🫂</div>
                          <h3 className="font-bold text-red-700 mb-1">Tightest Hug</h3>
                          <p className="text-sm text-gray-600">When I see you</p>
                        </div>
                        <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl p-4">
                          <div className="text-3xl mb-2">💕</div>
                          <h3 className="font-bold text-orange-700 mb-1">Never Letting Go</h3>
                          <p className="text-sm text-gray-600">Forever in my arms</p>
                        </div>
                        <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-xl p-4">
                          <div className="text-3xl mb-2">🌹</div>
                          <h3 className="font-bold text-pink-700 mb-1">Warmth & Love</h3>
                          <p className="text-sm text-gray-600">Just for you Anuu</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4">
                          <div className="text-3xl mb-2">✨</div>
                          <h3 className="font-bold text-purple-700 mb-1">Magic Moment</h3>
                          <p className="text-sm text-gray-600">Every time we hug</p>
                        </div>
                      </div>
                      
                      <p className="text-3xl font-bold text-red-600 text-center">
                        I can't wait to hug you tight, my Anuu! 🫂💕
                      </p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSpecialHugMode(false)}
                      className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      I Promise! Tight Hugs Coming! 🫂💕
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
            <Link href="/kiss-day">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
              >
                <span>Tomorrow: Kiss Day 💋</span>
                <span>→</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
