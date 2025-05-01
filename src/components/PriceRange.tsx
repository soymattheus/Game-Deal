import React from 'react';

interface PriceRangeProps {
  min: number;
  max: number;
  onChange: (range: [number, number]) => void;
}

export default function PriceRange({ min, max, onChange }: PriceRangeProps) {
  const handleMinChange = (value: string) => {
    const newMin = Number(value);
    if (!isNaN(newMin)) {
      onChange([newMin, max]);
    }
  };

  const handleMaxChange = (value: string) => {
    const newMax = Number(value);
    if (!isNaN(newMax)) {
      onChange([min, newMax]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-600">Price Range</label>
      <div className="flex items-center gap-4">
        <input
          type="number"
          value={min}
          onChange={(e) => handleMinChange(e.target.value)}
          placeholder="Min"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <span className="text-gray-600">to</span>
        <input
          type="number"
          value={max}
          onChange={(e) => handleMaxChange(e.target.value)}
          placeholder="Max"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}
