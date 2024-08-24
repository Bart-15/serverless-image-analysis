type ImageContainerProps = {
  imgSrc: string;
};

const ImageContainer = ({ imgSrc }: ImageContainerProps) => {
  return (
    <img
      className="w-full object-cover h-80 rounded shadow-lg"
      src={imgSrc}
      alt="photo"
    />
  );
};

export default ImageContainer;
