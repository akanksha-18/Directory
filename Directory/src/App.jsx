import React, { useState } from 'react';
import AddPerson from './components/AddPerson';
import RetrieveInfo from './components/RetrieveInfo';

function App() {
  const [activeTab, setActiveTab] = useState('add-person');

  return (
    <div className="container mx-auto p-4 max-w-6xl">
  <div className="flex flex-col sm:flex-row mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'add-person' ? 'bg-gray-300' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('add-person')}
        >
          Add New Person
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'retrieve-info' ? 'bg-gray-300' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('retrieve-info')}
        >
          Retrieve Information
        </button>
      </div>
      
      {activeTab === 'add-person' ? <AddPerson /> : <RetrieveInfo />}
    </div>
  );
}

export default App;