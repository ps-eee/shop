import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ENDPOINTS } from '../../constants/endpoints';
import { Treatment } from '../../interfaces/treatment';
import { TreatmentStatistic } from '../../interfaces/treatment-statistic';
import { User } from '../../interfaces/user';
import { ExposureService } from '../exposure/exposure.service';
import { LoaderService } from '../loader/loader.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TreatmentStatisticService {

  private defaultTreatment: Treatment = {
    buyCtaColor: 'primary',
    buyCtaText: 'BUY NOW',
    isReviewsPrioritized: false,
    productHeroImage: 'left',
    productThumbnailImage: 'left'
  };

  private defaultTreatmentStatistic: TreatmentStatistic = {
    exposureCount: 0,
    successCount: 0,
    treatment: this.defaultTreatment,
    treatmentHash: ''
  };

  public treatmentStatistic$: BehaviorSubject<TreatmentStatistic> = new BehaviorSubject<TreatmentStatistic>(this.defaultTreatmentStatistic);

  public constructor(
    private httpClient: HttpClient,
    private exposureService: ExposureService,
    private loaderService: LoaderService,
    private userService: UserService
  ) {

    this.userService.user$.subscribe(

      (user: undefined | User): void => { this.getTreatmentStatistic(user); },

      (error: Error): void => { console.log('user$ failed.', error); }

    );

  }

  private getTreatmentStatistic(user: undefined | User): void {

    if (user === undefined) { this.treatmentStatistic$.next(this.defaultTreatmentStatistic); } else {

      this.loaderService.showLoader();

      const params: Params = { userId: user.userId };

      this.httpClient.get<TreatmentStatistic>(ENDPOINTS.GET_TREATMENT_STATISTIC, { params }).subscribe(

        (treatmentStatistic: TreatmentStatistic): void => {

          this.treatmentStatistic$.next(treatmentStatistic);

          this.loaderService.hideLoader();

          this.exposureService.postExposure(treatmentStatistic.treatmentHash, user.userId);

        },

        (error: Error): void => {

          console.log('getTreatmentStatistic() failed.', error);

          this.loaderService.hideLoader();

        }

      );

    }

  }

}
