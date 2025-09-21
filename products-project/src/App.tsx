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
  const [products, setProducts] = useState<IProduct[]>([...ProductList]);
  const [product, setProduct] = useState<IProduct>({
    ...defaultProduct,
  });
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
  const [errors, setErrors] = useState<{
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    colors: string[];
  }>({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    colors: [],
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  /* Modal Handlers */

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const openEditModal = () => setIsOpenEditModal(true);
  const closeEditModal = () => setIsOpenEditModal(false);
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
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
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
    const productWithColors = { ...product, colors: tempColors };
    const errors = productValidation(productWithColors);
    const hasErrorMsg = Object.values(errors).some((msg) => {
      if (Array.isArray(msg)) {
        return msg.length > 0 && msg[0] !== "";
      }
      return msg !== "";
    });
    if (hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      ...prev,
      { ...productWithColors, id: (products.length + 1).toString() },
    ]);
    onCloseHandler();
  };
  const onSubmitEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productWithColors = { ...product, colors: tempColors };
    const errors = productValidation(productWithColors);
    const hasErrorMsg = Object.values(errors).some((msg) => {
      if (Array.isArray(msg)) {
        return msg.length > 0 && msg[0] !== "";
      }
      return msg !== "";
    });
    if (hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      ...prev,
      { ...productWithColors, id: (products.length + 1).toString() },
    ]);
    onCloseHandler();
  };

  /*  Render Products */
  const renderProductList = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
    />
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
  const editFormInputList = FormInputList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col mb-4">
        <label htmlFor={input.name} className="mb-2 font-bold">
          {input.label}
        </label>
        <Input
          type={input.type}
          id={input.name}
          name={input.name}
          value={productToEdit[input.name]}
          onChange={onChangeEditHandler}
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
      </div>
      {/* Add Product Modal */}
      <Modal isOpen={isOpen} close={close} title="Product Details">
        <form className="mt-2 space-y-4" onSubmit={onSubmitHandler}>
          {formInputList}
          <div className="flex flex-col gap-1">
            <div className="flex items-center space-x-2">
              {renderProductColors}
            </div>
            <ErrorMessage message={errors.colors[0]} />
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
      {/* Edit Product Modal */}
      <Modal
        isOpen={isOpenEditModal}
        close={closeEditModal}
        title="Edit Product"
      >
        <form className="mt-2 space-y-4" onSubmit={onSubmitEditHandler}>
          {editFormInputList}
          {/* <div className="flex flex-col gap-1">
            <div className="flex items-center space-x-2">
              {renderProductColors}
            </div>
            <ErrorMessage message={errors.colors[0]} />
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
          </div> */}
          <div className="flex items-center justify-between space-x-2">
            <Button className="bg-indigo-600 ">Submit</Button>
            <Button className="bg-red-600 " onClick={onCloseHandler}>
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;
