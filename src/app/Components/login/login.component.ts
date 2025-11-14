import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/Models/user.model'
import {UserinfoService} from 'src/Services/userinfo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userarr!:User[];
  curruser!:User | undefined;
  message:string = '';
  constructor(private userinfo:UserinfoService, private router: Router) { 
   
  }

  loginForm = new FormGroup({
    user : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')])
    
  })

  ngOnInit(): void {
    this.userinfo.getData('signedusers').subscribe((data) =>this.userarr = data)
  }
 submit(){
     this.curruser = this.userarr.find((a:User)=>{
       return a.user === this.loginForm.value.user && a.password === this.loginForm.value.password
     })
     if(!this.curruser){
       localStorage.setItem('isLoggedIn', "true");
       localStorage.setItem('token',JSON.stringify(this.curruser));

       this.loginForm.reset();
       this.router.navigate(['home/viewpost']);
     }else{
       this.message = "Invalid Credentials"
     }
  }

}

