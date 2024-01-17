import { useRef, useEffect, useState } from "react";

export const useScrollTrigger = ({ history }) => {
  const [visible, setVisible] = useState(false);
  const scrollTrigger = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else setVisible(false);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    if (scrollTrigger.current) observer.observe(scrollTrigger.current);

    const currentRef = scrollTrigger.current;

    return () => {
      if (currentRef) {
        observer.observe(currentRef);
      }
    };
  }, [history]);

  return { scrollTrigger, visible };
};
