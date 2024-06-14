import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';
import { ProductTs } from '../lib/interface';

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: number;
//   image: string;
//   rating: { rate: number; count: number };
// }

const Bg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 800px;
  margin: 50px 0 50px 0;
`;

const ImageContext = styled.div`
  max-width: 300px;
  height: 500px;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
`;

const TextContext = styled.div`
  max-width: 400px;
`;

const Title = styled.p`
  font-size: 35px;
  line-height: 38px;
`;

const Description = styled.p`
  margin-top: 30px;
  font-size: 20px;
  color: #555;
  line-height: 25px;
`;

const Price = styled.p`
  margin-top: 50px;
`;

const Rating = styled.p`
  margin-top: 10px;
`;

const CountTotalPrice = styled.div`
  margin-top: 40px;
`;

const CountTotalPriceTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
`;

const CounterButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #888;
  color: #888;
  font-size: 20px;
  &:hover {
    color: #000;
  }
`;

const CounterText = styled.span`
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #888;
  border-top: 1px solid #888;
`;

const ShoppingBasketPurchase = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: end;
`;

const ShoppingBasket = styled.button`
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid #888;
  border-radius: 2px;
  &:hover {
    border: 1px solid #000;
  }
`;

const Purchase = styled(ShoppingBasket)`
  margin-left: 10px;
`;

export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductTs>();
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data: ProductTs = await res.json();
        setProduct(data);
        setTotalPrice(data.price);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity, product]);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    const userConfirmed = window.confirm('장바구니에 추가하시겠습니까?');
    if (userConfirmed && product !== undefined) {
      navigate('/cart');
      addToCart(product, quantity, totalPrice);
    } else {
      console.error('Product is undefined.');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Bg>
      <Main>
        <ImageContext>
          <Image src={product.image} alt={product.title}></Image>
        </ImageContext>
        <TextContext>
          <div>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>
            <Price>Price: ${product.price}</Price>
            <Rating>
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </Rating>
          </div>
          <CountTotalPrice>
            <CountTotalPriceTop>
              <Counter>
                <CounterButton onClick={handleDecrease}>-</CounterButton>
                <CounterText> {quantity}</CounterText>

                <CounterButton onClick={handleIncrease}>+</CounterButton>
              </Counter>
              <div>$ {totalPrice.toFixed(2)}</div>
            </CountTotalPriceTop>
            <ShoppingBasketPurchase>
              <ShoppingBasket onClick={handleAddToCart}>
                장바구니
              </ShoppingBasket>
              <Purchase>구매하기</Purchase>
            </ShoppingBasketPurchase>
          </CountTotalPrice>
        </TextContext>
      </Main>
    </Bg>
  );
}
