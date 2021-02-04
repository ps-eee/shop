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
      imageUrls: { left: 'assets/1-left.jpg', bottom: 'assets/1-bottom.jpg', right: 'assets/1-right.jpg' }
    },
    {
      name: 'Jordan \'Why Not?\' Zer0.4 "Upbringing"',
      id: 2,
      imageUrls: { left: 'assets/2-left.jpg', bottom: 'assets/2-bottom.jpg', right: 'assets/2-right.jpg' }
    }
  ];

  getAll(): Product[] {

    return this.products;

  }

  getOne(productId: number): undefined | Product {

    return this.products.find((product: Product): boolean => product.id === productId);

  }

}
