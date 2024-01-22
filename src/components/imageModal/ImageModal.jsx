import React from "react";
import styles from "./ImageModal.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { Icon28Dismiss } from "@vkontakte/icons";

function ImageModal({ openImageModal, setOpenImageModal, file }) {
  const modalVariants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0.5 },
    openContainer: { opacity: 1 },
    closedContainer: { opacity: 0 },
  };

  console.log(file);

  const handleDowload = (file) => {
    const link = document.createElement("a");
    link.href = `http://localhost:5007/uploads/`;
    link.download = `${file.fileName}`;
    // link.click();
  };

  return (
    <AnimatePresence>
      {openImageModal && (
        <motion.div
          initial="closedContainer"
          animate="openContainer"
          exit="closedContainer"
          onClick={() => setOpenImageModal(false)}
          className={styles.modalContainer}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.2 }}
            variants={modalVariants}
            className={styles.modal}
          >
            <div className={styles.imageContainer}>
              <img
                className={styles.modalImage}
                src={`http://localhost:5007/uploads/${file.fileName}`}
                loading="lazy"
                alt="..."
              />
            </div>

            <div className={styles.imagePanel}>
              <div className={styles.closeModal}>
                <motion.button
                  onClick={() => setOpenImageModal(false)}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 1.1 }}
                >
                  <Icon28Dismiss />
                </motion.button>
              </div>
              <h2>{file.originalName}</h2>

              <p>
                Размер:
                <span className={styles.emphasized}>
                  {(+file.size / (1024 * 1024)).toFixed(2)} Мб
                </span>
              </p>
              <p>
                Тип: <span className={styles.emphasized}>{file.type}</span>{" "}
              </p>
              <button onClick={handleDowload(file)}>Скачать</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ImageModal;
