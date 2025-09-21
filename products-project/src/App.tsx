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
import toast, { Toaster } from "react-hot-toast";

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
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [productToDeleteIdx, setProductToDeleteIdx] = useState<number>(0);

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
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  /* Modal Handlers */

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const openEditModal = () => setIsOpenEditModal(true);
  const closeEditModal = () => setIsOpenEditModal(false);
  const openDeleteModal = () => setIsOpenDeleteModal(true);
  const closeDeleteModal = () => setIsOpenDeleteModal(false);
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
    toast.success("Product added successfully!");
  };
  const onSubmitEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productWithColors = {
      ...productToEdit,
      colors: [...new Set(tempColors.concat(productToEdit.colors))], // ensures uniqueness
    };
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
    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = productWithColors;
    setProducts(updatedProducts);

    closeEditModal();
    toast.success("Product edited successfully!");
  };
  const onDeleteHandler = () => {
    const updatedProducts = products.filter(
      (prod, idx) => idx !== productToDeleteIdx
    );
    setProducts(updatedProducts);
    closeDeleteModal();
    toast.success("Product deleted successfully!");
  };

  /*  Render Products */
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
      setProductToDeleteIdx={setProductToDeleteIdx}
      openDeleteModal={openDeleteModal}
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
        // Remove color from both tempColors and productToEdit.colors in one click
        const isInTemp = tempColors.includes(color);
        const isInEdit = productToEdit.colors.includes(color);

        if (isInTemp || isInEdit) {
          setTempColors(tempColors.filter((c) => c !== color));
          setProductToEdit({
            ...productToEdit,
            colors: productToEdit.colors.filter((c) => c !== color),
          });
          return;
        }
        setTempColors([...tempColors, color]);
      }}
    />
  ));

  return (
    <main className="container mx-auto">
      <div className="flex justify-center items-center my-8">
        <Button
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg shadow-md hover:bg-indigo-700 transition w-auto"
          onClick={open}
          width="w-fit"
        >
          Add Product
        </Button>
      </div>
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
            {tempColors
              .filter((color, idx, arr) => arr.indexOf(color) === idx)
              .map((color) => (
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
          <div className="flex flex-col gap-1">
            <div className="flex items-center space-x-2">
              {renderProductColors}
            </div>
            <ErrorMessage message={errors.colors[0]} />
          </div>
          <div className="flex items-center flex-wrap space-x-1 gap-1">
            {tempColors
              .concat(productToEdit.colors)
              .filter((color, idx, arr) => arr.indexOf(color) === idx)
              .map((color) => (
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
      {/*Delete Product Modal */}
      <Modal
        isOpen={isOpenDeleteModal}
        close={closeDeleteModal}
        title="Delete Product"
      >
        <div className="mb-3">
          <p>Are you sure you want to delete this product?</p>
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Button className="bg-red-600 " onClick={onDeleteHandler}>
            Delete
          </Button>
          <Button className="bg-gray-600 " onClick={closeDeleteModal}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster reverseOrder={false} />
    </main>
  );
};

export default App;
