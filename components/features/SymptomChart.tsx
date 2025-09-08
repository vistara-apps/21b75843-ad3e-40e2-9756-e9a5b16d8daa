'use client';

import { Card } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatDate } from '@/lib/utils';
import type { SymptomLog } from '@/lib/types';

interface SymptomChartProps {
  logs: SymptomLog[];
  variant?: 'line' | 'bar';
  title?: string;
}

export function SymptomChart({ logs, variant = 'line', title = 'Symptom Trends' }: SymptomChartProps) {
  // Process data for chart
  const chartData = logs
    .slice(-30) // Last 30 entries
    .map((log) => ({
      date: formatDate(log.timestamp),
      severity: log.severity,
      mood: log.mood || 0,
      symptomCount: log.symptoms.length,
    }))
    .reverse(); // Show oldest to newest

  const Chart = variant === 'line' ? LineChart : BarChart;

  return (
    <Card>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-textPrimary">{title}</h3>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <Chart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                domain={[0, 10]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px hsla(0, 0%, 0%, 0.08)',
                }}
              />
              
              {variant === 'line' ? (
                <>
                  <Line
                    type="monotone"
                    dataKey="severity"
                    stroke="hsl(210, 90%, 55%)"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(210, 90%, 55%)', strokeWidth: 2, r: 4 }}
                    name="Severity"
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(160, 80%, 45%)"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(160, 80%, 45%)', strokeWidth: 2, r: 4 }}
                    name="Mood"
                  />
                </>
              ) : (
                <>
                  <Bar dataKey="severity" fill="hsl(210, 90%, 55%)" name="Severity" />
                  <Bar dataKey="mood" fill="hsl(160, 80%, 45%)" name="Mood" />
                </>
              )}
            </Chart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-textSecondary">Severity</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-textSecondary">Mood</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
