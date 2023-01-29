import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://finalspaceapi.com/api/v0/episode");
      setData(result.data);
    };
    fetchData();
  }, []);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kernel Tech Test</h1>
        {currentItems.map((episode) => (
          <div key={episode.id}>
            <img src={episode.img_url} alt="Cover artwork for episode" />
            <h2>{episode.name}</h2>
            <p>{episode.air_date}</p>
            <ul>
              {episode.characters.map((character) => (
                <li>{character}</li>
              ))}
            </ul>
          </div>
        ))}

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </header>
    </div>
  );
}

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default App;
