import React, { useState, useEffect } from 'react';

function AddPerson() {
  const [people, setPeople] = useState([]);
  const [savedRows, setSavedRows] = useState([]);

  useEffect(() => {
    const storedPeople = JSON.parse(localStorage.getItem('people') || '[]');
    setPeople(storedPeople);
    setSavedRows(new Array(storedPeople.length).fill(true));
  }, []);

  const addRow = () => {
    setPeople([...people, { name: '', dob: '', aadhar: '', mobile: '', age: '' }]);
    setSavedRows([...savedRows, false]);
  };

  const updatePerson = (index, field, value) => {
    if (savedRows[index]) return; 
    const newPeople = [...people];
    newPeople[index][field] = value;
    if (field === 'dob') {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      newPeople[index].age = age.toString();
    }
    setPeople(newPeople);
  };

  const savePerson = (index) => {
    const person = people[index];
    if (!person.name || !person.dob || !person.aadhar || !person.mobile) {
      alert('All fields are required');
      return;
    }
    if (person.aadhar.length !== 12) {
      alert('Aadhar Number should be 12 digits');
      return;
    }
    if (person.mobile.length !== 10) {
      alert('Mobile Number should be 10 digits');
      return;
    }
    const newSavedRows = [...savedRows];
    newSavedRows[index] = true;
    setSavedRows(newSavedRows);
    localStorage.setItem('people', JSON.stringify(people));
    alert('Person saved successfully');
  };

  const deletePerson = (index) => {
    const newPeople = people.filter((_, i) => i !== index);
    const newSavedRows = savedRows.filter((_, i) => i !== index);
    setPeople(newPeople);
    setSavedRows(newSavedRows);
    localStorage.setItem('people', JSON.stringify(newPeople));
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Add New Person</h2>
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
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person, index) => (
                <React.Fragment key={index}>
                  <tr className="sm:table-row block">
                    <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Name:'] before:font-bold before:mr-2 sm:before:content-none">
                      <input
                        type="text"
                        value={person.name}
                        onChange={(e) => updatePerson(index, 'name', e.target.value)}
                        className="w-full"
                        disabled={savedRows[index]}
                      />
                    </td>
                    <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Date_of_Birth:'] before:font-bold before:mr-2 sm:before:content-none">
                      <input
                        type="date"
                        value={person.dob}
                        onChange={(e) => updatePerson(index, 'dob', e.target.value)}
                        className="w-full"
                        disabled={savedRows[index]}
                      />
                    </td>
                    <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Aadhar_Number:'] before:font-bold before:mr-2 sm:before:content-none">
                      <input
                        type="text"
                        value={person.aadhar}
                        onChange={(e) => updatePerson(index, 'aadhar', e.target.value)}
                        className="w-full"
                        disabled={savedRows[index]}
                      />
                    </td>
                    <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Mobile_Number:'] before:font-bold before:mr-2 sm:before:content-none">
                      <input
                        type="text"
                        value={person.mobile}
                        onChange={(e) => updatePerson(index, 'mobile', e.target.value)}
                        className="w-full"
                        disabled={savedRows[index]}
                      />
                    </td>
                    <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Age:'] before:font-bold before:mr-2 sm:before:content-none">
                      {person.age}
                    </td>
                    <td className="border border-gray-300 p-2 block sm:table-cell before:content-['Actions:'] before:font-bold before:mr-2 sm:before:content-none">
                      {!savedRows[index] && (
                        <button
                          onClick={() => savePerson(index)}
                          className="bg-green-500 text-white px-2 py-1 mr-2"
                        >
                          Save
                        </button>
                      )}
                      <button
                        onClick={() => deletePerson(index)}
                        className={`bg-red-500 text-white px-2 py-1 ${!savedRows[index] && 'opacity-50 cursor-not-allowed'}`}
                        disabled={!savedRows[index]}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr className="h-4 sm:hidden"></tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={addRow}
        className="mt-4 bg-blue-500 text-white px-4 py-2"
      >
        Add New Row
      </button>
    </div>
  );
}

export default AddPerson;

