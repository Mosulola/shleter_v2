import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { DocsComponentsModule } from '@docs-components/docs-components.module';

import { ViewLogRoutingModule } from './viewlog-routing.module';
import { ListComponent } from './list/list.component';
import { LogRoomComponent } from './logroom/logroom.component';


@NgModule({
  declarations: [
    ListComponent,
    LogRoomComponent,
  ],
  imports: [
    CommonModule,
    ViewLogRoutingModule,
    DocsComponentsModule,
    CardModule,
    FormModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule
  ]
})
export class ViewLogModule {
}
