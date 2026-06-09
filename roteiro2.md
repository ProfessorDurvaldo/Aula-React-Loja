# Roteiro — Aula 2: Componentes e Props (Loja Estática)

**Projeto:** Loja de produtos — base que vai crescer nas próximas aulas
**Objetivo da aula:** Criar a estrutura visual da loja usando componentes React com dados estáticos

> Esta aula não usa estado nem API. O foco é entender componentes, props e listas.
> O que for construído aqui será reutilizado e expandido nas aulas seguintes.

---

## Revisão rápida (5 min)

Antes de começar, retomar o que foi visto na aula 1:

- O que é React e por que usamos ele?
- Como funciona a relação `index.html` → `main.jsx` → `App.jsx`
- O que é JSX?

---

## FASE 1 — Limpeza do projeto

> Objetivo: partir de um projeto limpo, sem o conteúdo de exemplo do Vite.

### Passo 1 — Rodar o projeto e ver o que existe

- Abrir o terminal e rodar `npm run dev`
- Mostrar no navegador o que o Vite gera por padrão
- Mostrar os arquivos no VS Code e identificar o que é estrutura vs o que é exemplo

### Passo 2 — Apagar arquivos desnecessários

Deletar:

- `src/assets/react.svg`
- `src/assets/vite.svg`
- `src/assets/hero.png`
- `src/App.css`

### Passo 3 — Limpar o App.jsx

Substituir todo o conteúdo por:

```jsx
function App() {
  return (
    <div>
      <h1>Minha Loja</h1>
    </div>
  );
}

export default App;
```

### Passo 4 — Limpar o index.css

Apagar todo o conteúdo e adicionar apenas o reset básico:

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  background-color: #f5f5f5;
}
```

### Passo 5 — Conferir no navegador

A tela deve mostrar apenas "Minha Loja". Projeto limpo, pronto para começar.

---

## FASE 2 — Criando os componentes

> Objetivo: construir cada "pedaço" da loja como um componente separado.
> Começar sempre com dados fixos — só depois preocupar com dinamismo.

### Passo 6 — Criar a pasta de componentes

Criar a pasta `src/components/`

> **Conceito: por que separar em componentes?**
>
> Pense na tela como um quebra-cabeça. Em vez de desenhar tudo em uma folha só, você cria peças separadas e encaixa. Cada peça tem uma responsabilidade: o cabeçalho cuida do cabeçalho, o card cuida do card. Se precisar mudar o cabeçalho, você mexe só na peça do cabeçalho — sem risco de quebrar o resto.
>
> Outro benefício: reutilização. O `ProductCard` que vamos criar vai ser usado uma vez para cada produto. Escrevemos o código uma vez, o React repete quantas vezes precisar.

---

### Passo 7 — Criar o componente Navbar

Criar `src/components/Navbar.jsx`:

```jsx
function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-logo">🛍️ MinhaLoja</span>
      <span className="navbar-cart">🛒 Carrinho (0)</span>
    </nav>
  );
}

export default Navbar;
```

Importar e usar no `App.jsx`:

```jsx
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <h1>Minha Loja</h1>
    </div>
  );
}

export default App;
```

Adicionar estilo em `index.css`:

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  color: white;
  padding: 16px 32px;
}

.navbar-logo {
  font-size: 20px;
  font-weight: bold;
}

.navbar-cart {
  font-size: 16px;
  cursor: pointer;
}
```

> **Conceito: importação e exportação de componentes**
>
> O `export default` no final do arquivo "publica" o componente — sem ele, o arquivo existe mas ninguém consegue usá-lo. O `import` no `App.jsx` é o que "traz" esse componente para onde queremos usar. É como uma loja que fabrica um produto (export) e um cliente que vai lá comprar (import).
>
> Repare que ao usar o componente escrevemos `<Navbar />` — com letra maiúscula. Isso é obrigatório: minúscula (`<nav />`) é uma tag HTML nativa, maiúscula (`<Navbar />`) é um componente React. O React diferencia os dois por essa convenção.

---

### Passo 8 — Criar o componente ProductCard com dados fixos

Criar `src/components/ProductCard.jsx` com dados "colados" por enquanto:

```jsx
function ProductCard() {
  return (
    <div className="product-card">
      <img src="https://via.placeholder.com/200x200" alt="Tênis" />
      <div className="product-info">
        <h2>Tênis Esportivo</h2>
        <p className="product-price">R$ 199,90</p>
        <button className="btn-add">Adicionar ao carrinho</button>
      </div>
    </div>
  );
}

export default ProductCard;
```

Usar no `App.jsx` e adicionar estilo:

```css
.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 220px;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-price {
  color: #e63946;
  font-size: 18px;
  font-weight: bold;
}

.btn-add {
  background-color: #222;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-add:hover {
  background-color: #444;
}
```

> **Conceito: componente como molde**
>
> O `ProductCard` agora só sabe mostrar o tênis — os dados estão fixos no código. Se quiséssemos mostrar 8 produtos diferentes, precisaríamos criar 8 componentes diferentes, o que não faz nenhum sentido. O componente deveria ser um **molde**: saber _como_ exibir um produto, mas receber _qual_ produto mostrar de fora.
>
> É exatamente isso que vamos resolver no próximo passo com props. O componente fica genérico, e quem usa ele decide o que vai dentro.

---

### Passo 9 — Transformar ProductCard para receber props

Alterar `ProductCard.jsx` para receber os dados via props:

```jsx
function ProductCard({ name, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <div className="product-info">
        <h2>{name}</h2>
        <p className="product-price">R$ {price}</p>
        <button className="btn-add">Adicionar ao carrinho</button>
      </div>
    </div>
  );
}

export default ProductCard;
```

