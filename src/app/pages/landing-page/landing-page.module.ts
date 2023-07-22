import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/angular-material.module';
import { LandingPageRoutes } from './landing-page.routing';
import { NgModule } from '@angular/core';
import { AttachmentComponent } from '../attachment/attachment.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { FooterComponent } from 'src/app/component/footer/footer.component';
import { HeaderComponent } from 'src/app/component/header/header.component';
import { MembersCreateDlgComponent } from '../members/members-create-dlg/members-create-dlg.component';
import { MembersCreateComponent } from '../members/members-create/members-create.component';
import { MembersListComponent } from '../members/members-list/members-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LandingPageRoutes),
    FormsModule,
    OverlayModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AttachmentComponent,
    MembersListComponent,
    MembersCreateComponent,
    MembersCreateDlgComponent,
  ],
})
export class AdminLayoutModule {}
