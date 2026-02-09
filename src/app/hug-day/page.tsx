"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Lock, Calendar, Heart, HeartHandshake } from "lucide-react";

export default function HugDay() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Calculate time until February 12 (Hug Day)
    const targetDate = new Date();
    targetDate.setMonth(1, 12); // February 12
    targetDate.setFullYear(targetDate.getFullYear());
    if (targetDate < new Date()) {
      targetDate.setFullYear(targetDate.getFullYear() + 1);
    }
    targetDate.setHours(0, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
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
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all text-white"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Valentine Week</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Locked Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/20 text-center"
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
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center shadow-xl"
          >
            <Lock size={48} className="text-white" />
          </motion.div>

          {/* Hug Icon */}
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 mx-auto mb-4 text-green-400"
          >
            <HeartHandshake size={64} />
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-lobster)' }}>
            Coming Soon!
          </h1>

          {/* Date */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Calendar className="text-green-400" size={24} />
            <span className="text-xl text-green-400 font-medium">
              February 12 - Hug Day
            </span>
          </div>

          {/* Message */}
          <p className="text-lg text-white/80 mb-8" style={{ fontFamily: 'var(--font-quicksand)' }}>
            Warm hugs are being prepared for you, my love. 
            This day will be filled with embrace and tender moments together!
          </p>

          {/* Countdown */}
          <div className="bg-black/30 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-green-400 mb-4">Unlock In:</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{countdown.days}</div>
                <div className="text-sm text-white/60">Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{countdown.hours}</div>
                <div className="text-sm text-white/60">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{countdown.minutes}</div>
                <div className="text-sm text-white/60">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{countdown.seconds}</div>
                <div className="text-sm text-white/60">Seconds</div>
              </div>
            </div>
          </div>

          {/* Hug Animation */}
          <div className="flex justify-center gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="text-2xl"
              >
                🤗
              </motion.div>
            ))}
          </div>

          {/* Back Button */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Return to Valentine's Day 🤗
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating Hugs Background */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [100, -20, 100],
              opacity: [0, 1, 0],
              x: [0, Math.random() * 100 - 50, 0]
            }}
            transition={{ 
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute text-4xl opacity-30"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            🤗
          </motion.div>
        ))}
      </div>
    </div>
  );
}
