import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/Services/userinfo.service';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from '../comment/comment.component';
import { User } from 'src/Models/user.model';
import { Post } from 'src/Models/post.model';
import { Like } from 'src/Models/like.model';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  curruser! : User;
  posts !:Post[];
  postval!:number;
  liked! : Like[];
  disliked! : Like[];
  flag : boolean = false ;
  likeclick:boolean = true;
  dislikeclick:boolean=true;
  constructor(private userinfo:UserinfoService,private router:Router,private dialog:MatDialog,private Route: ActivatedRoute) { 
  }

  ngOnInit(): void {
   
    const routeParams = this.Route.snapshot.paramMap;
    const Id = Number(routeParams.get('id'));
    this.curruser = JSON.parse(localStorage.getItem('token') || '{}');
    if(Id!==this.curruser.id){
      this.router.navigate(['login']);
      localStorage.clear();
    }
  this.userinfo.getpost().subscribe((res)=>{
    this.posts = res.reverse();
   this.posts =  this.posts.filter(
      (element) => {
        return element.userid === this.curruser.id}
    );
  })
  this.userinfo.getlike('/liked').subscribe({next:data =>{
    this.liked = data;
  }})
  this.userinfo.getlike('/disliked').subscribe({next:data =>{
    this.disliked = data;
  }})
  }

  delete(id:number | undefined){

    for (let index = 0; index < this.posts.length; index++) {
      if(this.posts[index].id === id){
        this.postval = index;
      }
    }
    this.posts.splice(this.postval,1);
  }
  oncommentclick(id:number|undefined){
    for (let index = 0; index < this.posts.length; index++) {
      if(this.posts[index].id === id){
   this.dialog.open(CommentComponent,{data:[this.posts[index],this.curruser.id]});
      }
    }
  }

  onlikeclick(id:number|undefined){

    if(this.likeclick){
      for (let index = 0; index < this.posts.length; index++) {
        if(this.posts[index].id === id){
          this.postval = index;
        }
      }
          if(this.liked.length>0){
          
            for(let i = 0;i<this.liked.length;i++){
              if(this.liked[i].userid === this.curruser.id && this.liked[i].postid === id){
                this.flag=true
                this.userinfo.removelike(this.liked[i],'/liked').subscribe((res)=>{
                })
                this.liked.splice(i,1);
                this.posts[this.postval].likes -= 1;
              
              }
              else{
                this.flag = false
              }
            }
                if(this.flag === false){
                  this.posts[this.postval].likes += 1;
                    this.userinfo.savelike({
                      "userid" : this.curruser.id,
                      "postid" : this.posts[this.postval].id
                    },'/liked').subscribe((res) =>{
                      this.liked.push(res);
                    })
                }
    
              }
        
            else{
           
                this.posts[this.postval].likes += 1;
                this.userinfo.savelike({
                  "userid" : this.curruser.id,
                  "postid" : this.posts[this.postval].id
                },'/liked').subscribe((res) =>{
                  this.liked.push(res);
                })
              }
              
            
          this.userinfo.updatepost(this.posts[this.postval]).subscribe({
            next : data =>{
            },
            error : error =>{
              console.log(error);
            }
            
          });
    }
  
    }
    ondislikeclick(id:number |undefined){
      if(this.dislikeclick){
        for (let index = 0; index < this.posts.length; index++) {
          if(this.posts[index].id === id){
            this.postval = index;
          }
        }
            if(this.disliked.length>0){
            
              for(let i = 0;i<this.disliked.length;i++){
             
                
                if(this.disliked[i].userid === this.curruser.id && this.disliked[i].postid === id){
                  this.flag=true
                  this.userinfo.removelike(this.disliked[i],'/disliked').subscribe((res)=>{
                  })
                  this.disliked.splice(i,1);
                  this.posts[this.postval].dislikes -= 1;
                
                }
                else{
                  this.flag = false
                }
              }
                  if(this.flag === false){
                    this.posts[this.postval].dislikes += 1;
                      this.userinfo.savelike({
                        "userid" : this.curruser.id,
                        "postid" : this.posts[this.postval].id
                      },'/disliked').subscribe((res) =>{
                        this.disliked.push(res);
                      })
                  }
      
                }
          
              else{
             
                  this.posts[this.postval].dislikes += 1;
                  this.userinfo.savelike({
                    "userid" : this.curruser.id,
                    "postid" : this.posts[this.postval].id
                  },'/disliked').subscribe((res) =>{
                    this.disliked.push(res);
                  })
                }
                
              
            this.userinfo.updatepost(this.posts[this.postval]).subscribe({
              next : data =>{
              },
              error : error =>{
                console.log(error);
              }
              
            });
    
      }
     
  }

}
