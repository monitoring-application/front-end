import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  mediaSub: Subscription | undefined;
  public isMobile: boolean = false;

  hide: boolean = true;
  loginError: string = '';
  isProcessing: boolean = false;
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    public router: Router,
    public mediaObserver: MediaObserver,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        this.isMobile = change.mqAlias === 'xs' ? true : false;
      });
  }

  async login() {
    // if (this.username != "" && this.password != "") {
    //   if (this.isProcessing) return;
    //   this.hide = true;
    //   this.isProcessing = true;
    //   setTimeout(() =>
    //   {
    //     this.authService.userLogin(
    //       this.username,
    //       this.password
    //     ).then((res) => {
    //       this.router.navigate(['']);
    //       this.isProcessing = false;
    //     }).catch((err => {
    //       var str = err.error.message || "";
    //       this.loginError = str[0].toUpperCase() + str.slice(1);  //"Invalid Credentials";
    //       this.isProcessing = false;
    //     }));
    //   }, 3000);
    // } else {
    //   this.loginError = "Invalid Credentials";
    //   this.isProcessing = false;
    // }
  }

  back() {
    this.location.back();
  }
}
