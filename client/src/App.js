import React, { useState, useEffect } from 'react';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByExp, setSortByExp] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/candidates')
      .then(res => res.json())
      .then(data => setCandidates(data));
  }, []);

  const filteredCandidates = candidates
    .filter(candidate => {
      const searchLower = searchTerm.toLowerCase();
      return (
        candidate.name.toLowerCase().includes(searchLower) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => {
      if (sortByExp) {
        return b.yearsOfExperience - a.yearsOfExperience;
      }
      return 0;
    });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-600">Name</th>
              <th className="text-left p-4 font-semibold text-gray-600">Skills</th>
              <th 
                className="text-left p-4 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                onClick={() => setSortByExp(!sortByExp)}
              >
                Years of Experience {sortByExp ? '↓' : '↑'}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map(candidate => (
              <tr 
                key={candidate.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 text-gray-800">{candidate.name}</td>
                <td className="p-4 text-gray-800">{candidate.skills.join(', ')}</td>
                <td className="p-4 text-gray-800">{candidate.yearsOfExperience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;