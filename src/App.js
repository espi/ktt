import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const dataUrl = "https://finalspaceapi.com/api/v0/episode";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      let localData = localStorage.getItem("KTT_" + dataUrl);
      if (localData) {
        console.log("local data found!");
        setData(JSON.parse(localData));
      } else {
        console.log("geting data!");
        const result = await axios(dataUrl);
        localStorage.setItem("KTT_" + dataUrl, JSON.stringify(result.data));
        setData(result.data);
      }
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
      <div>
        <header className="App-header">
          <h1>Kernel Tech Test</h1>
        </header>
        <div>
          {currentItems.map((episode) => (
            <div className="episode" key={episode.id}>
              <img
                src={episode.img_url}
                alt="Cover artwork for episode"
                width="640"
                height="360"
              />
              <div className="details">
                <h2>{episode.name}</h2>
                <p>{episode.air_date}</p>
              </div>
              <div>
                {episode.characters.map((characterUrl, i) => (
                  <Character key={i} url={characterUrl} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

const Character = (url) => {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    const fetchCharacterData = async () => {
      console.log(JSON.stringify(url.url));
      let localData = localStorage.getItem("KTT_" + url.url);
      if (localData) {
        console.log("local data found!");
        setCharacterData(JSON.parse(localData));
      } else {
        const result = await axios(url);
        localStorage.setItem("KTT_" + url.url, JSON.stringify(result.data));
        setCharacterData(result.data);
      }
    };
    fetchCharacterData();
  }, []);

  return (
    <img
      className="character"
      width="100"
      height="100"
      src={characterData.img_url || "/loading-gif.gif"}
      alt={characterData.name}
    />
  );
};

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
            {currentPage == number ? (
              number
            ) : (
              <a
                onClick={() => paginate(number)}
                href="!#"
                className="page-link"
              >
                {number}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default App;
