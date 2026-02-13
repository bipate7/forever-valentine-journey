"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, MusicIcon, Sparkles, Star, ChevronLeft, ChevronRight, ImageIcon, Play, Pause, ArrowLeft, HeartHandshake } from "lucide-react";
import { useMusic } from "@/contexts/MusicContext";
import confetti from "canvas-confetti";

const kissMessages = [
  "Every kiss is a poem written on your lips",
  "Your kisses are the sweetest addiction I've ever known",
  "In your arms, every kiss feels like coming home",
  "A thousand kisses from you would never be enough",
  "Your kisses taste like forever and always",
  "Every kiss with you is a moment of pure magic",
  "Your lips are the home my heart has been searching for",
  "Kissing you is my favorite kind of heaven",
  "Your kisses make my world stop spinning",
  "Every kiss from you is a promise of forever",
  "Your kisses are the stars that light up my night",
  "In your kisses, I found my forever love"
];

const kissMoments = [
  { id: 1, title: "First Kiss", description: "The moment our souls touched", emoji: "💏" },
  { id: 2, title: "Morning Kisses", description: "Sweet good morning wishes", emoji: "☀️" },
  { id: 3, title: "Goodnight Kisses", description: "Dreams of you all night", emoji: "🌙" },
  { id: 4, title: "Surprise Kisses", description: "When you steal my heart", emoji: "😘" },
  { id: 5, title: "Passionate Kisses", description: "Fireworks in my soul", emoji: "🔥" },
  { id: 6, title: "Gentle Kisses", description: "Soft as butterfly wings", emoji: "🦋" }
];

const naughtyQuestions = [
  { id: 1, question: "Where would you want our next kiss to be?", options: ["Under the stars", "In the rain", "On the beach", "Right now 😏"] },
  { id: 2, question: "What's your favorite type of kiss?", options: ["Slow & passionate", "Quick & sweet", "Playful & teasing", "All of the above 💋"] },
  { id: 3, question: "What do kisses taste like with me?", options: ["Sweet honey", "Chocolate", "Forever", "Pure magic ✨"] },
  { id: 4, question: "How many kisses do you want today?", options: ["Just one", "A dozen", "Hundreds", "Infinite 💕"] },
  { id: 5, question: "What's the naughtiest place you want to kiss me?", options: ["Lips", "Neck", "Collarbone", "Everywhere 🔥"] },
  { id: 6, question: "What happens after our kisses?", options: ["More kisses", "Cuddles", "Sweet dreams", "Forever begins 💝"] },
  { 
    id: 7, 
    question: "If Karan is filled with chocolate from head to toe, would you kiss him like this?", 
    options: ["Lick it all slowly 😋", "Bite gently everywhere 🍫", "Passionate chocolate kisses 🍫", "All of the above and more! 🔥"] 
  }
];

