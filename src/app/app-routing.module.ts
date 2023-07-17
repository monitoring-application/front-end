import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { PrivacyPolicyWebComponent } from './pages/privacy-policy-web/privacy-policy-web.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionWebComponent } from './pages/terms-and-condition-web/terms-and-condition-web.component';
import { TermsAndConditionComponent } from './pages/terms-and-condition/terms-and-condition.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'privacypolicy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'termsandcondition',
    component: TermsAndConditionComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyWebComponent,
  },
  {
    path: 'terms-and-condition',
    component: TermsAndConditionWebComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
