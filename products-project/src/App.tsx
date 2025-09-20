import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { ProductList } from "./data/productList";
import Button from "./components/ui/Button";
import { FormInputList } from "./data/formInputList";
import Input from "./components/ui/Input";
import type { IProduct } from "./interfaces/IProduct";
import { productValidation } from "./validation/productValidation";
import ErrorMessage from "./components/ErrorMessage";
import { colors } from "./data/colors";
import CircleColor from "./components/CircleColor";

const App = () => {
  const defaultProduct: IProduct = {
    id: "",
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    colors: [],
  };

  /*  Modal State */

  const [product, setProduct] = useState<IProduct>({
    ...defaultProduct,
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  console.log({ tempColors });
  /* Modal Handlers */

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onCloseHandler = () => {
    setProduct(defaultProduct);
    close();
  };
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = productValidation(product);

    const hasErrorMsg = Object.values(errors).some((msg) => msg !== "");
    if (hasErrorMsg) {
      setErrors(errors);
      return;
    }

    onCloseHandler();
  };

  /*  Render Products */
  const renderProductList = ProductList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const formInputList = FormInputList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col mb-4">
        <label htmlFor={input.name} className="mb-2 font-bold">
          {input.label}
        </label>
        <Input
          type={input.type}
          id={input.name}
          name={input.name}
          value={product[input.name]}
          onChange={onChangeHandler}
        />
        <ErrorMessage message={errors[input.name]} />
      </div>
    );
  });
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          const filteredColors = tempColors.filter((c) => c !== color);
          setTempColors(filteredColors);
          return;
        }
        setTempColors([...tempColors, color]);
      }}
    />
  ));

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-600 " onClick={open}>
        Add Product
      </Button>
      <div className="bg-gray-100 p-4 m-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {renderProductList}
        <Modal isOpen={isOpen} close={close} title="Product Details">
          <form className="mt-2 space-y-4" onSubmit={onSubmitHandler}>
            {formInputList}
            <div className="flex items-center space-x-2">
              {renderProductColors}
            </div>
            <div className="flex items-center flex-wrap space-x-1 gap-1">
              {tempColors.map((color) => (
                <span
                  className={`text-sm text-white ${color} rounded-full px-2 py-1`}
                  key={color}
                >
                  {color.replace("bg-", "").replace("-600", "")}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Button className="bg-indigo-600 ">Submit</Button>
              <Button className="bg-red-600 " onClick={onCloseHandler}>
                Close
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </main>
  );
};

export default App;
