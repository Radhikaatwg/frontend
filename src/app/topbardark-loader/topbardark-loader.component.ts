import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';

@Component({
  selector: 'app-topbardark-loader',
  templateUrl: './topbardark-loader.component.html',
  styleUrls: ['./topbardark-loader.component.css']
})
export class TopbardarkLoaderComponent implements OnInit {
  [x: string]: any;

  form: any = {};
  ared: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = null;
  data
  constructor(
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    ) { }

    ngOnInit(): void {this.userService.on<string>().subscribe(
      (message: any) => {
        if(message=='true'){
          this.wishlistcount();
        }
      }
    );
      this.wishlistcount();
      this.data = this.tokenStorage.getToken();
      if (this.tokenStorage.getToken() != null){
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().username;
  
      }
  
    }
    wishlistcount(): void{
      this.userService.getwishlistdata().pipe().subscribe(
        (wishlistdata: any) => {
          this.wishlistcontent = wishlistdata.data;
          this.wishlistresult = this.wishlistcontent
          console.log(this.wishlistresult);
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }

}
