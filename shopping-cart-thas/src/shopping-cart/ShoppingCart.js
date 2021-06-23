import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function ShoppingCart(props) {
  const totalAmount = () => {
    let total = 0;
    for (let selectedItem of props.selectedItems) {
      total += subTotalAmount(selectedItem);
    }
    return total;
  };
  const subTotalAmount = (selectedItem) => {
    const subtotal = selectedItem.quantity * selectedItem.price;
    return subtotal;
  };

  return (
    <div>
      <h2>Cart</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.selectedItems.map((items) => {
            return (
              <tr key={items.id}>
                <td>{items.product}</td>
                <td>{items.price}</td>
                <td>{items.quantity}</td>
                <td>{subTotalAmount(items)}</td>
                <td>
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      props.removeFromCart(items.id);
                    }}
                    variant="danger"
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan="3">Total</td>
            <td colSpan="2">${totalAmount()}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ShoppingCart;
