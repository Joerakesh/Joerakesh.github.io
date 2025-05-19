
import React from "react";

interface SkillProgressProps {
  name: string;
  percentage: number;
  color?: string;
}

const SkillProgress: React.FC<SkillProgressProps> = ({ 
  name, 
  percentage, 
  color = "bg-primary" 
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-white">{name}</span>
        <span className="text-sm text-primary">{percentage}%</span>
      </div>
      <div className="w-full bg-dark-light rounded-full h-2.5">
        <div 
          className={`${color} h-2.5 rounded-full transition-all duration-1000 ease-in-out`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillProgress;
