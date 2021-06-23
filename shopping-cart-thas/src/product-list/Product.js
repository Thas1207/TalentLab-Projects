import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";


function Product(props) {
  const [quantity, setQuantity] = useState(1);
  const product = props.product.productName;
  const price = props.product.price;
  const id = props.product.id;
 
  return (
    <div className="Product">
      <Card>
        <CardBody>
          <CardTitle>{product}</CardTitle>
          <CardText>${price}</CardText>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Quantity"
              aria-label="Quantity"
              aria-describedby="basic-addon2"
              onChange={(event) => {
                console.log(event.target, event.target.value);
                setQuantity(event.target.value);
              }}
            ></FormControl>

            <InputGroup.Append>
              <Button
                color="success"
                onClick={(event) => {
                  setQuantity(parseInt(quantity) + 1);
                  event.preventDefault();

                  props.addToCart(id, product, quantity, price);
                }}
              >
                Add to Cart
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </CardBody>
      </Card>
    </div>
  );
}

export default Product;
