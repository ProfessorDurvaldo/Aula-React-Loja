function ProductCard({ image, title, price, id, onAddCart }) {
  return (
    <>
      <div className="product-card">
        <img src={image} alt={title} />
        <div className="product-info">
          <h2>{title}</h2>
          <p className="product-price">R$ {price}</p>
          <button
            onClick={() => {
              onAddCart({ id, title, price, image });
            }}
            className="btn-add"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
