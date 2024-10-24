import React from 'react';
import { format } from 'date-fns';
import { UserCheck } from 'lucide-react';
import type { RFIDScan } from '../types';

interface ScanListProps {
  scans: RFIDScan[];
}

export function ScanList({ scans }: ScanListProps) {
  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {scans.map((scan) => (
            <div key={scan.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserCheck className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {scan.userName || 'Usuario no registrado'}
                    </p>
                    <p className="text-sm text-gray-500">
                      Tag ID: {scan.tagId}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {format(scan.timestamp, 'dd/MM/yyyy HH:mm:ss')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}