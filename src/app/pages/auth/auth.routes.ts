import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Error } from './error';
import { Registrar } from './Registrar';
import { RecoverPasswordComponent } from './RecoveryPassword';
import { VerifyCodeComponent } from './veryCode';
import { Identificacion } from './Identificacion';



export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'Registrar', component: Registrar },
    { path: 'Recovery-password', component: RecoverPasswordComponent },
    { path: 'veryCode', component: VerifyCodeComponent },
    { path: 'Identificacion', component: Identificacion },
] as Routes;
