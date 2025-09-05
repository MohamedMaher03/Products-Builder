import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { ProductList } from "./data/productList";
import Button from "./components/ui/Button";

const App = () => {
  /*  Modal State */
  const [isOpen, setIsOpen] = useState(false);

  /* Modal Handlers */
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  /*  Render Products */
  const renderProductList = ProductList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <main className="container mx-auto">
      <Button className="bg-indigo-600 " onClick={open}>
        Add Product
      </Button>
      <div className="bg-gray-100 p-4 m-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 border-2 border-b-black">
        {renderProductList}
        <Modal isOpen={isOpen} close={close} title="Product Details">
          <div className="flex items-center justify-between space-x-2">
            <Button className="bg-indigo-600 ">Submit</Button>
            <Button className="bg-red-600 " onClick={close}>
              Close
            </Button>
          </div>
        </Modal>
      </div>
    </main>
  );
};

export default App;
