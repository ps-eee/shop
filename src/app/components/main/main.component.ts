import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'shop-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public user: undefined | User = undefined;

  public constructor(
    private userService: UserService
  ) { }

  public ngOnInit(): void {

    this.userService.user$.subscribe(

      (user: undefined | User): void => { this.user = user; },

      (error: Error): void => { console.log('user$ failed.', error); }

    );

  }

  public login(): void {

    const userId: number = Number(prompt('User ID?', '0')) || 0;

    this.userService.login(userId);

  }

  public logout(): void {

    this.userService.logout();

  }

}
