
import React from 'react';
import { Check, Send, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepsProps {
  currentStep: number;
}

export const Steps = ({ currentStep }: StepsProps) => {
  const steps = [
    {
      id: 1,
      name: 'Isi Formulir',
      description: 'Lengkapi data pengaduan',
      icon: Send,
    },
    {
      id: 2,
      name: 'Verifikasi',
      description: 'Pengaduan diterima sistem',
      icon: Check,
    },
    {
      id: 3,
      name: 'Pantau Status',
      description: 'Lacak dengan nomor tiket',
      icon: Search,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step circle with number/icon */}
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  currentStep > step.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : currentStep === step.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-muted-foreground/30"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              
              {/* Step text (hidden on small screens) */}
              <div className="absolute -bottom-6 text-center w-32 -translate-x-1/2 left-1/2">
                <p className={cn(
                  "text-xs font-medium transition-colors",
                  currentStep >= step.id 
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}>
                  {step.name}
                </p>
              </div>
            </div>
            
            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "h-0.5 flex-1 transition-colors",
                  currentStep > index + 1 
                    ? "bg-primary" 
                    : "bg-muted-foreground/30"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
