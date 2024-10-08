export class MissionParticipateRequestModel {
  constructor(
    public participateMissionId: number,
    public missionActivityId: number,
    public accountId: number,
    public programId: number,
    public description: string,
    public File: FileParticipateModel
  ) {}
}

export class FileParticipateModel {
  constructor(
    public ImageData: string,
    public ImageName: string,
    public ImageExtension: string
  ) {}
}
