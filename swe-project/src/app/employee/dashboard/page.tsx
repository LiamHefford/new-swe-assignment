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
import ParticlesBackground from '@/components/ParticlesBackground';
import { useRouter } from 'next/navigation';

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

export default function EmployeeDashboard() {
  const router = useRouter();

  // Initial state for the chart (NOTE: This is placeholder data - backend not implemented)
  const [chartData, setChartData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'My Fatigue Score',
        data: [65, 70, 75, 82, 78, 60, 55],
        fill: false,
        borderColor: 'rgb(251, 146, 60)',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        tension: 0.1
      }
    ],
  });

  const [timeRange, setTimeRange] = useState('weekly');

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
        },
        min: 0,
        max: 100
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
        text: 'My Fatigue History',
        color: '#fb923c',
      },
    },
  };

  // Function to handle time range change
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    // NOTE: This is placeholder data - backend not implemented.
    if (value === 'daily') {
      setChartData({
        labels: ['8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm'],
        datasets: [{
          label: 'My Fatigue Score',
          data: [45, 50, 65, 80, 85, 75, 70],
          fill: false,
          borderColor: 'rgb(251, 146, 60)',
          backgroundColor: 'rgba(251, 146, 60, 0.1)',
          tension: 0.1
        }]
      });
    } else if (value === 'weekly') {
      setChartData({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'My Fatigue Score',
          data: [65, 70, 75, 82, 78, 60, 55],
          fill: false,
          borderColor: 'rgb(251, 146, 60)',
          backgroundColor: 'rgba(251, 146, 60, 0.1)',
          tension: 0.1
        }]
      });
    } else if (value === 'monthly') {
      setChartData({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'My Fatigue Score',
          data: [68, 75, 82, 74],
          fill: false,
          borderColor: 'rgb(251, 146, 60)',
          backgroundColor: 'rgba(251, 146, 60, 0.1)',
          tension: 0.1
        }]
      });
    }
  };

  // Assessment tasks/games
  const assessmentTasks = [
    {
      name: "Reaction Time Test",
      description: "Test your reaction speed to visual stimulus",
      duration: "5 min",
      icon: ""
    },
    {
      name: "Memory Recall Test",
      description: "Remember and recall sequences of items",
      duration: "8 min",
      icon: ""
    },
    {
      name: "Focus Test",
      description: "Maintain attention on moving objects",
      duration: "5 min",
      icon: ""
    },
    {
      name: "Agility Test",
      description: "Test hand-eye coordination with targets",
      duration: "5 min",
      icon: ""
    },
    {
      name: "Decision-Making Test",
      description: "Make rapid decisions under time constraints",
      duration: "10 min",
      icon: ""
    }
  ];

  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  // Function to start a specific assessment
  const startAssessment = (taskName: string) => {
    // Navigate to the corresponding test page based on the task name
    switch (taskName) {
      case "Reaction Time Test":
        router.push('/fatigue_assessment/tests/reaction_test');
        break;
      case "Memory Recall Test":
        router.push('/fatigue_assessment/tests/memory_test');
        break;
      case "Focus Test":
        router.push('/fatigue_assessment/tests/focus_test');
        break;
      case "Agility Test":
        router.push('/fatigue_assessment/tests/agility_test');
        break;
      case "Decision-Making Test":
        router.push('/fatigue_assessment/tests/decision_test');
        break;
    }
  };

  return (
    <div className="fixed inset-0 p-6 pt-20 overflow-auto bg-gradient-to-b from-orange-900 to-gray-900">
      <ParticlesBackground />
      
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-orange-400 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">Employee Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader className="pb-2 border-b border-gray-700">
              <h3 className="text-sm font-medium text-orange-400">Current Fatigue Score</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center pt-4">
                <div className="relative w-36 h-36">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-orange-500" 
                    style={{ 
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 55%, 0% 55%)',
                      transform: 'rotate(-90deg)'
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-4xl font-bold text-white">55</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mt-4">Moderate Fatigue</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader className="pb-2 border-b border-gray-700">
              <h3 className="text-sm font-medium text-orange-400">Work Status</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Shift:</span>
                  <span className="text-white">Day (8:00 - 17:00)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Hours today:</span>
                  <span className="text-white">6.5 / 9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Next break in:</span>
                  <span className="text-white font-medium text-green-400">45 min</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader className="pb-2 border-b border-gray-700">
              <h3 className="text-sm font-medium text-orange-400">Recommendations</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 pt-2">
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-sm">Take a 15 minute break</p>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-sm">Hydrate regularly</p>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <p className="text-sm">Avoid complex tasks after 3pm</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6 bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700">
            <h2 className="text-lg font-semibold text-orange-400">Fatigue History</h2>
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-gray-200 focus:ring-orange-500">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600 text-gray-200">
                <SelectItem className="hover:bg-gray-700 focus:bg-gray-700" value="daily">Today</SelectItem>
                <SelectItem className="hover:bg-gray-700 focus:bg-gray-700" value="weekly">This Week</SelectItem>
                <SelectItem className="hover:bg-gray-700 focus:bg-gray-700" value="monthly">This Month</SelectItem>
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
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-orange-400 mb-4">Fatigue Assessment Tasks</h2>
          <p className="text-gray-300 mb-6">Complete one of these tasks to assess your current fatigue levels</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {assessmentTasks.map((task, index) => (
              <Card 
                key={index} 
                className="bg-gray-800 border-gray-700 shadow-lg transition-all hover:bg-gray-750"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <h3 className="text-md font-medium text-orange-400 mb-2">{task.name}</h3>
                    <p className="text-xs text-gray-400 flex-grow">{task.description}</p>
                    <div className="mt-2 pt-3 border-t border-gray-700 flex justify-between items-center">
                      <span className="text-xs text-gray-400">{task.duration}</span>
                      <button 
                        className="text-xs px-3 py-1 rounded-full bg-orange-600 hover:bg-orange-500 text-white"
                        onClick={() => startAssessment(task.name)}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader className="border-b border-gray-700">
              <h2 className="text-lg font-semibold text-orange-400">Recent History</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  'Completed Reaction Time Test (Score: 87)',
                  'Rest break completed (15 minutes)',
                  'Beginning of shift logged',
                  'Completed Agility Test (Score: 75)'
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
              <h2 className="text-lg font-semibold text-orange-400">Weekly Overview</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { day: 'Monday', score: 65, status: 'Normal' },
                  { day: 'Tuesday', score: 70, status: 'Normal' },
                  { day: 'Wednesday', score: 75, status: 'Elevated' },
                  { day: 'Thursday', score: 82, status: 'High' },
                  { day: 'Friday', score: 78, status: 'Elevated' },
                  { day: 'Saturday', score: 60, status: 'Normal' },
                  { day: 'Sunday', score: 55, status: 'Low' }
                ].map((day, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <p className="text-gray-300">{day.day}</p>
                    <div className="flex items-center">
                      <p className="font-semibold text-orange-400 mr-2">{day.score}</p>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        day.status === 'High' ? 'bg-red-900 text-red-200' :
                        day.status === 'Elevated' ? 'bg-orange-900 text-orange-200' :
                        day.status === 'Normal' ? 'bg-green-900 text-green-200' :
                        'bg-blue-900 text-blue-200'
                      }`}>
                        {day.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}