import { useState } from "react";
import FilmRow from "./FilmRow";

export default function FilmList(props) {
    const [filter, setFilter] = useState("all");

    const [faves, setFaves] = useState([])

    const handleFilterClick = filter => setFilter(filter);

    const handleFaveToggle = film => {
      const filmIndex = faves.indexOf(film);
      if (filmIndex === -1) {
          console.log(`Adding ${film.title} to faves...`);
          setFaves([...faves, film]);
      }
      else if (filmIndex >= 0) {
          console.log(`Removing ${film.title} from faves...`);
          const newFaves = faves.slice();
          newFaves.splice(filmIndex, 1);
          setFaves(newFaves);
      }
  }
    const filmsToDisplay = filter === "all" ? props.films : faves;
    const allFilms = filmsToDisplay.map((film, index) => {
      
        return (
            <FilmRow 
                film={film}
                key={`film-${index}`}
                onFaveToggle={handleFaveToggle}
                isFave={faves.includes(film)}
                handleDetailsClick = {props.handleDetailsClick}
            />
        );
    })
    return (
        <div className="film-list">
            <h1 className="section-title">FILMS</h1>
            <div className="film-list-filters">
                <div className={`film-list-filter ${filter === "all" ? "is-active" : ""}`}
                    onClick={() => handleFilterClick("all")}>
                    ALL
                    <span className="section-count">{faves.length}</span>
                </div>
                <div className={`film-list-filter ${filter === "faves" ? "is-active" : ""}`}
                    onClick={() => handleFilterClick("faves")}>
                    FAVES
                    <span className="section-count">0</span>
                </div>
            </div>
            {allFilms}
        </div>
    );
}

