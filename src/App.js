import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [animals, setAnimals] = useState([]);
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnimals();
  }, []);
  
  const fetchAnimals = async () => {
    try {
      const response = await fetch('http://localhost:5000/animals');
      const data = await response.json();
      setAnimals(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, species }),
      });
      const data = await response.json();
      setAnimals([...animals, data]);
      setName('');
      setSpecies('');
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };
  
  return (
    <div className="App">
      <h1>Animal Directory</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="species">Species:</label>
          <input
            type="text"
            id="species"
            name="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">Add Animal</button>
      </form>
      <div>
        <h2>All Animals</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {animals.map((animal) => (
              <li key={animal.id}>{animal.name} - {animal.species}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
