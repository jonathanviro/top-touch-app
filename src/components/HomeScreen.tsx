import { useNavigate } from "react-router-dom";
import startBg from "../assets/backgrounds/start-bg.png";
import playBtn from "../assets/buttons/play-btn.png";

const StartScreen = () => {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate("/invoice");
  };
  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${startBg})` }}
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
