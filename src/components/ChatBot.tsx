import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ArrowLeft, Send, Mic, MoreHorizontal } from 'lucide-react';

interface ChatBotProps {
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot({ onBack }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'नमस्ते! मैं आपका AI बायोसिक्यूरिटी सलाहकार हूं। मैं आपकी खेती की सुरक्षा में मदद कर सकता हूं। आप मुझसे क्या पूछना चाहते हैं?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    'Symptoms of bird flu?',
    'How to disinfect a shed?',
    'Vaccination schedule?',
    'Visitor log requirements?',
    'Feed storage tips?',
    'Emergency protocols?'
  ];

  const botResponses = {
    'bird flu': 'Bird flu symptoms include: 1) Sudden death in birds 2) Difficulty breathing 3) Swollen head/neck 4) Purple discoloration 5) Drop in egg production. Immediately isolate affected birds and contact veterinarian.',
    'disinfect': 'To disinfect your shed: 1) Remove all animals and feed 2) Clean all surfaces with soap and water 3) Apply disinfectant (2% formaldehyde or approved solution) 4) Wait 24 hours before allowing animals back 5) Disinfect footwear and equipment.',
    'vaccination': 'Standard vaccination schedule: Newcastle Disease (21-28 days, then 6-8 weeks), Infectious Bronchitis (1 day old, booster at 4 weeks), Fowl Pox (8-12 weeks). Always consult your veterinarian for farm-specific schedules.',
    'visitor': 'Visitor log requirements: 1) Full name and contact 2) Purpose of visit 3) Time in/out 4) Areas visited 5) Disinfection completed 6) Health declaration. Keep records for minimum 3 months.',
    'feed': 'Feed storage best practices: 1) Store in dry, cool place 2) Use sealed containers 3) First in, first out rotation 4) Regular pest control 5) Check for mold/contamination 6) Separate from chemicals.',
    'emergency': 'Emergency protocol steps: 1) Isolate affected area 2) Contact veterinarian immediately 3) Notify authorities if required 4) Document everything 5) Restrict farm access 6) Follow official guidelines.'
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = "I understand your question. For specific guidance on this topic, I recommend consulting with your local veterinarian. Is there anything else I can help you with regarding farm biosecurity?";

      // Find matching response
      Object.entries(botResponses).forEach(([key, value]) => {
        if (lowerText.includes(key)) {
          response = value;
        }
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white">🤖</span>
            </div>
            <div>
              <h1 className="text-lg text-gray-900">AI Biosecurity Advisor</h1>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="p-2">
            <MoreHorizontal size={20} />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-md'
                  : 'bg-white text-gray-900 rounded-bl-md shadow-sm border'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 rounded-2xl rounded-bl-md shadow-sm border px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="space-y-3">
            <p className="text-center text-sm text-gray-600">Suggested questions:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs text-left h-auto py-2 px-3 whitespace-normal"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1 flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
            <Input
              placeholder="Type your question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-gray-500 hover:text-blue-500"
            >
              <Mic size={16} />
            </Button>
          </div>
          <Button
            size="sm"
            className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white p-0"
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Send size={16} />
          </Button>
        </div>
        
        {/* Language Notice */}
        <p className="text-xs text-gray-500 text-center mt-2">
          💬 Supports Hindi, English, and Tamil
        </p>
      </div>
    </div>
  );
}