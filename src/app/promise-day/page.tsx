"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, ArrowLeft, Handshake, Sparkles, Star, Infinity } from "lucide-react";
import Link from "next/link";

const promises = [
  {
    id: 1,
    title: "Promise of Forever",
    emoji: "💕",
    promise: "I promise to love you forever and always, through every season of life",
    color: "from-red-400 to-pink-400"
  },
  {
    id: 2,
    title: "Promise of Support", 
    emoji: "🤗",
    promise: "I promise to be your biggest supporter and your safest place to fall",
    color: "from-blue-400 to-cyan-400"
  },
  {
    id: 3,
    title: "Promise of Laughter",
    emoji: "😄",
    promise: "I promise to make you laugh every single day, even when times are tough",
    color: "from-yellow-400 to-orange-400"
  },
  {
    id: 4,
    title: "Promise of Honesty",
    emoji: "🤝",
    promise: "I promise to always be honest with you, even when the truth is hard",
    color: "from-green-400 to-teal-400"
  },
  {
    id: 5,
    title: "Promise of Adventure",
    emoji: "🌟",
    promise: "I promise to never stop exploring and adventuring with you",
    color: "from-purple-400 to-indigo-400"
  },
  {
    id: 6,
    title: "Promise of Growth",
    emoji: "🌱",
    promise: "I promise to grow with you and help you become your best self",
    color: "from-pink-400 to-rose-400"
  }
];

export default function PromiseDay() {
  const [selectedPromises, setSelectedPromises] = useState<Set<number>>(new Set());
  const [showFinalPromise, setShowFinalPromise] = useState(false);
  const [floatingStars, setFloatingStars] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const stars = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10
    }));
    setFloatingStars(stars);
  }, []);

  const triggerPromiseConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD']
    });
  };

  const handlePromiseClick = (promiseId: number) => {
    setSelectedPromises(prev => new Set([...prev, promiseId]));
    triggerPromiseConfetti();
  };

  const allPromisesSelected = selectedPromises.size === promises.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-100 overflow-hidden relative">
      {/* Floating Stars Background */}
      {floatingStars.map(star => (
        <motion.div
          key={star.id}
          className="absolute text-yellow-300 opacity-60"
          style={{ left: `${star.x}%`, top: `${star.y}%` }}
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0, 0.8, 0],
            rotate: [0, 180]
          }}
          transition={{ 
            duration: 5 + Math.random() * 3,
            repeat: 999,
            delay: Math.random() * 2
          }}
        >
          <div>
            <Star size={16} fill="currentColor" />
          </div>
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
              <ArrowLeft size={20} className="text-green-500" />
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
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-full shadow-lg">
              <Handshake size={24} />
              <span className="font-bold text-lg">February 11 - Promise Day</span>
              <Handshake size={24} />
            </div>
          </motion.div>

          {/* Main Promise Animation */}
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
                repeat: 999,
                ease: "easeInOut"
              }}
              className="text-9xl"
            >
              🤝
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent mb-4"
          >
            My Promises to You, Anuu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 mb-8"
          >
            Click on each promise to make it real 💕
          </motion.p>

          {/* Promises Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {promises.map((promise) => (
              <motion.button
                key={promise.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePromiseClick(promise.id)}
                className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 ${
                  selectedPromises.has(promise.id) 
                    ? 'border-green-400 bg-gradient-to-r ' + promise.color + ' text-white' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                {selectedPromises.has(promise.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 bg-green-500 rounded-full p-2"
                  >
                    <div className="text-white">
                      <Heart size={20} fill="currentColor" />
                    </div>
                  </motion.div>
                )}
                
                <div className="text-4xl mb-3">{promise.emoji}</div>
                <h3 className={`font-bold mb-2 ${
                  selectedPromises.has(promise.id) ? 'text-white' : 'text-gray-800'
                }`}>
                  {promise.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  selectedPromises.has(promise.id) ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {promise.promise}
                </p>
              </motion.button>
            ))}
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Promises Made</span>
                <span className="text-sm font-bold text-green-600">{selectedPromises.size}/{promises.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-teal-400 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(selectedPromises.size / promises.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Final Promise */}
          <AnimatePresence>
            {allPromisesSelected && (
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
                  className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-8 shadow-xl border-2 border-green-300"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: 999,
                      ease: "easeInOut"
                    }}
                    className="mb-6"
                  >
                    <div className="text-green-600 mx-auto">
                      <Infinity size={60} />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-green-700 mb-4">
                    All Promises Sealed! 🤝💕
                  </h3>
                  
                  <p className="text-xl text-gray-800 leading-relaxed mb-4">
                    My dearest Anuu, I promise to be:
                  </p>
                  
                  <ul className="text-left text-gray-700 space-y-2 mb-6 max-w-md mx-auto">
                    <li className="flex items-center gap-2">
                      <div className="text-red-500">
                        <Heart size={16} fill="currentColor" />
                      </div>
                      <span>Your partner in crime and in life</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="text-red-500">
                        <Heart size={16} fill="currentColor" />
                      </div>
                      <span>Your shoulder to cry on and your biggest cheerleader</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="text-red-500">
                        <Heart size={16} fill="currentColor" />
                      </div>
                      <span>Your forever and always, no matter what</span>
                    </li>
                  </ul>
                  
                  <p className="text-2xl font-bold text-green-600 text-center">
                    These promises aren't just words - they're my heart's truth! 💕
                  </p>
                  
                  <div className="mt-6 text-4xl">
                    🤝💕🌟✨🤝
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
            <Link href="/hug-day">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
              >
                <span>Tomorrow: Hug Day 🤗</span>
                <span>→</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
