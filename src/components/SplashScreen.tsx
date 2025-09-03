import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface SplashScreenProps {
  onContinue: () => void;
}

export function SplashScreen({ onContinue }: SplashScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center p-6">
      {/* Logo Section */}
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-4xl">🌾</span>
        </div>
        <h1 className="text-3xl text-green-800 mb-2">DiBiS</h1>
        <p className="text-green-600">Biosecurity Made Simple</p>
      </div>

      {/* Language Selection */}
      <Card className="w-full max-w-xs mb-8 p-4">
        <p className="text-center mb-4 text-gray-700">Select Language</p>
        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`w-full p-3 rounded-lg border-2 flex items-center justify-center space-x-3 transition-colors ${
                selectedLanguage === lang.code
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-lg">{lang.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Continue Button */}
      <div className="w-full max-w-xs">
        <Button
          size="lg"
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl"
          onClick={onContinue}
        >
          <span className="text-lg">Get Started</span>
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Protecting farms, securing futures</p>
      </div>
    </div>
  );
}