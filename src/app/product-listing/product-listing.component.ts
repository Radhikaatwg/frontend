import { TokenStorageService } from './../_services/token-storage.service';
import { Router } from '@angular/router';
import { ProductService } from './../_services/product.service';
import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { DomSanitizer, SafeUrl, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../_services/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  [x: string]: any;

  
   currentUser: any;
  currentUserid: any;
  form: any = {};
  data: any = {};
  content: any = {};
  ftpstring: string= GlobalConstants.ftpURL;
  prod_if;  
  searchForm = { 
    build_name: '',
    Location  : '', 
    area_unit : '',
    type : '',
    Bathrooms   : '',
    Bedrooms : '',
    availability_condition : '',
    Years   : '',
    Minimum : '',
    Maximum   : '',
    };


  first_prod = null
  second_prod = null
  third_prod = null

  constructor(
    private titleService: Title,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private myservice: ProductService,
    private idservice: TokenStorageService,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private tokenStorage: TokenStorageService,
    
  ) {}

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

  ngOnInit(): void {
    this.idservice.saveCdata(null);
    this.idservice.saveProdId(null);
    this.titleService.setTitle('Listing');
    // this.getpropertyData();
    this.onSearch();
    this.currentUser = this.tokenService.getUser().username;
    this.currentUserid = this.tokenService.getUser().id;
    this.login = this.tokenService.getToken();
    
  }


  getpropertyData(): void{
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;  
      this.authService.getproductWishlist().pipe().subscribe(
        (product: any) => {  
          this.content = product.data;
          this.number = this.content;
          // console.log(data.data[0]['0']);
          console.log(this.number);
          console.log(this.number[0]);
          this.sendinformation();
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );   
    }else{
      this.userService.getproductlistingfeatured().pipe().subscribe(
        (data: any) => {
  
          this.content = data.data.data;
          this.number = this.content;
          console.log(this.number);          
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
  }

  DeleteProd_function(data: any){
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true;
       this.authService.WishlistRemove(data).pipe().subscribe(
        (result: any) =>{
          console.log(result);
          this.onSearch();
        },
        err => {
          console.log(err.error);
        }
      );
    }
    else{
      this.redirect_to_home();
    }
    
  }
  
  prod_function(data: any){
    // Login check
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true
      console.log(this.isLoggedIn);
    }
    else{
      this.redirect_to_home();
    }
    this.maintenance = true;
    this.parking = false;
    if (this.tokenStorage.getToken()){
      this.isLoggedIn = true;      
      this.authService.Wishlist(data).pipe().subscribe(
        (result: any) =>{
          console.log(result);
          this.onSearch();
        },
        err => {
          console.log(err.error);
        }
      );

    }
    else{
      this.isLoggedIn = false ;
    }
  }
  prod_func(data){
    this.idservice.saveProdId(data);
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }

  onComp(data){


    // Old code

    // console.log(this.idservice.getCdata());
    // console.log(this.idservice.getProdId());


    // if(this.idservice.getCdata() != null){
    //   this.idservice.saveProdId(data);
    //   console.log(this.idservice.getCdata());
    //   console.log(this.idservice.getProdId());
    //   console.log("1rd");
    // }

    // if(this.idservice.getCdata()){

    //   this.prod_if = this.idservice.getCdata;
    //   this.idservice.saveProdId(this.prod_if);
    //   this.idservice.saveCdata(data);
    //   console.log(this.idservice.getCdata());
    //   console.log(this.idservice.getProdId());
    //   console.log("3rd");
    // }


    if(this.first_prod == null){
      this.first_prod = data
    }
    else if(this.first_prod != null){
      if (this.second_prod != null){
        this.third_prod = this.second_prod
        this.second_prod = this.first_prod
        this.first_prod = data
      }
      else{
      this.second_prod = data
      }
    }

    console.log(this.first_prod+"|"+this.second_prod)

    if (this.first_prod != null && this.second_prod != null){

      // alert("Added two property to compare list. (Only two properties can be compared at a time)")

      this.idservice.saveProdId(this.first_prod);
      this.idservice.saveCdata(this.second_prod)
      // this.idservice.saveProd2Id(this.third_prod);
      window.location.href=GlobalConstants.siteURL+"compare"
    }

    console.log(this.idservice.getProdId());
    console.log(this.idservice.getProd2Id());
    console.log(this.idservice.getCdata());



  }
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
    }

    onchangeSearch():void{
      console.log(this.form.property_status);
      this.onSearch();
    }


    onSearch(): void{
      console.log(this.form);
        if(this.tokenStorage.getToken()){
          this.isLoggedIn = true;  
          this.showLoadingIndicator = true;
          this.authService.product_SearchingLogin(this.form).subscribe(
            searchData => {
              console.log("login");
              this.Searchcontent = searchData.data;
              if(this.Searchcontent){
                 this.showLoadingIndicator = false;
                 this.number = this.Searchcontent;
                 this.sendinformation();
              }
              
            },
            err => {
              this.err_caused = true;
              this.errorMessage = err.error.errors;
              console.log(this.errorMessage);
            } 
          );
        }else{
          this.showLoadingIndicator = true;
          this.authService.product_Searching(this.form).subscribe(
            searchData => {
              console.log("without_login");
              this.Searchcontent = searchData.data;
              if(this.Searchcontent){
                this.showLoadingIndicator = false;
             this.number = this.Searchcontent;
              // console.log(this.number);
              }
              
            },
            err => {
              this.err_caused = true;
              this.errorMessage = err.error.errors;
              console.log(this.errorMessage);
            }
            );
        }
  
    }

    // topbar searching functionalty

    sendinformation(){
      this.userService.emit<string>('true');
   } 


}
