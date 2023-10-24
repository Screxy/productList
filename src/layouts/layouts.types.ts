export enum AppLayoutsEnum {
  default = 'default',
  login = 'login',
}

export const AppLayoutToFileMap: Record<AppLayoutsEnum, string> = {
  default: 'AppLayoutDefault.vue',
  login: 'AppLayoutLogin.vue',
}
