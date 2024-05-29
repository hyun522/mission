import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: number;
  image: string;
  rating: { rate: number; count: number };
}

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

//1. 수량버튼 클릭시 수량과 금액 변경
//useState) 초기수량, 초기총가격 /  함수) 수량과 상세페이지 객체데이터의 변경(?)이 있으면 총가격을 변경 시켜준다. , - + 클릭시 변경되는 함수
//2. 장바수니 구매 버튼과 ui 작업
//3. 장바구니 클릭시 지정한 수량과 가격 그대로 장바구니 페이지로 이동

export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>(); //상세페이지 데이터 받아옴
  const [quantity, setQuantity] = useState(1); // 초기 수량
  const [totalPrice, setTotalPrice] = useState(0); // 초기 총 가격

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setTotalPrice(data.price); // 초기 총 가격 설정
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [id]);

  //추가
  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity); // 수량 변경 시 총 가격 업데이트
      //product에서 가져와야 하는 이유는 수량이 몇개이느냐에 따라 변경되지 않는 초기값 즉 원본값에서 곱해야지 원하는 값을 얻을 수 있기 떄문
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
          <div>
            <div>
              <div>
                <button onClick={handleDecrease}>-</button>
                {quantity}
                <button onClick={handleIncrease}>+</button>
              </div>
              <div>{totalPrice.toFixed(2)}</div>
            </div>
            <div>
              <button>장바구니</button>
              <button>구매하기</button>
            </div>
          </div>
        </TextContext>
      </Main>
    </Bg>
  );
}
