
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminActivityChartProps {
  className?: string;
}

const AdminActivityChart: React.FC<AdminActivityChartProps> = ({ className }) => {
  // Sample data for the last 7 days
  const data = [
    { day: 'Sen', logins: 45, actions: 115 },
    { day: 'Sel', logins: 52, actions: 142 },
    { day: 'Rab', logins: 49, actions: 132 },
    { day: 'Kam', logins: 63, actions: 165 },
    { day: 'Jum', logins: 58, actions: 148 },
    { day: 'Sab', logins: 27, actions: 64 },
    { day: 'Min', logins: 18, actions: 42 },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base font-medium">Aktivitas Sistem</CardTitle>
        <CardDescription>Jumlah login dan aktivitas pengguna 7 hari terakhir</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee', fontSize: '12px' }}
              />
              <Area 
                type="monotone" 
                dataKey="logins" 
                stackId="1"
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.6} 
              />
              <Area 
                type="monotone" 
                dataKey="actions" 
                stackId="2"
                stroke="#1EAEDB" 
                fill="#1EAEDB" 
                fillOpacity={0.3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#8B5CF6] rounded-full mr-1"></div>
            <span>Login</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#1EAEDB] rounded-full mr-1"></div>
            <span>Aktivitas</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminActivityChart;
