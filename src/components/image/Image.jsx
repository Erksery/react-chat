import React, { useState } from "react";
import styles from "./Image.module.scss";
import ImageModal from "../imageModal/ImageModal";

function Image({ file, imageRef }) {
  const [openImageModal, setOpenImageModal] = useState(false);
  return (
    <>
      <img
        onClick={() => setOpenImageModal(true)}
        ref={imageRef}
        className={styles.image}
        src={`http://localhost:5007/uploads/${file.fileName}`}
        loading="lazy"
        alt="..."
      />
      <ImageModal
        openImageModal={openImageModal}
        setOpenImageModal={setOpenImageModal}
        file={file}
      />
    </>
  );
}

export default Image;
