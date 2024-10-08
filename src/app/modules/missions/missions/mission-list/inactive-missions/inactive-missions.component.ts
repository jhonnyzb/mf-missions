import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { getSession } from 'src/app/core/encryptData';
import { MissionEnum } from 'src/app/core/enums/MissionEnum';
import { GTMSelectContent } from 'src/app/core/models/gtm/gtmSelectContent.model';
import { LoginValeproResponseModel } from 'src/app/core/models/response/loginValeproResponse.model';
import { MissionActivityInactiveModel, MissionInactiveListModel, MissionInactiveModel } from 'src/app/core/models/response/missionInactiveResponse.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { MissionsRepository } from 'src/app/core/repositories/missions.repository';
import { DialogService } from 'src/app/infraestructure/services/dialog.service';

@Component({
  selector: 'app-inactive-missions',
  templateUrl: './inactive-missions.component.html',
  styleUrls: ['./inactive-missions.component.scss']
})
export class InactiveMissionsComponent implements OnChanges {
  @Input () asc: number = 0;
  @Input () active: boolean;
  noActiveMission!: MissionInactiveModel[];
  userLoguedValepro: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  isLoading = false;
  constructor(
    private missionsRepository: MissionsRepository,
    private router: Router,
    private dialogService: DialogService,
  ) {
    this.getInactiveMissionsList();
  }

  ngOnChanges(){
    if(this.asc == 1 && !this.active){
      this.ordenar_fecha_acendente();
    }
    else if(this.asc == 2 && !this.active){
      this.ordenar_fecha_decendente();
    }
  }

  getInactiveMissionsList() {
    this.isLoading = true;
    this.missionsRepository.getMissionsInactivityByAccount(this.userLoguedValepro.AccountId).subscribe({
      next: (response: ResponseBaseModel<MissionInactiveListModel>) => {
        this.isLoading = false;
        this.noActiveMission = response.data.missions;
        this.noActiveMission.forEach((mission: MissionInactiveModel) => {
          let meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
          let fechaVencimiento = new Date(mission.dateFinal)
          fechaVencimiento.setHours(23);
          fechaVencimiento.setMinutes(23);
          fechaVencimiento.setSeconds(23);
          mission.vencimiento = `el ${fechaVencimiento.getDate()} de ${meses[fechaVencimiento.getMonth()]} ${fechaVencimiento.getFullYear()}`;
          mission.missionActivities.forEach((activity: MissionActivityInactiveModel) => {
            switch (activity.missionTypeId) {
              case MissionEnum.photo:
                activity.iconClass = 'photo-class-ico';
                break;
              case MissionEnum.poll:
                activity.iconClass = 'poll-class-ico';
                break;
              case MissionEnum.audio:
                activity.iconClass = 'icon-volume-2';
                break;
              case MissionEnum.video:
                activity.iconClass = 'video-class-ico';
                break;
            }
          });
        })
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }
  ordenar_fecha_decendente() {
    this.sendGtmDataFiltro('Más reciente - Misiones inactivas');
    if (this.noActiveMission) {
      this.noActiveMission.sort(function (a, b) {
        if (a.dateFinal == b.dateFinal) {
          return 0;
        }
        if (a.dateFinal < b.dateFinal) {
          return -1;
        }
        return 1;
      });
    }
  }
  
  ordenar_fecha_acendente() {
      this.sendGtmDataFiltro('Menos reciente - Misiones inactivas');
      if (this.noActiveMission) {
        this.noActiveMission.sort(function (a, b) {
          if (a.dateFinal == b.dateFinal) {
            return 0;
          }
          if (a.dateFinal > b.dateFinal) {
            return -1;
          }
          return 1;
        });
      } 
  }
  sendGtmDataFiltro(detalleFiltro: any) {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Misiones",
      ParameterLocation: "Filtro",
      ParameterType: "Filtro",
      ParameterCategory: 'Filtro Misiones',
      IDAccount: this.userLoguedValepro.AccountId,
      UserName: this.userLoguedValepro.UserName,
      IDProgram: this.userLoguedValepro.ProgramId,
      IDPerson: this.userLoguedValepro.PersonId,
      ParameterText: `${detalleFiltro}`,
      ParameterItemID: '0',
      Currency: '',
      value: ''
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }
}
