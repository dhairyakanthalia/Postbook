import { Component, OnInit ,Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserinfoService } from 'src/Services/userinfo.service'
import { MatDialog } from '@angular/material/dialog';
import { Comment } from '../../../Models/comment.model';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments!: Comment[];
  user:string='';
  comobj : {[user : string] : string[]}={};
  constructor(@Inject(MAT_DIALOG_DATA) private post: any,private userinfo:UserinfoService,private dialog: MatDialog) { }

  ngOnInit(): void {

  this.comments = this.post[0].comments;
  this.comments = this.comments.reverse();
  this.user = this.post[1].user;
  }

  sendcomment(comment:HTMLTextAreaElement){
    comment.value  = comment.value.trim();
    if(comment.value.length>0 && comment.value!==''){
      this.comobj = {'user' : [this.user,comment.value]}
      this.post[0].comments.push(this.comobj);
      this.userinfo.updatepost(this.post[0]).subscribe({
        next : data =>{
        },
        error : error =>{
          console.log(error);
        }
        
      });
      setTimeout(() => {
        this.dialog.closeAll()
      }, 1000);
    }
  
  }

}
