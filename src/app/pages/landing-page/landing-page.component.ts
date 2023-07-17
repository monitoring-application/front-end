import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/util/notification_type';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  windowScrolled = false;
  mediaSub: Subscription | undefined;
  public isMobile: boolean = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  message: string = '';

  constructor(
    public authService: AuthService,
    public router: Router,
    private notifService: NotificationService,
    private httpRequest: HttpRequestService,
    public mediaObserver: MediaObserver
  ) {}

  @ViewChild(MatMenuTrigger)
  menuTrigger!: MatMenuTrigger;

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });

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

  getUserName(): string {
    var userInfo = JSON.parse(sessionStorage.getItem('user') || '{}');

    return userInfo.name || '';
  }

  getUserIcon(): string {
    var iconStr: string = '';
    var userInfo = JSON.parse(sessionStorage.getItem('user') || '{}');

    switch (userInfo.kind) {
      case 'LAW ENFORCEMENT':
        iconStr = 'assets/police-car.png';
        break;
      case 'FIRE':
        iconStr = 'assets/fire-truck.png';
        break;
      case 'AMBULANCE':
        iconStr = 'assets/ambulance.png';
        break;
      case 'DISASTER':
        iconStr = 'assets/ems.png';
        break;
      default:
        break;
    }

    return iconStr;
  }

  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.setItem('user', '');
    window.location.reload();
  }

  scroll(_element: string) {
    var element = document.getElementsByClassName(_element);
    if (element != null) {
      element[0].scrollIntoView({ behavior: 'smooth' });
    }
  }

  mobileScroll(_element: string) {
    this.menuTrigger.closeMenu();
    var element = document.getElementsByClassName(_element);
    if (element != null) {
      element[0].scrollIntoView({ behavior: 'smooth' });
      _element = '';
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  gotoRegister() {
    this.router.navigate(['/register']);
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  sendMessage() {
    var emailRegEx = new RegExp(
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    );

    if (this.email.trim() == '') {
      this.notifService.showNotification(
        NotificationType.error,
        'Please input email address!'
      );
      return;
    }
    if (!emailRegEx.test(this.email)) {
      this.notifService.showNotification(
        NotificationType.error,
        'Please input valid email address!'
      );
      return;
    }
    if (this.message.trim() == '') {
      this.notifService.showNotification(
        NotificationType.error,
        'Please input message!'
      );
      return;
    }

    // this.httpRequest
    //   .saveContactUs(this.firstName, this.lastName, this.email, this.message)
    //   .subscribe((result) => {
    //     if (result.statusCode == 201) {
    //       this.notifService.showNotification(
    //         NotificationType.success,
    //         'Your message have successfully sent to us.'
    //       );
    //       this.clearFields();
    //     }
    //   });
  }

  // clearFields() {
  //   this.firstName = '';
  //   this.lastName = '';
  //   this.email = '';
  //   this.message = '';
  // }
}
