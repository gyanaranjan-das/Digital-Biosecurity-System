import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { ArrowLeft, Calendar as CalendarIcon, Clock, User } from 'lucide-react';

interface VetAppointmentsProps {
  onBack: () => void;
}

export function VetAppointments({ onBack }: VetAppointmentsProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedVet, setSelectedVet] = useState('');

  const reasons = [
    'Sick Animal',
    'Vaccination',
    'Routine Checkup',
    'Emergency',
    'Consultation'
  ];

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM'
  ];

  const vets = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialization: 'Large Animals',
      avatar: '👩‍⚕️',
      rating: 4.8,
      distance: '5 km'
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Poultry & Livestock',
      avatar: '👨‍⚕️',
      rating: 4.9,
      distance: '8 km'
    },
    {
      id: '3',
      name: 'Dr. Anita Patel',
      specialization: 'Emergency Care',
      avatar: '👩‍⚕️',
      rating: 4.7,
      distance: '12 km'
    }
  ];

  const canConfirm = selectedReason && selectedDate && selectedTime && selectedVet;

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
          <h1 className="text-lg text-gray-900">Book Vet Appointment</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Reason for Visit */}
        <Card className="p-4">
          <label className="block text-sm text-gray-700 mb-3">
            <User size={16} className="inline mr-2" />
            Reason for Visit
          </label>
          <Select value={selectedReason} onValueChange={setSelectedReason}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Select reason for visit" />
            </SelectTrigger>
            <SelectContent>
              {reasons.map((reason) => (
                <SelectItem key={reason} value={reason}>
                  {reason}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Date Selection */}
        <Card className="p-4">
          <label className="block text-sm text-gray-700 mb-3">
            <CalendarIcon size={16} className="inline mr-2" />
            Select Date
          </label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
            className="rounded-md border"
          />
        </Card>

        {/* Time Selection */}
        {selectedDate && (
          <Card className="p-4">
            <label className="block text-sm text-gray-700 mb-3">
              <Clock size={16} className="inline mr-2" />
              Available Time Slots
            </label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className="h-12"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </Card>
        )}

        {/* Vet Selection */}
        <div>
          <h3 className="text-lg text-gray-900 mb-4">Available Veterinarians</h3>
          <div className="space-y-3">
            {vets.map((vet) => (
              <Card 
                key={vet.id} 
                className={`p-4 cursor-pointer transition-colors ${
                  selectedVet === vet.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedVet(vet.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{vet.avatar}</div>
                  <div className="flex-1">
                    <h4 className="text-gray-900">{vet.name}</h4>
                    <p className="text-sm text-gray-600">{vet.specialization}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-yellow-600">
                        ⭐ {vet.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        📍 {vet.distance}
                      </span>
                    </div>
                  </div>
                  {selectedVet === vet.id && (
                    <div className="text-green-600">
                      ✓
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <div className="pt-4">
          <Button
            size="lg"
            className={`w-full h-14 rounded-xl ${
              canConfirm 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!canConfirm}
            onClick={() => {
              if (canConfirm) {
                alert('Appointment booked successfully!');
                onBack();
              }
            }}
          >
            Confirm Appointment
          </Button>
        </div>

        {/* Emergency Contact */}
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="text-center">
            <h4 className="text-red-800 mb-2">🚨 Emergency?</h4>
            <p className="text-sm text-red-700 mb-3">
              For urgent cases, call our 24/7 hotline
            </p>
            <Button 
              variant="outline" 
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              📞 Call Emergency: 1800-VET-HELP
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}