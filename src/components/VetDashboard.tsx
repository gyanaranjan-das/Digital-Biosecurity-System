import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Screen } from '../App';
import { Calendar, Users, AlertTriangle, MessageSquare, Activity, MapPin } from 'lucide-react';

interface VetDashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function VetDashboard({ onNavigate }: VetDashboardProps) {
  const urgentAlerts = [
    { id: 1, farm: 'Sunrise Farm', alert: 'High Risk Assessment', severity: 'high', time: '2 hours ago' },
    { id: 2, farm: 'Green Valley', alert: 'Vaccination Overdue', severity: 'medium', time: '1 day ago' }
  ];

  const upcomingAppointments = [
    { id: 1, farm: 'Sunrise Farm', farmer: 'Raj Patel', time: '2:00 PM', type: 'Routine Checkup' },
    { id: 2, farm: 'Blue Hills', farmer: 'Priya Singh', time: '4:30 PM', type: 'Emergency Visit' },
    { id: 3, farm: 'Golden Fields', farmer: 'Amit Kumar', time: '10:00 AM Tomorrow', type: 'Vaccination' }
  ];

  const farmsList = [
    { id: 1, name: 'Sunrise Farm', farmer: 'Raj Patel', riskLevel: 'Low', livestock: 42, lastVisit: '3 days ago', distance: '5 km' },
    { id: 2, name: 'Green Valley', farmer: 'Priya Singh', riskLevel: 'Medium', livestock: 28, lastVisit: '1 week ago', distance: '8 km' },
    { id: 3, name: 'Blue Hills', farmer: 'Amit Kumar', riskLevel: 'High', livestock: 65, lastVisit: '2 weeks ago', distance: '12 km' },
    { id: 4, name: 'Golden Fields', farmer: 'Sita Devi', riskLevel: 'Low', livestock: 38, lastVisit: '5 days ago', distance: '7 km' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl text-gray-900">Good Morning, Dr. Sharma</h1>
            <p className="text-sm text-gray-600">Veterinary Care Network</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white">👩‍⚕️</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl text-blue-600 mb-2">
              <Users size={24} className="mx-auto" />
            </div>
            <div className="text-2xl text-gray-900">24</div>
            <div className="text-sm text-gray-600">Assigned Farms</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl text-green-600 mb-2">
              <Calendar size={24} className="mx-auto" />
            </div>
            <div className="text-2xl text-green-600">8</div>
            <div className="text-sm text-gray-600">Today's Visits</div>
          </Card>
        </div>

        {/* Urgent Alerts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-900 flex items-center space-x-2">
              <AlertTriangle size={20} className="text-red-500" />
              <span>Urgent Alerts</span>
            </h3>
            <Badge variant="destructive" className="text-xs">
              {urgentAlerts.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {urgentAlerts.map((alert) => (
              <Card key={alert.id} className="p-4 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-900">{alert.farm}</h4>
                    <p className="text-sm text-gray-600">{alert.alert}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`}></div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Today's Appointments */}
        <div>
          <h3 className="text-lg text-gray-900 mb-4 flex items-center space-x-2">
            <Calendar size={20} className="text-blue-500" />
            <span>Today's Appointments</span>
          </h3>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-900">{appointment.farm}</h4>
                    <p className="text-sm text-gray-600">{appointment.farmer}</p>
                    <p className="text-xs text-gray-500">{appointment.type} • {appointment.time}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <MapPin size={14} className="mr-1" />
                      Navigate
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Start Visit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Farm List */}
        <div>
          <h3 className="text-lg text-gray-900 mb-4 flex items-center space-x-2">
            <Activity size={20} className="text-green-500" />
            <span>Assigned Farms</span>
          </h3>
          <div className="space-y-3">
            {farmsList.map((farm) => (
              <Card key={farm.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-gray-900">{farm.name}</h4>
                      <Badge className={`text-xs ${getRiskColor(farm.riskLevel)}`}>
                        {farm.riskLevel} Risk
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{farm.farmer}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>🐄 {farm.livestock} livestock</span>
                      <span>📅 {farm.lastVisit}</span>
                      <span>📍 {farm.distance}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-16 flex-col space-y-1 border-2"
            onClick={() => onNavigate('chat')}
          >
            <MessageSquare size={20} />
            <span className="text-sm">Messages</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 flex-col space-y-1 border-2"
            onClick={() => onNavigate('records')}
          >
            <Activity size={20} />
            <span className="text-sm">Analytics</span>
          </Button>
        </div>
      </div>

      {/* Bottom Navigation for Vet */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200">
        <div className="grid grid-cols-4">
          <button className="p-4 text-center">
            <div className="text-xl mb-1">🏠</div>
            <div className="text-xs text-blue-600">Dashboard</div>
          </button>
          <button 
            className="p-4 text-center"
            onClick={() => onNavigate('vet')}
          >
            <div className="text-xl mb-1">📅</div>
            <div className="text-xs text-gray-600">Schedule</div>
          </button>
          <button 
            className="p-4 text-center"
            onClick={() => onNavigate('chat')}
          >
            <div className="text-xl mb-1">💬</div>
            <div className="text-xs text-gray-600">Chat</div>
          </button>
          <button className="p-4 text-center">
            <div className="text-xl mb-1">📊</div>
            <div className="text-xs text-gray-600">Reports</div>
          </button>
        </div>
      </div>

      {/* Add bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}