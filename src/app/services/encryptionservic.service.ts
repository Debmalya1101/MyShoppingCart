import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionservicService {

  constructor() { }

  encryptPassword(pass:string):string{
    let key = CryptoJS.enc.Utf8.parse('1203199320052021');
    let iv = CryptoJS.enc.Utf8.parse('1203199320052021');
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(pass), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
     });
     return encrypted.toString();
  }
}
