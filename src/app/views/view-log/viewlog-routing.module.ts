import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { LogRoomComponent } from './logroom/logroom.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '',
    },
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'ข้อมูลและสถิติถอดความเสียงพูด'
        }
      },
      {
        path: 'logroom/:id',
        component: LogRoomComponent,
        data: {
          title: 'รายละเอียด'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewLogRoutingModule {
}
