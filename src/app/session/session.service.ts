import {Injectable} from '@angular/core';
import {Observable, Subject,  BehaviorSubject } from 'rxjs';
import {HttpClientModule, HttpClient} from '@angular/common/http';


@Injectable()
export class SessionService{

    private subjectId = new Subject<any>();
    token: string;
    userid:string;
    private userName = new Subject<any>();
    private theme = new Subject<any>();


    constructor(){

    }

    getSubjectId(): Observable<any>{
        return this.subjectId.asObservable();
    }

    getUserId(){
        var userData = JSON.parse(localStorage.getItem('userData'))
        this.userid = userData.sub
        return this.userid;
    }

    getUserData(){
        var userData = JSON.parse(localStorage.getItem('userData'))
        return userData
    }

    getUserName(): Observable<any>{
        return this.userName.asObservable();
    }

    getTheme(): Observable<any>{
        return this.theme.asObservable();
    }

    get(key: any){
        return localStorage.getItem(key);
    }

    remove(key:any){
        switch(key){
            case 'subjectId':{
                this.subjectId.next();
                break;
            }
            //case 'loggedIn':{
           //     var fal = "false";
           //     this.loggedIn.next({ fal });
          //      break;
         //   }
            case 'userName':{
                this.userName.next();
                break;
            }

        }
        return localStorage.removeItem(key);
    }

    clear(){
        var nul = "null";
        this.subjectId.next({ nul });
     //   this.loggedIn.next({ nul });
        this.userName.next({ nul });
        return localStorage.clear();
    }

    set(key:any, data:any){
        switch(key){
            case 'subjectId':{
                this.subjectId.next({ data });
                break;
            }
            case 'userName':{
                this.userName.next({ data });
                break;
            }
            case 'theme':{
                this.theme.next({ data });
                break;
            }
        }
        return localStorage.setItem(key, data);
    }


}
