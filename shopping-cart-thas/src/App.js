import "./App.css";
import ProductList from "./product-list/ProductList";
import products from "./products";
import { useState } from "react";
import ShoppingCart from "./shopping-cart/ShoppingCart";
import { Container, Navbar } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const addToCart = (id, product, quantity, price) => {
    console.log(id, product, quantity, price);
    const newSelectedItems = [...selectedItems];
    for (let i = 0; i < newSelectedItems.length; i++) {
      if (newSelectedItems[i].id === id) {
        newSelectedItems[i] = { ...newSelectedItems[i] };
        newSelectedItems[i].id = id;
        newSelectedItems[i].product = product;
        newSelectedItems[i].price = price;
        newSelectedItems[i].quantity = quantity;

        console.log("Update", newSelectedItems);

        setSelectedItems(newSelectedItems);
        return;
      }
    }
    const newItem = {
      id: id,
      product: product,
      price: price,
      quantity: parseInt(quantity),
    };
    newSelectedItems.push(newItem);
    console.log("Insert", newSelectedItems);
    setSelectedItems(newSelectedItems);
  };

  const removeFromCart = (productId) => {
    console.log(productId);
    const newSelectedItems = selectedItems.filter((product) => {
      return product.id !== productId;
    });
    setSelectedItems(newSelectedItems);
  };
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Shopping Cart</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <ProductList products={products} addToCart={addToCart} />
          </Col>
          <Col>
            <ShoppingCart
              selectedItems={selectedItems}
              removeFromCart={removeFromCart}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
