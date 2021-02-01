import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '../../constants/endpoints';
import { Exposure } from '../../interfaces/exposure';
import { TreatmentStatistic } from '../../interfaces/treatment-statistic';
import { User } from '../../interfaces/user';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ExposureService {

  public constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService
  ) { }

  public postExposure(treatmentHash: TreatmentStatistic['treatmentHash'], userId: User['userId']): void {

    this.loaderService.showLoader();

    const exposure: Exposure = {
      timestamp: (new Date()).toISOString(),
      treatmentHash,
      userId
    };

    this.httpClient.post(ENDPOINTS.POST_EXPOSURE, exposure).subscribe(

      (): void => { this.loaderService.hideLoader(); },

      (error: Error): void => { console.log('postExposure() failed.', error); }

    );

  }

}
