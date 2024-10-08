export interface MissionInactiveListDto{
  missions: MissionInactiveDto[]
}

export interface MissionInactiveDto {
  missionId: number
  name: string
  dateInitial: string
  dateFinal: string
  status: boolean
  totalAward: number
  participationStatusPhoto?: string
  participationStatusSurvey?: string
  missionActivities: MissionActivityInacvitveDto[]
}

export interface MissionActivityInacvitveDto {
  missionActivityId: number
  missionTypeId: number
  description: string
  termsAndConditions: string
  dateInitial: string
  dateFinal: string
  award: number
}
