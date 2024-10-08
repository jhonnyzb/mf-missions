import * as CryptoJS from "crypto-js"
const ENCRIPTKEY = "V4l3pr0US3r"

export const encrypt = (data: any, key:string):string=>{

    return CryptoJS.AES.encrypt(data, ENCRIPTKEY+key).toString();
}

export const descrypt = <T>(valueEncrypt:string, key:string):T | null=> {

    const valueDescrypt = CryptoJS.AES.decrypt(valueEncrypt, ENCRIPTKEY+key).toString(CryptoJS.enc.Utf8);
    if (!valueDescrypt) {
        return null
    }
    return JSON.parse(valueDescrypt) as T
}
