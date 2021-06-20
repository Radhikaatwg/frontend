import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from './../_services/token-storage.service';
import { GlobalConstants } from './../global-constants';
import { ProductService } from './../_services/product.service';
import { AuthService } from './../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
export class ProductpageComponent implements OnInit {

  prod_id: any ;
  user_data: [];
  product_data: [];
  ftpstring: string = GlobalConstants.ftpURL;
  sitestring: string = GlobalConstants.siteURL;
  p_img1;
  p_img2;
  p_img3;
  p_img4;
  p_img5;
  form: any = {};
  Review;
  map_url;


  constructor(
    private titleService: Title,
    private authService: AuthService,
    private idService: TokenStorageService,
    private prodservice: ProductService,
    private router: Router,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.prodservice.setData(1);
    // this.prod_id = this.prodservice.getData();
    this.titleService.setTitle('Property Page');
    this.prod_id = this.idService.getProdId();
    //console.log(this.router.url);
    {this.route.queryParams.subscribe(params => {
      let id = params['id'];
      console.log(id);
      if(id != null){
        this.prod_id = id;
      }
    })}

    if( this.idService.getUser() != null)
    {
      this.authService.saveSearch(this.idService.getUser().id, this.prod_id).subscribe(
        data => {
          console.log(data)
        },
        err => {
          console.log(err)
        }
      )
    }

    this.get_review();

    {this.authService.product_see(this.prod_id).subscribe(

      data => {
        this.user_data = data["user_data"];
        this.product_data = data["product"];
        this.p_img1 = GlobalConstants.ftpURL + data["product"]["0"]["product_image1"];
        this.p_img2 = GlobalConstants.ftpURL + data["product"]["0"]["product_image2"];
        this.p_img3 = GlobalConstants.ftpURL + data["product"]["0"]["product_image3"];
        this.p_img4 = GlobalConstants.ftpURL + data["product"]["0"]["product_image4"];
        this.p_img5 = GlobalConstants.ftpURL + data["product"]["0"]["product_image5"];
        this.map_url = "https://maps.google.com/?q=" + data["product"]["0"]["map_latitude"] + "," + data["product"]["0"]["map_longitude"];
        console.log(this.map_url)
        console.log(this.product_data);
        console.log(this.user_data);

      },
        err => {
          console.log(err);
        }
      );
    }
  }

  onSubmit(): void {
    console.log(this.form)
    this.authService.create_review(this.form, this.prod_id).subscribe(
      data => {
        console.log(data)
        window.location.reload();
      },
      err => {
        console.log(err.error);
      }
    );
}

  get_review(): void {
    console.log(this.form)
    this.authService.product_review(this.prod_id).subscribe(
      data => {
        console.log('sfesf')
        console.log(data)
        this.Review = data.data
      },
      err => {
        console.log(err.error);
      }
    );
}

  onShare(){
    alert("Your Shareable Link is \n" + this.sitestring + this.router.url + "?id=" + this.prod_id);
  }

}
