import { GlobalConstants } from './../global-constants';
import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-topbar',
  templateUrl: './dashboard-topbar.component.html',
  styleUrls: ['./dashboard-topbar.component.css']
})
export class DashboardTopbarComponent implements OnInit {

  currentUser: any;
  usertype;
  isLoggedIn = false;
  roles: string[] = null;

  constructor(
    private token: TokenStorageService,
    private tokenStorage: TokenStorageService,
    ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser().username;
    this.usertype = this.token.getUser().usertype;
    console.log(this.usertype);
    if (this.tokenStorage.getToken() != null){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().username;

    }
  }


  redirect_control(): void {
    if(this.usertype == 4){
      window.location.href=GlobalConstants.siteURL+"lawyerservice"
    }
    else{
      window.location.href=GlobalConstants.siteURL+"dashboard"
    }
  }

}
