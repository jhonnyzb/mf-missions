export class MissionInactiveListModel {
  constructor(public missions: MissionInactiveModel[]) {}
}

export class MissionInactiveModel {

  constructor(
    public missionId: number,
    public name: string,
    public dateInitial: string,
    public dateFinal: string,
    public status: boolean,
    public totalAward: number,
    public missionActivities: MissionActivityInactiveModel[],
    public vencimiento: string,
    public participationStatusPhoto?: string,
    public participationStatusSurvey?: string
  ) {}
}

export class MissionActivityInactiveModel {
  constructor(
    public missionActivityId: number,
    public missionTypeId: number,
    public description: string,
    public termsAndConditions: string,
    public dateInitial: string,
    public dateFinal: string,
    public award: number,
    public iconClass: string
  ) {}
}
