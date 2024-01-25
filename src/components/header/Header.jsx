import React from "react";
import styles from "./Header.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "../avatar/Avatar";

function Header() {
  const { userData, loading } = useAuth();
  const online = useSelector((state) => state.onlineUsersStore);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <h2 translate="no">ReactChat</h2>
        </div>
        <div className={styles.tabBarContainer}>
          {userData.userId ? (
            <>
              <p className={styles.userName}>
                {!loading && userData.userLogin}
              </p>
              <Avatar
                id={userData.userId}
                login={userData.userLogin}
                color={userData.avatarColor}
                onlineUsers={online.onlineUsers}
              />
            </>
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
