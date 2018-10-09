import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './workspace/body/body.component';
import { NavbarComponent } from './workspace/navbar/navbar.component';
import { HeaderComponent } from './workspace/header/header.component';

const routes: Routes = [
  {path: '', redirectTo: 'header', pathMatch: 'full'},
  { path: 'navbar', component: NavbarComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'body', component: BodyComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
