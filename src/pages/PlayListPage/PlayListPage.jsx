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
    image.src = "http://localhost:5007/uploads/1707374319094.894161516.png";
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.beginPath();
      context.rect(100, 170, 200, 200);
      context.clip();
      context.drawImage(image, 0, 0);
    };
    const croppedImageData = canvas.toDataURL("image/jpeg");
    setCanvasImageData(croppedImageData);
  }, []);



  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("file", canvasImageData);
      try {
        await axios.post("/api/circumcisedImage", {image: formData.get("file")});
        console.log(imageData);
      } catch (err) {
        alert(err);
        console.log(...formData);
      }
  };

  return (
    <BodyContainer>
      <button contentEditable="true"
      //  onClick={handleUploadImage}
       >Upload</button>
      <canvas ref={canvasRef} />
    </BodyContainer>
  );
}

export default PlayListPage;
