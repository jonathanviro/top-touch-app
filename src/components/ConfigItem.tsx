type ConfigItemProps = {
  label: string;
  value: number;
  isVisible: boolean;
  onChange: (newValue: number) => void;
};

const ConfigItem = ({ label, value, onChange, isVisible }: ConfigItemProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={`hidden=${isVisible}`}>
      <label className="block text-white font-semibold mb-4">{label}</label>
      <input
        type="number"
        className="input input-bordered w-full text-black"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};

export default ConfigItem;
