"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, MusicIcon, Sparkles, Star, ChevronLeft, ChevronRight, ImageIcon, Play, Pause, ArrowLeft } from "lucide-react";
import { useMusic } from "@/contexts/MusicContext";
import confetti from "canvas-confetti";

const loveMessages = [
  "Every moment with you is Valentine's Day",
  "You are the poetry my heart always wanted to write",
  "In your eyes, I found my forever",
  "Your love is my favorite kind of magic",
  "With you, every day is a celebration",
  "You are the reason my heart beats",
  "Every moment with you is forever",
  "Your love is my greatest treasure",
  "In your eyes, I found my heaven",
  "You make my world complete",
  "Forever with you is not enough",
  "You are my today, tomorrow, and always"
];

const galleryImages = [
  { id: 1, title: "My Home", description: "Where our love story began", image: "/gallery/love-1.jpeg" },
  { id: 2, title: "Perfect Date Night", description: "Under the stars with you", image: "/gallery/love-2.jpeg" },
  { id: 3, title: "Coffee Shop Love", description: "Every moment with you is magic", image: "/gallery/love-3.jpeg" },
  { id: 4, title: "Rainy Day Walk", description: "Dancing in the rain together", image: "/gallery/love-4.jpeg" },
  { id: 5, title: "Our Quality Time", description: "Making every moment count together", image: "/gallery/love-5.jpeg" },
  { id: 6, title: "Beach Day Dreams", description: "Building sandcastles of forever", image: "/gallery/love-6.jpeg" },
  { id: 7, title: "Anniversary Joy", description: "Celebrating our love story", image: "/gallery/love-7.jpeg" },
  { id: 8, title: "Future Together", description: "Every tomorrow with you is paradise", image: "/gallery/love-8.jpeg" },
  { id: 9, title: "Eternal Love", description: "My promise to love you always", image: "/gallery/love-9.jpeg" },
  { id: 10, title: "Our Special Moment", description: "The day I knew you're the one", image: "/gallery/love-10.jpeg" }
];

