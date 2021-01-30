import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user$: BehaviorSubject<undefined | User> = new BehaviorSubject<undefined | User>(undefined);

  public constructor() { }

  public login(userId: number): void {

    this.user$.next({ userId });

  }

  public logout(): void {

    this.user$.next(undefined);

  }

}
