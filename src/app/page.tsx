"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Calendar, ArrowRight, Gift, Music, Star, Play, Pause, Volume2 } from "lucide-react";
import Link from "next/link";
import { useMusic } from "@/contexts/MusicContext";

const valentineDays = [
  { 
    day: 7, 
    name: "Rose Day", 
    emoji: "🌹", 
    color: "from-red-400 to-pink-400",
    description: "A rose for my beautiful Anuu",
    href: "/rose-day",
    gradient: "from-rose-400 via-red-300 to-pink-400"
  },
  { 
    day: 8, 
    name: "Propose Day", 
    emoji: "💍", 
    color: "from-purple-400 to-pink-400",
    description: "Will you be mine forever?",
    href: "/propose-day",
    gradient: "from-purple-400 via-pink-300 to-red-400"
  },
  { 
    day: 9, 
    name: "Chocolate Day", 
    emoji: "🍫", 
    color: "from-amber-400 to-brown-400",
    description: "Sweet as chocolate, my love",
    href: "/chocolate-day",
    gradient: "from-amber-400 via-orange-300 to-brown-400"
  },
  { 
    day: 10, 
    name: "Teddy Day", 
    emoji: "🧸", 
    color: "from-blue-400 to-purple-400",
    description: "Cuddly moments with you",
    href: "/teddy-day",
    gradient: "from-blue-400 via-indigo-300 to-purple-400"
  },
  { 
    day: 11, 
    name: "Promise Day", 
    emoji: "🤝", 
    color: "from-green-400 to-teal-400",
    description: "Promises of forever",
    href: "/promise-day",
    gradient: "from-green-400 via-emerald-300 to-teal-400"
  },
  { 
    day: 12, 
    name: "Hug Day", 
    emoji: "🤗", 
    color: "from-orange-400 to-red-400",
    description: "Warm hugs for my Anuu",
    href: "/hug-day",
    gradient: "from-orange-400 via-red-300 to-pink-400"
  },
  { 
    day: 13, 
    name: "Kiss Day", 
    emoji: "💋", 
    color: "from-pink-400 to-red-500",
    description: "Sweet kisses just for you",
    href: "/kiss-day",
    gradient: "from-pink-400 via-rose-300 to-red-500"
  },
  { 
    day: 14, 
    name: "Valentine's Day", 
    emoji: "💕", 
    color: "from-red-500 to-pink-500",
    description: "The most special day - My everything!",
    href: "/valentine-day",
    gradient: "from-red-500 via-pink-400 to-purple-500",
    special: true
  }
];

const cinematicMessages = [
  "Our love is not just 7 days, it's infinity",
  "A thousand years of songs begin with your name",
  "Every heartbeat writes another love story",
  "Forever is not enough time with you",
  "Our journey spans across eternity",
  "Each moment is a new chapter in infinity",
  "Time stops when I'm looking at you",
  "You're my forever and always beyond"
];

