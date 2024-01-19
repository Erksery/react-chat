import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Transition } from "react-transition-group";
import "./Allert.scss";
import { addAllert } from "../../store/allertSlice";

export default function Allert() {
  const dispatch = useDispatch();
  const allert = useSelector((state) => state.allertStore);
  const [allertModal, setAllertModal] = useState(false);
  const allertRef = useRef(null);

  useEffect(() => {
    if (allert) {
      allert.allertText.length > 0 && setAllertModal(true);
      const delay = setTimeout(() => {
        setAllertModal(false);
        setTimeout(() => {
          dispatch(addAllert({ allertText: "", alertStatus: 0 }));
        }, 100);
      }, 3000);

      return () => clearTimeout(delay);
    }
  }, [allert]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (allertRef.current && !allertRef.current.contains(event.target)) {
        setAllertModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Transition in={allertModal} timeout={500}>
      {(allertModal) => (
        <div
          ref={allertRef}
          className={`allert ${allertModal}`}
          style={{
            borderColor:
              allert.allertStatus === 200
                ? "rgb(114, 255, 114)"
                : "rgb(255, 109, 109)",
          }}
        >
          {allert.allertText ? allert.allertText : "Неизвестная ошибка"}
        </div>
      )}
    </Transition>
  );
}
