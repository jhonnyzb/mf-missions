import { MissionSurveyParticipateRequestModel } from './../models/request/missionSurveyParticipateRequest.model';
import { Injectable } from '@angular/core';
import { ResponseBaseModel } from '../models/response/responseBase.model';
import { Observable } from 'rxjs';
import { MissionResponseModel } from '../models/response/missionResponse.model';
import { MissionParticipateRequestModel } from '../models/request/participateMission.request.model';
import { MissionParticipatePhotoResponseModel } from '../models/request/missionParticipatePhotoResponse.model';
import { DeleteMissionResourceModel } from '../models/response/deleteResourceMission.model';
import { MissionInactiveListModel } from '../models/response/missionInactiveResponse.model';


@Injectable({
  providedIn: 'root'
})
export abstract class MissionsRepository {
  abstract getMissionsByAccount(accountId: number): Observable<ResponseBaseModel<MissionResponseModel>>;
  abstract getMissionsInactivityByAccount(accountId: number): Observable<ResponseBaseModel<MissionInactiveListModel>>;
  abstract participateMissionPhoto(model: MissionParticipateRequestModel): Observable<ResponseBaseModel<MissionParticipatePhotoResponseModel>>;
  abstract participateMissionSurvey(model: MissionSurveyParticipateRequestModel): Observable<ResponseBaseModel<boolean>>;
  abstract deleteResourcePhotoMission(participateResourceId: number, participateMissionId: number, missionActivityId: number): Observable<ResponseBaseModel<DeleteMissionResourceModel>>;

}
