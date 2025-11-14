import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserinfoService } from 'src/Services/userinfo.service';
import { User } from 'src/Models/user.model';
import { Post } from 'src/Models/post.model';

@Component({
  selector: 'app-create-new-post',
  templateUrl: './create-new-post.component.html',
  styleUrls: ['./create-new-post.component.css']
})
export class CreateNewPostComponent implements OnInit {

 img!:FileList;
 filepath:string='';
  postdata!:Post;
  curruser!:User;
  message : string=''
  constructor(private userinfo : UserinfoService,private router:Router,private Route: ActivatedRoute) { 

  }

  ngOnInit(): void {

    const routeParams = this.Route.snapshot.paramMap;
    const Id = Number(routeParams.get('id'));
    this.curruser = JSON.parse(localStorage.getItem('token') || '{}');
    if(Id!==this.curruser.id){
      this.router.navigate(['login']);
      localStorage.clear();
    }
  }
  onPostClick(comment: HTMLTextAreaElement) {
    let comvalue = comment.value;
    if(comvalue.length <= 0 ) return;
    if(this.img) {
      this.uploadImagePost(comvalue);
    } else {
      this.uploadPost(comvalue);
    }
  }
  uploadPost(comvalue: string){
    this.postdata = {"username" : this.curruser.user,
    "userid":this.curruser.id,
    "text" : comvalue,
    "img":'',
    "likes": 0,
    "dislikes" : 0,
    "comments": [],
    }
    this.userinfo.savePost(this.postdata).subscribe({
      next : data =>{
        this.message =''
      this.router.navigate(['home/viewpost']);
      },
      error : error =>{
        this.message = "Please select image file."
        console.log(error);
      }
      
    });
  }

  uploadImagePost(comvalue:string){
    this.postdata = {"username" : this.curruser.user,
    "userid":this.curruser.id,
    "text" : comvalue,
    "img":this.filepath,
    "likes": 0,
    "dislikes" : 0,
    "comments": [],
    }
    this.userinfo.savePost(this.postdata).subscribe({
      next : data =>{
        this.message =''
      this.router.navigate(['home/viewpost']);
      },
      error : error =>{
        this.message = "Please select image file."
        console.log(error);
      }
      
    });
  }

  imagePreview(photoSelector: HTMLInputElement) {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.test(photoSelector.value)) {
      this.message = "please select image file."
    }
    else{
      this.img = photoSelector.files!;
    
      if(!this.img) return;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.img[0]);
      fileReader.onload = () => {
        this.filepath = fileReader.result as string;
      }
    }
   
    
   
  }
}
