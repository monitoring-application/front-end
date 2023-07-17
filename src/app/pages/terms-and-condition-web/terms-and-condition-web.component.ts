import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terms-and-condition-web',
  templateUrl: './terms-and-condition-web.component.html',
  styleUrls: ['./terms-and-condition-web.component.scss']
})
export class TermsAndConditionWebComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

}
