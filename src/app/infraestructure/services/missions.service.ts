import { ResponseBaseDto } from './../dto/response/responseBase.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MissionsRepository } from '../../core/repositories/missions.repository';
import { ResponseBaseModel } from '../../core/models/response/responseBase.model';
import { MissionResponseDto } from '../dto/response/missionResponse.dto';
import { Observable, map } from 'rxjs';
import { MissionResponseModel } from '../../core/models/response/missionResponse.model';
import { MissionMapper } from '../../core/mappers/missions.mapper';
import { MissionParticipateRequestModel } from '../../core/models/request/participateMission.request.model';
import { MissionSurveyParticipateRequestModel } from '../../core/models/request/missionSurveyParticipateRequest.model';
import { MissionParticipatePhotoResponseDto } from '../dto/response/missionParticipatePhotoResponse.dto';
import { MissionParticipatePhotoResponseModel } from '../../core/models/request/missionParticipatePhotoResponse.model';
import { DeleteMissionResourceDto } from '../dto/response/deleteResourceMission.dto';
import { DeleteMissionResourceModel } from '../../core/models/response/deleteResourceMission.model';
import { MissionInactiveListDto } from '../dto/response/missionInactiveResponse.dto';
import { MissionInactiveListModel } from '../../core/models/response/missionInactiveResponse.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MissionsService implements MissionsRepository {


  http: HttpClient = inject(HttpClient);

  getMissionsByAccount(accountId: number): Observable<ResponseBaseModel<MissionResponseModel>> {
    return this.http.get<ResponseBaseDto<MissionResponseDto>>(environment.apiValepro + '/missions-api/api/v1/participations/missions-actives?accountId=' + accountId).pipe(
      map((response: ResponseBaseDto<MissionResponseDto>) => {
        return {
          codeId: response.codeId,
          message: response.message,
          data: MissionMapper.missionListApiToDomain(response.data)
        }
      }
      ));
    }

    getMissionsInactivityByAccount(accountId: number): Observable<ResponseBaseModel<MissionInactiveListModel>> {
      return this.http.get<ResponseBaseDto<MissionInactiveListDto>>(environment.apiValepro + '/missions-api/api/v1/participations/missions-inactives?accountId=' + accountId).pipe(
        map((response: ResponseBaseDto<MissionInactiveListDto>) => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: MissionMapper.mapMissionInactiveListApiToDomain(response.data)
          }
        }
        ));
    }

    participateMissionPhoto(model: MissionParticipateRequestModel): Observable<ResponseBaseModel<MissionParticipatePhotoResponseModel>> {
      let request = MissionMapper.mapParticipateDomainToApiPhoto(model);
      return this.http.post<ResponseBaseDto<MissionParticipatePhotoResponseDto>>(environment.apiValepro + '/missions-api/api/v1/participations/save-resource', request);
    }

  participateMissionSurvey(model: MissionSurveyParticipateRequestModel): Observable<ResponseBaseModel<boolean>> {
    let request = MissionMapper.mapParticipateDomainToApiSurvey(model);
    return this.http.post<ResponseBaseDto<boolean>>(environment.apiValepro + '/missions-api/api/v1/participations/save-survey', request);
  }

  deleteResourcePhotoMission(participateResourceId: number, participateMissionId: number, missionActivityId: number): Observable<ResponseBaseModel<DeleteMissionResourceModel>> {
    let path: string  = `/missions-api/api/v1/participations/delete-resource?participateResourceId=${participateResourceId}&participateMissionId=${participateMissionId}&missionActivityId=${missionActivityId}`;
    return this.http.delete<ResponseBaseDto<DeleteMissionResourceDto>>(environment.apiValepro + path).pipe(
      map((result: ResponseBaseDto<DeleteMissionResourceDto>) => {
        return {
          codeId: result.codeId,
          message: result.message,
          data: MissionMapper.mapResultDeleteResourceApiToDomain(result.data)
        }
      }
      ));
  }

}
