import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ENDPOINTS } from '../constants/endpoints';
import { Treatment } from '../interfaces/treatment';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private defaultTreatment: Treatment = {
    buyCtaColor: 'primary',
    buyCtaText: 'BUY NOW',
    isReviewsPrioritized: false,
    productHeroImage: 'left',
    productThumbnailImage: 'left'
  };

  public treatment$: BehaviorSubject<Treatment> = new BehaviorSubject<Treatment>(this.defaultTreatment);

  public constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {

    this.userService.user$.subscribe(

      (user: undefined | User): void => { this.getTreatment(user); },

      (error: Error): void => { console.log('user$ failed.', error); }

    );

  }

  private getTreatment(user: undefined | User): void {

    if (user === undefined) { this.treatment$.next(this.defaultTreatment); } else {

      const params: Params = { userId: user.userId };

      this.httpClient.get<Treatment>(ENDPOINTS.getTreatment, { params }).subscribe(

        (treatment: Treatment): void => { this.treatment$.next(treatment); },

        (error: Error): void => { console.log('getTreatment() failed.', error); }

      );

    }

  }

}
