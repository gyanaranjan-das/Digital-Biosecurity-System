import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Share } from 'lucide-react';

interface AssessmentResultProps {
  score: number;
  onBack: () => void;
}

export function AssessmentResult({ score, onBack }: AssessmentResultProps) {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'Low Risk', color: 'green', emoji: '🟢' };
    if (score >= 60) return { level: 'Medium Risk', color: 'yellow', emoji: '🟡' };
    return { level: 'High Risk', color: 'red', emoji: '🔴' };
  };

  const risk = getRiskLevel(score);

  const getRecommendations = (score: number) => {
    if (score >= 80) {
      return [
        'Maintain current excellent practices',
        'Continue regular health monitoring',
        'Keep vaccination schedules updated'
      ];
    }
    if (score >= 60) {
      return [
        'Improve shed ventilation systems',
        'Log all visitors consistently',
        'Enhance feed storage security',
        'Increase disinfection frequency'
      ];
    }
    return [
      'Repair and secure farm fencing immediately',
      'Implement strict visitor control measures',
      'Establish quarantine protocols for sick animals',
      'Set up proper waste disposal systems',
      'Create regular disinfection schedule'
    ];
  };

  const recommendations = getRecommendations(score);

  // Calculate gauge rotation (0-180 degrees)
  const gaugeRotation = (score / 100) * 180;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg text-gray-900">Assessment Results</h1>
          </div>
          <Button variant="ghost" size="sm" className="p-2">
            <Share size={20} />
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Score Display */}
        <Card className="p-8 text-center">
          <h2 className="text-lg text-gray-900 mb-6">Your Biosecurity Score</h2>
          
          {/* Gauge Visualization */}
          <div className="relative w-48 h-24 mx-auto mb-6">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              {/* Background arc */}
              <path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Colored sections */}
              <path
                d="M 20 80 A 80 80 0 0 1 100 20"
                fill="none"
                stroke="#ef4444"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 100 20 A 80 80 0 0 1 140 35"
                fill="none"
                stroke="#eab308"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 140 35 A 80 80 0 0 1 180 80"
                fill="none"
                stroke="#22c55e"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Needle */}
              <line
                x1="100"
                y1="80"
                x2={100 + 60 * Math.cos((gaugeRotation - 90) * Math.PI / 180)}
                y2={80 + 60 * Math.sin((gaugeRotation - 90) * Math.PI / 180)}
                stroke="#374151"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="100" cy="80" r="4" fill="#374151" />
            </svg>
          </div>

          <div className="text-4xl mb-2">{score}%</div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">{risk.emoji}</span>
            <Badge 
              variant={risk.color === 'green' ? 'default' : 'destructive'}
              className={`text-sm ${
                risk.color === 'yellow' ? 'bg-yellow-500 text-white' : ''
              }`}
            >
              {risk.level}
            </Badge>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 mb-4 flex items-center space-x-2">
            <span>💡</span>
            <span>Personalized Recommendations</span>
          </h3>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-600 font-semibold text-sm mt-0.5">
                  {index + 1}.
                </span>
                <span className="text-blue-900 text-sm leading-relaxed">
                  {recommendation}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl"
          >
            <span>Save Report</span>
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="w-full h-14 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl"
          >
            <span>Schedule Vet Visit</span>
          </Button>
        </div>

        {/* Next Assessment */}
        <Card className="p-4 text-center bg-yellow-50 border-yellow-200">
          <p className="text-sm text-yellow-800">
            📅 Next assessment recommended in <strong>30 days</strong>
          </p>
        </Card>
      </div>
    </div>
  );
}