import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://finalspaceapi.com/api/v0/episode',
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kernel Tech Test</h1>
        {data.map(episode => (
        <div key={episode.id}>
          <img src={episode.img_url} alt="Episode image" />
          <h2>{episode.name}</h2>
          <p>{episode.air_date}</p>
          <ul>
            {episode.characters.map(character => <li>{character}</li>)}
          </ul>
        </div>
      ))}
      </header>
    </div>
  );
}

export default App;
