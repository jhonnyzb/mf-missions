import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { HttpErrorResponse } from '@angular/common/http';
import { getSession, saveSession } from 'src/app/core/encryptData';
import { MissionEnum } from 'src/app/core/enums/MissionEnum';
import { GTMSelectContent } from 'src/app/core/models/gtm/gtmSelectContent.model';
import { MissionParticipatePhotoResponseModel } from 'src/app/core/models/request/missionParticipatePhotoResponse.model';
import { FileParticipateModel, MissionParticipateRequestModel } from 'src/app/core/models/request/participateMission.request.model';
import { DeleteMissionResourceModel } from 'src/app/core/models/response/deleteResourceMission.model';
import { MissionModel, MissionActivityModel, ParticipateMissionResource, ParticipateMissionModel } from 'src/app/core/models/response/missionResponse.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { MissionsRepository } from 'src/app/core/repositories/missions.repository';
import { ProgramUtil } from 'src/app/core/utils/ProgramUtil';
import { UserUtils } from 'src/app/core/utils/UserUtils';
import { DialogParams } from 'src/app/core/models/gtm/dialogParams.model';
import { LoginValeproResponseModel } from 'src/app/core/models/response/loginValeproResponse.model';
import { DialogService } from 'src/app/infraestructure/services/dialog.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';



