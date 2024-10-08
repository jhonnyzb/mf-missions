import { ErrorDto } from "./errorResponse.dto";

export interface ProgramDto{
  IDPrograma: number;
  Programa: string;
  Descripcion: string;
  EsMultiPais: boolean;
  URLTerminosCondicionesApp: string;
  URLCondicionesProgramaApp: string;
  URLPoliticasDivulgacionApp: string;
  IsVisibleURLPoliticasDivulgacionApp: boolean;
  URLTyCCatalogo: string;
  IsVisibleActualizarVersionApp: boolean;
  TieneResumenDePuntos: boolean;
  IDTipoPrograma: number;
  FechaInicioVigencia: Date;
  FechaFinalVigencia: Date;
  IDEstado: number;
  TipoPrograma: string;
  Estado: string;
  RequiereRespuestaAPreguntaDeSeguridad: boolean;
  RequierePreguntasParaRedemir: boolean;
  ValidacionIdentidadNoPreguntas: number;
  ValidacionIdentidadNoMinimoRptasCorrectas: number;
  NumeroCallCenterBta: string;
  NumeroCallCenterPais: string;
  DireccionContacto: string;
  EmailContacto: string;
  RequiereCuestionarioActivarUsuario: boolean;
  PermiteActualizarDatosIdentificacion: boolean;
  PermiteActualizarDatosBasicos: boolean;
  PermiteActualizarDirecciones: boolean;
  PermiteActualizarDatosContacto: boolean;
  RequiereActualizarInfoPersona: boolean;
  IDTipoPersona: number;
  IDPais: number;
  Pais: string;
  DigitosDecimales: number;
  AppEsCerrada: boolean;
  InfoAppCerrada: string;
  RegistroSolicitaCedula: boolean;
  IntentosReenvioMensajesPassword: number;
  MensajeErrorReenvioMensajesPassword: string;
  RequiereActualizarClave: boolean;
  IDActualizarDatos: number;
  OAuthProviders: any[];
  App_InfoCalendarioRedencion: string;
  AccesoRedesSociales: boolean;
  PermiteRegistroPlataforma: boolean;
  IDEmpresaPromotoraPpal: number;
  IDPunto: number;
  PermitirCantidadEnRedencion: boolean;
  CantidadMaximaEnRedencion: number;
  Error: ErrorDto;
  IDMonedaGL: number;
  HomeDefault: string;
  ActualizarTyC: boolean;
  MenusAcceso: MenusAccesoDto[];
  UrlOrigen: string;
  SolicitaCalificacionTienda: boolean;
  MensajeCalificacionTienda: string;
  MostrarPrimerPasoRegistro: boolean;
  MaximoItemsRedencion: number;
  MensajeErrorMaximoItemsRedencion: string;
  PorcentajePagoEnPuntos: number;
  RegistrarSalesManago: boolean;
  MostrarWelcomeKit: boolean;
  iOSPruebaTienda: boolean;
  MostrarOnboarding: boolean;
  URLBienvenida: string;
  MostrarPuntos: boolean;
  IDOrdenamientoPremios: number;
  AutorizadorDeCodigoParaActualizarDatos: boolean;
  AutorizadorDeCodigoParaRedimirPremio: boolean;
  PermiteLoginConCodigo: boolean;
  MostrarBuscador: boolean;
  MostrarArticulosParaTi: boolean;
  RecaptchaVisible: boolean;
  MaximoIntentosLogin: number;
  EstadoEmailVerificado: number;
  EstadoTelefonoMovilVerificado: number;
}

export interface SubMenuSeccion2Dto {
  SubMenus: any[];
}

export interface SubMenuDto {
  IDPagina: number;
  IDMenu: number;
  PermiteAcceso: boolean;
  MenuTexto: string;
  ObjectPosition: number;
  AsociatedModule: number;
  AsociatedCluster: number;
  SubMenuSeccion: SubMenuSeccion2Dto;
  PageName: string;
}

export interface SubMenuSeccionDto {
  SubMenus: SubMenuDto[];
}

export interface LabelsDto {
  LabelHome: string;
  LabelServicios: string;
}

export interface MenusAccesoDto {
  IDPagina: number;
  IDMenu: number;
  PermiteAcceso: boolean;
  MenuTexto: string;
  ObjectPosition: number;
  AsociatedModule: number;
  AsociatedCluster: number;
  SubMenuSeccion: SubMenuSeccionDto;
  Labels: LabelsDto;
  PageName: string;
}
