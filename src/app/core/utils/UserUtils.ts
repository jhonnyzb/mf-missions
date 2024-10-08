import { Injectable } from "@angular/core";
import { descrypt, encrypt } from "./sesion-util";
import { CuentasDto } from "src/app/infraestructure/dto/response/cuentas.dto";


@Injectable({
  providedIn: 'root'
})
export class UserUtils {
  userToken!: string;
  tokenExpires!: Date;
  roleId!: number;
  accountData!: CuentasDto;
}
