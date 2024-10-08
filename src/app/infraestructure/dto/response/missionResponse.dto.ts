export interface MissionResponseDto {
  missions: MissionDto[]
}

export interface MissionDto {
  participationStatus: boolean
  participationStatusPhoto: boolean
  participationStatusSurvey: boolean
  missionId: number
  name: string
  dateInitial: string
  dateFinal: string
  status: boolean
  totalAward: number
  missionActivities: MissionActivityDto[],
  image: string
}

export interface MissionActivityDto {
  missionActivityId: number
  missionTypeId: number
  description: string
  termsAndConditions: string
  dateInitial: string
  dateFinal: string
  award: number
  minimumPhotos?: number
  maximumPhotos?: number
  descriptionByPhoto: boolean
  surveyUrl?: string
  participateMissions: ParticipateMissionDto[]
}

export interface ParticipateMissionDto {
  participateMissionId: number
  missionActivityId: number
  accountId: number
  score: string
  participateMissionResources: ParticipateMissionResourceDto[]
}

export interface ParticipateMissionResourceDto {
  participateMissionResourceId: number
  resourcePath: string
  resourceName: string
  resourceTypeId: number
}

