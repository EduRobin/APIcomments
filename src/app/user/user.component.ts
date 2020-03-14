import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import AccessToken from '../AccessToken';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/User.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private email = '';
  private id = '';
  private username = '';
  private logoutURL = ' http://85.160.64.233:3000/user';


  constructor(private httpClient: HttpClient, private router: Router, private user: UserService, private auth: AuthenticationService, private userlogout: AuthenticationService) {
   this.user.getUser()
    .subscribe(
      (data: User) => {
        this.username = data.username;
        this.email = data.email;
        this.id = data.id;
        console.log(this.username);
      }, (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

  clickMe() {
    this.auth.getLogout().subscribe(
      (data: any) => {
        AuthenticationService.token.access_token = '';
        this.router.navigate(['/home']);
      }, (error) => {
        console.log(error);
      }
    );
  }

}
