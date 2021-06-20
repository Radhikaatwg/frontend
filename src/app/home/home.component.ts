import { UserService } from './../_services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;
  form: any = {};
  data: any = {};
  content: any = {};
  number: any = {};
  login
  ftpstring = GlobalConstants.ftpURL
  city


  public constructor(
    private titleService: Title,
    private tokenService: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ){
  }





  ngOnInit(): void {
    this.home_call();
    this.titleService.setTitle('Housing Street');
    this.currentUser = this.tokenService.getUser().username;
    this.login = this.tokenService.getToken();

  }

  home_call(): void{
    this.userService.getproductlistingfeatured().pipe().subscribe(
      (data: any) => {

        this.content = data.data.data;
        this.number = this.content
        console.log(this.number);
        //console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  onSearch(): void{
    this.authService.search(this.form).subscribe(
      data => {
        this.tokenService.searchData(data);
      },
      err => {
        console.log(err.error.message);
      }
    );
    console.log(this.tokenService.returnSearch().product.data);
      window.location.href=GlobalConstants.siteURL+"search"
      // this.router.navigate(["/search"])

  }

  property_search(event): void{
    console.log(event)
    this.authService.city_search(event).subscribe(
      data => {
        this.tokenService.searchData(data);
      },
      err => {
        console.log(err.error.message);
      }
    );
    console.log(this.tokenService.returnSearch().product.data);
      window.location.href=GlobalConstants.siteURL+"search"
      // this.router.navigate(["/search"])

  }

}
