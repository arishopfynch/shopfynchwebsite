import React, { useEffect, useState } from 'react';
import { LineChart, TrendingUp, Users, ShoppingCart } from 'lucide-react';

type MetricData = {
  value: number;
  trend: number;
  label: string;
};

type DataPoint = {
  engagement: number;
  carts: number;
  conversions: number;
};

const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

export default function AnalyticsDemo() {
  const [metrics, setMetrics] = useState<MetricData[]>([
    { value: 245, trend: 12, label: 'Shared Carts' },
    { value: 67, trend: 23, label: 'Conversions' },
    { value: 89, trend: 15, label: 'New Users' },
  ]);

  const [data, setData] = useState<DataPoint[]>(
    Array.from({ length: 6 }, (_, i) => ({
      engagement: 20 + i * 12 + Math.random() * 5,
      carts: 15 + i * 8 + Math.random() * 4,
      conversions: 10 + i * 6 + Math.random() * 3,
    }))
  );

  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + Math.floor(Math.random() * 5),
        trend: metric.trend + (Math.random() > 0.5 ? 1 : -1),
      })));
    }, 3000);

    const dataInterval = setInterval(() => {
      setData(prev => {
        const lastPoint = prev[prev.length - 1];
        const newPoint = {
          engagement: lastPoint.engagement + (Math.random() * 2 - 0.5),
          carts: lastPoint.carts + (Math.random() * 1.5 - 0.3),
          conversions: lastPoint.conversions + (Math.random() * 1 - 0.2),
        };
        return [...prev.slice(1), newPoint];
      });
    }, 5000);

    return () => {
      clearInterval(metricsInterval);
      clearInterval(dataInterval);
    };
  }, []);

  const maxValue = Math.max(
    ...data.flatMap(d => [d.engagement, d.carts, d.conversions])
  );

  const generatePath = (values: number[]) => {
    const isMobile = window.innerWidth < 640;
    const height = isMobile ? 100 : 280;
    const width = isMobile ? 220 : 340; // Reduced from 260 to 220 for mobile
    const padding = isMobile ? 25 : 40; // Reduced from 30 to 25 for mobile
    
    const points = values.map((value, index) => {
      const x = padding + (index / (values.length - 1)) * (width - padding);
      const y = 10 + (height - (value / maxValue) * height);
      return `${x},${y}`;
    });

    return points.reduce((acc, point, i) => {
      if (i === 0) return `M ${point}`;
      
      const prev = points[i - 1].split(',');
      const curr = point.split(',');
      const x1 = parseFloat(prev[0]);
      const y1 = parseFloat(prev[1]);
      const x2 = parseFloat(curr[0]);
      const y2 = parseFloat(curr[1]);
      
      const cp1x = x1 + (x2 - x1) * 0.4;
      const cp1y = y1;
      const cp2x = x1 + (x2 - x1) * 0.6;
      const cp2y = y2;
      
      return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${point}`;
    }, '');
  };

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg p-2 sm:p-3 shadow-sm border border-gray-100 hover:border-[#008080]/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-1">
              {index === 0 && <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-[#008080]" />}
              {index === 1 && <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#008080]" />}
              {index === 2 && <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#008080]" />}
              <span className={`text-xs sm:text-sm font-medium ${metric.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {metric.trend > 0 ? '+' : ''}{metric.trend}%
              </span>
            </div>
            <p className="text-lg sm:text-2xl font-bold text-[#351431]">{metric.value}</p>
            <p className="text-xs sm:text-sm text-gray-600">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-white rounded-lg p-3 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-[#351431] text-sm sm:text-base">Growth Trends</h4>
          <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-[#008080]" />
        </div>

        <div className="relative h-[120px] sm:h-[320px] w-full">
          <svg width="100%" height="100%" className="overflow-visible" preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {Array.from({ length: 4 }).map((_, i) => {
              const isMobile = window.innerWidth < 640;
              const height = isMobile ? 100 : 280;
              const spacing = height / 3;
              
              return (
                <g key={`grid-${i}`}>
                  <line
                    x1={isMobile ? "25" : "40"}
                    y1={10 + i * spacing}
                    x2={isMobile ? "245" : "380"}
                    y2={10 + i * spacing}
                    stroke={i === 3 ? '#e2e8f0' : '#f1f5f9'}
                    strokeWidth={i === 3 ? 2 : 1}
                    strokeDasharray={i === 3 ? '' : '4,4'}
                  />
                  <text
                    x={isMobile ? "20" : "35"}
                    y={10 + i * spacing}
                    fill="#64748b"
                    fontSize={isMobile ? "10" : "12"}
                    textAnchor="end"
                    dominantBaseline="middle"
                    className="font-medium"
                  >
                    {Math.round(maxValue - (i * maxValue / 3))}
                  </text>
                </g>
              );
            })}

            {/* Month labels */}
            {months.map((month, i) => {
              const isMobile = window.innerWidth < 640;
              const spacing = isMobile ? 44 : 68; // Reduced from 52 to 44 for mobile
              const padding = isMobile ? 25 : 40; // Reduced from 30 to 25 for mobile
              
              return (
                <g key={`month-${i}`}>
                  <line
                    x1={padding + (i * spacing)}
                    y1={isMobile ? 110 : 290}
                    x2={padding + (i * spacing)}
                    y2={isMobile ? 115 : 295}
                    stroke="#64748b"
                    strokeWidth="1"
                  />
                  <text
                    x={padding + (i * spacing)}
                    y={isMobile ? 125 : 310}
                    fill="#64748b"
                    fontSize={isMobile ? "10" : "12"}
                    textAnchor="middle"
                    className="font-medium"
                  >
                    {month}
                  </text>
                </g>
              );
            })}

            {/* Data lines */}
            {[
              { data: data.map(d => d.engagement), stroke: '#008080' },
              { data: data.map(d => d.carts), stroke: '#351431' },
              { data: data.map(d => d.conversions), stroke: '#00B4B4' },
            ].map(({ data: lineData, stroke }, index) => (
              <g key={`line-${index}`} className="transition-all duration-500">
                <path
                  d={generatePath(lineData)}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={window.innerWidth < 640 ? "2" : "3"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-500"
                />
                {lineData.map((value, i) => {
                  const isMobile = window.innerWidth < 640;
                  const height = isMobile ? 100 : 280;
                  const width = isMobile ? 220 : 340;
                  const padding = isMobile ? 25 : 40;
                  
                  return (
                    <circle
                      key={`point-${index}-${i}`}
                      cx={padding + (i / (lineData.length - 1)) * (width - padding)}
                      cy={10 + (height - (value / maxValue) * height)}
                      r={isMobile ? "2.5" : "4"}
                      fill="white"
                      stroke={stroke}
                      strokeWidth={isMobile ? "1.5" : "2.5"}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="text-center text-[10px] sm:text-xs text-gray-500">
        Live data updates every 3-5 seconds
      </div>
    </div>
  );
}