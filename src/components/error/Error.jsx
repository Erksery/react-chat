import React from "react";
import BodyContainer from "../bodyContainer/BodyContainer";
import { Link } from "react-router-dom";
import styles from "./Error.module.scss";

function Error() {
  return (
    <BodyContainer>
      <div className={styles.errorContainer}>
        <h1>401</h1>
        <h2>Ой, кажется вы не авторизованы.</h2>
        <h3>Войдите чтобы продолжить</h3>
        <Link to={"/auth"}>Войти</Link>
      </div>
    </BodyContainer>
  );
}

export default Error;
