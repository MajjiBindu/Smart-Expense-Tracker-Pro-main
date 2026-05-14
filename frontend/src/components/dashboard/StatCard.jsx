import React from "react";


const StatCard = ({ title, amount, icon, tendency = 0, type }) => {
  const isPositive = tendency > 0;

  // Color coding for card background and border
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500/20 border-green-500/30";
      case "warning":
        return "bg-red-500/20 border-red-500/30";
      case "neutral":
        return "bg-blue-500/20 border-blue-500/30";
      default:
        return "bg-white/5 border-white/10";
    }
  };

  // Color coding for amount and currency symbol
  const getAmountColor = () => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "warning":
        return "text-red-500";
      case "neutral":
        return "text-blue-500";
      default:
        return "text-white";
    }
  };

  return (
    <div
      className={`glass-panel p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 border-l-4 ${getTypeStyles()}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-3 rounded-xl border ${getAmountColor()} bg-white/5 border-white/10`}
        >
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-green-500" : tendency === 0 ? "text-slate-400" : "text-red-500"}`}
        >
          {isPositive ? "↑" : tendency === 0 ? "-" : "↓"}
          <span>{Math.abs(tendency)}%</span>
        </div>
      </div>
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3
          className={`text-3xl font-bold font-handjet tracking-widest flex items-center gap-1 ${getAmountColor()}`}
        >
          <span className={getAmountColor()}>₹</span> {amount.toLocaleString()}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;
