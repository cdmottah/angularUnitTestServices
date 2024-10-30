import { faker } from '@faker-js/faker';

import { Product } from './product.model';

export const generateOneProduct = (): Product => {
  const { commerce, number, image,string } = faker;
  return {
    id: string.uuid(),
    taxes: 2,
    category: {
      id: number.int(),
      name: commerce.department()
    },
    description: commerce.productDescription(),
    images: [image.url(), image.url()],
    price: parseInt(commerce.price()),
    title: commerce.productName()
  };
}

export const generateManyProducts = (size=10): Product[] => {
  const products: Product[] = [];

  for (let i = 0; i < size; i++) {
    products.push(generateOneProduct());
  }

  return [...products];
}
