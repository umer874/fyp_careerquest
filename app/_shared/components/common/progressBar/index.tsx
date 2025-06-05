interface ProgressBarProps {
    percent: number; // Progress percentage
    style?: React.CSSProperties; // Custom styles
  }
  
  const ProgressBar: React.FC<ProgressBarProps> = ({ percent, style }) => {
    return (
      <div className="w-full bg-gray-200 rounded-lg h-4">
        <div
          className="h-4 rounded-lg transition-all duration-500"
          style={{ width: `${percent}%`, backgroundColor: style?.color || "#007bff" }}
        ></div>
      </div>
    );
  };
  
  export default ProgressBar;
  