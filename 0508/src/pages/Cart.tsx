import { useCart } from '../contexts/CartContext';
import styled from 'styled-components';

const Bg = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100dvh;
`;

const Main = styled.div`
  min-width: 1200px;
  padding: 50px 0 50px 0;
`;
const Content = styled.div`
  display: flex;
  margin-top: 50px;
`;

const ContentLeft = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartLists = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;

const ImgBox = styled.div`
  width: 100px;
  height: 100px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const TextBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CountText = styled.p`
  margin-right: 10px;
`;

const CountBox = styled.div`
  display: flex;
`;

const ContentRight = styled.div`
  flex: 1;
`;

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <Bg>
      <Main>
        <h1>장바구니</h1>
        <Content>
          <ContentLeft>
            {cart.length === 0 ? (
              <p>장바구니가 비어 있습니다.</p>
            ) : (
              cart.map((item) => (
                <CartLists key={item.product.id}>
                  <ImgBox>
                    <Img src={item.product.image} alt={item.product.title} />
                  </ImgBox>
                  <TextBox>
                    <h2>{item.product.title}</h2>
                    <CountBox>
                      <CountText>수량: {item.quantity}</CountText>
                      <button onClick={() => decreaseQuantity(item.product.id)}>
                        -
                      </button>
                      <button onClick={() => increaseQuantity(item.product.id)}>
                        +
                      </button>
                    </CountBox>
                    <p>총 가격: ${item.totalPrice.toFixed(2)}</p>
                  </TextBox>
                </CartLists>
              ))
            )}
          </ContentLeft>
          <ContentRight>
            <div>총가격을 나타냅니다.</div>
          </ContentRight>
        </Content>
      </Main>
    </Bg>
  );
}
