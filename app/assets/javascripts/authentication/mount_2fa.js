// imports
import { initWebauthnAuthenticate, initWebauthnRegister } from './webauthn';

// constando autenticação de mount2fa
export const mount2faAuthentication = () => {
    initWebauthnAuthenticate();
};

// constando registro de mount2fa
export const mount2faRegistration = () => {
    initWebauthnRegister();
};
