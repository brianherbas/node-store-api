## node-store-api-project

This documentation describes how to request data from the API and how to interpret the response.

### Items

**By default the hits you will get are 10 items but in order to showcase json item structure, we only display one**

<span style="font-size: 14px;padding: 4px 8px;border-radius: 4px;background-color: #4699ff;color: #fff;">GET</span><code style="padding: 3px 8px;background-color: #edf7fc">http://localhost:3000/api/v1/products</code>

```json
{
  "products": [
    {
      "featured": true,
      "rating": 4.5,
      "createdAt": "2022-09-26T21:09:02.817Z",
      "_id": "633214f536ba904b345d5b1b",
      "name": "high-back bench",
      "price": 39,
      "company": "ikea",
      "__v": 0
    }
  ],
  "nbHits": 1
}
```

### Queries - Search / filters / sort / ...

<!-- Sorted by relevance, then points, then number of comments -->

<span style="font-size: 14px;padding: 4px 8px;border-radius: 4px;background-color: #4699ff;color: #fff;">GET</span><code style="padding: 3px 8  px;background-color: #edf7fc">http://localhost:3000/api/v1/products?...</code>

| Parameter                                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                              | Type    |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">featured=</code>       | true or false                                                                                                                                                                                                                                                                                                                                                                                                                            | String  |
| <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">company=</code>        | filter on a specific company. Available companies: <br> <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">ikea</code> <br> <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">liddy</code> <br> <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">caressa</code> <br> <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">marcos</code> | String  |
| <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">name=</code>           | "item name" (with regular expression capabilities for pattern matching strings)                                                                                                                                                                                                                                                                                                                                                          | String  |
| <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">numericFilters=</code> | filter on a specific numerical condition (<, <=, =, > or >=). <br> Available numerical fields: <br> <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">rating</code> <br><code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">price</code> <br> eg: "...numericFilters=price<=30,rating=4.5"                                                                                               | String  |
| <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">sort=</code>           | you can sort by any field, in order from lowest to highest and the other way around by using before field name "-"                                                                                                                                                                                                                                                                                                                       | String  |
| <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">fields=</code>         | fields you would like to display. eg: "...fields=name,price"                                                                                                                                                                                                                                                                                                                                                                             | String  |
| <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">limit=</code>          | hits you would like to get (by default 10 items are displayed)                                                                                                                                                                                                                                                                                                                                                                           | Integer |
| <code style="padding: 3px 8  px;background-color: #edf7fc; color: #1c709b">page=</code>           | page number                                                                                                                                                                                                                                                                                                                                                                                                                              | Integer |

### Examples:

- <code style="padding: 3px 8  px;background-color: #edf7fc">http://localhost:3000/api/v1/products?featured=false&fields=name,price&name=so</code>

```json
{
  "products": [
    {
      "_id": "633214f536ba904b345d5b1c",
      "name": "leather sofa",
      "price": 99
    },
    {
      "_id": "633214f536ba904b345d5b21",
      "name": "sofa set",
      "price": 129
    }
  ],
  "nbHits": 2
}
```

- <code style="padding: 3px 8  px;background-color: #edf7fc">http://localhost:3000/api/v1/products?featured=false&fields=name,price&name=so&numericFilters=price<=120</code>

```json
{
  "products": [
    {
      "_id": "633214f536ba904b345d5b1c",
      "name": "leather sofa",
      "price": 99
    }
  ],
  "nbHits": 1
}
```

---

#### Available Scripts

In the project directory you can run:

> start --> nodemon app.js

```zsh
 $ npm start
```

> dev --> node app.js

```zsh
 $ npm run dev
```
