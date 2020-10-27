import React, { useEffect, useState, useCallback } from "react";
import {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
} from "../config";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useDropzone } from "react-dropzone";
import insert from "../resources/insert.svg";

const ImagePicker = (props) => {
  const [uploadedFile, setUploadedFile] = useState("");

  useEffect(() => {
    uploadedFile !== "" && props.setState(uploadedFile);
  }, [uploadedFile]);

  const onDrop = useCallback((acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append("upload_preset", NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(url, {
        method: "post",
        body: formData,
      });
      const data = await res.json();
      setUploadedFile(data);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: false,
  });

  return (
    <div style={{ display: props.image !== "" && props.image && "none" }}>
      <div
        {...getRootProps()}
        className={`${isDragActive && "active"} dropzone flexColumn`}
        css={photoContStyle}
      >
        <input {...getInputProps()} />
        <img src={insert} css={noImgStyle} />
        <p
          className="gray"
          style={{ fontWeight: "300", letterSpacing: ".01rem" }}
        >
          Click to select
        </p>
        <p
          className="gray"
          style={{ fontWeight: "300", letterSpacing: ".01rem" }}
        >
          or drag and drop
        </p>
      </div>
      <p className="gray raleway" css={pStyle}>
        Maximum upload file size: 512 MB. Make sure you logo is a .PNG
      </p>
      <p className="gray raleway" css={pStyle}>
        A .PNG is a logo with a transparent background.
      </p>
    </div>
  );
};

const photoContStyle = {
    border: "1px dashed gray",
    height: "200px",
    width: "200px",
    margin: "1.7rem 0 0",
    borderRadius: "7px",
  },
  noImgStyle = {
    width: "100px",
    backgroundColor: "transparent",
    filter: "invert(70%)",
  },
  pStyle = {
    marginTop: "1rem",
  };

export default ImagePicker;
