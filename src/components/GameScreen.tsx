import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gameBg from "../assets/backgrounds/game-bg.png";
import characterOneBg from "../assets/characters/1-chara.png";
import characterTwoBg from "../assets/characters/2-chara.png";
import characterThreeBg from "../assets/characters/3-chara.png";
import characterFourBg from "../assets/characters/4-chara.png";
import characterFiveBg from "../assets/characters/5-chara.png";
import characterSixBg from "../assets/characters/6-chara.png";
import characterSevenBg from "../assets/characters/7-chara.png";
import characterEightBg from "../assets/characters/8-chara.png";

// ⏱️ Parámetros de configuración
const LIFETIME = 1500;
const CHARACTER_GENERATION_INTERVAL = 250;
const MAX_NEW_CHARACTERS_PER_CYCLE = 10;

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

const GRID_SIZE = 20;
const GAME_DURATION = 200;

const GameScreen = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [activeCharacters, setActiveCharacters] = useState<(number | null)[]>(
    new Array(GRID_SIZE).fill(null)
  );
  const timeouts = useRef<{ [key: number]: number }>({});

  // ⏳ Temporizador principal
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      navigate("/result", { state: { score } });
    }
  }, [timeLeft, navigate]);

  // 🧠 Generación escalonada de personajes
  useEffect(() => {
    let generated = 0;
    const availablePositions = activeCharacters
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null) as number[];

    if (availablePositions.length > 0) {
      const interval = setInterval(() => {
        if (generated < MAX_NEW_CHARACTERS_PER_CYCLE) {
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

              // ✅ Desaparición automática después de LIFETIME
              timeouts.current[newPosition] = window.setTimeout(() => {
                setActiveCharacters((current) => {
                  const updatedCharacters = [...current];
                  updatedCharacters[newPosition] = null;
                  return updatedCharacters;
                });

                delete timeouts.current[newPosition];
              }, LIFETIME);
            }
            return updated;
          });

          generated++;
        } else {
          clearInterval(interval);
        }
      }, CHARACTER_GENERATION_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [activeCharacters]);

  // 🚀 Cuando se toca un personaje
  const handleCharacterClick = (index: number) => {
    setScore((prev) => prev + 1);
    if (timeouts.current[index]) {
      clearTimeout(timeouts.current[index]);
      delete timeouts.current[index];
    }

    setActiveCharacters((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center relative"
      style={{ backgroundImage: `url(${gameBg})` }}
    >
      {/* Temporizador */}
      <div className="absolute top-16 left-4 text-white text-3xl font-bold">
        Tiempo: {timeLeft}s
      </div>

      {/* Contador */}
      <div className="absolute top-16 right-4 text-white text-3xl font-bold">
        Puntos: {score}
      </div>

      {/* Cuadrícula de personajes */}
      <div className="grid grid-cols-4 grid-rows-5 gap-20 mt-8">
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
                className="w-[128px] h-[128px] object-contain cursor-pointer animate-wiggle"
                onClick={() => handleCharacterClick(index)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
