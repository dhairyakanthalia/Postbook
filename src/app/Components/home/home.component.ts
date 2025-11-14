import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserinfoService } from 'src/Services/userinfo.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/Models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  curruser!:User;
  constructor(private userinfo:UserinfoService, private router:Router,private Route: ActivatedRoute) { }
  
  ngOnInit(): void {

    const routeParams = this.Route.snapshot.paramMap;
    const Id = Number(routeParams.get('id'));
    this.curruser = JSON.parse(localStorage.getItem('token') || '{}');
    if(this.curruser){
    }
    else{
      this.router.navigate(['login']);
      localStorage.clear();
    }
    
  }

  logout(){
    localStorage.setItem('isLoggedIn','false');
    localStorage.setItem('token','')
  }


 
 
}
