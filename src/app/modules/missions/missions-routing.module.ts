import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionDetailComponent } from './missions/mission-list/mission-detail/mission-detail.component';
import { MissionListComponent } from './missions/mission-list/mission-list.component';
import { PhotoComponent } from './missions/mission-list/photo/photo.component';
import { SurveysComponent } from './missions/mission-list/surveys/surveys.component';


const routes: Routes = [
  {
    path: 'detail',
    component: MissionDetailComponent,
    data: { title: 'Detalle misión' }
  },
  { 
    path: '', 
    component: MissionListComponent,
    data: { title: 'Lista misiones' }
  },
  { 
    path: 'photo', 
    component: PhotoComponent,
    data: { title: 'Misión foto' }
  },
  { 
    path: 'survys', 
    component: SurveysComponent,
    data: { title: 'Misión Encuesta' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionsRoutingModule { }
