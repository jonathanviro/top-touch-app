// ConfigScreen.tsx
import { useState, useEffect } from "react";
import { GAME_CONFIG } from "../utils/game-config";

type GameConfig = typeof GAME_CONFIG;

const ConfigScreen = () => {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem("game_config");
    return saved ? JSON.parse(saved) : GAME_CONFIG;
  });

  const handleChange = (
    section: keyof GameConfig,
    key: string,
    value: number
  ) => {
    setConfig((prev: GameConfig) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    localStorage.setItem("game_config", JSON.stringify(config));
  }, [config]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <h2 className="text-3xl font-bold mb-8">Configuración del Juego</h2>

      <div className="overflow-x-auto w-full max-w-3xl bg-white shadow-xl rounded-xl p-6">
        <table className="table w-full">
          <tbody>
            {/* Duración del juego */}
            <tr>
              <td className="font-semibold">Duración del juego (s)</td>
              <td>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={config.timing.gameDuration}
                  onChange={(e) =>
                    handleChange(
                      "timing",
                      "gameDuration",
                      Number(e.target.value)
                    )
                  }
                />
              </td>
            </tr>

            {/* Tiempo de visibilidad */}
            <tr>
              <td className="font-semibold">Tiempo visibilidad (ms)</td>
              <td>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={config.timing.characterLifetime}
                  onChange={(e) =>
                    handleChange(
                      "timing",
                      "characterLifetime",
                      Number(e.target.value)
                    )
                  }
                />
              </td>
            </tr>

            {/* Intervalo de aparición */}
            <tr>
              <td className="font-semibold">Intervalo aparición (ms)</td>
              <td>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={config.timing.spawnInterval}
                  onChange={(e) =>
                    handleChange(
                      "timing",
                      "spawnInterval",
                      Number(e.target.value)
                    )
                  }
                />
              </td>
            </tr>

            {/* Máximo por ciclo */}
            <tr>
              <td className="font-semibold">Máx. personajes por ciclo</td>
              <td>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={config.timing.maxPerCycle}
                  onChange={(e) =>
                    handleChange(
                      "timing",
                      "maxPerCycle",
                      Number(e.target.value)
                    )
                  }
                />
              </td>
            </tr>

            {/* Delay animación */}
            <tr>
              <td className="font-semibold">Delay animación salida (ms)</td>
              <td>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={config.timing.destroyDelay}
                  onChange={(e) =>
                    handleChange(
                      "timing",
                      "destroyDelay",
                      Number(e.target.value)
                    )
                  }
                />
              </td>
            </tr>

            {/* Reglas de resultado */}
            <tr>
              <td className="font-semibold">Toques mínimo para perder</td>
              <td>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={config.results.goalLoser}
                  onChange={(e) =>
                    handleChange("results", "goalLoser", Number(e.target.value))
                  }
                />
              </td>
            </tr>

            <tr>
              <td className="font-semibold">Toques para parcial</td>
              <td>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={config.results.goalPartialWinner}
                  onChange={(e) =>
                    handleChange(
                      "results",
                      "goalPartialWinner",
                      Number(e.target.value)
                    )
                  }
                />
              </td>
            </tr>

            <tr>
              <td className="font-semibold">Toques para ganar</td>
              <td>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={config.results.goalWinner}
                  onChange={(e) =>
                    handleChange(
                      "results",
                      "goalWinner",
                      Number(e.target.value)
                    )
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfigScreen;
