import { TokenStorageService } from './../_services/token-storage.service';
import { Router } from '@angular/router';
import { ProductService } from './../_services/product.service';
import { GlobalConstants } from './../global-constants';
import { UserService } from './../_services/user.service';
import { DomSanitizer, SafeUrl, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  content: [];
  ftpstring: string= GlobalConstants.ftpURL;
  prod_if


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
  ) {}

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}

  ngOnInit(): void {
    this.idservice.saveCdata(null);
    this.idservice.saveProdId(null);
    this.titleService.setTitle('Listing');
    this.userService.getproductlisting().pipe().subscribe(
      (data: any) => {

        this.content = data.data.data;
        console.log(this.content);
        //console.log(this.content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
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

    console.log(this.first_prod+"|"+this.second_prod+"|"+this.third_prod)

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



}
