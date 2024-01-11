import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Transition } from "react-transition-group";
import "./Allert.scss";
import { addAllert } from "../../store/allertSlice";

export default function Allert() {
  const dispatch = useDispatch();
  const allert = useSelector((state) => state.allertStore);
  const [allertModal, setAllertModal] = useState(false);

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

  return (
    <Transition in={allertModal} timeout={500}>
      {(allertModal) => (
        <div
          className={`allert ${allertModal}`}
          style={{
            borderColor: allert.allertStatus === 200 ? "#009933" : "#CC0033",
          }}
        >
          {allert.allertText ? allert.allertText : "Неизвестная ошибка"}
        </div>
      )}
    </Transition>
  );
}
