import axios from "axios";
import React, { useEffect, useState } from "react";
import { addAllert } from "../store/allertSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUserData() {
      try {
        const resData = await axios.get("/api/profile").catch((err) => {
          if (err.response.status === 500) {
            navigate("/error");
          }
        });
        setUserData(resData.data);

        dispatch(
          addAllert({
            allertText: resData.data.message,
            allertStatus: resData.status,
          })
        );
      } catch (err) {
        err.response &&
          dispatch(
            addAllert({
              allertText: err.response.data.error,
              allertStatus: err.response.status,
            })
          );
      } finally {
        setLoading(false);
      }
      return resData.data;
    }
    getUserData();
  }, []);

  return { userData, loading };
};
