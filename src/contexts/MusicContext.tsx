"use client";

import { createContext, useContext, useState, useRef, ReactNode } from "react";

interface MusicContextType {
  isPlaying: boolean;
  playMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
};

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        console.log("Music started");
      }).catch(error => {
        console.log("Music play failed:", error);
      });
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, playMusic }}>
      {children}
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/music/Christina_Perri_-_Thousand_years_(mp3.pm).mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </MusicContext.Provider>
  );
};
