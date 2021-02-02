import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ENDPOINTS } from '../../constants/endpoints';
import { Exposure } from '../../interfaces/exposure';
import { TreatmentStatistic } from '../../interfaces/treatment-statistic';
import { User } from '../../interfaces/user';
import { LoaderService } from '../loader/loader.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ExposureService {

  private exposure: undefined | Exposure = undefined;

  public constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService,
    private userService: UserService
  ) {

    this.userService.user$.subscribe(

      (user: undefined | User): void => { if (user === undefined) { this.exposure = undefined; } },

      (error: Error): void => { console.log('user$ failed.', error); }

    );

  }

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

      (error: Error): void => {

        console.log('postExposure() failed.', error);

        this.loaderService.hideLoader();

      }

    );

  }

  public markExposureSuccessful(): Observable<void> {

    if (this.exposure === undefined) { return throwError(undefined); } else {

      const partialExposure: Pick<Exposure, 'id'> = { id: this.exposure.id };

      return this.httpClient.put<void>(ENDPOINTS.MARK_EXPOSURE_SUCCESSFUL, partialExposure);

    }

  }

}
