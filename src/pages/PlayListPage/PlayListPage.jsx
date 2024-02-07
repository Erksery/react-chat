import React, { useEffect, useRef, useState } from "react";
import { useWsConnection } from "../../hooks/useWsConnection";
import BodyContainer from "../../components/bodyContainer/BodyContainer";
import axios from "axios";

function PlayListPage(props) {
  const [canvasImageData, setCanvasImageData] = useState("");
  const canvasRef = useRef();
  const { ws } = useWsConnection();

  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = "http://localhost:5007/uploads/1707299461255.394576319.jpg";
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.beginPath();
      context.rect(100, 50, 200, 200);
      context.clip();
      context.drawImage(image, 0, 0);
    };
    const croppedImageData = canvas.toDataURL("image/jpeg");
    setCanvasImageData(croppedImageData);
  }, []);

  const sendFile = async () => {
    try {
    } catch (err) {
      console.log("Error", err);
    }
  };

  //непонятно
  const handleUploadImage = async () => {
    let formData = new FormData();
    formData.append("file", canvasImageData);
    try {
      await axios.post("/api/fileUpload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(...formData);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <BodyContainer>
      <button onClick={handleUploadImage}>Upload</button>
      <canvas ref={canvasRef} />
    </BodyContainer>
  );
}

export default PlayListPage;
