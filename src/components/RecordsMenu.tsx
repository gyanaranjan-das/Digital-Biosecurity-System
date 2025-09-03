import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, FileText, Plus } from 'lucide-react';

interface RecordsMenuProps {
  onBack: () => void;
}

export function RecordsMenu({ onBack }: RecordsMenuProps) {
  const recordTypes = [
    {
      id: 'visitor',
      title: 'Visitor Log',
      icon: '📋',
      description: 'Track all farm visitors',
      lastEntry: '2 hours ago',
      count: 5,
      color: 'blue'
    },
    {
      id: 'disinfection',
      title: 'Disinfection Log',
      icon: '🧴',
      description: 'Chemical usage and cleaning',
      lastEntry: 'Yesterday',
      count: 12,
      color: 'green'
    },
    {
      id: 'vaccination',
      title: 'Vaccination Records',
      icon: '💉',
      description: 'Animal immunization history',
      lastEntry: '3 days ago',
      count: 28,
      color: 'purple'
    },
    {
      id: 'quarantine',
      title: 'Animal Quarantine Log',
      icon: '🏥',
      description: 'Isolated animal tracking',
      lastEntry: '1 week ago',
      count: 2,
      color: 'red'
    },
    {
      id: 'feed',
      title: 'Feed Quality Log',
      icon: '🌾',
      description: 'Feed testing and quality',
      lastEntry: '5 days ago',
      count: 8,
      color: 'yellow'
    },
    {
      id: 'health',
      title: 'Health Monitoring',
      icon: '📊',
      description: 'Animal health observations',
      lastEntry: 'Today',
      count: 15,
      color: 'teal'
    }
  ];

  const recentEntries = [
    {
      type: 'Visitor',
      entry: 'Dr. Kumar - Routine checkup',
      time: '2 hours ago',
      icon: '👨‍⚕️'
    },
    {
      type: 'Vaccination',
      entry: '15 cattle - FMD vaccine',
      time: '3 days ago',
      icon: '💉'
    },
    {
      type: 'Disinfection',
      entry: 'Shed B - Deep cleaning',
      time: 'Yesterday',
      icon: '🧽'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'border-blue-200 bg-blue-50',
      green: 'border-green-200 bg-green-50',
      purple: 'border-purple-200 bg-purple-50',
      red: 'border-red-200 bg-red-50',
      yellow: 'border-yellow-200 bg-yellow-50',
      teal: 'border-teal-200 bg-teal-50'
    };
    return colorMap[color as keyof typeof colorMap] || 'border-gray-200 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg text-gray-900">Records & Logs</h1>
            <p className="text-sm text-gray-600">Digital farm logbook</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="h-16 flex-col space-y-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus size={20} />
            <span className="text-sm">Add Entry</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex-col space-y-1 border-2"
          >
            <FileText size={20} />
            <span className="text-sm">View All</span>
          </Button>
        </div>

        {/* Record Types */}
        <div>
          <h3 className="text-lg text-gray-900 mb-4">Record Categories</h3>
          <div className="space-y-3">
            {recordTypes.map((record) => (
              <Card 
                key={record.id} 
                className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${getColorClasses(record.color)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{record.icon}</div>
                    <div>
                      <h4 className="text-gray-900">{record.title}</h4>
                      <p className="text-sm text-gray-600">{record.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last entry: {record.lastEntry}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {record.count}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Entries */}
        <div>
          <h3 className="text-lg text-gray-900 mb-4">Recent Entries</h3>
          <Card className="p-4">
            <div className="space-y-4">
              {recentEntries.map((entry, index) => (
                <div key={index} className="flex items-center space-x-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="text-xl">{entry.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-900">{entry.entry}</div>
                    <div className="text-xs text-gray-500">{entry.type} • {entry.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Export Options */}
        <Card className="p-4">
          <h4 className="text-gray-900 mb-3">Export Records</h4>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              📄 Export as PDF
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📊 Export as Excel
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📧 Email Report
            </Button>
          </div>
        </Card>

        {/* Compliance Status */}
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">✅</div>
            <div>
              <h4 className="text-green-800">Compliance Status</h4>
              <p className="text-sm text-green-700">
                All required records are up to date
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}