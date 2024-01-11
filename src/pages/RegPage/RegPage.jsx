import React, { useState } from "react";
import BodyContainer from "../../components/bodyContainer/BodyContainer";
import styles from "./RegPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addAllert } from "../../store/allertSlice";
import AuthBodyContainer from "../../components/authBodyContainer/AuthBodyContainer";

export default function RegPage() {
  const [inputValue, setInputValue] = useState({ login: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitReg = async (event) => {
    event.preventDefault();
    try {
      const resData = await axios.post("/api/register", inputValue);

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
        <form onSubmit={submitReg} className={styles.authContainer}>
          <div className={styles.textContainer}>
            <h2>
              <span>Регистрация</span> аккаунта
            </h2>
            <p>🔔 Пожалуйста, ознакомтесь с условиями конфиденциальности </p>
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
            <p>Уже есть аккаунт?</p>
            <Link to={"/auth"}>Авторизоваться</Link>
          </span>

          <button onClick={() => setLoading((prev) => !prev)}>
            {loading ? (
              <div classname={styles.loader}>Загрузка</div>
            ) : (
              "Подтвердить"
            )}
          </button>
        </form>
      </div>
    </AuthBodyContainer>
  );
}
