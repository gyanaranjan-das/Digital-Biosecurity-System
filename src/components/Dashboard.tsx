import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Screen } from '../App';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const priorityTasks = [
    { id: 1, title: 'Vaccination Due', icon: '💉', urgent: true },
    { id: 2, title: 'Hygiene Check', icon: '🧼', urgent: false },
    { id: 3, title: 'Feed Quality Test', icon: '🌾', urgent: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl text-gray-900">Good Morning, Raj</h1>
            <p className="text-sm text-gray-600">Sunrise Farm</p>
          </div>
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white">👨‍🌾</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Farm Health Status */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
            <div>
              <h2 className="text-xl text-green-800">Farm Health Status</h2>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700">Safe & Secure</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Priority Tasks */}
        <div>
          <h3 className="text-lg text-gray-900 mb-4">Priority Tasks</h3>
          <div className="space-y-3">
            {priorityTasks.map((task) => (
              <Card key={task.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{task.icon}</span>
                    <span className="text-gray-900">{task.title}</span>
                  </div>
                  {task.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl text-blue-600 mb-2">🐄</div>
            <div className="text-2xl text-gray-900">42</div>
            <div className="text-sm text-gray-600">Livestock Count</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl text-green-600 mb-2">📊</div>
            <div className="text-2xl text-green-600">Low</div>
            <div className="text-sm text-gray-600">Risk Score</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-16 flex-col space-y-1 border-2"
              onClick={() => onNavigate('assessment')}
            >
              <span className="text-xl">📋</span>
              <span className="text-sm">Assessment</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex-col space-y-1 border-2"
              onClick={() => onNavigate('chat')}
            >
              <span className="text-xl">🤖</span>
              <span className="text-sm">AI Helper</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200">
        <div className="grid grid-cols-4">
          <button className="p-4 text-center">
            <div className="text-xl mb-1">🏠</div>
            <div className="text-xs text-green-600">Home</div>
          </button>
          <button 
            className="p-4 text-center"
            onClick={() => onNavigate('records')}
          >
            <div className="text-xl mb-1">📝</div>
            <div className="text-xs text-gray-600">Logs</div>
          </button>
          <button 
            className="p-4 text-center"
            onClick={() => onNavigate('training')}
          >
            <div className="text-xl mb-1">🎓</div>
            <div className="text-xs text-gray-600">Training</div>
          </button>
          <button 
            className="p-4 text-center"
            onClick={() => onNavigate('vet')}
          >
            <div className="text-xl mb-1">👩‍⚕️</div>
            <div className="text-xs text-gray-600">Vet</div>
          </button>
        </div>
      </div>

      {/* Add bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}