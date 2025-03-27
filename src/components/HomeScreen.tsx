import { useState } from "react";
import { useNavigate } from "react-router-dom";
import startBg from "../assets/backgrounds/start-bg.png";
import playBtn from "../assets/buttons/play-btn.png";

const StartScreen = () => {
  const [touchCount, setTouchCount] = useState(0);
  const navigate = useNavigate();

  // Maneja el clic en toda la pantalla
  const handleScreenClick = () => {
    console.log(touchCount);
    setTouchCount((prev) => {
      const next = prev + 1;
      if (next >= 10) {
        // Cuando llega a 10 toques, vamos al menú ("/")
        navigate("/");
      }
      return next;
    });
  };

  // Maneja el botón Play
  // Si NO quieres que el clic en Play cuente,
  // usa e.stopPropagation() para que no burbujee
  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Quita esta línea si quieres que el botón también cuente
    navigate("/invoice");
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${startBg})` }}
      onClick={handleScreenClick}
    >
      <button className="mt-[900px]" onClick={handlePlay}>
        <img
          src={playBtn}
          alt="Boton Play"
          className="w-[400px] h-auto cursor-pointer hover:opacity-95"
        />
      </button>
    </div>
  );
};

export default StartScreen;
