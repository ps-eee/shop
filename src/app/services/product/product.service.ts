import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    {
      name: 'Nike Air Max 95',
      id: 1,
      imageUrls: { left: 'assets/1-left.jpg', bottom: 'assets/1-bottom.jpg', right: 'assets/1-right.jpg' },
      price: 56.99
    },
    {
      name: 'Jordan "Upbringing"',
      id: 2,
      imageUrls: { left: 'assets/2-left.jpg', bottom: 'assets/2-bottom.jpg', right: 'assets/2-right.jpg' },
      price: 303.29
    },
    {
      name: 'Nike SuperRep 2',
      id: 3,
      imageUrls: { left: 'assets/3-left.jpg', bottom: 'assets/3-bottom.jpg', right: 'assets/3-right.jpg' },
      price: 245.25
    },
    {
      name: 'Nike Vapor Cage 4',
      id: 4,
      imageUrls: { left: 'assets/4-left.jpg', bottom: 'assets/4-bottom.jpg', right: 'assets/4-right.jpg' },
      price: 355.48
    },
    {
      name: 'Jordan Delta Breathe',
      id: 5,
      imageUrls: { left: 'assets/5-left.jpg', bottom: 'assets/5-bottom.jpg', right: 'assets/5-right.jpg' },
      price: 472.18
    }
  ];

  getAll(): Product[] {

    return this.products;

  }

  getOne(productId: number): undefined | Product {

    return this.products.find((product: Product): boolean => product.id === productId);

  }

}
