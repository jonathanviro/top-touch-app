import { useNavigate } from "react-router-dom";
import MenuCard from "../components/MenuCard";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 p-6">
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
  );
};

export default MenuScreen;
