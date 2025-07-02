type ProgressBarProps = {
  value: number; // 0 to 100+
  color?: string; // Tailwind color class (optional)
};

const ProgressBar = ({
  value = 42,
}: // default color
ProgressBarProps) => {
  const percent = Math.min(value, 100); // clamp at 100% for safety

  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% transition-all duration-500 ease-in-out`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
