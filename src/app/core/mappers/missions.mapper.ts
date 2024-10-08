import { ParticipateMissionModel } from './../models/response/missionResponse.model';
import { ParticipateRequestDto } from "../../infraestructure/dto/request/participateMission.request.dto";
import { MissionActivityDto, MissionDto, MissionResponseDto, ParticipateMissionDto, ParticipateMissionResourceDto } from "../../infraestructure/dto/response/missionResponse.dto";
import { MissionActivityModel, MissionModel, MissionResponseModel, ParticipateMissionResource } from "../models/response/missionResponse.model";
import { MissionParticipateRequestModel } from '../models/request/participateMission.request.model';
import { MissionSurveyParticipateRequestModel } from '../models/request/missionSurveyParticipateRequest.model';
import { MissionSurveyParticipateRequestDto } from '../../infraestructure/dto/request/missionSurveyParticipateRequest.dto';
import { DeleteMissionResourceDto } from '../../infraestructure/dto/response/deleteResourceMission.dto';
import { DeleteMissionResourceModel } from '../models/response/deleteResourceMission.model';
import { MissionActivityInactiveModel, MissionInactiveListModel, MissionInactiveModel } from '../models/response/missionInactiveResponse.model';
import { MissionActivityInacvitveDto, MissionInactiveDto, MissionInactiveListDto } from '../../infraestructure/dto/response/missionInactiveResponse.dto';

export class MissionMapper {

  static missionListApiToDomain(dto: MissionResponseDto): MissionResponseModel {
    return new MissionResponseModel(
      this.mapMissionDtosToModels(dto.missions)
    );
  }

  static mapMissionDtosToModels(dtos: MissionDto[]): MissionModel[] {
    return dtos.map(dto =>
      new MissionModel(
        dto.participationStatus,
        dto.participationStatusPhoto,
        dto.participationStatusSurvey,
        dto.missionId,
        dto.name,
        dto.dateInitial,
        dto.dateFinal,
        dto.status,
        dto.totalAward,
        this.mapMissionActivityDtosToModels(dto.missionActivities),
        '',
        dto.image
      )
    );
  }

  static mapMissionActivityDtosToModels(dtos: MissionActivityDto[]): MissionActivityModel[] {
    return dtos.map(dto =>
      new MissionActivityModel(
        dto.missionActivityId,
        dto.missionTypeId,
        dto.description,
        dto.termsAndConditions,
        dto.dateInitial,
        dto.dateFinal,
        dto.award,
        dto.descriptionByPhoto,
        this.mapParticipateMissionDtosToModels(dto.participateMissions),
        '',
        dto.minimumPhotos,
        dto.maximumPhotos,
        dto.surveyUrl
      )
    );
  }

  static mapParticipateMissionDtosToModels(dtos: ParticipateMissionDto[]): ParticipateMissionModel[] {
    return dtos.map(dto =>
      new ParticipateMissionModel(
        dto.participateMissionId,
        dto.missionActivityId,
        dto.accountId,
        dto.score,
        this.mapParticipateMissionResourceDtosToModels(dto.participateMissionResources)
      )
    );
  }

  static mapParticipateMissionResourceDtosToModels(dtos: ParticipateMissionResourceDto[]): ParticipateMissionResource[] {
    return dtos.map(dto =>
      new ParticipateMissionResource(
        dto.participateMissionResourceId,
        dto.resourcePath,
        dto.resourceName,
        dto.resourceTypeId
      )
    );
  }

  static mapParticipateDomainToApiPhoto(model: MissionParticipateRequestModel): ParticipateRequestDto{
    return {
      AccountId: model.accountId,
      Description: model.description,
      MissionActivityId: model.missionActivityId,
      ParticipateMissionId: model.participateMissionId,
      ProgramId: model.programId,
      File: {
        ImageData: model.File.ImageData,
        ImageExtension: model.File.ImageExtension,
        ImageName: model.File.ImageName
      }
    }
  }

  static mapParticipateDomainToApiSurvey(model: MissionSurveyParticipateRequestModel): MissionSurveyParticipateRequestDto{
    return {
      accountId: model.AccountId,
      missionActivityId: model.MissionActivityId,
    }
  }

  static mapResultDeleteResourceApiToDomain(dto: DeleteMissionResourceDto): DeleteMissionResourceModel{
    return new DeleteMissionResourceModel(dto.deleteActivityStatus);
  }


    static mapMissionActivityDtoToModel(dto: MissionActivityInacvitveDto): MissionActivityInactiveModel {
      return new MissionActivityInactiveModel(
        dto.missionActivityId,
        dto.missionTypeId,
        dto.description,
        dto.termsAndConditions,
        dto.dateInitial,
        dto.dateFinal,
        dto.award,
        ''
      );
    }

    static mapMissionDtoToModel(dto: MissionInactiveDto): MissionInactiveModel {
      return new MissionInactiveModel(
        dto.missionId,
        dto.name,
        dto.dateInitial,
        dto.dateFinal,
        dto.status,
        dto.totalAward,
        dto.missionActivities.map(activityDto => this.mapMissionActivityDtoToModel(activityDto)),
        '', // Asegúrate de proporcionar un valor adecuado para vencimiento
        dto.participationStatusPhoto,
        dto.participationStatusSurvey
      );
    }

    static mapMissionInactiveListApiToDomain(dto: MissionInactiveListDto): MissionInactiveListModel {
      return new MissionInactiveListModel(
        dto.missions.map(missionDto => this.mapMissionDtoToModel(missionDto))
      );
    }

}
