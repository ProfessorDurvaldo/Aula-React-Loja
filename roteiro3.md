# Roteiro — Aula 3: Estado e Interatividade (Carrinho de Compras)

**Projeto:** Loja de produtos — continuação da Aula 2
**Objetivo da aula:** Tornar a loja interativa usando `useState`, passar funções como props e controlar o que aparece na tela com renderização condicional

> Esta aula parte do projeto da Aula 2 já montado. Vamos **adicionar comportamento** à loja — o botão "Adicionar ao carrinho" vai funcionar de verdade, a Navbar vai mostrar a quantidade de itens e um painel lateral vai listar o que foi adicionado.
>
> Nenhum componente criado antes será deletado. Só vamos modificar e acrescentar.

---

## Revisão rápida (5 min)

Antes de começar, retomar o que foi feito na aula 2:
- O que é um componente? O que são props?
- Como o `ProductCard` recebe `name`, `price` e `image`?
- O que o `.map()` faz na `ProductList`?

Mostrar o projeto rodando. A loja aparece com os 6 produtos estáticos. Clicar em "Adicionar ao carrinho" — **nada acontece**. Este é o problema que vamos resolver hoje.

---

## Por que o botão não faz nada?

O componente `ProductCard` não tem **memória**. Ele renderiza o HTML, mas não sabe guardar informação entre interações.

Em JavaScript puro, guardaríamos uma variável. Mas variáveis comuns não funcionam no React — quando o componente re-renderiza, a variável é recriada do zero e a tela não atualiza.

Para guardar informação que **persiste entre renderizações** e **atualiza a tela automaticamente**, usamos o `useState`.

---

## FASE 1 — Entendendo o useState

### Passo 12 — Importar e usar o useState pela primeira vez

Vamos começar com o exemplo mais simples possível antes de montar o carrinho completo.

**Arquivo: `src/App.jsx`**

Adicione a importação do `useState` no topo e crie uma variável de estado para contar os itens do carrinho:

```jsx
import { useState } from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'

const products = [
  { id: 1, name: 'Tênis Esportivo',  price: '199,90', image: 'https://via.placeholder.com/200x200?text=Tenis'    },
  { id: 2, name: 'Mochila Adventure', price: '149,90', image: 'https://via.placeholder.com/200x200?text=Mochila'  },
  { id: 3, name: 'Óculos de Sol',     price: '89,90',  image: 'https://via.placeholder.com/200x200?text=Oculos'   },
  { id: 4, name: 'Relógio Casual',    price: '259,90', image: 'https://via.placeholder.com/200x200?text=Relogio'  },
  { id: 5, name: 'Camiseta Premium',  price: '59,90',  image: 'https://via.placeholder.com/200x200?text=Camiseta' },
  { id: 6, name: 'Boné Streetwear',   price: '49,90',  image: 'https://via.placeholder.com/200x200?text=Bone'     },
]

function App() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <main className="main-content">
        <h2 className="section-title">Nossos Produtos</h2>
        <ProductList products={products} />
      </main>
    </div>
  )
}

export default App
```

**Por que colocamos o `useState` aqui no `App.jsx`?**

Porque o `cartCount` precisa ser acessado por dois componentes ao mesmo tempo: a `Navbar` (para exibir o número) e o `ProductCard` (para acionar o incremento quando o botão for clicado). O único lugar que consegue "falar" com os dois é o componente pai — o `App`. Regra geral: **o estado vai para o ancestral comum mais próximo de todos que precisam dele**.

> **Conceito: `useState`**
>
> `const [cartCount, setCartCount] = useState(0)` cria duas coisas:
> - `cartCount` → o valor atual do estado (começa em `0`)
> - `setCartCount` → a função que você chama para **mudar** esse valor
>
> Você nunca altera `cartCount` diretamente (`cartCount = 5` não funciona). Sempre passa o novo valor pelo `setCartCount(5)`. Quando o `setCartCount` é chamado, o React re-renderiza o componente automaticamente com o valor novo.

---

### Passo 13 — Atualizar a Navbar para receber e exibir cartCount

A `Navbar` precisa receber a quantidade de itens e mostrá-la.

**Arquivo: `src/components/Navbar.jsx`**

```jsx
function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <span className="navbar-logo">🛍️ MinhaLoja</span>
      <span className="navbar-cart">🛒 Carrinho ({cartCount})</span>
    </nav>
  )
}

export default Navbar
```

**Por que alteramos a `Navbar` e não o `App`?**

Porque a responsabilidade de *exibir* o contador é da `Navbar`. O `App` apenas passa a informação via prop. Cada componente cuida do seu pedaço — o `App` sabe *quantos* itens existem, a `Navbar` sabe *como* mostrar esse número.

