import { Injectable } from '@angular/core';
import { descrypt, encrypt } from './sesion-util';
import { ProgramDto } from 'src/app/infraestructure/dto/response/programsResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class ProgramUtil {
  constructor() {

  }

  getProgram(): ProgramDto {
    let program!: ProgramDto;
    if (sessionStorage.getItem('program')) {
      program = descrypt(sessionStorage.getItem('program') ?? '', 'program') as ProgramDto;
    }
    return program;
  }

}
