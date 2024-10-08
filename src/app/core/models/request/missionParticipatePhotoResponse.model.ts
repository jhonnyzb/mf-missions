export class MissionParticipatePhotoResponseModel {
  constructor(
    public participateMissionResourceId: number,
    public participateMissionId: number,
    public resourcePath: string,
    public resourceName: string,
    public resourceTypeId: number,
    public description: string
  ) {}
}
