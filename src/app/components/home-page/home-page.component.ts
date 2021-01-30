import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Treatment } from '../../interfaces/treatment';
import { ProductService } from '../../product.service';
import { TreatmentService } from '../../services/treatment.service';

@Component({
  selector: 'shop-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public products: Product[] = [];
  public treatment: undefined | Treatment = undefined;

  public constructor(
    private productService: ProductService,
    private treatmentService: TreatmentService
  ) { }

  public ngOnInit(): void {

    this.products = this.productService.getAll();

    this.treatmentService.treatment$.subscribe(

      (treatment: undefined | Treatment): void => { this.treatment = treatment; },

      (error: Error): void => { console.log('treatment$ failed.', error); }

    );

  }

}
