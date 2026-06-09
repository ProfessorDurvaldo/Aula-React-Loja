function Navbar(props) {
  return (
    <>
      <nav className="navbar">
        <span className="navbar-logo">Loja de Animes</span>
        <span onClick={() => {props.openCart(true)}} className="navbar-cart">Carinho ({props.cartCount})</span>
      </nav>
    </>
  )
}

export default Navbar;