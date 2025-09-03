import React, { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Card } from './ui/card';
import { ArrowLeft, Mic } from 'lucide-react';

interface AssessmentProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export function Assessment({ onComplete, onBack }: AssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const questions = [
    {
      id: 1,
      text: "Is your farm fencing secure and intact?",
      icon: "🔒"
    },
    {
      id: 2,
      text: "Do you disinfect vehicles entering your farm?",
      icon: "🚗"
    },
    {
      id: 3,
      text: "Are your animals isolated from wild birds?",
      icon: "🐦"
    },
    {
      id: 4,
      text: "Do you maintain visitor logs regularly?",
      icon: "📋"
    },
    {
      id: 5,
      text: "Are feed storage areas clean and secure?",
      icon: "🌾"
    },
    {
      id: 6,
      text: "Do you wash hands before handling animals?",
      icon: "🧼"
    },
    {
      id: 7,
      text: "Are sick animals immediately quarantined?",
      icon: "🏥"
    },
    {
      id: 8,
      text: "Do you dispose of waste properly?",
      icon: "🗑️"
    },
    {
      id: 9,
      text: "Are your animals vaccinated on schedule?",
      icon: "💉"
    },
    {
      id: 10,
      text: "Do you limit farm access to essential personnel?",
      icon: "🚪"
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score (percentage of "yes" answers)
      const yesCount = newAnswers.filter(ans => ans).length;
      const score = Math.round((yesCount / questions.length) * 100);
      onComplete(score);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg text-gray-900">Biosecurity Assessment</h1>
            <p className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4">
        <Progress value={progress} className="h-2" />
      </div>

      <div className="p-6">
        {/* Question Card */}
        <Card className="p-8 text-center mb-8">
          <div className="text-6xl mb-6">
            {questions[currentQuestion].icon}
          </div>
          <h2 className="text-xl text-gray-900 mb-6 leading-relaxed">
            {questions[currentQuestion].text}
          </h2>
          
          {/* Voice Input Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-8 text-gray-600"
          >
            <Mic size={16} className="mr-2" />
            Voice Input
          </Button>
        </Card>

        {/* Answer Buttons */}
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full h-16 bg-green-600 hover:bg-green-700 text-white rounded-xl"
            onClick={() => handleAnswer(true)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👍</span>
              <span className="text-xl">Yes</span>
            </div>
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="w-full h-16 border-2 border-red-500 text-red-600 hover:bg-red-50 rounded-xl"
            onClick={() => handleAnswer(false)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👎</span>
              <span className="text-xl">No</span>
            </div>
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Answer honestly for accurate biosecurity recommendations
        </p>
      </div>
    </div>
  );
}