export default function Home() {
  const { isPlaying, playMusic } = useMusic();
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; x: number; y: number; emoji: string; delay: number }>>([]);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [musicNotes, setMusicNotes] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Create floating hearts
    const heartArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      size: Math.random() * 25 + 15,
      delay: Math.random() * 5
    }));
    setHearts(heartArray);

    // Create floating sparkles
    const sparkleArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      delay: Math.random() * 3
    }));
    setSparkles(sparkleArray);

    // Create floating emojis
    const emojiArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      emoji: ["🌹", "💕", "✨", "🌟", "💝", "🎵", "🎀", "🌸"][Math.floor(Math.random() * 8)],
      delay: Math.random() * 4
    }));
    setFloatingEmojis(emojiArray);

    // Rotate cinematic messages
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % cinematicMessages.length);
    }, 5000);

    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Handle first user interaction to start music
    const handleFirstInteraction = () => {
      if (!hasInteracted && !isPlaying) {
        playMusic();
        setHasInteracted(true);
        console.log("Music started on user interaction");
        
        // Create music notes animation
        const notes = Array.from({ length: 12 }, (_, i) => ({
          id: i,
          x: Math.random() * 90 + 5,
          y: Math.random() * 80 + 10
        }));
        setMusicNotes(notes);
        
        // Clear notes after animation
        setTimeout(() => {
          setMusicNotes([]);
        }, 8000);
      }
    };

    // Add global click listener for first interaction
    const globalClickHandler = () => {
      handleFirstInteraction();
      document.removeEventListener('click', globalClickHandler);
    };
    
    if (!hasInteracted) {
      document.addEventListener('click', globalClickHandler);
    }
    // Hide intro after delay
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    // Auto-play music after intro
    const musicTimer = setTimeout(() => {
      // Try to play, but if blocked, show a prompt
      try {
        playMusic();
        setHasInteracted(true);
        console.log("Music started automatically");
      } catch (error: any) {
        console.log("Auto-play blocked, user interaction required:", error);
      }
    }, 3500);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(introTimer);
      clearTimeout(musicTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', globalClickHandler);
    };
  }, []);

  const triggerCelebration = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#FF6B9D', '#C71585', '#FFB6C1', '#FFD700']
    });
  };

  const toggleBackgroundMusic = () => {
    playMusic();
    if (!isPlaying) {
      const notes = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 80 + 10
      }));
      setMusicNotes(notes);
      
      // Clear notes after animation
      setTimeout(() => {
        setMusicNotes([]);
      }, 8000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-red-900 to-purple-900 overflow-hidden relative">
      {/* Floating Music Notes */}
      <AnimatePresence>
        {musicNotes.map(note => (
          <motion.div
            key={note.id}
            className="absolute text-2xl opacity-80 pointer-events-none"
            style={{ left: `${note.x}%`, top: `${note.y}%` }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.5, 1],
              opacity: [0, 0.8, 0],
              y: [0, -50, -100],
              rotate: [0, 15, -15, 0],
              x: [0, 20, -20, 0]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 8,
              ease: "easeInOut"
            }}
          >
            🎵
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ 
          background: [
            "linear-gradient(45deg, rgba(255,105,180,0.1) 0%, rgba(255,20,147,0.1) 50%, rgba(147,51,234,0.1) 100%)",
            "linear-gradient(135deg, rgba(255,20,147,0.1) 0%, rgba(255,105,180,0.1) 50%, rgba(147,51,234,0.1) 100%)",
            "linear-gradient(225deg, rgba(147,51,234,0.1) 0%, rgba(255,20,147,0.1) 50%, rgba(255,105,180,0.1) 100%)",
            "linear-gradient(315deg, rgba(255,105,180,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(255,20,147,0.1) 100%)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Hearts */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-300 opacity-60 pointer-events-none"
          style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          animate={{ 
            scale: [0, 1, 0.8, 0],
            opacity: [0, 0.6, 0.4, 0],
            y: [0, -100, -200],
            rotate: [0, 360],
            x: mousePosition.x > window.innerWidth / 2 ? [0, 20, 0] : [0, -20, 0]
          }}
          transition={{ 
            duration: 15 + heart.delay,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut"
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}

      {/* Floating Sparkles */}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute text-yellow-200 opacity-80 pointer-events-none"
          style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0, 0.9, 0],
            rotate: [0, 180],
            filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
          }}
          transition={{ 
            duration: 4 + sparkle.delay,
            repeat: Infinity,
            delay: sparkle.delay
          }}
        >
          <Sparkles size={16} fill="currentColor" />
        </motion.div>
      ))}

      {/* Floating Music Notes - Thousand Year Songs */}
      <AnimatePresence>
        {musicNotes.map(note => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -150],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 8,
              ease: "easeOut"
            }}
            className="absolute text-yellow-300 pointer-events-none"
            style={{ left: `${note.x}%`, top: `${note.y}%` }}
          >
            🎵
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Emojis */}
      {floatingEmojis.map(emoji => (
        <motion.div
          key={emoji.id}
          className="absolute text-2xl opacity-70 pointer-events-none"
          style={{ left: `${emoji.x}%`, top: `${emoji.y}%` }}
          animate={{ 
            scale: [0, 1.2, 1],
            opacity: [0, 0.7, 0],
            y: [0, -30, -60],
            rotate: [0, 15, -15, 0],
            x: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 6 + emoji.delay,
            repeat: Infinity,
            delay: emoji.delay,
            ease: "easeInOut"
          }}
        >
          {emoji.emoji}
        </motion.div>
      ))}

      {/* Cinematic Intro */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-gradient-to-br from-pink-100 to-red-100 rounded-3xl p-12 max-w-4xl w-full shadow-2xl border-2 border-pink-300"
            >
              <div className="text-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="mb-8"
                >
                  <div className="text-6xl">💕</div>
                </motion.div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6 px-4" style={{ fontFamily: 'var(--font-dancing)' }}>
                  Welcome to Our Infinite Love
                </h1>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8 px-4" style={{ fontFamily: 'var(--font-quicksand)' }}>
                  Not just 7 days, but an eternal journey where a thousand years of songs play for you, Anuu.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowIntro(false)}
                  className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  Begin Our Journey 💕
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!showIntro && (
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Cinematic Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center pt-8 pb-6"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 md:gap-4 px-4 md:px-8 py-2 md:py-4 bg-white/10 backdrop-blur-md rounded-full border-2 border-pink-300 shadow-2xl">
                <Heart size={24} className="text-red-500 md:size-40" fill="currentColor" />
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-lobster)' }}>
                  Infinite Valentine Journey
                </h1>
                <Heart size={24} className="text-red-500 md:size-40" fill="currentColor" />
              </div>
            </motion.div>

            <motion.p
              key={currentMessage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed px-4" style={{ fontFamily: 'var(--font-pacifico)' }}
            >
              {cinematicMessages[currentMessage]}
            </motion.p>
          </motion.div>

          {/* Music Control */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleBackgroundMusic}
              className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-md rounded-full border-2 border-pink-300 shadow-xl hover:shadow-2xl transition-all"
            >
              {isPlaying ? <Pause size={20} className="text-pink-300 md:size-24" /> : <Play size={20} className="text-pink-300 md:size-24" />}
              <Volume2 size={16} className="text-pink-300 md:size-20" />
              <span className="text-white/90 font-medium text-sm md:text-base" style={{ fontFamily: 'var(--font-quicksand)' }}>
                {isPlaying ? "Thousand Year Songs Playing" : "Click to Play Our Song"}
              </span>
            </motion.button>
          </motion.div>

          {!isPlaying && !hasInteracted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-4 px-4"
            >
              <p className="text-white/70 text-sm" style={{ fontFamily: 'var(--font-quicksand)' }}>
                💕 Click anywhere to start our love song 💕
              </p>
            </motion.div>
          )}

          {/* Valentine Days Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex-1 px-2 md:px-4 pb-4 md:pb-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-2 md:px-4">
              {valentineDays.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.1 * index,
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: day.special ? 1.1 : 1.05,
                    y: day.special ? -10 : -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  {/* Special Glow for Valentine's Day */}
                  {day.special && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 rounded-2xl blur-xl"
                    />
                  )}

                  <Link href={day.href}>
                    <motion.div
                      className={`relative h-full bg-gradient-to-br ${day.gradient} rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-2 ${
                        day.special ? 'border-yellow-400/50' : 'border-transparent'
                      }`}
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: day.special ? 'rgb(251 191 36 / 0.3)' : 'transparent'
                      }}
                    >
                      {/* Floating Emoji */}
                      <motion.div
                        animate={{ 
                          y: [0, -8, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl"
                      >
                        {day.emoji}
                      </motion.div>

                      {/* Date Badge */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 border border-white/50"
                      >
                        <span className="text-xs font-bold text-gray-700">Feb {day.day}</span>
                      </motion.div>

                      {/* Content */}
                      <div className="pt-12 md:pt-16 pb-4 md:pb-6 px-4 md:px-6 text-center">
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className={`text-lg md:text-xl font-bold mb-2 md:mb-3 ${
                            day.special ? 'text-yellow-300' : 'text-white'
                          }`} style={{ fontFamily: 'var(--font-playfair)' }}
                        >
                          {day.name}
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className={`text-sm md:text-base leading-relaxed ${
                            day.special ? 'text-yellow-100' : 'text-white/80'
                          }`} style={{ fontFamily: 'var(--font-quicksand)' }}
                        >
                          {day.description}
                        </motion.p>

                        {day.special && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-4 flex items-center justify-center gap-2"
                          >
                            <Sparkles size={16} className="text-yellow-300" />
                            <span className="text-yellow-300 font-bold text-sm" style={{ fontFamily: 'var(--font-pacifico)' }}>Special Surprise!</span>
                            <Sparkles size={16} className="text-yellow-300" />
                          </motion.div>
                        )}

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="flex items-center justify-center gap-2 mt-4"
                        >
                          <span className={`text-sm font-medium ${
                            day.special ? 'text-yellow-200' : 'text-white/70'
                          }`} style={{ fontFamily: 'var(--font-quicksand)' }}>
                            {day.special ? "Open Magic!" : "Explore"}
                          </span>
                          <ArrowRight size={16} className={day.special ? 'text-yellow-300' : 'text-white/70'} />
                        </motion.div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center pb-8"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-8 max-w-4xl mx-auto border-2 border-pink-300/30">
              <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
                <Calendar size={24} className="text-red-400 md:size-32" />
                <h2 className="text-xl md:text-2xl font-bold text-white px-2" style={{ fontFamily: 'var(--font-lobster)' }}>
                  Infinity Days of Eternal Love
                </h2>
                <Calendar size={24} className="text-red-400 md:size-32" />
              </div>

              <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 md:mb-6 px-2" style={{ fontFamily: 'var(--font-quicksand)' }}>
                My dearest Anuu, this is not just a journey of 7 days, but an infinite love story that spans across eternity. 
                From the first rose to forever, every moment plays like a thousand-year song written just for you.
              </p>

              <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-1 md:gap-2 text-pink-300">
                  <Heart size={16} className="md:size-20" fill="currentColor" />
                  <span className="text-xs md:text-sm" style={{ fontFamily: 'var(--font-quicksand)' }}>Roses of Love</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2 text-pink-300">
                  <Gift size={16} className="md:size-20" />
                  <span className="text-xs md:text-sm" style={{ fontFamily: 'var(--font-quicksand)' }}>Promises Forever</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2 text-pink-300">
                  <Music size={16} className="md:size-20" />
                  <span className="text-xs md:text-sm" style={{ fontFamily: 'var(--font-quicksand)' }}>Sweet Melodies</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2 text-pink-300">
                  <Star size={16} className="md:size-20" fill="currentColor" />
                  <span className="text-xs md:text-sm" style={{ fontFamily: 'var(--font-quicksand)' }}>Dreams Together</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerCelebration}
                className="px-4 md:px-8 py-2 md:py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold text-sm md:text-lg shadow-2xl hover:shadow-3xl transition-all" style={{ fontFamily: 'var(--font-lobster)' }}
              >
                <Heart size={16} className="inline mr-1 md:mr-2" fill="currentColor" />
                Celebrate Our Infinity! 💕
                <Heart size={16} className="inline ml-1 md:ml-2" fill="currentColor" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
