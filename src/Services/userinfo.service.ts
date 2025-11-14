import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/Models/user.model';
import { Post } from 'src/Models/post.model';
import { Like } from 'src/Models/like.model';
@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  url = "http://localhost:3000";
  posturl = "/post";
  constructor(private http : HttpClient) { }

  getData(val:string){
    return this.http.get<User[]>(this.url + '/'+ val);
  }
  saveData(data:User,val:string){
    return this.http.post<User[]>(this.url + '/' + val,data);
  }
  savePost(data : Post){
    return this.http.post<Post[]>(this.url + this.posturl,data)
  }
  getpost(){
    return this.http.get<Post[]>(this.url + this.posturl);
  }

  updatepost(data:Post){
    return this.http.put<Post[]>(this.url + this.posturl +'/'+data.id,data);
  }
  getlike(val:string){
    return this.http.get<Like[]>(this.url + val);
  }
  savelike(data:any,val:string){
    return this.http.post<Like>(this.url + val,data);
  }

  removelike(data:Like,val:string){
    return this.http.delete<Like>(this.url + val + '/' + data.id);
  }

  deletepost(data:Post){
    return this.http.delete<Post[]>(this.url  + this.posturl + '/' + data.id)
  }

}
