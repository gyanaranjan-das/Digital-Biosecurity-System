import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft } from 'lucide-react';
import { UserType } from '../App';

interface PortalSelectionProps {
  onLogin: (userType: UserType) => void;
  onBack: () => void;
}

export function PortalSelection({ onLogin, onBack }: PortalSelectionProps) {
  const [selectedPortal, setSelectedPortal] = useState<UserType>(null);
  const [authMode, setAuthMode] = useState<'select' | 'login'>('select');

  const portals = [
    {
      type: 'farmer' as UserType,
      title: 'Farmer Portal',
      icon: '👨‍🌾',
      description: 'Manage your farm biosecurity, assessments, and training',
      features: ['Biosecurity Assessment', 'Record Management', 'Training Library', 'AI Assistant']
    },
    {
      type: 'veterinarian' as UserType,
      title: 'Veterinarian Portal',
      icon: '👩‍⚕️',
      description: 'Monitor farms, manage appointments, and provide guidance',
      features: ['Farm Monitoring', 'Patient Management', 'Communication Hub', 'Analytics Dashboard']
    }
  ];

  const handlePortalSelect = (portalType: UserType) => {
    setSelectedPortal(portalType);
    setAuthMode('login');
  };

  const handleLogin = () => {
    if (selectedPortal) {
      onLogin(selectedPortal);
    }
  };

  const handleBackToSelection = () => {
    setAuthMode('select');
    setSelectedPortal(null);
  };

  if (authMode === 'login') {
    const portal = portals.find(p => p.type === selectedPortal);
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToSelection}
              className="p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{portal?.icon}</span>
              <h1 className="text-lg text-gray-900">{portal?.title}</h1>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Login Form */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl text-gray-900 mb-6 text-center">Welcome Back!</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Email or Phone</label>
                <input
                  type="text"
                  placeholder="Enter your email or phone number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <Button
                size="lg"
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg mt-6"
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </div>
          </Card>

          {/* Register Option */}
          <Card className="p-4 text-center">
            <p className="text-sm text-gray-600 mb-3">Don't have an account?</p>
            <Button
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-50"
              onClick={handleLogin}
            >
              Create New Account
            </Button>
          </Card>

          {/* Emergency Access */}
          {selectedPortal === 'veterinarian' && (
            <Card className="p-4 bg-red-50 border-red-200 mt-4">
              <div className="text-center">
                <h4 className="text-red-800 mb-2">🚨 Emergency Access</h4>
                <p className="text-sm text-red-700 mb-3">
                  Quick access for urgent biosecurity alerts
                </p>
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-600 hover:bg-red-50"
                  onClick={handleLogin}
                >
                  Emergency Login
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

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
          <h1 className="text-lg text-gray-900">Choose Your Portal</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl text-gray-900 mb-2">Welcome to DiBiS</h2>
          <p className="text-gray-600">Select your portal to get started</p>
        </div>

        <div className="space-y-4">
          {portals.map((portal) => (
            <Card 
              key={portal.type}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-300"
              onClick={() => handlePortalSelect(portal.type)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{portal.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl text-gray-900 mb-2">{portal.title}</h3>
                  <p className="text-gray-600 mb-4">{portal.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 font-medium">Key Features:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {portal.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="text-green-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="p-4 mt-8 bg-blue-50 border-blue-200">
          <div className="text-center">
            <h4 className="text-blue-800 mb-2">Need Help?</h4>
            <p className="text-sm text-blue-700 mb-3">
              Contact our support team for assistance
            </p>
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              📞 Get Support
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}