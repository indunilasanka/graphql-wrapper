###Graphql-Wrapper

Graphql wrapper for product-info service.

#####How to Start
1. First run the product-info-api
2. Then update config/config.js file with server base url
3. Open terminal and run "npm install"
4. Run "npm start"
5. Then server will be up and run in port 4000
6. Import the postman collection in "product-info.postman_collection.json". Use the postman calls in "graphql" folder.
7. you can use http://localhost:4000 graphQl server also to run your queries.


# API Specification
****
### 1. Get All Products

**GraphQl URL:** `[base-url]:[port] --> http://localhost:4000`

**Query:** `query {
products {
productId
productName
productSlug
sku
brand {
brandId
brandName
}
}
}`

**Resposne:** `{
"data": {
"products": [
{
"productId": "1",
"productName": "Horlicks",
"productSlug": "slug1",
"sku": "918390ccccc",
"brand": {
"brandId": "2",
"brandName": "Nestle"
}
},
{
"productId": "2",
"productName": "Anchor",
"productSlug": "slug2",
"sku": "918390aaaaa",
"brand": {
"brandId": "2",
"brandName": "Nestle"
}
}
]
}
}`

****
### 1. Create Product

**GraphQl URL:** `[base-url]:[port] --> http://localhost:4000`

**Query:** `mutation(
$productName: String!
$productSlug: String!
$sku: String
$brandId: Int!
) {
createProduct(
productName: $productName
productSlug: $productSlug
sku: $sku
brandId: $brandId
) {
productId
productName
productSlug
sku
brand {
brandId
brandName
}
}
}`

**Variables:** `{"productName": "product6","productSlug": "slug6", "sku": "aabbsgg22", "brandId": 2}`

**Response:** `{
"data": {
"createProduct": {
"productId": "6",
"productName": "product6",
"productSlug": "slug6",
"sku": "aabbsgg22",
"brand": {
"brandId": "2",
"brandName": "Nestle"
}
}
}
}`