export default function KissDay() {
  const { isPlaying, playMusic } = useMusic();
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showKissRain, setShowKissRain] = useState(false);
  const [currentMoment, setCurrentMoment] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showChocolateKaran, setShowChocolateKaran] = useState(false);
  const [chocolateRotation, setChocolateRotation] = useState({ x: 0, y: 0 });
  const [savedAnswers, setSavedAnswers] = useState<Array<{question: string, answer: string}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Load saved answers from localStorage
    const stored = localStorage.getItem('kissDayAnswers');
    if (stored) {
      setSavedAnswers(JSON.parse(stored));
    }

    // Create floating hearts
    const heartArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      size: Math.random() * 25 + 15
    }));
    setHearts(heartArray);

    // Create floating sparkles
    const sparkleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10
    }));
    setSparkles(sparkleArray);

    // Rotate messages
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % kissMessages.length);
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

    window.addEventListener('click', handleFirstInteraction, { once: true });

    return () => {
      clearInterval(messageInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, [isPlaying, hasInteracted, playMusic]);

  const triggerKissRain = () => {
    setShowKissRain(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#FF6B9D', '#C71585', '#FFB6C1', '#FFC0CB']
    });
    
    setTimeout(() => {
      setShowKissRain(false);
    }, 5000);
  };

  const nextMoment = () => {
    setCurrentMoment((prev) => (prev + 1) % kissMoments.length);
  };

  const prevMoment = () => {
    setCurrentMoment((prev) => (prev - 1 + kissMoments.length) % kissMoments.length);
  };

  const handleFinalClick = () => {
    setShowFinalMessage(true);
    triggerKissRain();
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % naughtyQuestions.length);
    setSelectedAnswer(null);
  };

  const prevQuestion = () => {
    setCurrentQuestion((prev) => (prev - 1 + naughtyQuestions.length) % naughtyQuestions.length);
    setSelectedAnswer(null);
  };

  const selectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    triggerKissRain();
    
    // Save answer to localStorage
    const newAnswer = {
      question: naughtyQuestions[currentQuestion].question,
      answer: answer
    };
    const updatedAnswers = [...savedAnswers.filter(a => a.question !== newAnswer.question), newAnswer];
    setSavedAnswers(updatedAnswers);
    localStorage.setItem('kissDayAnswers', JSON.stringify(updatedAnswers));
    
    // Special effect for chocolate Karan question
    if (currentQuestion === 6) { // 7th question (index 6)
      setShowChocolateKaran(true);
      setTimeout(() => setShowChocolateKaran(false), 8000);
    }
  };

  const handleChocolateMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -2;
    setChocolateRotation({ x, y });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-red-950 to-purple-950 overflow-hidden relative">
      {/* Floating Hearts Background */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0.6, 0.3, 0],
            scale: [0, 1, 1.2, 1, 0],
            y: [0, -100, -200]
          }}
          transition={{ 
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute text-2xl md:text-4xl"
          style={{ 
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            fontSize: `${heart.size}px`
          }}
        >
          💋
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
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute text-xl md:text-3xl"
          style={{ 
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Kiss Rain Effect */}
      <AnimatePresence>
        {showKissRain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {Array.from({ length: 50 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  opacity: 1
                }}
                animate={{ 
                  y: window.innerHeight + 50,
                  opacity: [1, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2
                }}
                className="absolute text-2xl md:text-4xl"
              >
                💋
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
              <div className="text-2xl">💋</div>
              <span className="font-bold text-lg">February 13 - Kiss Day</span>
              <div className="text-2xl">💋</div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 bg-clip-text text-transparent mb-8 md:mb-12 text-center px-4"
            style={{ fontFamily: 'var(--font-lobster)' }}
          >
            Sweet Kisses for My Anuu
          </motion.h1>

          {/* Rotating Kiss Message */}
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
                className="text-xl md:text-2xl text-white leading-relaxed font-medium text-center px-4" 
                style={{ fontFamily: 'var(--font-pacifico)' }}
              >
                {kissMessages[currentMessage]}
              </motion.p>
            </div>
          </motion.div>

          {/* Kiss Moments Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto border-2 border-pink-300/30">
              <h3 className="text-2xl md:text-3xl font-bold text-pink-400 mb-6 text-center" 
                  style={{ fontFamily: 'var(--font-dancing)' }}>
                Our Kiss Moments 💕
              </h3>
              
              <div className="relative">
                <motion.div
                  key={currentMoment}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-6xl md:text-8xl mb-4">
                    {kissMoments[currentMoment].emoji}
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {kissMoments[currentMoment].title}
                  </h4>
                  <p className="text-white/80 text-lg">
                    {kissMoments[currentMoment].description}
                  </p>
                </motion.div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevMoment}
                    className="p-3 bg-pink-500/20 rounded-full text-white hover:bg-pink-500/30 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  
                  <div className="flex gap-2">
                    {kissMoments.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentMoment ? 'bg-pink-400' : 'bg-white/30'
                        }`}
                        whileHover={{ scale: 1.5 }}
                        onClick={() => setCurrentMoment(index)}
                      />
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextMoment}
                    className="p-3 bg-pink-500/20 rounded-full text-white hover:bg-pink-500/30 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Kiss Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerKissRain}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-bold text-lg"
            >
              <span className="flex items-center gap-2">
                <HeartHandshake size={24} />
                Send Virtual Kisses 💋
              </span>
            </motion.button>
          </motion.div>

          {/* Naughty Questions Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto border-2 border-pink-300/30">
              <h3 className="text-2xl md:text-3xl font-bold text-pink-400 mb-6 text-center" 
                  style={{ fontFamily: 'var(--font-dancing)' }}>
                Naughty Kiss Questions 😏
              </h3>
              
              <div className="relative">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-6"
                >
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4">
                    {naughtyQuestions[currentQuestion].question}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {naughtyQuestions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => selectAnswer(option)}
                        className={`p-3 rounded-lg text-sm md:text-base font-medium transition-all ${
                          selectedAnswer === option 
                            ? 'bg-pink-500 text-white shadow-lg' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                  
                  {selectedAnswer && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-pink-300 text-lg mt-4"
                      style={{ fontFamily: 'var(--font-pacifico)' }}
                    >
                      Ooh, I like your answer! 😘 {selectedAnswer}
                    </motion.p>
                  )}
                </motion.div>

                {/* Question Navigation */}
                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevQuestion}
                    className="p-3 bg-pink-500/20 rounded-full text-white hover:bg-pink-500/30 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  
                  <div className="flex gap-2">
                    {naughtyQuestions.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentQuestion ? 'bg-pink-400' : 'bg-white/30'
                        }`}
                        whileHover={{ scale: 1.5 }}
                        onClick={() => {
                          setCurrentQuestion(index);
                          setSelectedAnswer(null);
                        }}
                      />
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextQuestion}
                    className="p-3 bg-pink-500/20 rounded-full text-white hover:bg-pink-500/30 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3D Chocolate Karan Effect */}
          <AnimatePresence>
            {showChocolateKaran && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 2, repeat: 2, ease: "linear" }}
                  className="relative"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                  onMouseMove={handleChocolateMouseMove}
                >
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    {/* Chocolate Body */}
                    <motion.div
                      animate={{ 
                        rotateX: chocolateRotation.x * 20,
                        rotateY: chocolateRotation.y * 20
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 rounded-2xl shadow-2xl border-4 border-amber-600"
                      style={{
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)'
                      }}
                    >
                      {/* Chocolate Texture */}
                      <div className="absolute inset-0 rounded-2xl opacity-30">
                        <div className="grid grid-cols-4 grid-rows-4 h-full">
                          {Array.from({ length: 16 }, (_, i) => (
                            <div
                              key={i}
                              className="border border-amber-600/20"
                              style={{
                                background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255,255,255,0.1) 0%, transparent 70%)`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Chocolate Drips */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-6xl">🍫</div>
                      <div className="absolute -bottom-4 right-4 text-4xl">🍯</div>
                      <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 text-4xl">🍫</div>
                      
                      {/* Karan Label */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-white text-2xl md:text-3xl font-bold text-center"
                          style={{ fontFamily: 'var(--font-lobster)' }}
                        >
                          🍫 Karan 🍫
                          <div className="text-sm md:text-base mt-2">Chocolate Boy</div>
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    {/* Floating Hearts Around Chocolate */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                        className="absolute text-2xl"
                        style={{
                          top: `${50 + Math.cos((i * Math.PI * 2) / 8) * 60}%`,
                          left: `${50 + Math.sin((i * Math.PI * 2) / 8) * 60}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        💋
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-white text-center bg-pink-500/80 px-6 py-3 rounded-full"
                    style={{ fontFamily: 'var(--font-pacifico)' }}
                  >
                    Lick me everywhere, Anuu! 😋
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Message */}
          <AnimatePresence>
            {showFinalMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto border-2 border-pink-300/30"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-pink-400 mb-4 text-center" 
                    style={{ fontFamily: 'var(--font-dancing)' }}>
                  My Forever Kiss 💕
                </h3>
                <p className="text-white text-lg leading-relaxed text-center">
                  Every kiss with you is a promise of forever, my Anuu. 
                  Your lips are the poetry my heart has been waiting to read. 
                  I love you more than words can express, and I can't wait to kiss you tomorrow on Valentine's Day! 💋
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Music Control */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={playMusic}
              className="p-4 bg-white/10 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              {isPlaying ? (
                <Pause size={24} className="text-pink-400" />
              ) : (
                <Play size={24} className="text-pink-400" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
