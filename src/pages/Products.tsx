import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProductTs } from '../lib/interface';

const Bg = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100dvh;
`;

const Main = styled.div`
  min-width: 1200px;
  padding: 50px 0 50px 0;
`;

const List = styled.ul`
  display: flex;
  margin: 30px 0 30px 0;
`;

const ListItem = styled.li`
  background-color: #ddd;
  padding: 10px;
  border-radius: 20px;
  margin-right: 10px;
`;

const Context = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ProductLinkCard = styled(Link)`
  width: 280px;
`;

const Image = styled.img`
  width: 100%;
  height: 280px;
  border-radius: 8px;
`;

const TextContext = styled.div`
  color: #555;
  margin-bottom: 50px;
`;

const Title = styled.p`
  font-size: 25px;
  margin-top: 10px;
`;

const Price = styled.p`
  font-size: 20px;
  margin-top: 10px;
`;

const Rating = styled.p`
  margin-top: 10px;
`;

export default function Products() {
  const [products, setProducts] = useState<ProductTs[]>([]);
  const [sortedProducts, setSortedProducts] = useState<ProductTs[]>([]);
  const [sortBy, setSortBy] = useState<string>('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const productsSortedByPrice = [...products].sort(
      (a, b) => a.price - b.price,
    );
    const productsSortedByRating = [...products].sort(
      (a, b) => b.rating.rate - a.rating.rate,
    );

    const getSortedProducts = () => {
      if (sortBy === 'price') {
        return productsSortedByPrice;
      } else if (sortBy === 'rating') {
        return productsSortedByRating;
      } else {
        return products;
      }
    };

    setSortedProducts(getSortedProducts());
  }, [sortBy, products]);

  return (
    <Bg>
      <Main>
        <h1>고객님을 위한 추천 상품</h1>
        <List>
          <ListItem onClick={() => setSortBy('price')}>가격순</ListItem>
          <ListItem onClick={() => setSortBy('rating')}>평점순</ListItem>
        </List>
        <Context>
          {sortedProducts.map((product) => (
            <ProductLinkCard to={`/products/${product.id}`} key={product.id}>
              <Image src={product.image} alt={product.title} />
              <TextContext>
                <Title>{product.title}</Title>
                <Price>{product.price}</Price>
                <Rating>
                  ⭐️ {product.rating.rate} ({product.rating.count} reviews)
                </Rating>
              </TextContext>
            </ProductLinkCard>
          ))}
        </Context>
      </Main>
    </Bg>
  );
}
