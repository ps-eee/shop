import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoaderVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public hideLoader(): void { this.isLoaderVisible$.next(false); }

  public showLoader(): void { this.isLoaderVisible$.next(true); }

}
