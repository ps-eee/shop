import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { LoaderService } from '../../services/loader/loader.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'shop-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public isLoaderVisible: boolean = false;
  public user: undefined | User = undefined;

  public constructor(
    private loaderService: LoaderService,
    private userService: UserService
  ) { }

  public ngOnInit(): void {

    this.loaderService.isLoaderVisible$.subscribe(

      (isLoaderVisible: boolean): void => { this.isLoaderVisible = isLoaderVisible; },

      (error: Error): void => { console.log('isLoaderVisible$ failed.', error); }

    );

    this.userService.user$.subscribe(

      (user: undefined | User): void => { this.user = user; },

      (error: Error): void => { console.log('user$ failed.', error); }

    );

  }

  public login(): void {

    const userId: null | string = prompt('Enter User ID:', '0');

    if (userId && Number.isInteger(Number(userId)) && Number(userId) >= 0) {

      this.userService.login(Number(userId));

    }

  }

  public logout(): void {

    this.userService.logout();

  }

}
