import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();



  useEffect(() => {
      let existingCartItem = localStorage.getItem("cart");
      const parsed = JSON.parse(existingCartItem);
      setCart(parsed)
  },[]);

  useEffect(() => {
    const data = JSON.stringify(cart)
    localStorage.setItem("cart", data)
  }, [cart])

  return (
    <CartContext.Provider value={{cart, setCart}}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

