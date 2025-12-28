import { Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setMinPrice, setMaxPrice, setRating, clearFilters } from '../slices/filterSlice';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { category, minPrice, maxPrice, rating } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const filteredProducts = data?.products?.filter((product) => {
    const min = Math.max(category ? 0 : minPrice, 0);
    const max = Math.max(maxPrice, min);
    if (category && product.category !== category) return false;
    if (product.price < min || product.price > max) return false;
    if (rating && product.rating < parseFloat(rating)) return false;
    return true;
  }) || [];

  const categories = [...new Set(data?.products?.map((p) => p.category) || [])];

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row className='mb-3'>
            <Col md={2}>
              <Form.Select
                value={category}
                onChange={(e) => dispatch(setCategory(e.target.value))}
                className='mb-2'
              >
                <option value=''>All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Control
                type='number'
                placeholder='Min Price'
                value={minPrice}
                onChange={(e) => dispatch(setMinPrice(e.target.value))}
                className='mb-2'
                min='0'
              />
            </Col>
            <Col md={2}>
              <Form.Control
                type='number'
                placeholder='Max Price'
                value={maxPrice}
                onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                className='mb-2'
                min='0'
              />
            </Col>
            <Col md={2}>
              <Form.Select
                value={rating}
                onChange={(e) => dispatch(setRating(e.target.value))}
                className='mb-2'
              >
                <option value=''>All Ratings</option>
                <option value='1'>1+ Stars</option>
                <option value='2'>2+ Stars</option>
                <option value='3'>3+ Stars</option>
                <option value='4'>4+ Stars</option>
                <option value='5'>5 Stars</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button variant='secondary' onClick={() => dispatch(clearFilters())} className='mb-2'>
                Clear Filters
              </Button>
            </Col>
          </Row>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
