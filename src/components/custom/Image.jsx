import React from "react";
import placeholderImage from "../../assets/image/placeholder.png";

const Image = ({ alt, src, className }) => {
  const onImageError = (e) => {
    e.target.src = placeholderImage;
  };
  return (
    <img onError={onImageError} alt={alt} className={className} src={src} />
  );
};

export default Image;
