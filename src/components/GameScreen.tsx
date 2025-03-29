import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ResultModal from "../components/ResultModal";

import { GAME_CONFIG } from "../utils/game-config";
import gameBg from "../assets/backgrounds/game-bg.png";
import characterOneBg from "../assets/characters/1-chara.png";
import characterTwoBg from "../assets/characters/2-chara.png";
import characterThreeBg from "../assets/characters/3-chara.png";
import characterFourBg from "../assets/characters/4-chara.png";
import characterFiveBg from "../assets/characters/5-chara.png";
import characterSixBg from "../assets/characters/6-chara.png";
import characterSevenBg from "../assets/characters/7-chara.png";
import characterEightBg from "../assets/characters/8-chara.png";
import gameBgAudio from "../assets/audio/soundtrack-bg.mp3";

const characters = [
  characterOneBg,
  characterTwoBg,
  characterThreeBg,
  characterFourBg,
  characterFiveBg,
  characterSixBg,
  characterSevenBg,
  characterEightBg,
];

const GameScreen = () => {
  const savedConfig = localStorage.getItem("game_config");
  const CURRENT_CONFIG = savedConfig ? JSON.parse(savedConfig) : GAME_CONFIG;

  const navigate = useNavigate();
  const gridSize = CURRENT_CONFIG.columns * CURRENT_CONFIG.rows;

  const [timeLeft, setTimeLeft] = useState(CURRENT_CONFIG.gameDuration);
  const [score, setScore] = useState(0);
  const [activeCharacters, setActiveCharacters] = useState<(number | null)[]>(
    new Array(gridSize).fill(null)
  );
  const [animatedIndexes, setAnimatedIndexes] = useState<number[]>([]);
  const [clickDestroyingIndexes, setClickDestroyingIndexes] = useState<
    number[]
  >([]);
  const [destroyingIndexes, setDestroyingIndexes] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  type ResultType = "winner" | "partial-winner" | "loser";
  const [resultType, setResultType] = useState<ResultType>("partial-winner");

  const audioRef = useRef(new Audio(gameBgAudio));

  const timeouts = useRef<{ [key: number]: number }>({});

  // Temporizador principal
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev: number) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      // navigate("/result", { state: { score } });
    }
  }, [timeLeft, navigate, score]);

  // Cuando se acabe el tiempo. Determinar el resultado
  useEffect(() => {
    if (timeLeft <= 0) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      if (score <= CURRENT_CONFIG.goalLoser) {
        setResultType("loser");
      } else if (score <= CURRENT_CONFIG.goalPartialWinner) {
        setResultType("partial-winner");
      } else {
        setResultType("winner");
      }

      setShowResult(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    audioRef.current.play();

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  // Generación escalonada de personajes
  useEffect(() => {
    if (showResult) return;

    let generated = 0;
    const availablePositions = activeCharacters
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null) as number[];

    if (availablePositions.length > 0) {
      const interval = setInterval(() => {
        if (generated < CURRENT_CONFIG.maxPerCycle) {
          const newPosition =
            availablePositions[
              Math.floor(Math.random() * availablePositions.length)
            ];

          setActiveCharacters((prev) => {
            const updated = [...prev];
            if (updated[newPosition] === null) {
              updated[newPosition] = Math.floor(
                Math.random() * characters.length
              );

              setAnimatedIndexes((prev) => [...prev, newPosition]);
              setTimeout(() => {
                setAnimatedIndexes((prev) =>
                  prev.filter((pos) => pos !== newPosition)
                );
              }, 400);

              timeouts.current[newPosition] = window.setTimeout(() => {
                setDestroyingIndexes((prev) => [...prev, newPosition]);
                setTimeout(() => {
                  setActiveCharacters((current) => {
                    const updatedCharacters = [...current];
                    updatedCharacters[newPosition] = null;
                    return updatedCharacters;
                  });
                  setDestroyingIndexes((prev) =>
                    prev.filter((pos) => pos !== newPosition)
                  );
                  delete timeouts.current[newPosition];
                }, CURRENT_CONFIG.destroyDelay);
              }, CURRENT_CONFIG.characterLifetime);
            }
            return updated;
          });

          generated++;
        } else {
          clearInterval(interval);
        }
      }, CURRENT_CONFIG.spawnInterval);

      return () => clearInterval(interval);
    }
  }, [activeCharacters]);

  // 🚀 Cuando se toca un personaje
  const handleCharacterClick = (index: number) => {
    if (showResult) return;

    setScore((prev) => prev + 1);

    if (timeouts.current[index]) {
      clearTimeout(timeouts.current[index]);
      delete timeouts.current[index];
    }

    setClickDestroyingIndexes((prev) => [...prev, index]);
    setTimeout(() => {
      setActiveCharacters((prev) => {
        const updated = [...prev];
        updated[index] = null;
        return updated;
      });
      setClickDestroyingIndexes((prev) => prev.filter((pos) => pos !== index));
    }, CURRENT_CONFIG.destroyDelay);
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center relative"
      style={{ backgroundImage: `url(${gameBg})` }}
    >
      <div className="absolute top-72 left-16 text-white text-3xl font-bold">
        Tiempo: {timeLeft}s
      </div>

      <div className="absolute top-72 right-16 text-white text-3xl font-bold">
        Puntos: {score}
      </div>

      <div
        className={`grid gap-20 mt-72 bg-blue-400/10 rounded-[60px] p-8`}
        style={{
          gridTemplateColumns: `repeat(${CURRENT_CONFIG.columns}, 1fr)`,
          gridTemplateRows: `repeat(${CURRENT_CONFIG.rows}, 1fr)`,
        }}
      >
        {activeCharacters.map((charIndex, index) => (
          <div
            key={index}
            className="w-40 h-40 flex items-center justify-center"
          >
            {charIndex !== null && (
              <img
                key={`${index}-${charIndex}`}
                src={characters[charIndex]}
                alt="Character"
                className={`w-[128px] h-[128px] object-contain cursor-pointer
                  ${
                    animatedIndexes.includes(index)
                      ? "animate-pop-in"
                      : clickDestroyingIndexes.includes(index)
                      ? "animate-destroy-click"
                      : destroyingIndexes.includes(index)
                      ? "animate-destroy-automatic"
                      : "animate-shake"
                  }
                `}
                onClick={() => handleCharacterClick(index)}
              />
            )}
          </div>
        ))}
      </div>

      {showResult && (
        <ResultModal
          score={score}
          resultType={resultType} // "winner", "partial-winner", "loser"
          onClose={() => {
            setShowResult(false);
            navigate("/home", { state: { score } });
          }}
        />
      )}
    </div>
  );
};

export default GameScreen;