Salve e veja no navegador: a Navbar mostra **Carrinho (0)**. O número não muda ainda porque nenhum botão chama o `setCartCount` — isso vem nos próximos passos.

---

## FASE 2 — Passando funções como props (elevação de estado)

### Passo 14 — Criar a função handleAddToCart no App.jsx

O botão "Adicionar ao carrinho" está dentro do `ProductCard`. Mas o estado (`cartCount`) está no `App`. Como o `ProductCard` consegue atualizar o estado de um componente pai?

A resposta é: **o pai cria a função e empresta para o filho via props**.

**Arquivo: `src/App.jsx`**

```jsx
import { useState } from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'

const products = [ /* ... igual ao passo anterior ... */ ]

function App() {
  const [cartCount, setCartCount] = useState(0)

  function handleAddToCart() {
    setCartCount(cartCount + 1)
  }

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <main className="main-content">
        <h2 className="section-title">Nossos Produtos</h2>
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </main>
    </div>
  )
}

export default App
```

**Por que a função fica no `App.jsx` e não no `ProductCard`?**

Porque só o componente dono do estado pode modificá-lo. `setCartCount` existe apenas dentro do `App`. Então a única forma do `ProductCard` incrementar o contador é chamar uma função que o `App` forneceu. O `ProductCard` não sabe nada sobre `setCartCount` — ele só sabe que recebeu uma função chamada `onAddToCart` e que deve chamá-la quando o botão for clicado.

> **Conceito: elevação de estado**
>
> Quando dois ou mais componentes precisam compartilhar um estado, a solução no React é **subir** esse estado para o ancestral comum. O estado fica no `App`, os filhos recebem o valor via props e recebem funções via props para poder modificá-lo. Os filhos nunca mexem diretamente no estado do pai — eles pedem educadamente por meio da função.

---

### Passo 15 — Passar onAddToCart pelo ProductList

A função foi passada do `App` para o `ProductList`. Agora o `ProductList` precisa repassá-la para cada `ProductCard`.

**Arquivo: `src/components/ProductList.jsx`**

```jsx
import ProductCard from './ProductCard'

function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductList
```

**Por que o `ProductList` só repassa e não usa a função?**

Porque a responsabilidade do `ProductList` é organizar o grid de cards. Ele não tem botão, não tem interação direta. Ele é um intermediário — recebe a função do pai e distribui para cada filho. Isso é normal no React e tem um nome: **prop drilling** (passar props por camadas). Não é errado, é o funcionamento natural quando a hierarquia não é muito profunda.

---

### Passo 16 — Conectar o botão no ProductCard

Agora o `ProductCard` recebe `onAddToCart` e conecta ao botão.

**Arquivo: `src/components/ProductCard.jsx`**

```jsx
function ProductCard({ name, price, image, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <div className="product-info">
        <h2>{name}</h2>
        <p className="product-price">R$ {price}</p>
        <button className="btn-add" onClick={onAddToCart}>
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}

export default ProductCard
```

**Por que `onClick={onAddToCart}` e não `onClick={onAddToCart()}`?**

Com parênteses `onAddToCart()` a função seria executada na hora que o componente renderiza — não quando o botão for clicado. Sem parênteses, passamos a **referência** da função para o `onClick`, que a chama apenas quando o clique acontecer.

Salve tudo e teste no navegador: clicar em "Adicionar ao carrinho" deve incrementar o número na Navbar. ✅

---

## FASE 3 — Carrinho real com lista de itens

O contador funciona, mas um carrinho de verdade precisa saber **quais** produtos foram adicionados, não só **quantos**. Vamos mudar o estado de um número para um array.

### Passo 17 — Mudar o estado para um array de itens

**Arquivo: `src/App.jsx`**

```jsx
import { useState } from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'

const products = [ /* ... igual ao passo anterior ... */ ]

function App() {
  const [cartItems, setCartItems] = useState([])

  function handleAddToCart(product) {
    setCartItems([...cartItems, product])
  }

  return (
    <div>
      <Navbar cartCount={cartItems.length} />
      <main className="main-content">
        <h2 className="section-title">Nossos Produtos</h2>
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </main>
    </div>
  )
}

export default App
```

**O que mudou?**

- `useState(0)` virou `useState([])` — começa com um array vazio
- `setCartCount(cartCount + 1)` virou `setCartItems([...cartItems, product])` — adiciona o produto ao array
- `cartCount` virou `cartItems.length` — a quantidade é calculada a partir do array

**Por que `[...cartItems, product]` e não `cartItems.push(product)`?**

