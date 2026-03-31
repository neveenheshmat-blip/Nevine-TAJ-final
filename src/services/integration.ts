
import { Wig } from '../types';
import { MOCK_WIGS } from '../constants';

class StoreService {
  private products: Wig[] = [...MOCK_WIGS];

  async getAllProducts(): Promise<Wig[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 500);
    });
  }

  async getProductById(id: string): Promise<Wig | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products.find(p => p.id === id));
      }, 300);
    });
  }

  async addProduct(product: Omit<Wig, 'id' | 'createdAt' | 'likes' | 'isSold'>): Promise<Wig> {
    const newProduct: Wig = {
      ...product,
      id: `w${this.products.length + 1}`,
      createdAt: Date.now(),
      likes: 0,
      isSold: false
    };
    this.products.push(newProduct);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newProduct);
      }, 800);
    });
  }
}

export const storeService = new StoreService();
