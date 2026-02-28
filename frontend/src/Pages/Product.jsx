import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'

const Product = () => {
  const {products, loading} = useContext(ShopContext);
  const {productId} = useParams();
  // Find product by MongoDB _id (string) instead of numeric id
  const [localProduct, setLocalProduct] = React.useState(null);

  // try to find in context first
  React.useEffect(() => {
    if (products && products.length > 0) {
      const found = products.find((e) => (e._id || e.id) === productId);
      if (found) setLocalProduct(found);
    }
  }, [products, productId]);

  // if not in context, fetch by id directly
  React.useEffect(() => {
    const fetchOne = async () => {
      if (!localProduct) {
        try {
          const res = await fetch(`http://localhost:5000/api/products/${productId}`);
          if (res.ok) {
            const data = await res.json();
            setLocalProduct(data);
          }
        } catch (err) {
          console.error('Error fetching single product:', err);
        }
      }
    };
    fetchOne();
  }, [localProduct, productId]);

  if (loading && !localProduct) return <div>Loading product...</div>;
  if (!localProduct) return <div>Product not found. Please check the product ID.</div>;
  
  return (
    <div>
      <Breadcrum product={localProduct}/>
      <ProductDisplay product={localProduct}/>
      <DescriptionBox product={localProduct}/>
    </div>
  )
}

export default Product