@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  btnAccion!: boolean;
  takephoto!: boolean;
  takeimg!: boolean;
  trigger: Subject<void> = new Subject<void>();
  webcamImage!: WebcamImage;
  isLoading: boolean = false;
  nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  webcamProperties = {
    Width: window.innerWidth < 1001 ? ((window.innerWidth * 90) / 100) : 300,
    Height: 200
  };
  photo_loaded!: File | null;
  tempImage: any;
  mission: MissionModel;
  activity: MissionActivityModel;
  userLoguedValepro: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  activityNumber: number = getSession<number>('activityNumber');
  form: FormGroup;


  constructor(
    private missionsRepository: MissionsRepository,
    private programUtil: ProgramUtil,
    private router: Router,
    private userUtils: UserUtils,
    private imageCompress: NgxImageCompressService,
    private dialogService: DialogService,
    private fb: FormBuilder
  ) {
    this.mission = getSession<MissionModel>('currentMission');
    this.activity = getSession<MissionActivityModel>('currentActivity');
    
  }

  ngOnInit(){
    this.form = this.fb.group({
      imageDescription: [null, [this.conditionalRequired(() => this.activity.descriptionByPhoto)]]
    });
  }

  async uploadPhoto(target: any) {
    if (this.activity.participateMissions[0]?.participateMissionResources.length >= this.activity.maximumPhotos) {
      let params: DialogParams = {
        msg: 'No puedes agregar más fotos a esta actividad. Recuerda que para esta actividad, debes subir como mínimo ' + this.activity.minimumPhotos + ' fotos y como máximo ' + this.activity.maximumPhotos + ' fotos.',
        page: undefined,
        success: false,
        confirmText: 'Volver'
      }
      this.dialogService.openConfirmDialog(params.msg, params);
      return;
    }
    if (target.files.length <= 0) return;
    this.photo_loaded = target.files[0];
    try {
      const imageUrl = URL.createObjectURL(target.files[0]);
      this.tempImage = imageUrl;
      this.imageCompress.compressFile(imageUrl, -1, 50, 50).then(
        result => {
          this.tempImage = result;
        },
        error => {
          console.error('Error al comprimir la imagen:', error);
        }
      );
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  }

  sendPhotoToServer(fileCompress: File, imgData: string) {
    this.isLoading = true;
    this.takephoto = false;
    this.takeimg = false;

    const imageData = imgData.split(',')[1];
    const imageName = fileCompress.name;
    let imageExtension: string = imageName.split('.').pop() ?? '';
    const imageWhitOutExtension = imageName.replaceAll(`.${imageExtension}`, '').replace(/ /g, "");

    let image: FileParticipateModel = {
      ImageData: imageData,
      ImageName: imageWhitOutExtension,
      ImageExtension: `.${imageExtension}`
    }

    let request: MissionParticipateRequestModel = {
      participateMissionId: this.activity.participateMissions.length > 0 ? this.activity.participateMissions[this.activity.participateMissions.length - 1].participateMissionId : 0,
      missionActivityId: this.activity.missionActivityId,
      accountId: this.userLoguedValepro.AccountId,
      programId: this.userLoguedValepro.ProgramId,
      description: this.activity.descriptionByPhoto ? this.form.get('imageDescription').value : null,
      File: image
    }
    this.missionsRepository.participateMissionPhoto(request).subscribe({
      next: (data: ResponseBaseModel<MissionParticipatePhotoResponseModel>) => {
        this.isLoading = false;
        if (data.data) {
          this.photo_loaded = undefined;
          this.btnAccion = false;
          if (!this.activity.participateMissions[0]) {
            let resources: ParticipateMissionResource[] = [];
            resources.push(data.data);
            this.activity.participateMissions = [];
            this.activity.participateMissions.push(
              new ParticipateMissionModel(
                data.data.participateMissionId,
                this.activity.missionActivityId,
                this.userLoguedValepro.AccountId,
                null,
                resources));
          } else {
            this.activity.participateMissions[0].participateMissionResources.push(data.data);
          }
          let params: DialogParams = {
            msg: 'Agregaste un nuevo recurso a la misión.',
            page: undefined,
            success: true,
            confirmText: ''
          }
          this.dialogService.openConfirmDialog(params.msg, params);
          this.reloadActivity();
          this.form.reset();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.btnAccion = false;
        console.error(error);
      }
    })


  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  async handleImage(webcamImage: WebcamImage): Promise<void> {
    try {
      let date = new Date();
      this.webcamImage = webcamImage;
      const arr = this.webcamImage.imageAsDataUrl.split(",");
      const mime = RegExp(/:(.*?);/).exec(arr[0])?.[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let imageName = this.programUtil.getProgram().Programa + date.getDay() + date.getMonth() + date.getFullYear() + ".jpeg";
      let imageFormat = mime;
      const file: File = new File([u8arr], imageName, { type: imageFormat })
      this.photo_loaded = file;
      try {
        const imageUrl = URL.createObjectURL(file);
        this.tempImage = imageUrl;
        this.imageCompress.compressFile(imageUrl, -1, 50, 50).then(
          result => {
            this.tempImage = result;
          },
          error => {
            console.error('Error al comprimir la imagen:', error);
          }
        );
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }



  async urlToFile(url: string, filename: string) {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename);
  }

  acctionphoto() {
    if (this.btnAccion) {
      this.btnAccion = false;
      this.takephoto = false;
    }
    else {
      this.btnAccion = true;
      this.takeimg = true;
      this.takephoto = false;
    }
  }

  acctionImg() {
    if (this.activity.participateMissions[0]?.participateMissionResources.length >= this.activity.maximumPhotos) {
      let params: DialogParams = {
        msg: 'No puedes agregar más fotos a esta actividad. Recuerda que para esta actividad, debes subir como mínimo ' + this.activity.minimumPhotos + ' fotos y como máximo ' + this.activity.maximumPhotos + ' fotos.',
        page: undefined,
        success: false,
        confirmText: 'Volver'
      }
      this.dialogService.openConfirmDialog(params.msg, params);
      return;
    }
    if (this.btnAccion) {
      this.btnAccion = false;
      this.takeimg = false;
    }
    else {
      this.btnAccion = true;
      this.takephoto = true;
      this.takeimg = false;
    }
  }


  goBack() {
    if (this.activity.participateMissions[0].participateMissionResources.length < this.activity.maximumPhotos) {
      let params: DialogParams = {
        msg: 'La actividad no se puede completar. Recuerda que para esta actividad, debes subir como mínimo ' + this.activity.minimumPhotos + ' fotos y como máximo ' + this.activity.maximumPhotos + ' fotos.',
        page: undefined,
        success: false,
        confirmText: 'Volver'
      }
      this.dialogService.openConfirmDialog(params.msg, params);
    } else {
      let params: DialogParams = {
        msg: 'Actividad terminada con éxito',
        page: undefined,
        success: true,
        confirmText: 'Volver a misiones'
      }
      this.dialogService.openConfirmDialog(params.msg, params).afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigate(['/main/missions/detail']);
        }
      });
    }
  }
  goBackAll() {
    if (this.activity.participateMissions[0].participateMissionResources.length < this.activity.minimumPhotos) {
      let params: DialogParams = {
        msg: 'La actividad no se puede completar. Recuerda que para esta actividad, debes subir como mínimo ' + this.activity.minimumPhotos + ' fotos y como máximo ' + this.activity.maximumPhotos + ' fotos.',
        page: undefined,
        success: false,
        confirmText: 'Volver'
      }
      this.dialogService.openConfirmDialog(params.msg, params);
    } else {
      let params: DialogParams = {
        msg: '¡Actividad terminada con éxito!',
        page: undefined,
        success: true,
        confirmText: 'Volver a misiones'
      }
      this.dialogService.openConfirmSuccessDialog(params.msg, params).afterClosed().subscribe((result) => {
        if (result) {

          this.router.navigate(['/main/missions']);
        }
      });
    }
  }

  deleteResource(resource: ParticipateMissionResource, participation: ParticipateMissionModel) {
    let params: DialogParams = {
      msg: '¿Estás seguro que quieres eliminar este recurso?',
      page: undefined,
      success: false,
      confirmText: 'Aceptar'
    }
    this.dialogService.openConfirmInfoDialog(params.msg, params).beforeClosed().subscribe((result: boolean) => {
      if (result) {
        this.isLoading = true;
        this.missionsRepository.deleteResourcePhotoMission(
          resource.participateMissionResourceId,
          participation.participateMissionId,
          this.activity.missionActivityId).subscribe({
            next: (data: ResponseBaseModel<DeleteMissionResourceModel>) => {
              this.isLoading = false;
              this.btnAccion = false;
              if (data.data.DeleteResourceStatus) {
                this.activity.participateMissions.forEach((part) => {
                  let index = part.participateMissionResources.indexOf(resource);
                  if (index >= 0) {
                    part.participateMissionResources.splice(index, 1);
                  }
                });
                let params: DialogParams = {
                  msg: '¡' + data.message + '!',
                  page: undefined,
                  success: true,
                  confirmText: ''
                }
                this.dialogService.openConfirmSuccessDialog(params.msg, params);
                this.reloadActivity();
              }
            },
            error: (err: HttpErrorResponse) => {
              this.isLoading = false;
              this.btnAccion = false;
              console.error(err);
            }
          });
      }
    })
  }

  reloadActivity() {
    sessionStorage.removeItem('currentActivity');
    saveSession(this.activity, 'currentActivity');
  }

  sendGtmData() {
    let tagData: GTMSelectContent = {
      event: "select_content",
      IDAccount: this.userLoguedValepro.AccountId,
      IDProgram: this.userLoguedValepro.ProgramId,
      IDPerson: this.userLoguedValepro.PersonId,
      UserName: this.userLoguedValepro.UserName,
      ParameterTarget: "Misiones",
      ParameterLocation: "Misiones Actividades",
      ParameterType: "botón",
      ParameterCategory: "Misiones Envío Actividad",
      ParameterText: `${this.mission.name} + ${this.getMissionType(this.activity)}`,
      ParameterItemID: this.mission.missionId.toString(),
      Currency: '',
      value: ''
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');

  }


  cancel() {
    this.photo_loaded = null;
    this.tempImage = null;
    this.takephoto = false;
    this.takeimg = false;
    this.form.reset();
  }

  accept() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sendGtmData();
    this.sendPhotoToServer(this.photo_loaded, this.tempImage);
  }

  getMissionType(activity: MissionActivityModel): string {
    let missionType: string;
    switch (activity.missionTypeId) {
      case MissionEnum.photo:
        missionType = 'Camera'
        break;
      case MissionEnum.poll:
        missionType = 'Survey';
        break;
      case MissionEnum.audio:
        missionType = 'Audio';
        break;
      case MissionEnum.video:
        missionType = 'Video';
        break; default:
        missionType = 'Sin Misión'
        break;
    }
    return missionType;
  }

  conditionalRequired(requiredFn: () => boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (requiredFn() && !control.value) {
        return { required: true };
      }
      return null;
    };
  }
}

