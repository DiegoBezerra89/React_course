import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import QuantityHandler from "../quantity-handler/quantity-handler.component";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem, classes }) => {
  const { name, imageUrl, price } = cartItem;
  const { deleteItemFromCart } = useContext(CartContext);

  const handleDeleteItem = () => deleteItemFromCart(cartItem);

  return (
    <div className={classes}>
      <img className={`${classes}--item`} src={imageUrl} alt={name} />
      <span className={`${classes}--item`}>{name}</span>
      <QuantityHandler classes={`${classes}--item`} product={cartItem} />
      <span className={`${classes}--item`}>$ {price.toFixed(2)}</span>
      <span
        className={`${classes}--item button`}
        type="button"
        onClick={handleDeleteItem}
      >
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;
