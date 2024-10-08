import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getSession } from "src/app/core/encryptData";
import { MissionEnum } from "src/app/core/enums/MissionEnum";
import { GTMSelectContent } from "src/app/core/models/gtm/gtmSelectContent.model";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { MissionActivityModel, MissionModel } from "src/app/core/models/response/missionResponse.model";
import { UserUtils } from "src/app/core/utils/UserUtils";
import { descrypt } from "src/app/core/utils/sesion-util";

@Component({
  selector: "app-mission-detail",
  templateUrl: "./mission-detail.component.html",
  styleUrls: ["./mission-detail.component.scss"],
})
export class MissionDetailComponent implements OnInit {
  missionTipe: MissionEnum;
  redirect: string;
  activityNumber: number = getSession<number>('activityNumber');
  mission: MissionModel;
  activity: MissionActivityModel;
  showPanelToDo = false;
  showPanelTerm = false;

  misionActiva = true;
  userLoguedValepro: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  constructor(private router: Router, private userUtils: UserUtils,) {
    this.mission = getSession<MissionModel>('currentMission');
    this.activity = getSession<MissionActivityModel>('currentActivity');
  }

  ngOnInit(): void {
    this.mission = descrypt(sessionStorage.getItem("currentMission"), 'currentMission');
    this.identificateMissionTipe();
  }

  identificateMissionTipe() {
    switch (this.activity.missionTypeId) {
      case MissionEnum.photo:
        this.missionTipe = MissionEnum.photo;
        this.redirect = "/main/missions/photo";
        break;
      case MissionEnum.poll:
        this.missionTipe = MissionEnum.poll;
        this.redirect = "/main/missions/survys";
        break;
      case MissionEnum.audio:
        this.missionTipe = MissionEnum.audio;
        this.redirect = "/main/missions/";
        break;
      case MissionEnum.video:
        this.missionTipe = MissionEnum.video;
        this.redirect = "/main/missions/";
        break;
    }
  }

  completeMission() {
    this.sendGtmData();
    this.router.navigate([this.redirect]);
  }

  goBack() {
    this.router.navigate(["/main/missions"]);
  }
  sendGtmData() {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Misiones",
      ParameterLocation: "Misiones Participa",
      ParameterType: "botón",
      ParameterCategory: "Misiones Ingreso Actividad",
      IDAccount: this.userLoguedValepro.AccountId,
      UserName: this.userLoguedValepro.UserName,
      IDProgram: this.userLoguedValepro.ProgramId,
      IDPerson: this.userLoguedValepro.PersonId,
      ParameterText: `${this.mission.name} + ${'Participa y gana aquí'}`,
      ParameterItemID: this.mission.missionId.toString(),
      Currency: "",
      value: ""
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }

  changePanelToDo(){
    this.showPanelToDo = !this.showPanelToDo;
    if (this.showPanelToDo) {
      this.showPanelTerm = false;
    }
  }

  changePanelTerm(){
    this.showPanelTerm = !this.showPanelTerm;
    if (this.showPanelTerm) {
      this.showPanelToDo = false;
    }
  }
}
