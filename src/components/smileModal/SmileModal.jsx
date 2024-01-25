import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./SmileModal.module.scss";
import { Icon28SmileOutline } from "@vkontakte/icons";

function SmileModal({ setMessageInputValue }) {
  const [openSmileContainer, setOpenSmileContainer] = useState(false);
  const smileModalRef = useRef();

  const smileArray = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "🥲",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🥸",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😶‍🌫️",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😐",
    "😑",
    "😬",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "🥱",
    "😲",
    "😴",
    "🤤",
    "😪",
    "😮‍💨",
    "😵",
    "😵‍💫",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "👿",
    "😈",
    "👹",
    "👺",
    "🤡",
    "💩",
    "👻",
    "💀",
    "☠️",
    "👽",
    "👾",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
    "🤲",
    "👐",
    "🙌",
    "👏",
    "🤝",
    "👍",
    "👎",
    "👊",
    "✊",
    "🤛",
    "🤜",
    "🤌",
    "🙏",
  ];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        smileModalRef.current &&
        !smileModalRef.current.contains(event.target)
      ) {
        setOpenSmileContainer(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.smileContainer} ref={smileModalRef}>
      <motion.button
        onClick={() => setOpenSmileContainer((prev) => !prev)}
        type="button"
        whileTap={{ scale: 0.9 }}
        className={styles.buttonSmile}
      >
        <Icon28SmileOutline width={28} height={28} />
      </motion.button>
      <motion.div
        initial={false}
        animate={openSmileContainer ? "open" : "closed"}
        variants={{
          open: { scale: 1, opacity: 1, visibility: "visible" },
          closed: { scale: 0.7, opacity: 0, visibility: "hidden" },
        }}
        transition={{ duration: 0.2 }}
        className={styles.smileModalContainer}
      >
        <div className={styles.smilesTable}>
          {smileArray.map((smile, index) => (
            <span
              key={index}
              onClick={() => setMessageInputValue((prev) => prev + smile)}
            >
              {smile}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default SmileModal;
