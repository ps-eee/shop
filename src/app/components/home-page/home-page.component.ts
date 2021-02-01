import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Treatment } from '../../interfaces/treatment';
import { TreatmentStatistic } from '../../interfaces/treatment-statistic';
import { ProductService } from '../../services/product/product.service';
import { TreatmentStatisticService } from '../../services/treatment-statistic/treatment-statistic.service';

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
    private treatmentStatisticService: TreatmentStatisticService
  ) { }

  public ngOnInit(): void {

    this.products = this.productService.getAll();

    this.treatmentStatisticService.treatmentStatistic$.subscribe(

      (treatmentStatistic: TreatmentStatistic): void => { this.treatment = treatmentStatistic.treatment; },

      (error: Error): void => { console.log('treatment$ failed.', error); }

    );

  }

}
