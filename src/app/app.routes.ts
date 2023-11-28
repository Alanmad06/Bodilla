import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InvitadosComponent } from './components/invitados/invitados.component';
import { MenuComponent } from './components/menu/menu.component';
import { TrajesCentroMesaComponent } from './components/trajes-centro-mesa/trajes-centro-mesa.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { NoviaComponent } from './components/trajes-centro-mesa/novia/novia.component';
import { NovioComponent } from './components/trajes-centro-mesa/novio/novio.component';
import { CentroMesaComponent } from './components/trajes-centro-mesa/centro-mesa/centro-mesa.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FogotPasswordComponent } from './components/fogot-password/fogot-password.component';
import { RecuerdosComponent } from './components/recuerdos/recuerdos.component';


export const routes: Routes = [
{path :"" ,component:HomeComponent},
{path: "invitados", component:InvitadosComponent},
{path: "menu", component:MenuComponent},
{path: "trajesCentro", component:TrajesCentroMesaComponent,
children:[
{path: "novia", component:NoviaComponent},
{path: "novio", component:NovioComponent},
{path: "centro-mesa", component:CentroMesaComponent}]
},
{path: "informacion", component:InformacionComponent},
{path: "login", component:LoginComponent},
{path: "register", component:RegisterComponent},
{path: "forgotpassword", component:FogotPasswordComponent},
{path: "recuerdos", component:RecuerdosComponent}

];
