import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy-policy-web',
  templateUrl: './privacy-policy-web.component.html',
  styleUrls: ['./privacy-policy-web.component.scss']
})
export class PrivacyPolicyWebComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

}
