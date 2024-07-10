import React, { useState } from 'react';

function RetrieveInfo() {
  const [aadhar, setAadhar] = useState('');
  const [person, setPerson] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setPerson(null);

    if (aadhar.length !== 12) {
      setError('Aadhar Number should be 12 digits');
      return;
    }

    const people = JSON.parse(localStorage.getItem('people') || '[]');
    const foundPerson = people.find(p => p.aadhar === aadhar);
    
    if (foundPerson) {
      setPerson(foundPerson);
    } else {
      setError('No match found');
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Retrieve Information</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col sm:flex-row items-center">
        <label htmlFor="search-aadhar" className="mr-2 mb-2 sm:mb-0">Aadhar Number:</label>
        <input
          type="text"
          id="search-aadhar"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          required
          className="border border-gray-300 p-1 mr-2 mb-2 sm:mb-0 w-full sm:w-auto"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 w-full sm:w-auto">Search</button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {person && (
        <div className="overflow-x-auto w-full">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 hidden sm:table-header-group">
                <tr>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Date of Birth</th>
                  <th className="border border-gray-300 p-2">Aadhar Number</th>
                  <th className="border border-gray-300 p-2">Mobile Number</th>
                  <th className="border border-gray-300 p-2">Age</th>
                </tr>
              </thead>
              <tbody>
                <tr className="sm:table-row block">
                  <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Name:'] before:font-bold before:mr-2 sm:before:content-none">
                    {person.name}
                  </td>
                  <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Date_of_Birth:'] before:font-bold before:mr-2 sm:before:content-none">
                    {person.dob}
                  </td>
                  <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Aadhar_Number:'] before:font-bold before:mr-2 sm:before:content-none">
                    {person.aadhar}
                  </td>
                  <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Mobile_Number:'] before:font-bold before:mr-2 sm:before:content-none">
                    {person.mobile}
                  </td>
                  <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Age:'] before:font-bold before:mr-2 sm:before:content-none">
                    {person.age}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default RetrieveInfo;

