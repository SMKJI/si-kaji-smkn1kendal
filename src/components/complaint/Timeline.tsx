
import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  XCircle 
} from 'lucide-react';

interface TimelineEvent {
  status: string;
  date: string;
  message: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Diterima':
      return <Clock className="h-5 w-5 text-blue-500" />;
    case 'Diproses':
      return <Loader2 className="h-5 w-5 text-yellow-500" />;
    case 'Ditindaklanjuti':
      return <AlertCircle className="h-5 w-5 text-purple-500" />;
    case 'Selesai':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'Ditolak':
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Clock className="h-5 w-5 text-blue-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Diterima':
      return 'border-blue-500 bg-blue-50';
    case 'Diproses':
      return 'border-yellow-500 bg-yellow-50';
    case 'Ditindaklanjuti':
      return 'border-purple-500 bg-purple-50';
    case 'Selesai':
      return 'border-green-500 bg-green-50';
    case 'Ditolak':
      return 'border-red-500 bg-red-50';
    default:
      return 'border-gray-300 bg-gray-50';
  }
};

export const Timeline = ({ events }: TimelineProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={eventIdx}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-muted"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className={`relative px-1 ${getStatusColor(event.status)} rounded-full h-10 w-10 flex items-center justify-center`}>
                  {getStatusIcon(event.status)}
                </div>
                <div className="min-w-0 flex-1 pt-1.5">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.status}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatDate(event.date)}</p>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>{event.message}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
