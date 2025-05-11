'use client';

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  // Initial state for the chart (NOTE: This is placeholder data - backend not implemented)
  const [chartData, setChartData] = useState({
    labels: ['Jun 2023',
             'Jul 2023', 
             'Aug 2023', 
             'Sep 2023', 
             'Oct 2023', 
             'Nov 2023', 
             'Dec 2023', 
             'Jan 2024', 
             'Feb 2024', 
             'Mar 2024', 
             'Apr 2024', 
             'May 2024', 
             'Jun 2024', 
             'Jul 2024', 
             'Aug 2024', 
             'Sep 2024', 
             'Oct 2024', 
             'Nov 2024', 
             'Dec 2024', 
             'Jan 2025', 
             'Feb 2025', 
             'Mar 2025', 
             'Apr 2025', 
             'May 2025'],
             
    datasets: [
      {
        label: 'Average Fatigue Score',
        data: [75, 65, 80, 81, 56, 55, 17, 70, 90, 92, 96, 99, 88, 76, 82, 73, 65, 79, 84, 77, 69, 91, 85, 87],
        fill: false,
        borderColor: 'rgb(251, 146, 60)',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        tension: 0.1
      }
    ],
  });

  const [timeRange, setTimeRange] = useState('monthly');

  // Configuration options for the chart
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#d1d5db',
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#d1d5db',
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#d1d5db',
        }
      },
      title: {
        display: true,
        text: 'Performance Overview',
        color: '#fb923c',
      },
    },
  };

  // Function to handle time range change
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    // NOTE: This is placeholder data - backend not implemented.
    if (value === 'weekly') {
      setChartData({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Average Fatigue Score',
          data: [82, 76, 88, 91],
          fill: false,
          borderColor: 'rgb(251, 146, 60)',
          backgroundColor: 'rgba(251, 146, 60, 0.1)',
          tension: 0.1
        }]
      });
    } else if (value === 'monthly') {
      setChartData({
        labels: ['Jun 2023',
                 'Jul 2023', 
                 'Aug 2023', 
                 'Sep 2023', 
                 'Oct 2023', 
                 'Nov 2023', 
                 'Dec 2023', 
                 'Jan 2024', 
                 'Feb 2024', 
                 'Mar 2024', 
                 'Apr 2024', 
                 'May 2024', 
                 'Jun 2024', 
                 'Jul 2024', 
                 'Aug 2024', 
                 'Sep 2024', 
                 'Oct 2024', 
                 'Nov 2024', 
                 'Dec 2024', 
                 'Jan 2025', 
                 'Feb 2025', 
                 'Mar 2025', 
                 'Apr 2025', 
                 'May 2025'],
        datasets: [
          {
            label: 'Average Fatigue Score',
            data: [75, 65, 80, 81, 56, 55, 17, 70, 90, 92, 96, 99, 88, 76, 82, 73, 65, 79, 84, 77, 69, 91, 85, 87],
            fill: false,
            borderColor: 'rgb(251, 146, 60)',
            backgroundColor: 'rgba(251, 146, 60, 0.1)',
            tension: 0.1
          }
        ]
      });
    } else if (value === 'quarterly') {
      setChartData({
        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
        datasets: [{
          label: 'Average Fatigue Score',
          data: [84, 88, 73, 77, 88],
          fill: false,
          borderColor: 'rgb(251, 146, 60)',
          backgroundColor: 'rgba(251, 146, 60, 0.1)',
          tension: 0.1
        }]
      });
    }
  };

  return (
    <div className="fixed inset-0 p-6 pt-20 overflow-auto bg-gradient-to-b from-orange-900 to-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-orange-400 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">Management Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader className="pb-2 border-b border-gray-700">
            <h3 className="text-sm font-medium text-orange-400">Average Fatigue Score</h3>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">87</p>
            <p className="text-xs text-red-400">+12 from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader className="pb-2 border-b border-gray-700">
            <h3 className="text-sm font-medium text-orange-400">Total Employees</h3>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">120</p>
            <p className="text-xs text-green-400">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader className="pb-2 border-b border-gray-700">
            <h3 className="text-sm font-medium text-orange-400">Average hours worked per employee</h3>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">42.7</p>
            <p className="text-xs text-red-400">+5% from last period</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader className="pb-2 border-b border-gray-700">
            <h3 className="text-sm font-medium text-orange-400">Number of high-risk employees</h3>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">7</p>
            <p className="text-xs text-red-400">+1 from last period</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700">
          <h2 className="text-lg font-semibold text-orange-400">Performance Trends</h2>
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-gray-200 focus:ring-orange-500">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 text-gray-200">
              <SelectItem className="hover:bg-gray-700 focus:bg-gray-700" value="weekly">Weekly</SelectItem>
              <SelectItem className="hover:bg-gray-700 focus:bg-gray-700" value="monthly">Monthly</SelectItem>
              <SelectItem className="hover:bg-gray-700 focus:bg-gray-700" value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="bg-gray-800 text-white p-6 pb-20 pt-18">
          <div className="flex justify-center items-center h-[400px]">
            <div className="w-full max-w-6xl px-4">
              <Line options={options} data={chartData} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader className="border-b border-gray-700">
            <h2 className="text-lg font-semibold text-orange-400">Recent Activity</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                'Employee #1234 reported high fatigue (score: 97)',
                'New shift schedule uploaded for Team B',
                'Rest break reminder sent to 5 employees',
                'Monthly fatigue report generated'
              ].map((activity, index) => (
                <div key={index} className="flex items-center border-b border-gray-700 pb-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <p className="text-gray-300">{activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader className="border-b border-gray-700">
            <h2 className="text-lg font-semibold text-orange-400">Team Wellness Overview</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { team: 'Team Alpha', wellnessScore: 84, trend: 'up' },
                { team: 'Team Bravo', wellnessScore: 72, trend: 'down' },
                { team: 'Team Charlie', wellnessScore: 91, trend: 'up' },
                { team: 'Team Delta', wellnessScore: 67, trend: 'down' }
              ].map((team, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <p className="text-gray-300">{team.team}</p>
                  <div className="flex items-center">
                    <p className="font-semibold text-orange-400 mr-2">{team.wellnessScore}</p>
                    <span className={team.trend === 'up' ? 'text-red-400' : 'text-green-400'}>
                      {team.trend === 'up' ? '↑' : '↓'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}