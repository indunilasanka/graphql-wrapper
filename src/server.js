import { GraphQLServer } from 'graphql-yoga';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { baseURL } from './config/config';
import logger from './util/logger';

const resolvers = {
  Query: {
    products: () => fetch(`${baseURL}/v1/product-info/products`, {
      method: 'get',
      headers: { 'correlation-id': uuidv4() },
    })
      .then((res) => res.json())
      .then((json) => json.data),
  },

  Mutation: {
    createProduct: (parent, args) => {
      const {
        productName, productSlug, sku, brandId,
      } = args;
      const reqBody = {
        productName, productSlug, sku, brandId,
      };

      return fetch(`${baseURL}/v1/product-info/products`, {
        method: 'post',
        body: JSON.stringify(reqBody),
        headers: { 'correlation-id': uuidv4(), 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((json) => json.data);
    },
  },

  Product: {
    brand: (parent) => {
      const { brandId } = parent;
      return fetch(`${baseURL}/v1/product-info/brands/${brandId}`, {
        method: 'get',
        headers: { 'correlation-id': uuidv4() },
      })
        .then((res) => res.json())
        .then((json) => json.data);
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema/schema.graphql',
  resolvers,
});

server.start(() => logger.info('Server is running on http://localhost:4000'));
