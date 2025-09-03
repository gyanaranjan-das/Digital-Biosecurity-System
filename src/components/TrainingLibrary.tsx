import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ArrowLeft, Search, Play, CheckCircle, Clock, Users } from 'lucide-react';

interface TrainingLibraryProps {
  onBack: () => void;
}

export function TrainingLibrary({ onBack }: TrainingLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const lessons = [
    {
      id: 1,
      title: 'How to Keep Your Farm Clean',
      duration: '15 min',
      thumbnail: '🧼',
      category: 'Hygiene',
      completed: true,
      views: 1250,
      difficulty: 'Beginner',
      description: 'Learn essential cleaning practices for farm biosecurity'
    },
    {
      id: 2,
      title: 'Recognizing Bird Flu Symptoms',
      duration: '22 min',
      thumbnail: '🐦',
      category: 'Health',
      completed: false,
      views: 980,
      difficulty: 'Intermediate',
      description: 'Early detection and prevention of avian influenza'
    },
    {
      id: 3,
      title: 'Proper Vaccination Techniques',
      duration: '18 min',
      thumbnail: '💉',
      category: 'Vaccination',
      completed: true,
      views: 1450,
      difficulty: 'Advanced',
      description: 'Step-by-step guide to livestock vaccination'
    },
    {
      id: 4,
      title: 'Visitor Management Protocols',
      duration: '12 min',
      thumbnail: '📋',
      category: 'Security',
      completed: false,
      views: 750,
      difficulty: 'Beginner',
      description: 'Control farm access and maintain visitor logs'
    },
    {
      id: 5,
      title: 'Emergency Response Planning',
      duration: '25 min',
      thumbnail: '🚨',
      category: 'Emergency',
      completed: false,
      views: 680,
      difficulty: 'Advanced',
      description: 'Prepare for and respond to biosecurity emergencies'
    },
    {
      id: 6,
      title: 'Feed Storage Best Practices',
      duration: '16 min',
      thumbnail: '🌾',
      category: 'Storage',
      completed: true,
      views: 920,
      difficulty: 'Beginner',
      description: 'Maintain feed quality and prevent contamination'
    }
  ];

  const categories = ['All', 'Hygiene', 'Health', 'Vaccination', 'Security', 'Emergency', 'Storage'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const completedCount = lessons.filter(lesson => lesson.completed).length;
  const progress = Math.round((completedCount / lessons.length) * 100);

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
            <h1 className="text-lg text-gray-900">Training Library</h1>
            <p className="text-sm text-gray-600">Learn biosecurity best practices</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Progress Overview */}
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-blue-900">Learning Progress</h3>
              <p className="text-sm text-blue-700">
                {completedCount} of {lessons.length} lessons completed
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl text-blue-600">{progress}%</div>
              <div className="w-16 h-2 bg-blue-200 rounded-full mt-1">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex">
                {/* Thumbnail */}
                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center relative">
                  <span className="text-3xl">{lesson.thumbnail}</span>
                  {lesson.completed ? (
                    <CheckCircle className="absolute top-1 right-1 w-4 h-4 text-green-500 bg-white rounded-full" />
                  ) : (
                    <Play className="absolute bottom-1 right-1 w-4 h-4 text-white bg-black bg-opacity-50 rounded-full p-0.5" />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 p-4">
                  <h4 className="text-gray-900 mb-1 leading-tight">{lesson.title}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{lesson.description}</p>
                  
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{lesson.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users size={12} />
                      <span>{lesson.views}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {lesson.category}
                    </Badge>
                    <div className={`w-2 h-2 rounded-full ${getDifficultyColor(lesson.difficulty)}`} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Achievement Section */}
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="text-yellow-800 mb-1">Keep Learning!</h4>
            <p className="text-sm text-yellow-700">
              Complete 3 more lessons to earn the "Biosecurity Expert" badge
            </p>
          </div>
        </Card>

        {/* Offline Downloads */}
        <Card className="p-4">
          <h4 className="text-gray-900 mb-3 flex items-center space-x-2">
            <span>📱</span>
            <span>Offline Learning</span>
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Download lessons to watch without internet connection
          </p>
          <Button variant="outline" className="w-full">
            Manage Downloads
          </Button>
        </Card>
      </div>
    </div>
  );
}