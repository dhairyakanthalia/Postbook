import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserinfoService} from 'src/Services/userinfo.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  message:string='';
  signupForm = new FormGroup({
    fname : new FormControl('',[Validators.required,Validators.minLength(2)]),
    lname : new FormControl('',[Validators.required,Validators.minLength(2)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    user : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]),
    cpassword : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')])
  })
  constructor(private userinfo:UserinfoService, private router:Router) { }

  ngOnInit(){
  }
  submit(){
    this.userinfo.saveData(this.signupForm.value,'signedusers').subscribe({next :data=>{
      this.signupForm.reset();
      setTimeout(() => {
        this.router.navigate(['login']);  
      }, 1500);
    }
    ,error:error=>{
      this.message ="You are already signed up."
      console.error();
    }
  });
     
  }

  }