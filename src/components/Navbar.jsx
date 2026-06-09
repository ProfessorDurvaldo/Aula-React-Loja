function Navbar(props) {
  return (
    <>
      <nav className="navbar">
        <span className="navbar-logo">Minha Loja</span>
        <span onClick={() => {props.openCart(true)}} className="navbar-cart">Carinho ({props.cartCount})</span>
      </nav>
    </>
  )
}

export default Navbar;