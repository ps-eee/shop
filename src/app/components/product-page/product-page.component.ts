import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { Treatment } from '../../interfaces/treatment';
import { TreatmentStatistic } from '../../interfaces/treatment-statistic';
import { ExposureService } from '../../services/exposure/exposure.service';
import { LoaderService } from '../../services/loader/loader.service';
import { ProductService } from '../../services/product/product.service';
import { TreatmentStatisticService } from '../../services/treatment-statistic/treatment-statistic.service';

@Component({
  selector: 'shop-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  public isMarkExposureSuccessfulCalled: boolean = false;
  public product: undefined | Product = undefined;
  public productHeroImgUrl: string = '';
  public productImageUrls: string[] = [];
  public treatment: undefined | Treatment = undefined;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private exposureService: ExposureService,
    private loaderService: LoaderService,
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

      (treatmentStatistic: TreatmentStatistic) => {

        this.treatment = treatmentStatistic.treatment;

      },

      (error: Error): void => { console.log('treatment$ failed.', error); }

    );

  }

  public markExposureSuccessful(): void {

    if (this.isMarkExposureSuccessfulCalled) { return; } else {

      this.isMarkExposureSuccessfulCalled = true;

      this.loaderService.showLoader();

      this.exposureService.markExposureSuccessful().subscribe(

        (): void => {

          this.isMarkExposureSuccessfulCalled = false;

          this.loaderService.hideLoader();

          this.router.navigate(['/', 'checkout']);

        },

        (error: Error): void => {

          console.log('markExposureSuccessful() failed.', error);

          this.isMarkExposureSuccessfulCalled = false;

          this.loaderService.hideLoader();

        }

      );

    }

  }

}
