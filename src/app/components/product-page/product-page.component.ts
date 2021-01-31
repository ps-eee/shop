import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { Treatment } from 'src/app/interfaces/treatment';
import { ProductService } from 'src/app/services/product/product.service';
import { TreatmentService } from 'src/app/services/treatment/treatment.service';

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
    private treatmentService: TreatmentService
  ) { }

  public ngOnInit(): void {

    const productId = Number(this.activatedRoute.snapshot.params.id);

    this.product = this.productService.getOne(productId);

    if (this.product !== undefined) {

      this.productImageUrls = Object.values(this.product.imageUrls);

      this.productHeroImgUrl = this.productImageUrls.length === 0 ? '' : this.productImageUrls[0];

    }

    this.treatmentService.treatment$.subscribe(

      (treatment: Treatment) => {

        this.treatment = treatment;

        this.productHeroImgUrl = (this.product === undefined) ? '' : this.product.imageUrls[this.treatment.productHeroImage];

      },

      (error: Error): void => { console.log('treatment$ failed.', error); }

    );

  }

}
