import React from "react";
import styles from "./Header.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function Header() {
  const { userData, loading } = useAuth();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <h2>ReactChat</h2>
        </div>
        <div className={styles.tabBarContainer}>
          {userData.userId ? (
            <p>{!loading && userData.userLogin}</p>
          ) : (
            <>
              <Link to={"/auth"}>Войти</Link>
              <Link to={"/reg"}>Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Header);
