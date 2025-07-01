type ProgressBarProps = {
  value: number; // 0 to 100+
  color?: string; // Tailwind color class (optional)
};

const ProgressBar = ({
  value = 42,
  color = "bg-green-500", // default color
}: ProgressBarProps) => {
  const percent = Math.min(value, 100); // clamp at 100% for safety

  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-500 ease-in-out`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
