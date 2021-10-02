import {Injectable} from '@angular/core';
import {OAuthStorage} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthLocalStorageService implements OAuthStorage {
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setItem(key: string, data: string): void {
    localStorage.setItem(key, data);
  }
}
