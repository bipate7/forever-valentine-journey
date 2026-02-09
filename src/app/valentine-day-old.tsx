"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, ArrowLeft, Sparkles, Star, Gift, Music } from "lucide-react";
import Link from "next/link";

export default function ValentineDay() {
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const heartArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      size: Math.random() * 20 + 15
    }));
    setHearts(heartArray);

    const sparkleArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10
    }));
    setSparkles(sparkleArray);
  }, []);

  const triggerValentineConfetti = () => {
    confetti({
      particleCount: 300,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#FF6B9D', '#C71585', '#FFB6C1', '#FFD700', '#FFA500']
    });
  };

  const handleFinalClick = () => {
    setShowFinalMessage(true);
    triggerValentineConfetti();
    
    // Multiple confetti bursts
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.3 }
      });
    }, 500);
    
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.9 }
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-100 overflow-hidden relative">
      {/* Floating Hearts Background */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400 opacity-60"
          style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          animate={{ 
            scale: [0, 1, 0.8, 0],
            opacity: [0, 0.7, 0.5, 0],
            y: [0, -50, -100, -150],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}

      {/* Floating Sparkles */}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute text-yellow-300 opacity-80"
          style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0, 0.9, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          <Sparkles size={16} fill="currentColor" />
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
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-lg">
              <Heart size={24} fill="currentColor" />
              <span className="font-bold text-lg">February 14 - Valentine's Day</span>
              <Heart size={24} fill="currentColor" />
            </div>
          </motion.div>

          {/* Main Heart Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, 15, -15, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-9xl"
            >
              💕
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-6"
          >
            My Everything, My Anuu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 mb-8"
          >
            Today is not just a day - it's our celebration of love 💕
          </motion.p>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl mb-8 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-red-600 mb-6">
              My Dearest Anuu,
            </h2>
            
            <div className="text-lg text-gray-700 leading-relaxed space-y-4 mb-8">
              <p>
                Today, as we celebrate Valentine's Day, I want you to know that you're not just my Valentine - 
                you're my <span className="font-bold text-red-500">everything</span>.
              </p>
              
              <p>
                From the moment I met you, my life changed in the most beautiful way possible. 
                Your smile is my sunshine, your laugh is my favorite song, and your love is my greatest treasure.
              </p>
              
              <p>
                This past week we've celebrated roses, proposals, chocolates, teddies, promises, hugs, and kisses - 
                but none of them compare to the <span className="font-bold text-pink-500">real thing</span>: 
                my endless, unconditional love for you.
              </p>
              
              <p>
                Anuu, you are the missing piece I never knew I needed. You're my dream come true, 
                my best friend, my soulmate, and my forever Valentine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-xl p-4">
                <Heart size={32} className="text-red-500 mx-auto mb-2" fill="currentColor" />
                <h3 className="font-bold text-red-700 mb-1">My Heart</h3>
                <p className="text-sm text-gray-600">Beats only for you</p>
              </div>
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-4">
                <Star size={32} className="text-purple-500 mx-auto mb-2" fill="currentColor" />
                <h3 className="font-bold text-purple-700 mb-1">My Dreams</h3>
                <p className="text-sm text-gray-600">Always include you</p>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-4">
                <Gift size={32} className="text-indigo-500 mx-auto mb-2" />
                <h3 className="font-bold text-indigo-700 mb-1">My Future</h3>
                <p className="text-sm text-gray-600">Forever with you</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFinalClick}
              className="px-8 py-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Heart size={24} className="inline mr-2" fill="currentColor" />
              I Love You Forever, Anuu! 💕
              <Heart size={24} className="inline ml-2" fill="currentColor" />
            </motion.button>
          </motion.div>

          {/* Final Celebration */}
          <AnimatePresence>
            {showFinalMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-red-100 via-pink-100 to-purple-100 rounded-3xl p-10 shadow-2xl border-2 border-pink-300"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mb-6"
                  >
                    <div className="text-8xl">💕🎉✨🌟</div>
                  </motion.div>
                  
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
                    Happy Valentine's Day, My Love!
                  </h2>
                  
                  <p className="text-xl text-gray-800 leading-relaxed mb-6">
                    Anuu, this is just the beginning of our forever. Every day with you is Valentine's Day, 
                    and I promise to spend the rest of my life making you feel as special as you do right now.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white/80 rounded-xl p-4">
                      <Music size={24} className="text-red-500 mb-2" />
                      <p className="font-semibold text-gray-800">Our Love Song</p>
                      <p className="text-sm text-gray-600">Plays forever</p>
                    </div>
                    <div className="bg-white/80 rounded-xl p-4">
                      <Sparkles size={24} className="text-pink-500 mb-2" />
                      <p className="font-semibold text-gray-800">Magic Moments</p>
                      <p className="text-sm text-gray-600">Every day with you</p>
                    </div>
                  </div>
                  
                  <p className="text-3xl font-bold text-red-600 text-center mb-4">
                    You Are My Everything, Anuu! 💕
                  </p>
                  
                  <div className="text-center">
                    <p className="text-lg text-gray-700 mb-4">
                      Rose Day, Propose Day, Chocolate Day, Teddy Day, Promise Day, Hug Day, Kiss Day...
                    </p>
                    <p className="text-2xl font-bold text-pink-600">
                      But every day is Valentine's Day with you! 💕
                    </p>
                  </div>
                  
                  <div className="mt-6 text-6xl text-center">
                    💕🎉💝🌹🍫🧸🤝🤗💋✨🌟
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-6 shadow-lg max-w-md mx-auto">
              <p className="text-lg text-gray-700 font-semibold text-center mb-4">
                Thank you for celebrating Valentine's Week with me, Anuu! 💕
              </p>
              <p className="text-gray-600 text-center">
                This is just the beginning of our beautiful love story...
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
