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


export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [id]);

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
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>Price: ${product.price}</Price>
          <Rating>
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </Rating>
        </TextContext>
      </Main>
    </Bg>
  );
}
