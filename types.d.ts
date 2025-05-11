// types.d.ts
declare module 'mock-products' {
    interface Product {
      id: number;
      title: string;
      price: number;
      image: string;
      category: string;
    }
    const products: Product[];
    export default products;
  }