import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import invoiceBg from "../assets/backgrounds/invoice-bg.png";
import keyboardInvoiceBg from "../assets/backgrounds/keyboard-invoice-bg.png";
import ceroBtn from "../assets/buttons/0-btn.png";
import oneBtn from "../assets/buttons/1-btn.png";
import twoBtn from "../assets/buttons/2-btn.png";
import threeBtn from "../assets/buttons/3-btn.png";
import fourBtn from "../assets/buttons/4-btn.png";
import fiveBtn from "../assets/buttons/5-btn.png";
import sixBtn from "../assets/buttons/6-btn.png";
import sevenBtn from "../assets/buttons/7-btn.png";
import eightBtn from "../assets/buttons/8-btn.png";
import nineBtn from "../assets/buttons/9-btn.png";
import playBtn from "../assets/buttons/play-btn.png";

const InvoiceScreen = () => {
  const navigate = useNavigate();

  // --- Estado para la factura ---
  const [invoice, setInvoice] = useState<string[]>(Array(12).fill(""));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // --- Lógica de 10 toques en el contenedor ---
  const [touchCount, setTouchCount] = useState(0);

  // --- Lógica de inactividad con setTimeout de 60s ---
  // Usamos useRef<number | null>, pues en navegador setTimeout devuelve un número
  const inactivityTimeoutId = useRef<number | null>(null);

  // Función para reiniciar el temporizador de inactividad
  const resetInactivityTimer = () => {
    // Si existe un timeout previo, lo limpiamos
    if (inactivityTimeoutId.current !== null) {
      window.clearTimeout(inactivityTimeoutId.current);
    }
    // Iniciamos un nuevo timeout de 60s
    inactivityTimeoutId.current = window.setTimeout(() => {
      // Si pasa 1 min sin interacción, regresamos a home
      navigate("/home");
    }, 60000) as unknown as number; // forzamos a number si TypeScript se queja
  };

  // Al montar, inicia el timeout; al desmontar, limpiar
  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimeoutId.current !== null) {
        window.clearTimeout(inactivityTimeoutId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manejar clics en el teclado
  const handleKeyPress = (
    value: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation(); // Evita que cuente para el contenedor
    resetInactivityTimer(); // Usuario interactuó, reiniciamos inactividad

    let index = invoice.findIndex((val) => val === "");
    if (index === -1 && activeIndex !== null) {
      index = activeIndex;
    }
    if (index !== -1) {
      const newInvoice = [...invoice];
      newInvoice[index] = value;
      setInvoice(newInvoice);

      if (index < 11) {
        setActiveIndex(index + 1);
      }
    }
  };

  // Seleccionar casilla manualmente
  const handleSelectBox = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation(); // No contarlo como clic en contenedor
    resetInactivityTimer(); // Reiniciamos inactividad
    setActiveIndex(index);
  };

  // Botón de jugar
  const isComplete = invoice.every((value) => value !== "");
  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    resetInactivityTimer();
    if (isComplete) {
      navigate("/game");
    }
  };

  // Clic en el contenedor principal -> 10 toques + reinicio inactividad
  const handleContainerClick = () => {
    resetInactivityTimer();

    const newCount = touchCount + 1;
    if (newCount >= 10) {
      navigate("/home");
    } else {
      setTouchCount(newCount);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${invoiceBg})` }}
      onClick={handleContainerClick}
    >
      <div className="text-white text-4xl font-bold mb-6">Ingrese Factura:</div>

      {/* Casillas */}
      <div className="flex gap-3 mb-8">
        {invoice.map((value, index) => (
          <div
            key={index}
            onClick={(e) => handleSelectBox(index, e)}
            className={`w-16 h-16 border-4 ${
              index === activeIndex ? "border-yellow-400" : "border-white"
            } text-white flex items-center justify-center text-3xl cursor-pointer`}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Fondo del teclado */}
      <div
        className="relative flex justify-center mt-25 mb-25"
        style={{
          backgroundImage: `url(${keyboardInvoiceBg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "500px",
          height: "580px",
        }}
        onClick={(e) => e.stopPropagation()} // No contamos clics en el fondo del teclado
      >
        {/* Teclado */}
        <div className="grid grid-cols-3 gap-5 absolute top-6">
          {/* Fila 1 */}
          <button onClick={(e) => handleKeyPress("1", e)}>
            <img
              src={oneBtn}
              alt="1"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={(e) => handleKeyPress("2", e)}>
            <img
              src={twoBtn}
              alt="2"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={(e) => handleKeyPress("3", e)}>
            <img
              src={threeBtn}
              alt="3"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>

          {/* Fila 2 */}
          <button onClick={(e) => handleKeyPress("4", e)}>
            <img
              src={fourBtn}
              alt="4"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={(e) => handleKeyPress("5", e)}>
            <img
              src={fiveBtn}
              alt="5"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={(e) => handleKeyPress("6", e)}>
            <img
              src={sixBtn}
              alt="6"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>

          {/* Fila 3 */}
          <button onClick={(e) => handleKeyPress("7", e)}>
            <img
              src={sevenBtn}
              alt="7"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={(e) => handleKeyPress("8", e)}>
            <img
              src={eightBtn}
              alt="8"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={(e) => handleKeyPress("9", e)}>
            <img
              src={nineBtn}
              alt="9"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>

          <div></div>
          <button onClick={(e) => handleKeyPress("0", e)}>
            <img
              src={ceroBtn}
              alt="0"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <div></div>
        </div>
      </div>

      {/* Botón de jugar */}
      <button
        className={`mt-6 ${
          isComplete ? "opacity-100" : "opacity-50 pointer-events-none"
        }`}
        onClick={handlePlay}
      >
        <img src={playBtn} alt="Boton Play" className="w-[300px] h-auto" />
      </button>
    </div>
  );
};

export default InvoiceScreen;
