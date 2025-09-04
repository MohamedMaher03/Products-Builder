interface IImageProps {
  imageURL: string;
  alt: string;
  className?: string;
}

const Image = ({ imageURL, alt, className }: IImageProps) => {
  return <img src={imageURL} alt={alt} className={className} />;
};

export default Image;
