import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FooterComponent } from './component/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/angular-material.module';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterShortComponent } from './component/footer-short/footer-short.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './pages/terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyWebComponent } from './pages/privacy-policy-web/privacy-policy-web.component';
import { TermsAndConditionWebComponent } from './pages/terms-and-condition-web/terms-and-condition-web.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    FooterShortComponent,
    PrivacyPolicyComponent,
    TermsAndConditionComponent,
    PrivacyPolicyWebComponent,
    TermsAndConditionWebComponent,
    SignUpComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true,
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
