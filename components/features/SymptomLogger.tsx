'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { COMMON_SYMPTOMS, COMMON_TRIGGERS, TREATMENT_OPTIONS } from '@/lib/constants';
import { generateId } from '@/lib/utils';
import type { SymptomLog } from '@/lib/types';

interface SymptomLoggerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (log: Omit<SymptomLog, 'logId' | 'userId'>) => void;
}

export function SymptomLogger({ isOpen, onClose, onSave }: SymptomLoggerProps) {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [treatments, setTreatments] = useState<{ treatment: string; effectiveness: number }[]>([]);
  const [severity, setSeverity] = useState(5);
  const [mood, setMood] = useState(5);
  const [notes, setNotes] = useState('');
  const [customSymptom, setCustomSymptom] = useState('');
  const [customTrigger, setCustomTrigger] = useState('');

  const handleSave = () => {
    const log: Omit<SymptomLog, 'logId' | 'userId'> = {
      timestamp: new Date().toISOString(),
      symptoms,
      triggers,
      treatmentResponses: treatments,
      severity,
      mood,
      notes: notes.trim() || undefined,
    };

    onSave(log);
    
    // Reset form
    setSymptoms([]);
    setTriggers([]);
    setTreatments([]);
    setSeverity(5);
    setMood(5);
    setNotes('');
    setCustomSymptom('');
    setCustomTrigger('');
    
    onClose();
  };

  const addSymptom = (symptom: string) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const addTrigger = (trigger: string) => {
    if (!triggers.includes(trigger)) {
      setTriggers([...triggers, trigger]);
    }
  };

  const removeTrigger = (trigger: string) => {
    setTriggers(triggers.filter(t => t !== trigger));
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !symptoms.includes(customSymptom.trim())) {
      addSymptom(customSymptom.trim());
      setCustomSymptom('');
    }
  };

  const addCustomTrigger = () => {
    if (customTrigger.trim() && !triggers.includes(customTrigger.trim())) {
      addTrigger(customTrigger.trim());
      setCustomTrigger('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log Your Symptoms"
      size="lg"
    >
      <div className="space-y-6">
        {/* Symptoms Section */}
        <div>
          <h3 className="text-lg font-semibold text-textPrimary mb-3">Current Symptoms</h3>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {COMMON_SYMPTOMS.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => addSymptom(symptom)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors duration-200 ${
                    symptoms.includes(symptom)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-100 text-textSecondary border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Add custom symptom..."
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
              />
              <Button variant="outline" onClick={addCustomSymptom}>
                Add
              </Button>
            </div>

            {symptoms.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom) => (
                  <Badge
                    key={symptom}
                    variant="primary"
                    className="cursor-pointer"
                    onClick={() => removeSymptom(symptom)}
                  >
                    {symptom} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Severity Scale */}
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-2">
            Overall Severity (1-10): {severity}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-textSecondary mt-1">
            <span>Mild</span>
            <span>Moderate</span>
            <span>Severe</span>
          </div>
        </div>

        {/* Triggers Section */}
        <div>
          <h3 className="text-lg font-semibold text-textPrimary mb-3">Potential Triggers</h3>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {COMMON_TRIGGERS.map((trigger) => (
                <button
                  key={trigger}
                  onClick={() => addTrigger(trigger)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors duration-200 ${
                    triggers.includes(trigger)
                      ? 'bg-accent text-white border-accent'
                      : 'bg-gray-100 text-textSecondary border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {trigger}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Add custom trigger..."
                value={customTrigger}
                onChange={(e) => setCustomTrigger(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomTrigger()}
              />
              <Button variant="outline" onClick={addCustomTrigger}>
                Add
              </Button>
            </div>

            {triggers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {triggers.map((trigger) => (
                  <Badge
                    key={trigger}
                    variant="success"
                    className="cursor-pointer"
                    onClick={() => removeTrigger(trigger)}
                  >
                    {trigger} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mood Scale */}
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-2">
            Current Mood (1-10): {mood}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-textSecondary mt-1">
            <span>Poor</span>
            <span>Neutral</span>
            <span>Great</span>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional details about your symptoms, what you were doing, how you're feeling..."
            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={symptoms.length === 0}
            className="flex-1"
          >
            Save Log
          </Button>
        </div>
      </div>
    </Modal>
  );
}
