import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div>
      <h1>장바구니</h1>
      {cart.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            <img src={item.product.image} alt={item.product.title} />
            <h2>{item.product.title}</h2>
            <p>수량: {item.quantity}</p>
            <button onClick={() => decreaseQuantity(item.product.id)}>-</button>
            <button onClick={() => increaseQuantity(item.product.id)}>+</button>
            <p>총 가격: ${item.totalPrice.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
}
