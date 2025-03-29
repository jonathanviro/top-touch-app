import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GAME_CONFIG } from "../utils/game-config";
import NullexLogo from "../assets/logos/nullex-logo.png";
import ConfigItem from "../components/ConfigItem";
import DaisyModal from "../components/DaisyModal";

const ConfigScreen = () => {
  const navigate = useNavigate();

  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem("game_config");
    return saved ? JSON.parse(saved) : GAME_CONFIG;
  });

  // Modal tipo "alert" (mensaje + OK)
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  // Modal tipo "confirm" (mensaje + Aceptar/Cancelar)
  const [modalConfirm, setModalConfirm] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm?: () => void; // la acción que se corre si aceptan
  }>({
    isOpen: false,
    title: "",
    message: "",
  });

  // Funciones para abrir/cerrar modales
  const showInfoModal = (title: string, message: string) => {
    setModalInfo({ isOpen: true, title, message });
  };
  const closeInfoModal = () => {
    setModalInfo({ ...modalInfo, isOpen: false });
  };

  const showConfirmModal = (
    title: string,
    message: string,
    onConfirm: () => void
  ) => {
    setModalConfirm({ isOpen: true, title, message, onConfirm });
  };
  const closeConfirmModal = () => {
    setModalConfirm({ ...modalConfirm, isOpen: false });
  };

  // =====================
  // Manejo de la config
  // =====================
  const handleChange = (key: string, value: number) => {
    // Ejemplo de validaciones
    if (value <= 0) {
      showInfoModal(
        "Valor inválido",
        "Los valores deben ser mayores que cero."
      );
      return;
    }
    if (key === "goalLoser" && value >= config.goalPartialWinner) {
      showInfoModal(
        "Valor inválido",
        "‘Toques mínimo para perder’ no puede ser mayor o igual a ‘Toques mínimo para ganar’."
      );
      return;
    }
    if (key === "goalPartialWinner" && value <= config.goalLoser) {
      showInfoModal(
        "Valor inválido",
        "‘Toques mínimo para ganar’ no puede ser menor o igual que ‘Toques mínimo para perder’."
      );
      return;
    }

    setConfig({ ...config, [key]: value });
  };

  const handleGuardar = () => {
    // Validar algo adicional
    if (config.goalPartialWinner <= config.goalLoser) {
      showInfoModal(
        "Error",
        "Verifica los valores de perder/ganar antes de guardar."
      );
      return;
    }

    // Antes: const confirmar = window.confirm(...);
    // Ahora:
    showConfirmModal(
      "Guardar Configuración",
      "¿Deseas guardar los cambios?",
      () => {
        // onConfirm
        localStorage.setItem("game_config", JSON.stringify(config));
        closeConfirmModal();
        showInfoModal("Éxito", "¡Configuración guardada!");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    );
  };

  const handleCancelar = () => {
    // Antes: window.confirm
    showConfirmModal(
      "Descartar Cambios",
      "¿Deseas descartar los cambios?",
      () => {
        const saved = localStorage.getItem("game_config");
        setConfig(saved ? JSON.parse(saved) : GAME_CONFIG);
        closeConfirmModal();
        showInfoModal(
          "Cambios descartados",
          "Volviste a la configuración anterior."
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    );
  };

  const handleRestablecer = () => {
    showConfirmModal(
      "Restablecer Configuración",
      "¿Deseas restablecer la configuración a los valores originales?",
      () => {
        setConfig(GAME_CONFIG);
        localStorage.removeItem("game_config");
        closeConfirmModal();
        showInfoModal(
          "Restablecido",
          "La configuración se ha restablecido a los valores originales."
        );
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    );
  };

  const configFields = [
    { label: "Duración del juego (s)", key: "gameDuration", isVisible: true },
    {
      label: "Tiempo visibilidad (ms)",
      key: "characterLifetime",
      isVisible: false,
    },
    {
      label: "Intervalo aparición (ms)",
      key: "spawnInterval",
      isVisible: false,
    },
    { label: "Máx. personajes por ciclo", key: "maxPerCycle", isVisible: true },
    {
      label: "Delay animación salida (ms)",
      key: "destroyDelay",
      isVisible: false,
    },
    { label: "Toques mínimo para perder", key: "goalLoser", isVisible: true },
    {
      label: "Toques mínimo para ganar parcialmente",
      key: "goalPartialWinner",
      isVisible: true,
    },
    { label: "Filas (rows)", key: "rows", isVisible: false },
    { label: "Columnas (columns)", key: "columns", isVisible: false },
  ];

  return (
    <div
      data-theme="light"
      className="min-h-screen bg-blue-app flex items-center justify-center px-6"
    >
      <div className="absolute top-0 w-full flex justify-center mt-40">
        <img className="w-[250px] h-auto" src={NullexLogo} alt="Logo Nullex" />
      </div>
      <div className="w-full max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-36 text-white text-center">
          Configuración del Juego
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {configFields.map(({ label, key, isVisible }) => (
            <ConfigItem
              key={key}
              label={label}
              isVisible={isVisible}
              value={config[key]}
              onChange={(val) => handleChange(key, val)}
            />
          ))}
        </div>

        <div className="mt-20 flex flex-wrap gap-16 justify-center">
          <button className="btn btn-error btn-outline" onClick={handleGuardar}>
            Guardar
          </button>
          <button
            className="btn btn-error btn-outline"
            onClick={handleRestablecer}
          >
            Restablecer
          </button>
          <button className="btn btn-success" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
      </div>

      <DaisyModal
        isOpen={modalInfo.isOpen}
        title={modalInfo.title}
        message={modalInfo.message}
        onClose={closeInfoModal}
      />

      <DaisyModal
        isOpen={modalConfirm.isOpen}
        title={modalConfirm.title}
        message={modalConfirm.message}
        // Si onConfirm existe, se muestran los dos botones
        onConfirm={modalConfirm.onConfirm}
        onClose={closeConfirmModal}
        confirmText="Sí"
        cancelText="No"
      />
    </div>
  );
};

export default ConfigScreen;
