import React, { useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

import winnerImg from "../assets/results/winner.png";
import partialWinnerImg from "../assets/results/partial-winner.png";
import loserImg from "../assets/results/loser.png";
import winnerAudio from "../assets/audio/winner.mp3";
import partialAudio from "../assets/audio/partial-winner.mp3";
import loserAudio from "../assets/audio/loser.mp3";
import homeBtn from "../assets/buttons/home-btn.png";

type ResultType = "winner" | "partial-winner" | "loser";

interface ResultModalProps {
  score: number;
  resultType: ResultType;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  score,
  resultType,
  onClose,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [width, height] = useWindowSize();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const images: Record<ResultType, string> = {
    winner: winnerImg,
    "partial-winner": partialWinnerImg,
    loser: loserImg,
  };

  const audios: Record<ResultType, string> = {
    winner: winnerAudio,
    "partial-winner": partialAudio,
    loser: loserAudio,
  };

  useEffect(() => {
    const audio = new Audio(audios[resultType]);
    audioRef.current = audio;

    audio
      .play()
      .catch((err) =>
        console.warn("Audio interrumpido o bloqueado por el navegador:", err)
      );

    if (resultType === "winner") setShowConfetti(true);

    return () => {
      setPlaying(false);
    };
  }, [resultType]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      {showConfetti && (
        <Confetti width={width} height={height} numberOfPieces={300} />
      )}
      <div className="relative">
        <img
          src={images[resultType]}
          alt="Resultado"
          className="w-[500px] h-auto"
        />
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold">
          {score} Puntos
        </div>
        <button
          onClick={onClose}
          className="absolute left-1/2 transform -translate-x-1/2 mt-24"
        >
          <img src={homeBtn} alt="Home" className="w-26 h-26" />
        </button>
      </div>
      <ReactHowler src={audios[resultType]} playing={playing} volume={1.0} />
    </div>
  );
};

export default ResultModal;
