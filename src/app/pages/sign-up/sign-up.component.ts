import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { ActivatedRoute, Params } from '@angular/router';
import { Console } from 'console';
import { Subscription, filter, map } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { SignUpService } from 'src/app/services/sign-up.service';
import { NotificationType } from 'src/app/util/notification_type';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  form = this.signUpService.form;
  mediaSub!: Subscription;
  public isMobile: boolean = false;
  isLoading = false;
  _isExist = true;

  constructor(
    public mediaObserver: MediaObserver,
    private signUpService: SignUpService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
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

    this.route.queryParams.subscribe((param: Params) => {
      if (param['id']) {
        this.form.controls.upline.setValue(param['id']);
      }
    });
  }
  submit() {
    this.isLoading = true;
    if (!this.validation()) return;

    this.signUpService.create()?.subscribe({
      next: (res) => {
        if (res.data) {
          this.notificationService.showNotification(
            NotificationType.warning,
            'This email is alread exist!',
            'Warning'
          );
          this.isLoading = false;
          return;
        }
        this.notificationService.showNotification(
          NotificationType.success,
          'Successfully Saved!',
          'Success'
        );
        setTimeout(() => {
          this.isLoading = false;
          this.signUpService.form.reset(this.signUpService.resetform.value);
        }, 500);
      },
      error: (err) => {
        console.log({
          error: err,
        });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  validation(): boolean {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'Please supply needed!',
        'Warning'
      );

      return false;
    }

    return true;
  }
}
