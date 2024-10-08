import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { getSession } from 'src/app/core/encryptData';
import { MissionEnum } from 'src/app/core/enums/MissionEnum';
import { MissionSurveyParticipateRequestModel } from 'src/app/core/models/request/missionSurveyParticipateRequest.model';
import { LoginValeproResponseModel } from 'src/app/core/models/response/loginValeproResponse.model';
import { MissionModel, MissionActivityModel } from 'src/app/core/models/response/missionResponse.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { MissionsRepository } from 'src/app/core/repositories/missions.repository';
import { CuentasDto, LstPuntosVencimientoDto } from 'src/app/infraestructure/dto/response/cuentas.dto';


@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  mission: MissionModel;
  activity: MissionActivityModel;
  account: CuentasDto;
  puntos: LstPuntosVencimientoDto;
  takingPhoto = false;
  url:any;
  activityNumber: number = getSession<number>('activityNumber');


  panelOpenState= false;
  userLoguedValepro: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');

  constructor(
    private missionsRepository: MissionsRepository,
    private router :Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.mission = getSession<MissionModel>('currentMission');
    this.activity = getSession<MissionActivityModel>('currentActivity');
    this.account = getSession<CuentasDto>('account');
    this.url =  this.sanitizer.bypassSecurityTrustResourceUrl(this.activity.surveyUrl);
    this.participate();
  }


 participate(){
  let request: MissionSurveyParticipateRequestModel = {
    MissionActivityId: this.activity.missionActivityId,
    AccountId: this.userLoguedValepro.AccountId
  }
  this.missionsRepository.participateMissionSurvey(request).subscribe({
    next:(data: ResponseBaseModel<any>) => {},
    error:(err: HttpErrorResponse) => {console.error(err)},
  });
 }

  buildUrl(){
    this.url = this.mission.missionActivities.find(a => a.missionTypeId == MissionEnum.poll).surveyUrl;
    this.url = this.url.replace("[IDCuenta_value]", this.account.IDCuenta.toString());
    this.url = this.url.replace("[Nombrepersona_value]", this.account.NombresPersonaCuenta);
    this.url = this.url.replace("[IDpersona_value]", this.account.IDPersona.toString());
    this.url = this.url.replace("[IDPrograma_value]", this.account.IDPrograma.toString());
    this.url = this.url.replace("[IDCluster_value]", this.account.IDCluster.toString());
    this.url = this.url.replace("[IDNumeroidentificacion_value]", this.account.NumeroIdentificacion);
    this.url = this.url.replace("[Tipoidentificacion_value]", this.account.IDTipoIdentificacion.toString());
    this.url = this.url.replace("[IDMision_value]", this.mission.missionId.toString());
    this.url = this.url.replace("[IDActividad_value]", this.mission.missionActivities.find(a => a.missionTypeId == MissionEnum.poll).missionActivityId.toString());
    //------------
    this.url = this.url.replace("{1}", this.account.IDCuenta.toString());
    this.url = this.url.replace("{5}", this.account.NombresPersonaCuenta);
    this.url = this.url.replace("{0}", this.account.IDPersona.toString());
    this.url = this.url.replace("{2}", this.account.IDPrograma.toString());
    this.url = this.url.replace("{7}", this.account.IDCluster.toString());
    this.url = this.url.replace("{6}", this.account.NumeroIdentificacion);
    this.url = this.url.replace("{9}", this.account.Programa);
    this.url = this.url.replace("{10}", this.account.IDTipoIdentificacion.toString());
    this.url = this.url.replace("{3}", this.mission.missionId.toString());
    this.url = this.url.replace("{4}", this.mission.missionActivities.find(a => a.missionTypeId == MissionEnum.poll).missionActivityId.toString());

  }

  goBack(){
    this.router.navigate(['/main/missions/detail']);
}

}
