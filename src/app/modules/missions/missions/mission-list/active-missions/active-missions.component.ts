import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { getSession, saveSession } from 'src/app/core/encryptData';
import { MissionEnum } from 'src/app/core/enums/MissionEnum';
import { DialogParams } from 'src/app/core/models/gtm/dialogParams.model';
import { GTMSelectContent } from 'src/app/core/models/gtm/gtmSelectContent.model';
import { LoginValeproResponseModel } from 'src/app/core/models/response/loginValeproResponse.model';
import { MissionActivityModel, MissionModel, MissionResponseModel } from 'src/app/core/models/response/missionResponse.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { MissionsRepository } from 'src/app/core/repositories/missions.repository';
import { UtilsTitle } from 'src/app/core/utils/UtilsTitle';
import { DialogService } from 'src/app/infraestructure/services/dialog.service';

@Component({
  selector: 'app-active-missions',
  templateUrl: './active-missions.component.html',
  styleUrls: ['./active-missions.component.scss']
})
export class ActiveMissionsComponent implements OnChanges{
  @Input () asc: number = 0;
  @Input () active: boolean;
  activeMission!: MissionModel[];
  userLoguedValepro: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  isLoading = false;

  constructor(
    private missionsRepository: MissionsRepository,
    private router: Router,
    private dialogService: DialogService,
    private utilsTitle: UtilsTitle
  ){
    this.getMissions();
  }

  ngOnChanges(){
    if(this.asc == 1 && this.active){
      this.ordenar_fecha_acendente();
    }
    else if(this.asc == 2 && this.active){
      this.ordenar_fecha_decendente();
    }
  }

  getMissions(): void {
    this.isLoading = true;
    this.missionsRepository.getMissionsByAccount(this.userLoguedValepro.AccountId).subscribe({
      next: (response: ResponseBaseModel<MissionResponseModel>) => {
        this.isLoading = false;
        this.activeMission = response.data.missions;
        this.showOnlyMissionsWithActivities();
        this.activeMission.forEach((mission: MissionModel) => {
          let meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
          let fechaVencimiento = new Date(mission.dateFinal)
          fechaVencimiento.setHours(23);
          fechaVencimiento.setMinutes(23);
          fechaVencimiento.setSeconds(23);
          mission.vencimiento = `el ${fechaVencimiento.getDate()} de ${meses[fechaVencimiento.getMonth()]} ${fechaVencimiento.getFullYear()}`;
          mission.missionActivities.forEach((activity: MissionActivityModel) => {
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
      this.sendGtmDataFiltro('Más reciente - Misiones activas');
      if (this.activeMission) {
        this.activeMission.sort(function (a, b) {
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
      this.sendGtmDataFiltro('Menos reciente - Misiones activas');
      if (this.activeMission) {
        this.activeMission.sort(function (a, b) {
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
  showOnlyMissionsWithActivities() {
    this.activeMission = this.activeMission.filter(m => { return m.missionActivities.length > 0 });
  }

  showMissionDetail(mission: MissionModel, typeId: number, len: number) {
    if (typeId == 0) {
      saveSession('1', 'activityNumber')
      if (len == 1) {
        typeId = mission.missionActivities[0].missionTypeId;
      } else {
        typeId = 1;
      }
    }
    if (typeId == 2 && mission.participationStatusSurvey) {
      let params: DialogParams = {
        msg: 'Ya realizaste la encuesta. No es posible volver a participar.',
        page: undefined,
        success: false,
        confirmText: 'Volver'
      }
      this.dialogService.openConfirmDialog(params.msg, params);
      return;
    }
    if (typeId == 2 && len > 1) {
      saveSession('2', 'activityNumber')
    }
    let activity: MissionActivityModel = mission.missionActivities.find(m => m.missionTypeId === typeId);

    this.sendGtmData(mission, activity);
    saveSession(mission, 'currentMission');
    saveSession(activity, 'currentActivity');
    this.router.navigate(['/main/missions/detail']);
  }

  getMissionType(activity: MissionActivityModel): string {
    let missionType: string;

    switch (activity.missionTypeId) {
      case MissionEnum.photo:
        missionType = 'Camera'
        break;
      case MissionEnum.poll:
        missionType = 'Survey';
        break;
      case MissionEnum.audio:
        missionType = 'Audio';
        break;
      case MissionEnum.video:
        missionType = 'Video';
        break; default:
        missionType = 'Sin Misión'
        break;
    }
    return missionType;
  }
  sendGtmData(mission: MissionModel, activity: MissionActivityModel) {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Misiones",
      ParameterLocation: "Misiones ver más",
      ParameterType: "botón",
      ParameterCategory: 'Misiones',
      IDAccount: this.userLoguedValepro.AccountId,
      UserName: this.userLoguedValepro.UserName,
      IDProgram: this.userLoguedValepro.ProgramId,
      IDPerson: this.userLoguedValepro.PersonId,
      ParameterText: `${mission.name} + ${this.getMissionType(activity)} `,
      ParameterItemID: mission.missionId.toString(),
      Currency: '',
      value: ''
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
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
