export class MissionResponseModel {
  constructor(public missions: MissionModel[]) {}
}

export class MissionModel {
  constructor(
    public participationStatus: boolean,
    public participationStatusPhoto: boolean,
    public participationStatusSurvey: boolean,
    public missionId: number,
    public name: string,
    public dateInitial: string,
    public dateFinal: string,
    public status: boolean,
    public totalAward: number,
    public missionActivities: MissionActivityModel[],
    public vencimiento: string,
    public image: string
  ) {}
}

export class MissionActivityModel {
  constructor(
    public missionActivityId: number,
    public missionTypeId: number,
    public description: string,
    public termsAndConditions: string,
    public dateInitial: string,
    public dateFinal: string,
    public award: number,
    public descriptionByPhoto: boolean,
    public participateMissions: ParticipateMissionModel[],
    public iconClass: string,
    public minimumPhotos?: number,
    public maximumPhotos?: number,
    public surveyUrl?: string,
  ) {}
}

export class ParticipateMissionModel {
  constructor(
    public participateMissionId: number,
    public missionActivityId: number,
    public accountId: number,
    public score: string,
    public participateMissionResources: ParticipateMissionResource[]
  ) {}
}

export class ParticipateMissionResource {
  constructor(
    public participateMissionResourceId: number,
    public resourcePath: string,
    public resourceName: string,
    public resourceTypeId: number
  ) {}
}