export default function ValentineDay() {
  const { isPlaying, playMusic } = useMusic();
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [randomImages, setRandomImages] = useState<Array<{ id: number; path: string }>>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [showRoseRain, setShowRoseRain] = useState(false);
  const [showHeartsExplosion, setShowHeartsExplosion] = useState(false);
  const [currentLoveQuote, setCurrentLoveQuote] = useState(0);
  const [show3DHearts, setShow3DHearts] = useState(false);
  const [heartRotation, setHeartRotation] = useState({ x: 0, y: 0, z: 0 });
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLocked: false
  });

  const loveQuotes = [
    "You are the sunshine that brightens my darkest days",
    "In your smile, I find my favorite place in the world",
    "Every heartbeat whispers your name, my love",
    "You are my today and all of my tomorrows",
    "Forever is a long time, but I wouldn't mind spending it with you",
    "You are the missing piece to my heart's puzzle",
    "Love is not finding someone to live with, it's finding someone you can't live without",
    "I Love Youuuuu Anuuu <3",
    "You make my world complete in every way",
    "With you, every moment is Valentine's Day",
    "Your love is my favorite kind of magic"
  ];

  useEffect(() => {
    // Always unlock Valentine's Day - no countdown needed
    setCountdown({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isLocked: false
    });

    // Create floating hearts
    const heartArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      size: Math.random() * 30 + 20
    }));
    setHearts(heartArray);

    // Create floating sparkles
    const sparkleArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10
    }));
    setSparkles(sparkleArray);

    // Load random images from our folder
    const loadRandomImages = () => {
      const imagePaths = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        path: `/gallery/love-${i + 1}.jpeg`
      }));
      setRandomImages(imagePaths);
    };

    loadRandomImages();

    // Rotate messages
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loveMessages.length);
    }, 4000);

    // Mouse tracking
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
    }, 4000);

    // Auto-play music after intro
    const musicTimer = setTimeout(() => {
      try {
        playMusic();
        setHasInteracted(true);
        console.log("Music started automatically");
      } catch (error: any) {
        console.log("Auto-play prevented by browser:", error);
      }
    }, 3500);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(introTimer);
      clearTimeout(musicTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      if (!hasInteracted) {
        document.removeEventListener('click', globalClickHandler);
      }
    };
  }, [isPlaying, hasInteracted, playMusic]);

  const triggerValentineConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#FF6B9D', '#C71585', '#FFB6C1', '#FFD700']
    });
  };

  const nextQuestion = () => {
    setCurrentLoveQuote((prev) => (prev + 1) % loveQuotes.length);
  };

  const toggleMusic = () => {
    playMusic();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % randomImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + randomImages.length) % randomImages.length);
  };

  const shuffleImages = () => {
    const shuffled = [...randomImages].sort(() => Math.random() - 0.5);
    setRandomImages(shuffled);
    setCurrentImageIndex(0);
  };

  const handleFinalClick = () => {
    setShowFinalMessage(true);
    triggerValentineConfetti();
  };

  // Add cute functions
  const triggerRoseRain = () => {
    setShowRoseRain(true);
    setTimeout(() => {
      setShowRoseRain(false);
    }, 5000);
  };

  const triggerHeartsExplosion = () => {
    setShowHeartsExplosion(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#FF6B9D', '#C71585', '#FFB6C1']
    });
    
    setTimeout(() => {
      setShowHeartsExplosion(false);
    }, 3000);
  };

  const trigger3DHearts = () => {
    setShow3DHearts(true);
    setTimeout(() => setShow3DHearts(false), 8000);
  };

  const handle3DMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
    setHeartRotation({ x: y, y: x, z: x * y });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-red-950 to-purple-950 overflow-hidden relative">
      {/* Floating Hearts Background */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -100, -200]
          }}
          transition={{ 
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute text-4xl md:text-6xl"
          style={{ 
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`
          }}
        >
          💕
        </motion.div>
      ))}

      {/* Floating Sparkles Background */}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute text-2xl md:text-4xl"
          style={{ 
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`
          }}
        >
          ✨
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
              <ArrowLeft size={20} className="text-pink-500" />
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
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-full shadow-lg">
              <div className="text-2xl">💕</div>
              <span className="font-bold text-lg">February 14 - Valentine's Day</span>
              <div className="text-2xl">💕</div>
            </div>
          </motion.div>

          {/* Countdown Lock */}
          {countdown.isLocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl mb-8 max-w-2xl mx-auto border-2 border-white/20 text-center"
            >
              {/* Lock Icon */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center shadow-xl"
              >
                <Heart size={32} className="text-white" />
              </motion.div>

              <h3 className="text-xl font-bold text-red-400 mb-4" style={{ fontFamily: 'var(--font-dancing)' }}>
                Valentine's Day Countdown
              </h3>

              <div className="bg-black/30 rounded-2xl p-4 mb-4">
                <div className="grid grid-cols-4 gap-2 md:gap-4">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">{countdown.days}</div>
                    <div className="text-xs md:text-sm text-white/60">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">{countdown.hours}</div>
                    <div className="text-xs md:text-sm text-white/60">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">{countdown.minutes}</div>
                    <div className="text-xs md:text-sm text-white/60">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">{countdown.seconds}</div>
                    <div className="text-xs md:text-sm text-white/60">Seconds</div>
                  </div>
                </div>
              </div>

              <p className="text-white/80 text-sm md:text-base" style={{ fontFamily: 'var(--font-quicksand)' }}>
                The most special day is coming soon, my love! 💕
              </p>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-8 md:mb-12 text-center px-4"
            style={{ fontFamily: 'var(--font-lobster)' }}
          >
            My Everything, My Anuu
          </motion.h1>

          {/* Main Content - Only show when unlocked */}
          {!countdown.isLocked && (
            <>
              {/* Rotating Love Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl max-w-4xl mx-auto border-2 border-pink-300/30">
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-white leading-relaxed font-medium text-center px-4" style={{ fontFamily: 'var(--font-pacifico)' }}
              >
                {loveMessages[currentMessage]}
              </motion.p>
            </div>
          </motion.div>

          {/* Celebration Image */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-8 cursor-pointer"
            onClick={triggerHeartsExplosion}
          >
            <img 
              src="/images/valentine-celebration.jpg.jpeg" 
              alt="Our Special Moment" 
              className="w-64 h-48 mx-auto rounded-xl shadow-2xl hover:shadow-3xl transition-all border-4 border-pink-300 object-cover"
              style={{ 
                width: '256px', 
                height: '192px',
                borderRadius: '12px',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E💕🎉✨🌟%3C/text%3E%3C/svg%3E";
              }}
            />
          </motion.div>

          {/* Our Memories Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-5xl mx-auto border-2 border-pink-300/30">
              <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-8 text-center" style={{ fontFamily: 'var(--font-dancing)' }}>
                Our Beautiful Memories
              </h2>
              
              {/* Gallery Controls */}
              <div className="flex justify-center gap-4 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevImage}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-400 to-red-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <ChevronLeft size={20} />
                  <span className="font-medium">Previous</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shuffleImages}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <ImageIcon size={20} />
                  <span className="font-medium">Shuffle</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextImage}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-400 to-red-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <span className="font-medium">Next</span>
                  <ChevronRight size={20} />
                </motion.button>
              </div>
              
              {randomImages.length > 0 && (
                <div className="relative max-w-4xl mx-auto">
                  <div className="relative h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full rounded-xl overflow-hidden shadow-xl"
                      >
                        <img 
                          src={randomImages[currentImageIndex].path} 
                          alt={`Our memory ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  {/* Image Info */}
                  <div className="mt-6 text-center">
                    <h4 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {galleryImages[currentImageIndex % galleryImages.length].title}
                    </h4>
                    <p className="text-white/80 text-lg" style={{ fontFamily: 'var(--font-quicksand)' }}>
                      {galleryImages[currentImageIndex % galleryImages.length].description}
                    </p>
                  </div>
                  
                  {/* Image Indicators */}
                  <div className="flex justify-center gap-3 mt-6">
                    {randomImages.map((_, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.7 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-4 h-4 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {randomImages.length === 0 && (
                <div className="text-center py-12">
                  <ImageIcon size={64} className="text-white/60 mx-auto mb-4" />
                  <p className="text-white/80 text-lg mb-4" style={{ fontFamily: 'var(--font-quicksand)' }}>
                    Add your photos to the <code className="bg-white/20 px-2 py-1 rounded">/public/gallery/</code> folder
                  </p>
                  <p className="text-white/60" style={{ fontFamily: 'var(--font-quicksand)' }}>
                    Name them: love-1.jpg, love-2.jpg, love-3.jpg, etc.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Main Love Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl mb-8 max-w-5xl mx-auto border-2 border-pink-300/30"
          >
            <h2 className="text-4xl font-bold text-red-400 mb-8 text-center" style={{ fontFamily: 'var(--font-dancing)' }}>
              My Dearest Anuu,
            </h2>
            
            <div className="text-xl text-white leading-relaxed space-y-6 mb-8" style={{ fontFamily: 'var(--font-quicksand)' }}>
              <p>
                Today, as we celebrate Valentine's Day, I want you to know that you're not just my Valentine - 
                you're my <span className="font-bold text-red-400 text-2xl">everything</span>.
              </p>
              
              <p>
                From the moment I met you, my world changed. Your smile became my favorite view, 
                your laugh my favorite sound, and your love my greatest treasure.
              </p>
              
              <p>
                Every day with you feels like Valentine's Day because you fill my life with love, 
                joy, and endless happiness. You are my dream come true, my forever love, 
                and my reason for believing in magic.
              </p>
            </div>

            {/* Music Control */}
            <div className="flex justify-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMusic}
                className="p-4 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </motion.button>
            </div>
          </motion.div>

          {/* Cute Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerRoseRain}
              className="bg-gradient-to-r from-pink-400 to-red-400 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <span className="text-2xl mb-3">🌹</span>
              <p className="font-bold text-lg">Rose Rain</p>
              <p className="text-sm opacity-90">Click for magical roses!</p>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLoveLetter(!showLoveLetter)}
              className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <span className="text-2xl mb-3">💌</span>
              <p className="font-bold text-lg">Love Letter</p>
              <p className="text-sm opacity-90">Open my heart to you</p>
            </motion.button>
          </div>

          {/* 3D Hearts Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={trigger3DHearts}
              className="bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <span className="text-2xl mb-3">💕</span>
              <p className="font-bold text-lg">3D Hearts</p>
              <p className="text-sm opacity-90">Magical 3D experience!</p>
            </motion.button>
          </motion.div>

          {/* Love Letter Modal */}
          <AnimatePresence>
            {showLoveLetter && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
                onClick={() => setShowLoveLetter(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-gradient-to-br from-pink-100 to-red-100 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border-2 border-pink-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-2xl font-bold text-red-600 mb-4 text-center" style={{ fontFamily: 'var(--font-dancing)' }}>
                    My Dearest Anuu,
                  </h3>
                  
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <p className="text-lg text-gray-700 leading-relaxed mb-4 text-center" style={{ fontFamily: 'var(--font-quicksand)' }}>
                      {loveQuotes[currentLoveQuote]}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextQuestion}
                        className="px-4 py-2 bg-pink-400 text-white rounded-full font-medium"
                      >
                        Next Quote 💕
                      </motion.button>
                      
                      <span className="text-sm text-gray-600">
                        {currentLoveQuote + 1} / {loveQuotes.length}
                      </span>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowLoveLetter(false)}
                        className="px-4 py-2 bg-red-400 text-white rounded-full font-medium"
                      >
                        Close with Love 💌
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rose Rain Effect */}
          <AnimatePresence>
            {showRoseRain && (
              <div className="fixed inset-0 pointer-events-none z-40">
                {Array.from({ length: 20 }, (_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ 
                      y: window.innerHeight + 50, 
                      opacity: [0, 1, 1, 0],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 2,
                      delay: Math.random() * 2,
                      ease: "linear"
                    }}
                    className="absolute text-4xl"
                    style={{ 
                      left: `${Math.random() * 100}%`,
                    }}
                  >
                    🌹
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Hearts Explosion Effect */}
          <AnimatePresence>
            {showHeartsExplosion && (
              <div className="fixed inset-0 pointer-events-none z-40">
                {Array.from({ length: 15 }, (_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      scale: 0,
                      x: window.innerWidth / 2,
                      y: window.innerHeight / 2
                    }}
                    animate={{ 
                      scale: [0, 1.5, 0],
                      x: window.innerWidth / 2 + (Math.random() - 0.5) * 400,
                      y: window.innerHeight / 2 + (Math.random() - 0.5) * 400,
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      ease: "easeOut"
                    }}
                    className="absolute text-6xl"
                  >
                    💕
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* 3D Hearts Effect Modal */}
          <AnimatePresence>
            {show3DHearts && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ rotateX: 0, rotateY: 0 }}
                  animate={{ rotateX: 360, rotateY: 360 }}
                  transition={{ duration: 4, repeat: 2, ease: "linear" }}
                  className="relative"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                  onMouseMove={handle3DMouseMove}
                >
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    {/* 3D Heart */}
                    <motion.div
                      animate={{ 
                        rotateX: heartRotation.x * 30,
                        rotateY: heartRotation.y * 30,
                        rotateZ: heartRotation.z * 20
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-br from-red-500 via-pink-400 to-purple-500 rounded-2xl shadow-2xl border-4 border-pink-300"
                      style={{
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 25px 50px rgba(255,105,180,0.4), inset 0 4px 8px rgba(255,255,255,0.3)'
                      }}
                    >
                      {/* Heart Texture */}
                      <div className="absolute inset-0 rounded-2xl opacity-30">
                        <div className="grid grid-cols-4 grid-rows-4 h-full">
                          {Array.from({ length: 16 }, (_, i) => (
                            <div
                              key={i}
                              className="border border-pink-300/20"
                              style={{
                                background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255,255,255,0.2) 0%, transparent 70%)`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Floating Elements */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-4xl animate-pulse">💕</div>
                      <div className="absolute -bottom-4 right-4 text-4xl animate-bounce">💖</div>
                      <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 text-4xl animate-spin">✨</div>
                      
                      {/* Love Message */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-white text-xl md:text-2xl font-bold text-center"
                          style={{ fontFamily: 'var(--font-lobster)' }}
                        >
                          {"💕 I Love Youuuuu Anuuu <3 💕"}
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Floating Hearts Around */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          rotate: [0, 360],
                          z: [0, 100, 0]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                        className="absolute text-2xl"
                        style={{
                          top: `${50 + Math.cos((i * Math.PI * 2) / 12) * 80}%`,
                          left: `${50 + Math.sin((i * Math.PI * 2) / 12) * 80}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        💕
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-white text-center bg-gradient-to-r from-pink-500/80 to-red-500/80 px-6 py-3 rounded-full"
                    style={{ fontFamily: 'var(--font-pacifico)' }}
                  >
                    Forever 3D Love for Anuu! 💕
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Messages */}
          <div className="text-center">
            <p className="text-4xl font-bold text-red-400 text-center mb-6" style={{ fontFamily: 'var(--font-dancing)' }}>
              You Are My Everything, Anuu! 💕
            </p>
            
            <div className="text-center">
              <p className="text-xl text-white/90 mb-4">
                Rose Day, Propose Day, Chocolate Day, Teddy Day, Promise Day, Hug Day, Kiss Day...
              </p>
              <p className="text-3xl font-bold text-pink-400" style={{ fontFamily: 'var(--font-pacifico)' }}>
                But every day is Valentine's Day with you! 💕
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <motion.div 
                className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-gradient-to-r from-pink-500/20 to-red-500/20 backdrop-blur-sm rounded-full border-2 border-pink-300/50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.span
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-4xl"
                >
                  💕
                </motion.span>
                
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent"
                  style={{ fontFamily: 'var(--font-dancing)' }}
                >
                  ∞ Forever
                </motion.div>
                
                <motion.span
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="text-4xl"
                >
                  💕
                </motion.span>
                
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="text-3xl"
                >
                  🌹
                </motion.div>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                  className="text-3xl"
                >
                  ✨
                </motion.div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="mt-4 text-lg text-white/80 italic"
                style={{ fontFamily: 'var(--font-quicksand)' }}
              >
                "Our love story written in the stars"
              </motion.p>
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
