import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionsRoutingModule } from './missions-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { WebcamModule } from 'ngx-webcam';
import { MissionDetailComponent } from './missions/mission-list/mission-detail/mission-detail.component';
import { MissionListComponent } from './missions/mission-list/mission-list.component';
import { PhotoComponent } from './missions/mission-list/photo/photo.component';
import { SurveysComponent } from './missions/mission-list/surveys/surveys.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MissionsRepository } from 'src/app/core/repositories/missions.repository';
import { MissionsService } from 'src/app/infraestructure/services/missions.service';
import { InactiveMissionsComponent } from './missions/mission-list/inactive-missions/inactive-missions.component';
import { ActiveMissionsComponent } from './missions/mission-list/active-missions/active-missions.component';


@NgModule({
  declarations: [
    MissionListComponent,
    MissionDetailComponent,
    SurveysComponent,
    PhotoComponent,
    InactiveMissionsComponent,
    ActiveMissionsComponent
  ],
  imports: [
    CommonModule,
    MissionsRoutingModule,
    CommonModule,
    MissionsRoutingModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatExpansionModule,
    WebcamModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    NgxImageCompressService,
    { provide: MissionsRepository, useClass: MissionsService },
  ]
})
export class MissionsModule { }
