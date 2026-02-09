"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, ArrowLeft, Cookie, Coffee, Candy } from "lucide-react";
import Link from "next/link";

export default function ChocolateDay() {
  const [chocolates, setChocolates] = useState<Array<{ id: number; left: number; emoji: string }>>([]);
  const [selectedChocolate, setSelectedChocolate] = useState<string | null>(null);
  const [showSweetMessage, setShowSweetMessage] = useState(false);

  useEffect(() => {
    const chocolateEmojis = ["🍫", "🍩", "🧁", "🍮", "🍯", "🍰", "🎂", "🍪"];
    const newChocolates = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      emoji: chocolateEmojis[Math.floor(Math.random() * chocolateEmojis.length)]
    }));
    setChocolates(newChocolates);
  }, []);

  const triggerChocolateConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#8B4513', '#D2691E', '#FF69B4', '#FFB6C1', '#FFC0CB']
    });
  };

  const chocolateTypes = [
    { emoji: "🍫", name: "Dark Chocolate", meaning: "Intense and deep love" },
    { emoji: "🍩", name: "Sweet Donut", meaning: "Sweet moments together" },
    { emoji: "🧁", name: "Chocolate Cupcake", meaning: "You're my sweet treat" },
    { emoji: "🍮", name: "Chocolate Pudding", meaning: "Comfort and warmth" },
    { emoji: "🍯", name: "Honey Chocolate", meaning: "Golden sweet love" },
    { emoji: "🍰", name: "Chocolate Cake", meaning: "Celebrating us" }
  ];

  const naughtyQuestions = [
    {
      id: 1,
      question: "If Karan (your chotuu) is dipped in chocolate, would you like to have me? 🍫",
      options: [
        { text: "Yes! I'd lick every inch 😉", response: "Naughty girl! I love it! 😈" },
        { text: "Maybe... just a taste 😏", response: "Tease! You know you want it all! 🔥" },
        { text: "Only if it's warm chocolate 🥵", response: "I can make it warm for you! 💦" }
      ]
    },
    {
      id: 2,
      question: "If Karan has no clothes on and is dipped in chocolate, would you have it? 🍫😈",
      options: [
        { text: "HELL YES! Every single drop! 😈", response: "That's my girl! Let's get messy! 🥵" },
        { text: "I'd start with the lips 😉", response: "Smart choice! They're the sweetest part! 💋" },
        { text: "I'd share with friends 👯", response: "No way! This chocolate is all yours! 😤" }
      ]
    },
    {
      id: 3,
      question: "Which chocolate-covered Karan would you prefer? 🍫",
      options: [
        { text: "Warm melted chocolate Karan 🥵", response: "Perfect choice! I'm ready to melt for you! 💦" },
        { text: "Chocolate with whipped cream Karan 🍨", response: "Extra creamy just for you! 😏" },
        { text: "Chocolate strawberry Karan 🍓", response: "Sweet and juicy combo! 🍓🍫" }
      ]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNaughtyMode, setShowNaughtyMode] = useState(false);

  const handleChocolateClick = (emoji: string) => {
    setSelectedChocolate(emoji);
    setShowSweetMessage(true);
    triggerChocolateConfetti();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-brown-50 to-chocolate-100 overflow-hidden relative">
      {/* Floating Chocolates */}
      {chocolates.map(chocolate => (
        <motion.div
          key={chocolate.id}
          className="absolute text-2xl opacity-60"
          style={{ left: `${chocolate.left}%` }}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{ 
            y: window.innerHeight + 50, 
            opacity: [0, 0.6, 0],
            rotate: [0, 180, 360],
            x: [0, 20, -20, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 5, 
            ease: "linear",
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          {chocolate.emoji}
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
              <ArrowLeft size={20} className="text-amber-600" />
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
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-brown-400 text-white rounded-full shadow-lg">
              <Cookie size={24} />
              <span className="font-bold text-lg">February 9 - Chocolate Day</span>
              <Cookie size={24} />
            </div>
          </motion.div>

          {/* Main Chocolate Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12"
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
              🍫
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-brown-600 bg-clip-text text-transparent mb-6"
          >
            Sweet as Chocolate, My Love Anuu
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 mb-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                My sweet Anuu,
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                They say life is like a box of chocolates - you never know what you're gonna get. 
                But with you, my love, every day is the sweetest treat imaginable. 
                You're the dark chocolate that's rich and intense, the milk chocolate that's comforting 
                and warm, and the white chocolate that's pure and sweet.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                On this Chocolate Day, I want to remind you that you're sweeter than any dessert, 
                more precious than gold, and more addictive than the finest chocolate. 
                Your love is the sweetest thing that has ever happened to me.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Pick your favorite chocolate below and let me show you just how sweet my love is for you! 🍫💕
              </p>
            </div>
          </motion.div>

          {/* Interactive Chocolate Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-amber-700 mb-6">Choose Your Sweet Treat!</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {chocolateTypes.map((chocolate, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleChocolateClick(chocolate.emoji)}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border-2 border-amber-200 hover:border-amber-400"
                >
                  <div className="text-4xl mb-2">{chocolate.emoji}</div>
                  <div className="font-semibold text-gray-800">{chocolate.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{chocolate.meaning}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Sweet Message */}
          {showSweetMessage && selectedChocolate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-amber-100 to-brown-100 rounded-2xl p-8 shadow-xl border-2 border-amber-300">
                <div className="text-6xl mb-4">{selectedChocolate}</div>
                
                <h3 className="text-2xl font-bold text-amber-700 mb-4">
                  You Chose Sweetness! 🍫💕
                </h3>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Perfect choice, my love! But wait... there's something more special for you! 😈
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNaughtyMode(true)}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all mb-6"
                >
                  🔞 Unlock Naughty Mode 😈
                </motion.button>
                
                <div className="text-4xl">
                  🍫🍩🧁🍮🍯🍰💕
                </div>
              </div>
            </motion.div>
          )}

          {/* Naughty Mode */}
          {showNaughtyMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-2xl p-8 shadow-xl border-2 border-pink-300">
                <h3 className="text-3xl font-bold text-red-600 mb-6 text-center">
                  😈 NAUGHTY CHOCOLATE MODE 😈
                </h3>
                
                <div className="mb-6">
                  <p className="text-xl text-gray-800 leading-relaxed mb-4 font-semibold text-center">
                    {naughtyQuestions[currentQuestion].question}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-3 mb-4">
                    {naughtyQuestions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedAnswer(option.response);
                          triggerChocolateConfetti();
                        }}
                        className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border-2 border-pink-200 hover:border-pink-400 text-left"
                      >
                        <span className="text-gray-800 font-medium">{option.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {selectedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-red-200 to-pink-200 rounded-xl p-6 mb-4"
                  >
                    <p className="text-xl text-red-800 font-bold text-center">
                      {selectedAnswer}
                    </p>
                  </motion.div>
                )}

                <div className="flex justify-center gap-4">
                  {currentQuestion < naughtyQuestions.length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCurrentQuestion(prev => prev + 1);
                        setSelectedAnswer(null);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Next Question 🔥
                    </motion.button>
                  )}
                  
                  {currentQuestion === naughtyQuestions.length - 1 && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-center"
                    >
                      <p className="text-2xl font-bold text-red-600 mb-2">
                        You're the naughtiest! 😈🔥
                      </p>
                      <p className="text-lg text-gray-700">
                        I love this side of you, Anuu! 💕🥵
                      </p>
                      <div className="text-4xl mt-4">
                        😈🍫��🔥
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Chocolate Facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-amber-100 rounded-xl p-4">
              <Coffee size={32} className="text-amber-600 mx-auto mb-2" />
              <h4 className="font-bold text-amber-700 mb-1">Love & Chocolate</h4>
              <p className="text-sm text-gray-600">Both make life sweeter!</p>
            </div>
            <div className="bg-brown-100 rounded-xl p-4">
              <Candy size={32} className="text-brown-600 mx-auto mb-2" />
              <h4 className="font-bold text-brown-700 mb-1">Sweet Moments</h4>
              <p className="text-sm text-gray-600">Every day with you is a treat</p>
            </div>
            <div className="bg-pink-100 rounded-xl p-4">
              <Heart size={32} className="text-pink-600 mx-auto mb-2" fill="currentColor" />
              <h4 className="font-bold text-pink-700 mb-1">Forever Sweet</h4>
              <p className="text-sm text-gray-600">Our love never gets old!</p>
            </div>
          </motion.div>

          {/* Navigation to Next Day */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link href="/teddy-day">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
              >
                <span>Tomorrow: Teddy Day 🧸</span>
                <span>→</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
