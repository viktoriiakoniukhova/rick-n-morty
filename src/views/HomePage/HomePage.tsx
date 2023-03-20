import classes from "./index.module.scss";
import Search from "../../components/Search/Search";
import React from "react";
import Character from "../../components/Character/Character";
import title from "../../assets/title.png";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
};

type Counters = {
  titleMatchesCounter: number;
};

type CharacterWithCounters = Character & Counters;

export default function HomePage() {
  const [characters, setCharacters] = React.useState<CharacterWithCounters[]>(
    []
  );

  function fetchCharacters(searchInput: string) {
    const NAME = "name";
    const searchInputWords = searchInput.split(" ");

    const nameSearch = `?${NAME}=`.concat(searchInputWords.join(`&${NAME}=`));

    const re = new RegExp(`(${searchInputWords.join("|")})`, "gi");

    fetch(`https://rickandmortyapi.com/api/character/${nameSearch}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(() => {
          return data.results.map((character: Character) => {
            const titleMatchesCounter = (character.name.match(re) || []).length;
            const newName = character.name.replace(
              re,
              (match: string) => `<mark>${match}</mark>`
            );
            return {
              ...character,
              name: newName,
              titleMatchesCounter: titleMatchesCounter,
            };
          });
        });
      });
  }

  function clearResults() {
    setCharacters([]);
  }

  function sortCharacters(
    characterA: CharacterWithCounters,
    characterB: CharacterWithCounters
  ) {
    if (characterA.titleMatchesCounter > characterB.titleMatchesCounter)
      return -1;
    if (characterA.titleMatchesCounter < characterB.titleMatchesCounter)
      return 1;

    return 0;
  }

  return (
    <div className={classes.stack}>
      <div className={classes.stackHeader}>
        <img src={title} alt="rick-n-morty-title" />
      </div>
      <div className={classes.stackSearch}>
        <Search
          fetchCharactersByInput={fetchCharacters}
          clearResults={clearResults}
        />
      </div>

      <div className={classes.searchResults}>
        {characters.length ? (
          <>
            <p className={classes.headerResults}>
              Results: {characters.length}
            </p>
            <div className="divider"></div>
            <div className={classes.cardWrapper}>
              {characters.sort(sortCharacters).map((character) => {
                return (
                  <Character
                    key={character.id}
                    id={character.id}
                    image={character.image}
                    name={character.name}
                    description={character.species}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <p className={classes.headerResults}>
            Search results will be displayed here.
          </p>
        )}
      </div>
    </div>
  );
}
