import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { ProductList } from "./data/productList";
import Button from "./components/ui/Button";
import { FormInputList } from "./data/formInputList";
import Input from "./components/ui/Input";
import type { IProduct } from "./interfaces/IProduct";

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
  const [isOpen, setIsOpen] = useState(false);

  /* Modal Handlers */

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const onCloseHandler = () => {
    setProduct(defaultProduct);
    close();
  };
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(product);
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
      </div>
    );
  });

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