Atualizar o uso no `App.jsx`:

```jsx
<ProductCard
  name="Tênis Esportivo"
  price="199,90"
  image="https://via.placeholder.com/200x200"
/>
```

Verificar no navegador que o resultado é o mesmo — mas agora o componente é flexível.

> **Conceito: props são como argumentos de uma função**
>
> Em JavaScript, uma função pode receber parâmetros: `function somar(a, b)`. Props funcionam exatamente assim para componentes: `function ProductCard({ name, price, image })`. A diferença é que em vez de passar os valores dentro de parênteses, você passa como atributos no JSX — igual a um atributo HTML.
>
> As chaves `{}` dentro do JSX servem para "executar JavaScript". Então `{name}` não é o texto "name", é o valor da variável `name` que veio via props. Regra simples: fora das chaves é texto; dentro das chaves é JavaScript.

---

### Passo 10 — Criar o array de produtos no App.jsx

Antes de criar a lista, vamos preparar os dados. No `App.jsx`, criar o array de produtos:

```jsx
const products = [
  {
    id: 1,
    name: "Tênis Esportivo",
    price: "199,90",
    image: "https://via.placeholder.com/200x200?text=Tenis",
  },
  {
    id: 2,
    name: "Mochila Adventure",
    price: "149,90",
    image: "https://via.placeholder.com/200x200?text=Mochila",
  },
  {
    id: 3,
    name: "Óculos de Sol",
    price: "89,90",
    image: "https://via.placeholder.com/200x200?text=Oculos",
  },
  {
    id: 4,
    name: "Relógio Casual",
    price: "259,90",
    image: "https://via.placeholder.com/200x200?text=Relogio",
  },
  {
    id: 5,
    name: "Camiseta Premium",
    price: "59,90",
    image: "https://via.placeholder.com/200x200?text=Camiseta",
  },
  {
    id: 6,
    name: "Boné Streetwear",
    price: "49,90",
    image: "https://via.placeholder.com/200x200?text=Bone",
  },
];
```

> **Conceito: dados separados da estrutura**
>
> Manter os dados em um array de objetos é uma boa prática: a estrutura (o JSX) fica separada do conteúdo (os dados). Mais para frente, esses dados virão de uma API — e quando isso acontecer, só precisamos trocar de onde eles vêm, sem mexer nos componentes.

---

### Passo 11 — Renderizar a lista com .map()

No `App.jsx`, usar `.map()` para renderizar um `ProductCard` para cada produto:

```jsx
function App() {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <h2 className="section-title">Nossos Produtos</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
```

Adicionar estilos para o grid:

```css
.main-content {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 24px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 24px;
  color: #222;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
```

> **Conceito: listas em React com `.map()` e o `key`**
>
> O `.map()` transforma cada item de um array em outra coisa — no nosso caso, cada objeto de produto vira um componente `ProductCard`. Para cada produto no array, o React "fabrica" um card. É a forma natural de renderizar listas: você descreve como um item deve aparecer, e o React repete para todos.
>
> O `key` é obrigatório nas listas porque o React precisa identificar cada item individualmente. Sem ele, quando a lista mudar (na aula do carrinho), o React não sabe qual card é qual e pode renderizar as coisas na ordem errada. Sempre use um `key` único e estável — o `id` do produto é perfeito.

---

### Passo 12 — Criar o componente ProductList

Extrair a lógica da lista de `App.jsx` para um componente próprio.

Criar `src/components/ProductList.jsx`:

```jsx
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
}

export default ProductList;
```

Atualizar o `App.jsx`:

```jsx
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

const products = [
  /* ... array de produtos ... */
];

function App() {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <h2 className="section-title">Nossos Produtos</h2>
        <ProductList products={products} />
      </main>
    </div>
  );
}

export default App;
```

> **Conceito: componentização progressiva e o App como "orquestrador"**
>
> Perceba como o `App.jsx` ficou limpo: ele não sabe _como_ renderizar os produtos, só sabe _que_ tem produtos e passa para o `ProductList` resolver. Esse é o papel do `App` — orquestrar as peças, não implementar os detalhes.
>
> Uma boa pergunta para decidir quando criar um novo componente: "se eu ler esse código daqui a um mês, vou entender rapidamente o que ele faz?" Se a resposta for não porque tem muita coisa misturada, provavelmente está na hora de extrair um componente.

---

## Resultado final da aula

Ao final deste roteiro, a estrutura de arquivos deve estar assim:

```
src/
  components/
    Navbar.jsx
    ProductCard.jsx
    ProductList.jsx
  App.jsx
  index.css
  main.jsx
```

E a árvore de componentes:

```
App
├── Navbar
└── ProductList
    └── ProductCard (repetido para cada produto)
```

---

## O que vem na próxima aula

Na aula 3, vamos adicionar **interatividade** a esta mesma loja:

- Formulário de login com `useState` (campos controlados, validação simples)
- Renderização condicional: mostrar a loja só após o login
- O botão "Adicionar ao carrinho" vai começar a funcionar

Os componentes criados hoje (`Navbar`, `ProductCard`, `ProductList`) serão reutilizados sem alteração — apenas o `App.jsx` vai crescer.

---

## Resumo dos conceitos da aula

| Conceito                    | Onde apareceu                            |
| --------------------------- | ---------------------------------------- |
| Componente funcional        | Navbar, ProductCard, ProductList         |
| export / import             | Todos os componentes                     |
| props                       | ProductCard recebendo name, price, image |
| Lista com `.map()`          | ProductList renderizando os cards        |
| `key` em listas             | ProductCard dentro do map                |
| Componentização progressiva | Extração do ProductList do App           |
| Separação dados / estrutura | Array `products` no App.jsx              |
