import { LucideIcon } from "lucide-react";

type MenuCardProps = {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
};

const MenuCard = ({ title, icon: Icon, onClick }: MenuCardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-64 h-48 rounded-2xl shadow-xl cursor-pointer bg-blue-button hover:scale-105 transition-transform flex flex-col items-center justify-center gap-4 text-center"
    >
      <Icon className="w-12 h-12 text-white " />
      <span className="text-lg font-semibold text-white">{title}</span>
    </div>
  );
};

export default MenuCard;
