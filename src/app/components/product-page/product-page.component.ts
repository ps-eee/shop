import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { Treatment } from '../../interfaces/treatment';
import { TreatmentStatistic } from '../../interfaces/treatment-statistic';
import { ProductService } from '../../services/product/product.service';
import { TreatmentStatisticService } from '../../services/treatment-statistic/treatment-statistic.service';

@Component({
  selector: 'shop-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  public product: undefined | Product = undefined;
  public productHeroImgUrl: string = '';
  public productImageUrls: string[] = [];
  public treatment: undefined | Treatment = undefined;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private treatmentStatisticService: TreatmentStatisticService
  ) { }

  public ngOnInit(): void {

    const productId = Number(this.activatedRoute.snapshot.params.id);

    this.product = this.productService.getOne(productId);

    if (this.product !== undefined) {

      this.productImageUrls = Object.values(this.product.imageUrls);

      this.productHeroImgUrl = this.productImageUrls.length === 0 ? '' : this.productImageUrls[0];

    }

    this.treatmentStatisticService.treatmentStatistic$.subscribe(

      (treatmentStatistic: undefined | TreatmentStatistic) => {

        this.treatment = treatmentStatistic?.treatment;

        this.productHeroImgUrl = (this.product === undefined || this.treatment === undefined) ? '' : this.product.imageUrls[this.treatment.productHeroImage];

      },

      (error: Error): void => { console.log('treatment$ failed.', error); }

    );

  }

}
