import { useNavigate } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import NullexLogo from "../assets/logos/nullex-logo.png";
import { Play, Settings } from "lucide-react";

const menuOptions = [
  {
    title: "Iniciar Juego",
    icon: Play,
    route: "/home",
  },
  {
    title: "Configuración",
    icon: Settings,
    route: "/config",
  },
];

const MenuScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen bg-blue-app">
      <div className="absolute top-0 w-full flex justify-center mt-40">
        <img className="w-[250px] h-auto" src={NullexLogo} alt="Logo Nullex" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {menuOptions.map(({ title, icon, route }) => (
            <MenuCard
              key={route}
              title={title}
              icon={icon}
              onClick={() => navigate(route)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;
