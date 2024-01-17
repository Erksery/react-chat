import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMessagesLimit } from "../store/limitMessagesSlice";

export const useGetMoreMessages = ({ history }) => {
  const [visibleMoreMessagesTrigger, setVisibleMoreMessagesTrigger] =
    useState(false);
  const moreMessagesTrigger = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleMoreMessagesTrigger(true);
          dispatch(setMessagesLimit());
          setLimitRange((prev) => prev + 10);
        } else setVisibleMoreMessagesTrigger(false);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    if (moreMessagesTrigger.current)
      observer.observe(moreMessagesTrigger.current);

    const currentRef = moreMessagesTrigger.current;

    return () => {
      if (currentRef) {
        observer.observe(currentRef);
      }
    };
  }, [history]);

  return { moreMessagesTrigger, visibleMoreMessagesTrigger };
};
