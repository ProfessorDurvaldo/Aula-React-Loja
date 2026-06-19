import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import SideBar from './components/SideBar.jsx';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [inputTitle, setInputTitle] = useState('')
  const [inputPrice, setInputPrice] = useState('')
  const [inputImage, setInputImage] = useState('')
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'One Piece',
      price: '50000,00',
      image:
        'https://s2-techtudo.glbimg.com/i2HPK7IP4KyMP7fAzoTJNvlLjlk=/0x0:1200x700/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/Y/d/HMI5j9SWeMHuDqbJTcfQ/one-piece-foto.jpg',
    },
    {
      id: 2,
      title: 'Black Clover',
      price: '4,00',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMlVjTl92gtXARvXDMGYkcMpMyJV0p4Afnbw&s',
    },
    {
      id: 3,
      title: 'Bleach',
      price: '35,00',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR26jxE-ADLTsJCl_jp1mRopsf-tJ4xv6DXLA&s',
    },
    {
      id: 4,
      title: 'Frieren',
      price: '0,00',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwviVW9uLqTH5gAZ14350ewVRSO7xw-vvqhg&s',
    },
    {
      id: 5,
      title: 'Re: Zero',
      price: '70,00',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnrBK72V970mjfBolsWPE4phDIE1MB0siZ_w&s',
    },
    {
      id: 6,
      title: 'Food Wars',
      price: '43,00',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgk2_8wDqUjPK3KkrFDjoSw64X_3XhAMcBMQ&s',
    },
    {
      id: 7,
      title: 'Parasyte',
      price: '23,00',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROrNmZi_1oBxYsl0tcI_eQuEgWWFVZcnyojQ&s',
    },
  ])

  function handleAddToCart(prodcut) {
    setCartItems([...cartItems, prodcut]);
    console.log(cartItems)
  }

  const filtered = products.filter(product => {
    return product.title.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <>
      <Navbar cartCount={cartItems.length} openCart={setIsCartOpen} search={search} setSearch={setSearch} />
      <main className="main-content">
        <h2>Nossos Animes</h2>
        <ProductGrid onAddCart={handleAddToCart} products={filtered} />
        {isCartOpen && (<SideBar closeCart={setIsCartOpen} cartItems={cartItems} />)}
        <form>
          <h3>Adicionar Anime</h3>
          <label htmlFor="input-title">Titulo</label>
          <input type="text" id="input-title" value={inputTitle} onChange={e => {setInputTitle(e.target.value)}}  />
          <label htmlFor="input-price">Preço</label>
          <input type="text" id="input-price" value={inputPrice} onChange={e => {setInputPrice(e.target.value)}}  />
          <label htmlFor="input-image">Imagem</label>
          <input type="text" id="input-image" value={inputImage} onChange={e => {setInputImage(e.target.value)}}  />
        </form>
      </main>
    </>
  );
}

export default App;
