import ProductCard from './ProductCard';

function ProductGrid({products, onAddCart}) {

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          onAddCart={onAddCart}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
