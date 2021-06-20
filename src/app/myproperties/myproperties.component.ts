import { UserService } from './../_services/user.service';
import { GlobalConstants } from './../global-constants';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myproperties',
  templateUrl: './myproperties.component.html',
  styleUrls: ['./myproperties.component.css']
})
export class MypropertiesComponent implements OnInit {

  content: [];
  ftpstring: string = GlobalConstants.ftpURL;
  usertype;

  constructor(
    private titleService: Title,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('My Properties');
    this.usertype = this.tokenStorage.getUser().usertype;

    this.userService.getproperties().pipe().subscribe(
      (data: any) => {

        this.content = data.data.data;
        console.log(data.data.data);

      },
      err => {
        console.log(err)
      }
    )

  }

  del_func(id){
    {this.authService.property_delete(id).subscribe(

        data => {
          console.log(data)
          window.location.reload();
        },
        err => {
          console.log(err)
        }
      );
    }
  }

  prod_func(data){
    this.tokenStorage.saveProdId(data);
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }

}
