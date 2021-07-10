import { UserService } from './../_services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { GlobalConstants } from './../global-constants';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
// import { EventEmitter } from 'stream';
// import { Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;

  currentUser: any;
  currentUserid: any;
  form: any = {};
  data: any = {};
  content: any = {};
  number: any = {};
  productId =[];
  login: any;
  ftpstring = GlobalConstants.ftpURL;
  city: any;
  selectedItems:string[];
  amenityArray = [];


  public constructor(
    private titleService: Title,
    private tokenService: TokenStorageService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private idservice: TokenStorageService,
    private router: Router
  ){
  }

// iqbal define funtion
  prod_func(data: string){
    this.idservice.saveProdId(data);
    // this.myservice.setData(data);
    // this.router.navigate(["/productpage"])
  }


  ngOnInit(): void {
    this.home_call();
    this.amenities();
    this.gettestimonialdata();
    this.titleService.setTitle('Housing Street');
    this.currentUser = this.tokenService.getUser().username;
    this.currentUserid = this.tokenService.getUser().id;
    this.login = this.tokenService.getToken();
    this.selectedItems = new Array<string>();
    
  }
  DeleteProd_function(data: any){
    if(this.tokenStorage.getUser() != null){
      this.isLoggedIn = true;
       this.authService.WishlistRemove(data).pipe().subscribe(
        (result: any) =>{
          console.log(result);
          this.home_call();
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
          this.home_call();
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
  
  redirect_to_home(): void {
    window.location.href=GlobalConstants.siteURL="login"
    }

    getwishlist(): void{
      this.userService.getwishlistdata().pipe().subscribe(
        (wishlistdata: any) => {
          //  console.log(amenitiesdata);
          this.wishlistcontent = wishlistdata.data;
          this.wishlistresult = this.wishlistcontent;
          console.log(this.wishlistresult);
          //console.log(this.content);
        },
        err => {
          this.content = JSON.parse(err.error).message;
		  this.content = err.error.message;								   
        }
      );
    }
  
  home_call(): void{
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;  
      this.authService.getproductWishlist().pipe().subscribe(
        (product: any) => {  
          this.content = product.data;
          this.number = this.content;
          console.log(this.number);
          this.sendinformation();
        },
        err => {
          //this.content = JSON.parse(err.error).message;
          this.content = err.error.message;
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
          //this.content = JSON.parse(err.error).message;
          this.content = err.error.message;
        }
      );
    }
  }
 
  amenities(): void{
    this.userService.getamenitiesdata().pipe().subscribe(
      (amenitiesdata: any) => {
        //  console.log(amenitiesdata);
        this.amenities = amenitiesdata.data;
        this.amenitiesresult = this.amenities;
        console.log(this.amenitiesresult);
        //console.log(this.content);
      },
      err => {
        //this.content = JSON.parse(err.error).message;
        this.content = err.error.message;
      }
    );
  }
  gettestimonialdata(): void{
    this.userService.gettestimonialdata().pipe().subscribe(
      (Reviewdata: any) => {
        this.contenttestimonial = Reviewdata.data;
        this.testimonial = this.contenttestimonial;
        console.log(this.testimonial);
        //console.log(this.content);
      },
      err => {
        this.content = err.error.message;
      }
    );
  }
  
  onchangeAmenties(e:any,id:string){
    if(e.target.checked){
      console.log(id + 'Checked');
      this.selectedItems.push(id);
    }else{
      
      console.log(id + 'UNChecked');
      this.selectedItems= this.selectedItems.filter(m=>m!=id);
    }
    this.amenityArray=this.selectedItems;
   console.log(this.amenityArray);

  }
  onSearch(): void{
    console.log(this.form,this.amenityArray);
    this.authService.search(this.form,this.amenityArray).subscribe(
      data => {
        console.log(this.data);
        this.tokenService.searchData(data);
      },
      err => {
        this.err_caused = true;
        this.errorMessage = err.error.errors;
        console.log(this.errorMessage);
      }
    );
    console.log(this.tokenService.returnSearch());
      window.location.href=GlobalConstants.siteURL+"search"
      // this.router.navigate(["/search"])

  }
  

  property_search(event: any): void{
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

  // comparison funtion property
  
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

    if (this.first_prod != null && this.second_prod != null && this.third_prod != null){

      // alert("Added two property to compare list. (Only two properties can be compared at a time)")

      this.idservice.saveProdId(this.first_prod);
      this.idservice.saveCdata(this.second_prod)
      this.idservice.saveProd2Id(this.third_prod);
      window.location.href=GlobalConstants.siteURL+"compare"
    }

    console.log(this.idservice.getProdId());
    console.log(this.idservice.getProd2Id());
    console.log(this.idservice.getCdata());



  }


  sendinformation(){
    this.userService.emit<string>('true');
 } 
// carosule image
customOptions: OwlOptions = {
  loop:false,
  dots:true,
  autoplay:false,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 3
    },
    1050: {
      items: 3
    },
    1250: {
      items: 3
    }
  },
  nav: false
}  

}
