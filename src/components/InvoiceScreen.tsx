import { useState } from "react";
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
  const [invoice, setInvoice] = useState<string[]>(Array(12).fill(""));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Manejar clics en el teclado
  const handleKeyPress = (value: string) => {
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
  const handleSelectBox = (index: number) => {
    setActiveIndex(index);
  };

  // Habilitar el botón solo si todas las casillas están llenas
  const isComplete = invoice.every((value) => value !== "");

  const handlePlay = () => {
    if (isComplete) {
      navigate("/game");
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${invoiceBg})` }}
    >
      {/* Texto superior */}
      <div className="text-white text-4xl font-bold mb-6">Ingrese Factura:</div>

      {/* Casillas de factura */}
      <div className="flex gap-3 mb-8">
        {invoice.map((value, index) => (
          <div
            key={index}
            onClick={() => handleSelectBox(index)}
            className={`w-16 h-16 border-4 ${
              index === activeIndex ? "border-yellow-400" : "border-white"
            } text-white flex items-center justify-center text-3xl cursor-pointer`}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Fondo del teclado (ajustado para que no se recorte) */}
      <div
        className="relative flex justify-center mt-25 mb-25"
        style={{
          backgroundImage: `url(${keyboardInvoiceBg})`,
          backgroundSize: "contain", // ← Cambié de "cover" a "contain"
          backgroundRepeat: "no-repeat",
          width: "500px", // Tamaño amplio para acomodar todos los botones
          height: "580px", // Altura aumentada para mejor alineación
        }}
      >
        {/* Teclado */}
        <div className="grid grid-cols-3 gap-5 absolute top-6">
          {/* Primera fila */}
          <button onClick={() => handleKeyPress("1")}>
            <img
              src={oneBtn}
              alt="1"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={() => handleKeyPress("2")}>
            <img
              src={twoBtn}
              alt="2"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={() => handleKeyPress("3")}>
            <img
              src={threeBtn}
              alt="3"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>

          {/* Segunda fila */}
          <button onClick={() => handleKeyPress("4")}>
            <img
              src={fourBtn}
              alt="4"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={() => handleKeyPress("5")}>
            <img
              src={fiveBtn}
              alt="5"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={() => handleKeyPress("6")}>
            <img
              src={sixBtn}
              alt="6"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>

          {/* Tercera fila */}
          <button onClick={() => handleKeyPress("7")}>
            <img
              src={sevenBtn}
              alt="7"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={() => handleKeyPress("8")}>
            <img
              src={eightBtn}
              alt="8"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>
          <button onClick={() => handleKeyPress("9")}>
            <img
              src={nineBtn}
              alt="9"
              className="w-[120px] h-[120px] cursor-pointer hover:scale-110 transition-transform"
            />
          </button>

          {/* Cero alineado al centro */}
          <div></div>
          <button onClick={() => handleKeyPress("0")}>
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
