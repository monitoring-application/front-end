import { Component, OnInit } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-short',
  templateUrl: './footer-short.component.html',
  styleUrls: ['./footer-short.component.css'],
})
export class FooterShortComponent implements OnInit {
  mediaSub: Subscription | undefined;
  public isMobile: boolean = false;

  constructor(
    public router: Router,
    private httpRequest: HttpRequestService,
    public mediaObserver: MediaObserver
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

  gotoPrivacyPolicy() {
    this.router.navigate(['/privacy-policy']);
  }

  gotoTermsAndCondition() {
    this.router.navigate(['/terms-and-condition']);
  }
}
