"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, ArrowLeft, Flower, Sparkles, X } from "lucide-react";
import Link from "next/link";

const roseMessages = [
  {
    id: 1,
    message: "My first rose for your beautiful smile that brightens my world 🌹",
    color: "from-red-400 to-pink-400"
  },
  {
    id: 2,
    message: "This rose represents your kindness that touches everyone's heart 🌹",
    color: "from-pink-400 to-rose-400"
  },
  {
    id: 3,
    message: "A rose for your intelligence that amazes me every day 🌹",
    color: "from-rose-400 to-red-400"
  },
  {
    id: 4,
    message: "This one's for your laughter that's my favorite melody 🌹",
    color: "from-red-500 to-pink-500"
  },
  {
    id: 5,
    message: "A rose for your strength that inspires me endlessly 🌹",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 6,
    message: "This rose represents your beauty that takes my breath away 🌹",
    color: "from-rose-500 to-red-500"
  },
  {
    id: 7,
    message: "The final rose for my eternal love for you, my Anuu 🌹💕",
    color: "from-red-600 to-pink-600"
  }
];

export default function RoseDay() {
  const [floatingRoses, setFloatingRoses] = useState<Array<{ id: number; x: number; y: number; delay: number; isSpecial: boolean }>>([]);
  const [clickedRoses, setClickedRoses] = useState<Set<number>>(new Set());
  const [selectedMessage, setSelectedMessage] = useState<typeof roseMessages[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [allRosesFound, setAllRosesFound] = useState(false);
  const [showSpecialSurprise, setShowSpecialSurprise] = useState(false);
  const [petals, setPetals] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Create many floating roses (including decoy roses)
    const roses = Array.from({ length: 25 }, (_, i) => {
      const isSpecial = i < 7; // First 7 are the special roses
      return {
        id: i + 1,
        x: Math.random() * 90 + 5,
        y: Math.random() * 80 + 10,
        delay: Math.random() * 5,
        isSpecial
      };
    });
    setFloatingRoses(roses);

    // Create falling petals
    const petalArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: ['#FF69B4', '#FF1493', '#FF6B9D', '#C71585', '#FFB6C1'][Math.floor(Math.random() * 5)]
    }));
    setPetals(petalArray);

    // Create sparkles
    const sparkleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10
    }));
    setSparkles(sparkleArray);
  }, []);

  const handleRoseClick = (roseId: number, isSpecial: boolean) => {
    if (isSpecial) {
      const message = roseMessages.find(m => m.id === roseId);
      if (message && !clickedRoses.has(roseId)) {
        setClickedRoses(prev => new Set([...prev, roseId]));
        setSelectedMessage(message);
        setShowModal(true);
        triggerRoseConfetti();
        
        // Check if all special roses are found
        if (clickedRoses.size + 1 === 7) {
          setTimeout(() => {
            setAllRosesFound(true);
            triggerSpecialConfetti();
          }, 1000);
        }
      }
    } else {
      // Decoy rose - show a small animation
      const rose = document.getElementById(`rose-${roseId}`);
      if (rose) {
        rose.style.transform = 'scale(0.8)';
        setTimeout(() => {
          rose.style.transform = 'scale(1)';
        }, 200);
      }
    }
  };

  const triggerRoseConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const triggerSpecialConfetti = () => {
    // Multiple confetti bursts for special celebration
    const bursts = [
      { origin: { y: 0.3 }, particleCount: 200, spread: 120 },
      { origin: { y: 0.6 }, particleCount: 150, spread: 100 },
      { origin: { y: 0.9 }, particleCount: 100, spread: 80 }
    ];
    
    bursts.forEach((burst, index) => {
      setTimeout(() => {
        confetti({
          ...burst,
          colors: ['#FFD700', '#FF69B4', '#FF1493', '#FF6B9D', '#C71585', '#FFB6C1']
        });
      }, index * 300);
    });
  };

  const closeMessage = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 overflow-hidden relative">
      {/* Floating Sparkles */}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute text-yellow-300 opacity-80"
          style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0, 0.9, 0],
            rotate: [0, 180]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          <Sparkles size={16} fill="currentColor" />
        </motion.div>
      ))}

      {/* Falling Rose Petals */}
      {petals.map(petal => (
        <motion.div
          key={petal.id}
          className="absolute text-pink-400 opacity-70"
          style={{ left: `${petal.x}%` }}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{ 
            y: window.innerHeight + 50, 
            opacity: [0, 0.7, 0],
            rotate: [0, 180, 360],
            x: [0, 30, -30, 0]
          }}
          transition={{ 
            duration: 8 + Math.random() * 3, 
            ease: "linear",
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          🌹
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
              <ArrowLeft size={20} className="text-red-500" />
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
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-full shadow-lg">
              <Flower size={24} />
              <span className="font-bold text-lg">February 7 - Rose Day</span>
              <Flower size={24} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4"
          >
            7 Roses for My Beautiful Anuu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 mb-4"
          >
            Find the 7 special roses among the floating garden! 💕
          </motion.p>

          {/* Progress Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Special Roses Found</span>
                <span className="text-sm font-bold text-red-600">{clickedRoses.size}/7</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-red-400 to-pink-400 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(clickedRoses.size / 7) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Floating Roses */}
          <div className="relative h-96 mb-8">
            {floatingRoses.map((rose) => (
              <motion.div
                key={rose.id}
                className="absolute cursor-pointer"
                style={{ 
                  left: `${rose.x}%`, 
                  top: `${rose.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: 1,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 3 + rose.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: rose.delay
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRoseClick(rose.id, rose.isSpecial)}
              >
                <div className="relative">
                  <span className="text-5xl filter drop-shadow-lg">
                    🌹
                  </span>
                  {clickedRoses.has(rose.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                    >
                      <Heart size={16} className="text-white" fill="currentColor" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Roses Discovered</span>
                <span className="text-sm font-bold text-red-600">{clickedRoses.size}/7</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-red-400 to-pink-400 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(clickedRoses.size / 7) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Completion Message */}
          {clickedRoses.size === 7 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-2xl p-8 shadow-xl border-2 border-pink-300">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-4"
                >
                  <Sparkles size={40} className="text-yellow-500 mx-auto" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-red-600 mb-4">
                  All 7 Roses Discovered! 🌹💕
                </h3>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  My dear Anuu, you've unlocked all my heart's messages! Each rose represents 
                  a different aspect of why I love you so much. Together, they form the 
                  complete picture of my eternal love for you.
                </p>
                
                <div className="mt-6 text-4xl">
                  🌹💕✨🌹💕✨
                </div>
              </div>
            </motion.div>
          )}

          {/* Special Surprise - All Roses Found */}
          <AnimatePresence>
            {allRosesFound && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-yellow-100 via-pink-100 to-red-100 rounded-3xl p-10 shadow-2xl border-2 border-yellow-300"
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
                    className="mb-6"
                  >
                    <div className="text-8xl">🌹💕✨</div>
                  </motion.div>
                  
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
                    🎉 CONGRATULATIONS, MY ANUU! 🎉
                  </h2>
                  
                  <p className="text-xl text-gray-800 leading-relaxed mb-6">
                    You found all 7 special roses! Each one represents a different part of why I love you so much. 
                    But this is just the beginning...
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/80 rounded-xl p-4">
                      <div className="text-2xl mb-2">💖</div>
                      <h3 className="font-bold text-red-700 mb-1">Your Smile</h3>
                      <p className="text-sm text-gray-600">Brightens my entire world</p>
                    </div>
                    <div className="bg-white/80 rounded-xl p-4">
                      <div className="text-2xl mb-2">🌟</div>
                      <h3 className="font-bold text-pink-700 mb-1">Your Kindness</h3>
                      <p className="text-sm text-gray-600">Touches everyone's heart</p>
                    </div>
                    <div className="bg-white/80 rounded-xl p-4">
                      <div className="text-2xl mb-2">🧠</div>
                      <h3 className="font-bold text-purple-700 mb-1">Your Intelligence</h3>
                      <p className="text-sm text-gray-600">Amazes me every day</p>
                    </div>
                    <div className="bg-white/80 rounded-xl p-4">
                      <div className="text-2xl mb-2">🎵</div>
                      <h3 className="font-bold text-indigo-700 mb-1">Your Laughter</h3>
                      <p className="text-sm text-gray-600">My favorite melody</p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSpecialSurprise(true)}
                    className="px-8 py-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    🎁 Open Your Special Surprise! 🎁
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Special Surprise Modal */}
          <AnimatePresence>
            {showSpecialSurprise && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setShowSpecialSurprise(false)}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 rounded-3xl p-12 max-w-3xl w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.5, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="mb-8"
                    >
                      <div className="text-9xl">💝🌹💕</div>
                    </motion.div>

                    <h2 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
                      My Eternal Promise, Anuu
                    </h2>
                    
                    <div className="bg-white/80 rounded-2xl p-8 mb-6">
                      <p className="text-xl text-gray-800 leading-relaxed mb-4">
                        These 7 roses are just symbols of my infinite love for you. 
                        Every day with you feels like Valentine's Day, and every moment with you is more precious than any rose.
                      </p>
                      
                      <p className="text-xl text-gray-800 leading-relaxed mb-4">
                        I promise to:
                      </p>
                      
                      <ul className="text-left text-gray-700 space-y-2 mb-6 max-w-md mx-auto">
                        <li className="flex items-center gap-2">
                          <span className="text-2xl">🌹</span>
                          <span>Love you more each passing day</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-2xl">🌹</span>
                          <span>Cherish every moment with you</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-2xl">🌹</span>
                          <span>Be your forever Valentine</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-2xl">🌹</span>
                          <span>Make you the happiest person in the world</span>
                        </li>
                      </ul>
                      
                      <p className="text-2xl font-bold text-red-600 text-center">
                        You are my everything, Anuu! 💕
                      </p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSpecialSurprise(false)}
                      className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      I Love You Forever, My Anuu! 🌹💕
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message Modal */}
          <AnimatePresence>
            {selectedMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={closeMessage}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`text-4xl`}>�</div>
                    <button
                      onClick={closeMessage}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${selectedMessage.color} text-white text-sm font-medium mb-4`}>
                    Rose {selectedMessage.id} of 7
                  </div>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {selectedMessage.message}
                  </p>
                  
                  <div className="mt-6 text-center">
                    <Heart size={32} className="text-red-500 mx-auto" fill="currentColor" />
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
            <Link href="/propose-day">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
              >
                <span>Tomorrow: Propose Day 💍</span>
                <span>→</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
