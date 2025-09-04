import ProductCard from "./components/ProductCard";
import { ProductList } from "./data/productList";

const App = () => {
  const renderProductList = ProductList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <main className="container mx-auto">
      <div className="bg-gray-100 p-4 m-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 border-2 border-b-black">
        {renderProductList}
      </div>
    </main>
  );
};

export default App;