O React só detecta mudança de estado quando recebe um **novo objeto**. O `.push()` modifica o array existente no lugar — o React olha para o array, vê que é o mesmo objeto de antes e não re-renderiza. Já `[...cartItems, product]` cria um array **novo** com todos os itens anteriores mais o novo. Isso se chama **imutabilidade**: nunca modifique o estado diretamente, sempre crie uma cópia com a alteração.

> **Conceito: imutabilidade no React**
>
> State nunca deve ser mutado diretamente. Para arrays, use spread `[...array, novoItem]` para adicionar, `.filter()` para remover e `.map()` para alterar um item. Para objetos, use spread também: `{ ...objeto, propriedade: novoValor }`. Isso garante que o React detecte a mudança e atualize a tela.

---

### Passo 18 — Passar o produto inteiro no clique do ProductCard

A função `handleAddToCart` agora espera receber o produto como argumento. Precisamos atualizar o `ProductCard` para passar o produto ao chamar a função.

**Arquivo: `src/components/ProductCard.jsx`**

```jsx
function ProductCard({ name, price, image, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <div className="product-info">
        <h2>{name}</h2>
        <p className="product-price">R$ {price}</p>
        <button
          className="btn-add"
          onClick={() => onAddToCart({ name, price, image })}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}

export default ProductCard
```

**Por que usamos `() => onAddToCart(...)` agora e não `onAddToCart` diretamente?**

Precisamos passar um argumento para a função (`{ name, price, image }`). Para isso, precisamos de uma arrow function que, quando chamada pelo clique, executa `onAddToCart` com os argumentos certos. Se escrevêssemos só `onAddToCart`, o React chamaria a função sem argumentos.

---

## FASE 4 — Painel lateral do carrinho

### Passo 19 — Criar o componente CartSidebar

O painel lateral vai listar todos os itens adicionados, calcular o total e ter um botão para fechar.

Criar `src/components/CartSidebar.jsx`:

```jsx
function CartSidebar({ cartItems, onRemove, onClose }) {
  const total = cartItems.reduce((soma, item) => {
    const preco = parseFloat(item.price.replace(',', '.'))
    return soma + preco
  }, 0)

  return (
    <div className="cart-overlay">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Seu Carrinho</h2>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="cart-empty">Nenhum item no carrinho.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">R$ {item.price}</span>
                  <button
                    className="cart-item-remove"
                    onClick={() => onRemove(index)}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <strong>Total: R$ {total.toFixed(2).replace('.', ',')}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartSidebar
```

**Por que o `CartSidebar` não tem estado próprio?**

Porque ele não precisa. Todos os dados que ele exibe (`cartItems`) e todas as ações que ele executa (`onRemove`, `onClose`) vêm de fora via props. O `CartSidebar` é um componente **controlado** — ele exibe o que o pai manda e notifica o pai quando algo acontece, mas não gerencia nada sozinho. Isso facilita muito o teste e a manutenção.

**Por que usamos `index` como `key` aqui?**

Em uma lista onde os itens nunca mudam de posição, usar o índice como `key` é aceitável. A lista do carrinho cresce pelo final e só remove um item por vez, então o índice é estável o suficiente para essa situação.

---

### Passo 20 — Adicionar estado de abrir/fechar e função de remover no App.jsx

**Arquivo: `src/App.jsx`**

```jsx
import { useState } from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import CartSidebar from './components/CartSidebar'

const products = [
  { id: 1, name: 'Tênis Esportivo',  price: '199,90', image: 'https://via.placeholder.com/200x200?text=Tenis'    },
  { id: 2, name: 'Mochila Adventure', price: '149,90', image: 'https://via.placeholder.com/200x200?text=Mochila'  },
  { id: 3, name: 'Óculos de Sol',     price: '89,90',  image: 'https://via.placeholder.com/200x200?text=Oculos'   },
  { id: 4, name: 'Relógio Casual',    price: '259,90', image: 'https://via.placeholder.com/200x200?text=Relogio'  },
  { id: 5, name: 'Camiseta Premium',  price: '59,90',  image: 'https://via.placeholder.com/200x200?text=Camiseta' },
  { id: 6, name: 'Boné Streetwear',   price: '49,90',  image: 'https://via.placeholder.com/200x200?text=Bone'     },
]

function App() {
  const [cartItems, setCartItems]   = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  function handleAddToCart(product) {
    setCartItems([...cartItems, product])
  }

  function handleRemoveFromCart(index) {
    setCartItems(cartItems.filter((_, i) => i !== index))
  }

  function handleOpenCart() {
    setIsCartOpen(true)
  }

  function handleCloseCart() {
    setIsCartOpen(false)
  }

  return (
    <div>
      <Navbar
        cartCount={cartItems.length}
        onCartClick={handleOpenCart}
      />

      <main className="main-content">
        <h2 className="section-title">Nossos Produtos</h2>
        <ProductList
          products={products}
          onAddToCart={handleAddToCart}
        />
      </main>

      {isCartOpen && (
        <CartSidebar
          cartItems={cartItems}
          onRemove={handleRemoveFromCart}
          onClose={handleCloseCart}
        />
      )}
    </div>
  )
}

export default App
```

