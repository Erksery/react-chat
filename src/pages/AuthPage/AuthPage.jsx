import React, { useState } from "react";
import BodyContainer from "../../components/bodyContainer/BodyContainer";
import styles from "./AuthPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { addAllert } from "../../store/allertSlice";
import axios from "axios";
import AuthBodyContainer from "../../components/authBodyContainer/AuthBodyContainer";

function AuthPage() {
  const [inputValue, setInputValue] = useState({ login: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submitLog = async (event) => {
    event.preventDefault();
    try {
      const resData = await axios.post("/api/login", inputValue);

      dispatch(
        addAllert({
          allertText: resData.data.message,
          allertStatus: resData.status,
        })
      );
      navigate("/chat");
    } catch (err) {
      dispatch(
        addAllert({
          allertText: err.response.data.error,
          allertStatus: err.response.status,
        })
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBodyContainer>
      <div className={styles.authBody}>
        <form onSubmit={submitLog} className={styles.authContainer}>
          <div className={styles.textContainer}>
            <h2>
              <span>Войти</span> в аккаунт
            </h2>
            <p>🔔 Введите данные зарегистрированного аккаунта </p>
          </div>

          <div className={styles.inputContainer}>
            <input
              value={inputValue.login}
              onChange={(e) =>
                setInputValue({ ...inputValue, login: e.target.value })
              }
              type="text"
              placeholder="Логин"
            />
            <input
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({ ...inputValue, password: e.target.value })
              }
              type="password"
              placeholder="Пароль"
            />
          </div>
          <span className={styles.linkRegistration}>
            <p>Впервые на сайте?</p>
            <Link to={"/reg"}>Зарегистрироваться</Link>
          </span>

          <button onClick={() => setLoading((prev) => !prev)}>
            {loading ? "Загрузка" : "Подтвердить"}
          </button>
        </form>
      </div>
    </AuthBodyContainer>
  );
}

export default AuthPage;
