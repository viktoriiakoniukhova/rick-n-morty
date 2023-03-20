import React from "react";
import Character from "../../components/Character/Character";
import arrowBack from "../../assets/left-arrow.png";
import classes from "./index.module.scss";
import { useLocation, useNavigate } from "react-router";

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

export default function CharacterPage() {
  const { state } = useLocation();
  const { id } = state || -1;
  const [character, setCharacter] = React.useState<Character>();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    if (id !== -1) fetchCharacterByID();
  }, []);

  function fetchCharacterByID() {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data: Character) => {
        console.log(data);
        setCharacter(data);
      });
  }

  return (
    <div className={classes.mainBox}>
      <div className={classes.linkBox}>
        <a className={classes.link} href="#" onClick={goBack}>
          <img src={arrowBack} alt="arrow-icon" />
          Go Back
        </a>
      </div>

      <div className={classes.contentBox}>
        <div className={classes.imageBox}>
          <img alt={character?.name} src={character?.image}></img>
        </div>
        <p className={classes.title}>{character?.name}</p>
        <div className={classes.infoBox}>
          <p>Informations</p>
          <section className={classes.infoBoxSection}>
            <h3>Gender</h3>
            <p>{character?.gender}</p>
          </section>
          <div className={classes.divider}></div>
          <section className={classes.infoBoxSection}>
            <h3>Status</h3>
            <p>{character?.status}</p>
          </section>
          <div className={classes.divider}></div>
          <section className={classes.infoBoxSection}>
            <h3>Species</h3>
            <p>{character?.species}</p>
          </section>
          <div className={classes.divider}></div>
          <section className={classes.infoBoxSection}>
            <h3>Origin</h3>
            <p>{character?.origin.name}</p>
          </section>
          <div className={classes.divider}></div>
          <section className={classes.infoBoxSection}>
            <h3>Type</h3>
            <p>{character?.type || "unknown"}</p>
          </section>
          <div className={classes.divider}></div>
        </div>
      </div>
    </div>
  );
}
