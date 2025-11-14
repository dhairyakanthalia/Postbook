import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from 'src/Authguard/authguard.guard';
import { CreateNewPostComponent } from './Components/create-new-post/create-new-post.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ViewpostComponent } from './Components/viewpost/viewpost.component';

const routes: Routes = [{
  path:'',
  redirectTo : '/login',
  pathMatch:'full'
},
{
  component:LoginComponent,
  path:'login',
},
{
  component:SignupComponent,
  path:'signup'
},
{
  component:HomeComponent,
  path:'home',
  children:[{
    component:ViewpostComponent,
    path:'viewpost',
    canActivate : [AuthguardGuard]
  },{
    component:CreateNewPostComponent,
    path:'create/:id',
    canActivate : [AuthguardGuard]
  },
{
  component:ProfileComponent,
    path:'profile/:id',
    canActivate : [AuthguardGuard]
}],
  canActivate : [AuthguardGuard]
}
,
{
  component:NotfoundComponent,
  path:'**'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
