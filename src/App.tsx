import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Scan } from 'lucide-react';
import { db } from './firebase';
import { ScanList } from './components/ScanList';
import type { RFIDScan } from './types';

function App() {
  const [scans, setScans] = useState<RFIDScan[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'rfid_scans'), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const scansData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      })) as RFIDScan[];
      
      setScans(scansData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-3">
            <Scan className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Sistema de Registro RFID
            </h1>
          </div>
          
          {scans.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">
                No hay registros de escaneos RFID
              </p>
            </div>
          ) : (
            <ScanList scans={scans} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;