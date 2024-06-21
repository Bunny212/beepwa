import { useCart } from "react-use-cart";

const CartHelper = prod => {
  const {
    addItem,
    isEmpty,
    totalItems,
    totalUniqueItems,
    items,
    cartTotal,
    inCart,
    emptyCart,
    updateItemQuantity,
    removeItem,
  } = useCart();

  const product = prod.product;

  const addItemToCart = () => {
    addItem(product, { onItemAdd: handleItemAdd });
  }

  const removeItemFromCart = () => {
    removeItem(product.id);
  }

  const incrementCartItemQuantity = () => {
    updateItemQuantity(product.id, product.quantity + 1);
  }

  const decrementCartItemQuantity = () => {
    updateItemQuantity(product.id, product.quantity - 1);
  }

  const getCartItemsCount = () => {
    return totalItems;
  }

  const getCartItems = () => {
    return items;
  }

  const isItemInCart = () => {
    console.log("name = ", product.name);
    const alreadyAdded = inCart(product.id);
    console.log("alreadyAdded = ", alreadyAdded);
    return alreadyAdded ? itemQty() : 0;
  }

  const itemQty = () => {
    const quantity = inCart(product.id) ? product.quantity : 0;
    return parseInt(quantity, 10);
  }

  const handleItemAdd = (item) => {
    // Your logic after the item is added to the cart
    console.log('Item added:', item);
  };

  return {
    addItemToCart,
    removeItemFromCart,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    getCartItemsCount,
    getCartItems,
    isItemInCart,
    itemQty,
    //syncCartWithServer,
  };

  // return (
  //   <div>
  //     {!isEmpty && <button onClick={emptyCart}>Empty cart</button>}
  //     <h2>Shopping Cart</h2>
  //     <h1>Cart ({totalUniqueItems})</h1>
  //     {/* <p>Total Items: {getCartItemCount()}</p> */}
  //     <ul>
  //       {items.map((item) => (
  //         <li key={item.id}>
  //           {item.quantity} x {item.name}
  //           <button
  //             onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
  //           >
  //             -
  //           </button>
  //           <button
  //             onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
  //           >
  //             +
  //           </button>
  //           <button onClick={() => removeItem(item.id)}>Remove &times;</button>
  //         </li>
  //       ))}
  //     </ul>
  //     {/* Render cart items here */}
  //     <ul>
  //     {products.map((p) => {
  //         const alreadyAdded = inCart(p.id);
  //         return (
  //           <div key={p.id}>
  //             <button onClick={() => addItem(p)}>
  //               {alreadyAdded ? "Add again" : "Add to Cart"}
  //             </button>
  //           </div>
  //         );
  //       })}
  //     </ul>
  //   </div>
  // );
};

export default CartHelper;
