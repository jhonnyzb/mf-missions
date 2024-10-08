export interface ParticipateRequestDto {
  ParticipateMissionId: number
  MissionActivityId: number
  AccountId: number
  ProgramId: number
  Description: string
  File: FileParticipateDto
}

export interface FileParticipateDto {
  ImageData: string
  ImageName: string
  ImageExtension: string
}
