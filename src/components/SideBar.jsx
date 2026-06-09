function SideBar(props) {
  const total = props.cartItems.reduce((soma, item) => {
    const preco = parseFloat(item.price.replace(',', '.'))
    return soma + preco
  }, 0)

  return (
    <div className="cart-overlay">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Seu Carrinho</h2>
          <button
            onClick={() => {
              props.closeCart(false);
            }}
            className="cart-close"
          >
            X
          </button>
        </div>

        {props.cartItems.length == 0 ? (
          <p className="cart-empty">Nenhum Item No Carrinho</p>
        ) : (
          props.cartItems.map((item, index) => (<p key={index}>{item.title} - R$ {item.price}</p>))
        )}

        <div>
          <strong>Total: R$ {total}</strong>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
