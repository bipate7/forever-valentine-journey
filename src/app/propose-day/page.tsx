"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, ArrowLeft, Diamond, Sparkles, Star } from "lucide-react";
import Link from "next/link";

export default function ProposeDay() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; left: number; top: number }>>([]);
  const [showProposal, setShowProposal] = useState(false);
  const [sheSaidYes, setSheSaidYes] = useState(false);

  useEffect(() => {
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100
    }));
    setSparkles(newSparkles);
  }, []);

  const triggerProposalConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffd700', '#ff6b9d', '#c71585']
    });
  };

  const handleYesClick = () => {
    setSheSaidYes(true);
    triggerProposalConfetti();
  };

  const handleNoClick = () => {
    // Playful animation - button moves away
    const button = document.getElementById('no-button');
    if (button) {
      button.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 100 - 50}px)`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 overflow-hidden relative">
      {/* Floating Sparkles */}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute text-yellow-300 opacity-60"
          style={{ left: `${sparkle.left}%`, top: `${sparkle.top}%` }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            rotate: [0, 180]
          }}
          transition={{ 
            duration: 3 + Math.random() * 2, 
            ease: "easeInOut",
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          <Sparkles size={12} fill="currentColor" />
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
              <ArrowLeft size={20} className="text-purple-500" />
              <span className="text-gray-700 font-medium">Back to Valentine Week</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Date Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full shadow-lg">
              <Diamond size={24} />
              <span className="font-bold text-lg">February 8 - Propose Day</span>
              <Diamond size={24} />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {!showProposal ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-8"
              >
                {/* Ring Animation */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-9xl mb-8"
                >
                  💍
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6"
                >
                  A Question for My Anuu
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
                >
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    My dearest Anuu,
                  </p>
                  
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    From the moment I met you, my life changed in the most beautiful way. 
                    Your smile lights up my world, your laughter is my favorite melody, 
                    and your presence makes every moment special.
                  </p>
                  
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
                    Today, on Propose Day, I want to ask you something that comes from the deepest 
                    part of my heart. Something I've been wanting to say since I realized how much 
                    you mean to me.
                  </p>
                  
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Are you ready to hear what my heart wants to ask?
                  </p>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProposal(true)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
                >
                  <Heart size={24} fill="currentColor" />
                  I'm Ready, Show Me! 💕
                  <Heart size={24} fill="currentColor" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="proposal"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-8"
              >
                {!sheSaidYes ? (
                  <>
                    {/* Big Ring */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.5, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-9xl mb-8"
                    >
                      💍
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8"
                    >
                      Anuu, My Love...
                    </motion.h1>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 shadow-xl border-2 border-purple-300"
                    >
                      <p className="text-2xl text-gray-800 leading-relaxed mb-6 font-semibold">
                        Will you make me the happiest person in the world?
                      </p>
                      
                      <p className="text-xl text-gray-700 leading-relaxed mb-6">
                        Will you be my forever Valentine, my best friend, my partner in crime, 
                        and the one I want to share every laugh, every tear, and every adventure with?
                      </p>
                      
                      <p className="text-3xl text-purple-600 font-bold mb-8">
                        Anuu, will you be mine forever? 💕
                      </p>
                    </motion.div>

                    <div className="flex gap-6 justify-center flex-wrap">
                      <motion.button
                        id="yes-button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleYesClick}
                        className="px-10 py-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
                      >
                        <Heart size={28} fill="currentColor" />
                        YES! Of Course! 💕
                        <Heart size={28} fill="currentColor" />
                      </motion.button>

                      <motion.button
                        id="no-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNoClick}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="px-10 py-6 bg-gray-300 text-gray-700 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        Maybe... 😉
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                  >
                    {/* Celebration */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-9xl mb-8"
                    >
                      💕💍✨
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-8"
                    >
                      SHE SAID YES! 🎉
                    </motion.h1>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 shadow-xl border-2 border-green-300"
                    >
                      <p className="text-2xl text-gray-800 leading-relaxed mb-6 font-semibold">
                        My heart is overflowing with joy, Anuu! 💕
                      </p>
                      
                      <p className="text-xl text-gray-700 leading-relaxed mb-4">
                        You've made me the happiest person alive! This is just the beginning of our 
                        beautiful journey together. I promise to love you, cherish you, and make you 
                        feel special every single day.
                      </p>
                      
                      <p className="text-xl text-gray-700 leading-relaxed mb-6">
                        From this day forward, we're not just celebrating Valentine's Week - 
                        we're celebrating OUR forever! 💍💕
                      </p>

                      <div className="text-4xl font-bold text-green-600">
                        Forever Yours, Anuu! 🌟
                      </div>
                    </motion.div>

                    <div className="flex justify-center gap-4">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-6xl"
                      >
                        💕💍🎉✨🌟
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Floating Love Messages */}
                {sheSaidYes && (
                  <>
                    {Array.from({ length: 5 }, (_, i) => (
                      <motion.div
                        key={`love-${i}`}
                        className="absolute text-2xl md:text-3xl font-bold text-red-500 whitespace-nowrap z-20"
                        style={{
                          left: `${10 + (i * 15)}%`,
                          top: `${20 + (i * 10)}%`
                        }}
                        initial={{ opacity: 0, scale: 0, rotate: -10 }}
                        animate={{ 
                          opacity: [0, 1, 1, 0],
                          scale: [0, 1.2, 1, 0.8],
                          rotate: [-10, 5, -5, 0],
                          y: [0, -30, -60, -100]
                        }}
                        transition={{ 
                          duration: 8 + i * 2,
                          repeat: Infinity,
                          delay: i * 1.5,
                          ease: "easeInOut"
                        }}
                      >
                        I LOVEEEE YOU MY CHOTUUUU BBBB ❤️
                      </motion.div>
                    ))}
                    
                    {Array.from({ length: 3 }, (_, i) => (
                      <motion.div
                        key={`heart-${i}`}
                        className="absolute text-4xl z-10"
                        style={{
                          left: `${20 + (i * 25)}%`,
                          top: `${30 + (i * 15)}%`
                        }}
                        animate={{ 
                          scale: [0, 1.5, 1, 0],
                          opacity: [0, 1, 0.8, 0],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 6 + i * 2,
                          repeat: Infinity,
                          delay: i * 2,
                          ease: "easeInOut"
                        }}
                      >
                        💕
                      </motion.div>
                    ))}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <Link href="/chocolate-day">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-brown-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
              >
                <span>Tomorrow: Chocolate Day 🍫</span>
                <span>→</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