**Por que todos os estados e funções estão no `App.jsx`?**

Porque o `App` é o único componente que enxerga todos os outros ao mesmo tempo. O `isCartOpen` controla se o `CartSidebar` aparece — isso é responsabilidade de quem renderiza o `CartSidebar`, ou seja, o `App`. O `cartItems` é compartilhado entre a `Navbar` (count), o `CartSidebar` (lista) e o `ProductCard` (adição) — novamente, o ancestral comum é o `App`.

> **Conceito: renderização condicional**
>
> `{isCartOpen && <CartSidebar ... />}` funciona assim: se `isCartOpen` for `false`, o React para na primeira parte e não renderiza nada. Se for `true`, avalia a segunda parte e renderiza o componente. É o mesmo que um `if` no JavaScript — só que dentro do JSX, dentro das chaves `{}`.

---

### Passo 21 — Atualizar a Navbar para receber onCartClick

**Arquivo: `src/components/Navbar.jsx`**

```jsx
function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="navbar">
      <span className="navbar-logo">🛍️ MinhaLoja</span>
      <span className="navbar-cart" onClick={onCartClick}>
        🛒 Carrinho ({cartCount})
      </span>
    </nav>
  )
}

export default Navbar
```

Clicar no "Carrinho (N)" na Navbar agora abre o painel lateral.

---

### Passo 22 — Adicionar os estilos do CartSidebar

**Arquivo: `src/index.css`** — adicionar ao final:

```css
.cart-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
}

.cart-sidebar {
  background: white;
  width: 360px;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #444;
}

.cart-empty {
  color: #888;
  text-align: center;
  margin-top: 32px;
}

.cart-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.cart-item-name {
  flex: 1;
  font-size: 14px;
}

.cart-item-price {
  font-weight: bold;
  color: #e63946;
  font-size: 14px;
}

.cart-item-remove {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.cart-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 2px solid #222;
  font-size: 18px;
  text-align: right;
}
```

---

## Resultado final da aula

### Estrutura de arquivos

```
src/
  components/
    CartSidebar.jsx   ← novo
    Navbar.jsx        ← atualizado (recebe cartCount e onCartClick)
    ProductCard.jsx   ← atualizado (recebe onAddToCart)
    ProductList.jsx   ← atualizado (recebe e repassa onAddToCart)
  App.jsx             ← atualizado (todos os estados e funções aqui)
  index.css           ← atualizado (estilos do CartSidebar)
  main.jsx            ← não alterado
```

### Árvore de componentes e fluxo de dados

```
App  (estado: cartItems[], isCartOpen)
│
│  cartCount={cartItems.length}
│  onCartClick={handleOpenCart}
├── Navbar
│
│  products={products}
│  onAddToCart={handleAddToCart}
├── ProductList
│     │
│     │  name, price, image, onAddToCart
│     └── ProductCard  (repete para cada produto)
│           └── [clique] chama onAddToCart(product)
│                            ↑ sobe até o App
│
│  (só renderiza se isCartOpen === true)
│  cartItems={cartItems}
│  onRemove={handleRemoveFromCart}
│  onClose={handleCloseCart}
└── CartSidebar
```

---

## Resumo dos conceitos da aula

| Conceito | Onde apareceu |
|---|---|
| `useState` | `App.jsx` — `cartItems` e `isCartOpen` |
| Imutabilidade (spread e filter) | `handleAddToCart` e `handleRemoveFromCart` |
| Funções como props | `onAddToCart`, `onRemove`, `onClose`, `onCartClick` |
| Elevação de estado | Estado no `App`, consumido por `Navbar`, `ProductCard` e `CartSidebar` |
| Prop drilling | `onAddToCart` passando por `ProductList` até `ProductCard` |
| Renderização condicional (`&&`) | `{isCartOpen && <CartSidebar />}` |
| Componente controlado | `CartSidebar` — não tem estado próprio |
| `.reduce()` | Cálculo do total no `CartSidebar` |
| `.filter()` | Remoção de item em `handleRemoveFromCart` |

---

## O que vem na próxima aula

Com o carrinho funcionando, as próximas evoluções naturais são:

- **`useEffect`** — buscar os produtos de uma API externa em vez de ter o array fixo no código
- **Evitar duplicatas** — verificar se o produto já está no carrinho e incrementar a quantidade em vez de adicionar de novo
- **Contexto (`useContext`)** — eliminar o prop drilling passando o carrinho diretamente para quem precisa, sem intermediários
