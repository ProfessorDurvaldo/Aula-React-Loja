function Navbar({search, setSearch, openCart, cartCount}) {
  return (
    <>
      <nav className="navbar">
        <span className="navbar-logo">Loja de Animes</span>
        <input type="text" value={search} onChange={e => {setSearch(e.target.value)}} />
        <span onClick={() => {openCart(true)}} className="navbar-cart">Carinho ({cartCount})</span>
      </nav>
    </>
  )
}

export default Navbar;