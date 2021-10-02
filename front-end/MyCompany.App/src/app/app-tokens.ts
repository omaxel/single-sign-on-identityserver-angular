import {InjectionToken} from "@angular/core";
import {AppNameEnum} from "./app-name.enum";

export const APP_NAME = new InjectionToken<AppNameEnum>('app-name');
export const HEADER_BACKGROUND = new InjectionToken<string>('header-background');
