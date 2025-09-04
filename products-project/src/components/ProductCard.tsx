import Image from "../components/Image";
import Button from "../components/ui/Button";
import type { IProduct } from "../interfaces/IProduct";
import { txtSlicer } from "../utils/functions";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCardProps) => {
  const { title, description, imageUrl, colors, price } = product;
  return (
    <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
      <Image imageURL={imageUrl} alt="car image" className="rounded-md mb-2" />
      <h2>{title}</h2>
      <p>{txtSlicer(description)}</p>
      <div className="flex gap-2 mt-auto">
        <span className={`w-5 h-5 ${colors[0]} rounded-full`}></span>
        <span className={`w-5 h-5 ${colors[1]} rounded-full`}></span>
        <span className={`w-5 h-5 ${colors[2]} rounded-full`}></span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span>${price.toLocaleString()}</span>
        <Image
          imageURL={imageUrl}
          alt="car image"
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Button className="bg-indigo-600 ">Edit</Button>
        <Button className="bg-red-600 ">Destroy</Button>
      </div>
    </div>
  );
};

export default ProductCard;
