import Image from "../components/Image";
import Button from "../components/ui/Button";
import type { IProduct } from "../interfaces/IProduct";
import { txtSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";

interface IProductCardProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
}: IProductCardProps) => {
  const { title, description, imageUrl, colors, price } = product;
  //HANDLERS
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
  };
  return (
    <div className="bg-white p-4 rounded-2xl shadow flex flex-col">
      <Image imageURL={imageUrl} alt="car image" className="rounded-md mb-2" />
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-600">{txtSlicer(description)}</p>
      <div className="flex gap-2 mt-auto py-2">
        <CircleColor color={colors[0]} />
        <CircleColor color={colors[1]} />
        <CircleColor color={colors[2]} />
      </div>
      <div className="flex justify-between items-center ">
        <span className="font-extrabold">${price.toLocaleString()}</span>
        <Image
          imageURL={imageUrl}
          alt="car image"
          className="w-10 h-10 rounded-full object-bottom mb-3"
        />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Button className="bg-indigo-600 " onClick={onEdit}>
          Edit
        </Button>
        <Button className="bg-red-600 ">Destroy</Button>
      </div>
    </div>
  );
};

export default ProductCard;
