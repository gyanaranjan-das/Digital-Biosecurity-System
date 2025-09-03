import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { PortalSelection } from './components/PortalSelection';
import { Dashboard } from './components/Dashboard';
import { VetDashboard } from './components/VetDashboard';
import { Assessment } from './components/Assessment';
import { AssessmentResult } from './components/AssessmentResult';
import { VetAppointments } from './components/VetAppointments';
import { RecordsMenu } from './components/RecordsMenu';
import { TrainingLibrary } from './components/TrainingLibrary';
import { ChatBot } from './components/ChatBot';

export type Screen = 'splash' | 'portalSelection' | 'dashboard' | 'vetDashboard' | 'assessment' | 'result' | 'vet' | 'records' | 'training' | 'chat';
export type UserType = 'farmer' | 'veterinarian' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [assessmentScore, setAssessmentScore] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handlePortalSelect = () => {
    setCurrentScreen('portalSelection');
  };

  const handleLogin = (selectedUserType: UserType) => {
    setIsLoggedIn(true);
    setUserType(selectedUserType);
    if (selectedUserType === 'farmer') {
      setCurrentScreen('dashboard');
    } else if (selectedUserType === 'veterinarian') {
      setCurrentScreen('vetDashboard');
    }
  };

  const handleAssessmentComplete = (score: number) => {
    setAssessmentScore(score);
    setCurrentScreen('result');
  };

  const getBackScreen = () => {
    return userType === 'farmer' ? 'dashboard' : 'vetDashboard';
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onContinue={handlePortalSelect} />;
      case 'portalSelection':
        return <PortalSelection onLogin={handleLogin} onBack={() => setCurrentScreen('splash')} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigateToScreen} />;
      case 'vetDashboard':
        return <VetDashboard onNavigate={navigateToScreen} />;
      case 'assessment':
        return <Assessment onComplete={handleAssessmentComplete} onBack={() => setCurrentScreen(getBackScreen())} />;
      case 'result':
        return <AssessmentResult score={assessmentScore} onBack={() => setCurrentScreen(getBackScreen())} />;
      case 'vet':
        return <VetAppointments onBack={() => setCurrentScreen(getBackScreen())} />;
      case 'records':
        return <RecordsMenu onBack={() => setCurrentScreen(getBackScreen())} />;
      case 'training':
        return <TrainingLibrary onBack={() => setCurrentScreen(getBackScreen())} />;
      case 'chat':
        return <ChatBot onBack={() => setCurrentScreen(getBackScreen())} />;
      default:
        return userType === 'farmer' ? <Dashboard onNavigate={navigateToScreen} /> : <VetDashboard onNavigate={navigateToScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto min-h-screen bg-white shadow-lg">
        {renderScreen()}
      </div>
    </div>
  );
}