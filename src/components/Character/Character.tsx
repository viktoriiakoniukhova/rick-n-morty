import React from "react";
import classes from "./index.module.scss";
import rightArrow from "../../assets/right-arrow.png";
import { Link as RouterLink } from "react-router-dom";

type CharacterProps = {
  id: number;
  image: string;
  name: string;
  description: string;
};

export default function Character({
  id,
  image: image,
  name: title,
  description,
}: CharacterProps) {
  function createMarkup(html: string) {
    return { __html: html };
  }

  function cropString(str: string, numOfChar: number) {
    return str.length > numOfChar ? `${str.substring(0, numOfChar)}...` : str;
  }
  return (
    <div className={classes.card}>
      <div className={classes.cardMedia}>
        <img src={image} alt={title} />
      </div>
      <div className={classes.cardContent}>
        <p
          className={classes.title}
          dangerouslySetInnerHTML={createMarkup(cropString(title, 200))}
        ></p>
        <div className={classes.descBox}>
          <p
            className={classes.desc}
            dangerouslySetInnerHTML={createMarkup(cropString(description, 200))}
          ></p>
        </div>
        <RouterLink
          to={{
            pathname: `characters/${id}`,
          }}
          state={{
            id: id,
          }}
        >
          <p className={classes.link}>
            Read More <img src={rightArrow} alt="arrow-right" />
          </p>
        </RouterLink>
      </div>
    </div>
  );
}
