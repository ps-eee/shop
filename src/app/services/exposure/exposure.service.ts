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

  private exposure: undefined | Exposure = undefined;

  public constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService
  ) { }

  public postExposure(treatmentHash: TreatmentStatistic['treatmentHash'], userId: User['userId']): void {

    this.loaderService.showLoader();

    const partialExposure: Omit<Exposure, 'id' | 'isSuccessful'> = {
      timestamp: (new Date()).toISOString(),
      treatmentHash,
      userId
    };

    this.httpClient.post<Exposure>(ENDPOINTS.POST_EXPOSURE, partialExposure).subscribe(

      (exposure: Exposure): void => {

        this.exposure = exposure;

        this.loaderService.hideLoader();

      },

      (error: Error): void => { console.log('postExposure() failed.', error); }

    );

  }

}
