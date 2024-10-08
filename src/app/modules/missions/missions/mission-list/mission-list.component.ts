import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { getSession, saveSession } from 'src/app/core/encryptData';
import { MissionEnum } from 'src/app/core/enums/MissionEnum';
import { DialogParams } from 'src/app/core/models/gtm/dialogParams.model';
import { GTMSelectContent } from 'src/app/core/models/gtm/gtmSelectContent.model';
import { LoginValeproResponseModel } from 'src/app/core/models/response/loginValeproResponse.model';
import { MissionModel, MissionActivityModel } from 'src/app/core/models/response/missionResponse.model';
import { MissionsRepository } from 'src/app/core/repositories/missions.repository';
import { UtilsTitle } from 'src/app/core/utils/UtilsTitle';
import { DialogService } from 'src/app/infraestructure/services/dialog.service';





@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent {
  userLoguedValepro: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  isLoading = false;
  isActiveButton = true;
  ascendent: number;
  showDropdown: boolean = false;
  blockPoint: number;
  orderNumber: number = 0;
  constructor(
    private missionsRepository: MissionsRepository,
    private router: Router,
    private dialogService: DialogService,
    private utilsTitle: UtilsTitle
  ) {
    this.utilsTitle.suscribeRoutesTitle();
  }
  ngAfterViewChecked() {
    // Solo obtenemos la posición del punto de bloqueo si el contenido está visible
    if (this.showDropdown) {
      const blockPointElement = document.getElementById('blockPoint');
      if (blockPointElement) {
        this.blockPoint = blockPointElement.offsetTop;
      }
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop >= this.blockPoint) {
      window.scrollTo(0, this.blockPoint);
    }
  }

  toggleButtons(isActive: boolean) {
    this.isActiveButton = isActive;
    this.orderNumber = 0;
  }

  order(param: number){
    this.ascendent = param;
    if(this.showDropdown){
      this.showDropdown = false;
    }
  }
  close(){
    this.showDropdown = false;
  }
  onClick(): void {
    this.showDropdown = !this.showDropdown;
    if (!this.showDropdown) {
      // Resetea el scroll al ocultar el contenido
      window.scrollTo(0, 0);
    } else {
      // Forzar la detección de cambios para actualizar la posición del blockPoint
      setTimeout(() => this.ngAfterViewChecked(), 0);
    }
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
  goBack() {
    this.router.navigate(['/main']);
  }

}
