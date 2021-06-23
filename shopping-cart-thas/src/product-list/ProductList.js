import Product from "./Product";

function ProductList(props) {
  return (
    <div className="ProductTitle">
      <h2>Products</h2>
      {props.products.map((product) => {
        return <Product product={product} addToCart={props.addToCart} />;
      })}
    </div>
  );
}

export default ProductList;
