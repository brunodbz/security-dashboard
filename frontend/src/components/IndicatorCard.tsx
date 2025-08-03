// frontend/src/components/IndicatorCard.tsx
interface IndicatorCardProps {
  title: string;
  value: number;
  icon: string;
  description: string;
  isScore?: boolean;
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({ 
  title, 
  value, 
  icon, 
  description, 
  isScore = false 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-red-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className="text-3xl mr-4">{icon}</div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className={`text-2xl font-bold ${isScore ? getScoreColor(value) : 'text-gray-900'}`}>
            {isScore ? value.toFixed(1) : value}
          </p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default IndicatorCard;