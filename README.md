# API de produtos

## Banco de dados
Para rodar o projeto localmente, é necessário ter o mongodb instalado com uma base de dados chamada `ecommerce`. Para personalizar o caminho do banco acessar `src/database/database.providers.ts` no projeto:

```javascript
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      // Example: 'mongodb://localhost/ecommerce'
      await mongoose.connect('URL_DA_SUA_BASE_DE_DADOS_AQUI'),
  },
];
```


## Setup inicial

```bash
$ npm install
```


## Iniciando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```


## Documentação das rotas da API

### Buscar produtos da API <a href="https://bitbucket.org/irrobaecommerce/workspace/snippets/yEABz5" target="_blank">externa</a> e salvar localmente.

<strong>Tipo:</strong> POST <br>
<strong>Path:</strong> <code>/products/getProductsFromExternalAPi</code> <br>
<strong>Exemplo de retorno: </strong>
```json
[
  {
    "_id": "63e90583312255a7ddf77475",
    "product_id": 4569,
    "name": "Berço Americano Matic Bkids Off White Freijó Eco Wood",
    "price": "1759.00",
    "sku": "1759.00",
    "product_to_category": [
      {
        "_id": "63e90583312255a7ddf77477",
        "category_id": 124,
        "name": "ACESSORIOS ",
        "__v": 0
      },
      {
        "_id": "63e90583312255a7ddf77478",
        "category_id": 125,
        "name": "COLEÇÃO SWEET",
        "__v": 0
      }
    ],
    "__v": 1
  }
]
```

### Criar produto

<strong>Tipo:</strong> POST <br>
<strong>Path:</strong> <code>/products</code> <br>
<strong>Body:</strong>
```json
{
  "product_id": "6265",
  "name": "produto de teste",
  "price": "89,87",
  "sku": "teste sku",
  "product_to_category": [
    { 
    "category_id": 124,
    "name": "ACESSORIOS" 
    }
  ]
}
```

#### Exemplo de retorno:
```json
{
  "_id": "63ea142348eb4e7541cb49de",
  "product_id": 6265,
  "name": "produto de teste",
  "price": "89,87",
  "sku": "teste sku",
  "product_to_category": [
    {
      "category_id": 124,
      "name": "ACESSORIOS",
      "_id": "63ea15dd01aa0982a980c0fe",
      "__v": 0
    }
  ],
  "__v": 0
}
```

### Listar um produto

<strong>Tipo:</strong> GET <br>
<strong>Path:</strong> <code>/products/:id</code> <br>

#### Exemplo de retorno:
```json
{
  "_id": "63e90583312255a7ddf77475",
  "product_id": 4569,
  "name": "produto atualizado",
  "price": "89,87",
  "sku": "teste sku atualizado",
  "product_to_category": [
    {
      "_id": "63ea1253f76cd4f2a1d99535",
      "category_id": 124,
      "name": "ACESSORIOS",
      "__v": 0
    }
  ],
  "__v": 4
}
```

### Listar todos os produtos

<strong>Tipo:</strong> GET <br>
<strong>Path:</strong> <code>/products</code> <br>

#### Exemplo de retorno:
```json
[
  {
    "_id": "63e90583312255a7ddf77475",
    "product_id": 4569,
    "name": "produto atualizado",
    "price": "89,87",
    "sku": "teste sku atualizado",
    "product_to_category": [
      {
        "_id": "63ea1253f76cd4f2a1d99535",
        "category_id": 124,
        "name": "ACESSORIOS Vindo Do DTO",
        "__v": 0
      }
    ],
    "__v": 4
  },
  {
    "_id": "63e90584312255a7ddf77486",
    "product_id": 4552,
    "name": "CHINELO RIDER FREE DEDO ADULTO - CORES SORTIDAS",
    "price": "35.90",
    "sku": "35.90",
    "product_to_category": [],
    "__v": 1
  }
]
```

### Atualizar produto

<strong>Tipo:</strong> PUT <br>
<strong>Path:</strong> <code>/products</code> <br>
<strong>Body:</strong>
```json
{
  "product_id": "6265",
  "name": "produto atualizado",
  "price": "89,87",
  "sku": "teste sku",
  "product_to_category": [
    { 
    "category_id": 124,
    "name": "ACESSORIOS" 
    }
  ]
}
```

#### Exemplo de retorno:
```json
{
  "_id": "63ea142348eb4e7541cb49de",
  "product_id": 6265,
  "name": "produto de teste",
  "price": "89,87",
  "sku": "teste sku",
  "product_to_category": [
    {
      "category_id": 124,
      "name": "ACESSORIOS",
      "_id": "63ea15dd01aa0982a980c0fe",
      "__v": 0
    }
  ],
  "__v": 0
}
```


### Apagar um produto

<strong>Tipo:</strong> GET <br>
<strong>Path:</strong> <code>/products/:id</code> <br>

#### Exemplo de retorno:
```json
{
  "_id": "63e90583312255a7ddf77475",
  "product_id": 4569,
  "name": "produto apagado",
  "price": "89,87",
  "sku": "teste sku apagado",
  "product_to_category": [
    {
      "_id": "63ea1253f76cd4f2a1d99535",
      "category_id": 124,
      "name": "ACESSORIOS",
      "__v": 0
    }
  ],
  "__v": 4
}
```
