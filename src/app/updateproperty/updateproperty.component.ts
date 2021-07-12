import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { UserService } from './../_services/user.service';
import { GlobalConstants } from './../global-constants';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../_services/auth.service';
import { TokenStorageService } from './../_services/token-storage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateproperty',
  templateUrl: './updateproperty.component.html',
  styleUrls: ['./updateproperty.component.css']
})
export class UpdatepropertyComponent implements OnInit {

  selectedId:number;
 
  ftpstring: string = GlobalConstants.ftpURL;
  usertype;
  id;
  image1;
  image2;
  image3;
  image4;
  image5;
  amenitiesresult: () => void;
  errorMessage1: any;
  build_name: any;
  type: any;
  willing_to_rent_out_to:any;
  agreement_type:any;
  address: any;
  city: any;
  locality: any;
  property_detail: any;
  nearest_landmark: any;
  map_latitude: any;
  map_longitude: any;
  display_address: any;
  area: any;
  area_unit: any;
  carpet_area: any;
  bedroom: any;
  bathroom: any;
  balconies: any;
  additional_rooms: any;
  furnishing_status: any;
  furnishings: any;
  total_floors: any;
  property_on_floor: any;
  rera_registration_status: any;
  additional_parking_status: any;
  parking_covered_count:any;
  expected_pricing: any;
  possession_by: any;
  tax_govt_charge: any;
  price_negotiable: any;
  facing_towards: any;
  availability_condition: any;
  buildyear: any;
  age_of_property: any;
  expected_rent:any;
  description: any;
  inc_electricity_and_water_bill:any;
  month_of_notice:any;
  duration_of_rent_aggreement:any;
  security_deposit:any;
  rent_availability:any;
  rent_cond:any;
  ownership:any;
  available_for:any;
  nearby_places: any;
  equipment: any;
  features: any;
   userEmail: any;
   userProfile: any;
   form: any = {};
   ared: any = {};
   isLoggedIn = false;
   isFormSubmitted = false;
   errorMessage = '';
   roles: string[] = [];
 
   saleValue: boolean = true;
   rentValue: boolean = false;
 
   furnish: boolean = false;
 
   maintenance: boolean = true;
 
   parking: boolean = false;
 
   amenityArray = [];
   varAmenity: string;
 
   furnishingArray = [];
   varfurnishing: string;
 
   text : string;url:any;
 
   err_caused: boolean = false;
   selectedItems:string[];
 
   content: any = {};
 
 
   constructor(
     private route: ActivatedRoute,
     private router: Router,
     private titleService: Title,
     private tokenStorage: TokenStorageService,
     private authService: AuthService,
     private userService: UserService,
     private toastr: ToastrService,
     ) { }
 
   ngOnInit(): void {
 
     this.userService.handleproductEditdata.subscribe((res)=>{
         console.log(res);
         this.id=res.id;
       });
 
 
       
     this.amenities();
     if (this.tokenStorage.getToken() != null){
       this.isLoggedIn = true;
       this.roles = this.tokenStorage.getUser().username;
       this.userEmail=this.tokenStorage.getUser().misc.email;
       this.userProfile=this.tokenStorage.getUser().misc.profile_pic;
       console.log(this.userEmail);
       console.log(this.userProfile);
     }
     console.log(this.id);
     this.user_details(this.id);
   }
   user_details(p_id): void {
     console.log(p_id);
     this.id=p_id;
     this.authService.Propery_get_id(this.id).subscribe(
       (data: any) => {
         console.log(data);
         this.url=this.ftpstring;
         this.image1=data.data.product_image1;
         console.log( this.image1);
         if(this.image1.indexOf('googleusercontent.com') == -1){
           this.image1 = this.ftpstring + this.image1;
           
         console.log( this.image1);
         }
         this.build_name = data.data.build_name;
         this.type = data.data.type;
         this.willing_to_rent_out_to = data.data.willing_to_rent_out_to;
         this.agreement_type = data.data.agreement_type;
         this.address = data.data.address;
         this.city = data.data.city;
         this.locality = data.data.locality;
         this.property_detail = data.data.property_detail;
         this.nearest_landmark = data.data.nearest_landmark;
         this.map_latitude = data.data.map_latitude;
         this.map_longitude = data.data.map_longitude;
         this.display_address = data.data.display_address;
         this.area = data.data.area;
         this.area_unit = data.data.area_unit;
         this.carpet_area = data.data.carpet_area;
         this.bedroom = data.data.bedroom;
         this.balconies = data.data.balconies;
         this.additional_rooms = data.data.additional_rooms;
         this.furnishing_status = data.data.furnishing_status;
         this.furnishings = data.data.furnishings;
         this.total_floors = data.data.total_floors;
         this.property_on_floor = data.data.property_on_floor;
         this.rera_registration_status = data.data.rera_registration_status;
         this.additional_parking_status = data.data.additional_parking_status;
         this.parking_covered_count = data.data.parking_covered_count;
         this.expected_pricing = data.data.expected_pricing;
         this.possession_by = data.data.possession_by;
         
         this.tax_govt_charge = data.data.tax_govt_charge;
         this.price_negotiable = data.data.price_negotiable;
         this.facing_towards = data.data.facing_towards;
         this.availability_condition = data.data.availability_condition;
         this.buildyear = data.data.buildyear;
         this.age_of_property = data.data.age_of_property;
         this.expected_rent = data.data.expected_rent;
         this.description = data.data.description;
         this.inc_electricity_and_water_bill = data.data.inc_electricity_and_water_bill;
         this.month_of_notice = data.data.month_of_notice;
         this.duration_of_rent_aggreement = data.data.duration_of_rent_aggreement;
         this.security_deposit = data.data.security_deposit;
         this.rent_availability = data.data.rent_availability;
         this.rent_cond = data.data.rent_cond;
         this.ownership = data.data.ownership;
         this.available_for = data.data.available_for;
         this.nearby_places = data.data.nearby_places;
         this.equipment = data.data.equipment;
         this.features = data.data.features;
 
 
 
         this.form.build_name = data.data.build_name;
         this.form.type = data.data.type;
         this.form.willing_to_rent_out_to = data.data.willing_to_rent_out_to;
         this.form.agreement_type = data.data.agreement_type;
         this.form.address = data.data.address;
         this.form.city = data.data.city;
         this.form.locality = data.data.locality;
         this.form.property_detail = data.data.property_detail;
         this.form.nearest_landmark = data.data.nearest_landmark;
         this.form.map_latitude = data.data.map_latitude;
         this.form.map_longitude = data.data.map_longitude;
         this.form.display_address = data.data.display_address;
         this.form.area = data.data.area;
         this.form.area_unit = data.data.area_unit;
         this.form.carpet_area = data.data.carpet_area;
         this.form.bedroom = data.data.bedroom;
         this.form.balconies = data.data.balconies;
         this.form.additional_rooms = data.data.additional_rooms;
         this.form.furnishing_status = data.data.furnishing_status;
         this.form.furnishings = data.data.furnishings;
         this.form.total_floors = data.data.total_floors;
         this.form.property_on_floor = data.data.property_on_floor;
         this.form.rera_registration_status = data.data.rera_registration_status;
         this.form.additional_parking_status = data.data.additional_parking_status;
         this.form.parking_covered_count = data.data.parking_covered_count;
         this.form.expected_pricing = data.data.expected_pricing;
         this.form.possession_by = data.data.possession_by;
         this.form.tax_govt_charge = data.data.tax_govt_charge;
         this.form.price_negotiable = data.data.price_negotiable;
         this.form.facing_towards = data.data.facing_towards;
         this.form.availability_condition = data.data.availability_condition;
         this.form.buildyear = data.data.buildyear;
         this.form.age_of_property = data.data.age_of_property;
         this.form.expected_rent = data.data.expected_rent;
         this.form.description = data.data.description;
         this.form.inc_electricity_and_water_bill = data.data.inc_electricity_and_water_bill;
         this.form.month_of_notice = data.data.month_of_notice;
         this.form.duration_of_rent_aggreement = data.data.duration_of_rent_aggreement;
         this.form.security_deposit = data.data.security_deposit;
         this.form.rent_availability = data.data.rent_availability;
         this.form.rent_cond = data.data.rent_cond;
         this.form.ownership = data.data.ownership;
         this.form.available_for = data.data.available_for;
         this.form.nearby_places = data.data.nearby_places;
         this.form.equipment = data.data.equipment;
         this.form.features = data.data.features;
         this.image1=data.data.profile_pic;
         
       });
     
   }
 
   onSubmitRent(): void {
     this.authService.product_insert_rent(this.form, this.content, this.amenityArray, this.furnishingArray, this.image1, this.image2, this.image3, this.image4, this.image5).subscribe(
       data => {
         console.log("successful" + data)
         this.toastr.success('Successfuly Saved', 'Property');
         window.location.href=GlobalConstants.siteURL+"myproperties"
       },
       err => {
         this.err_caused = true;
         this.errorMessage = err.error.errors;
         this.errorMessage1 = err.error.message;
         console.log(this.errorMessage);
         this.toastr.error(this.errorMessage1, 'Something Error', {
           timeOut: 3000,
         });
       }
     );
   }
   
   furnishStatus(event): void{
     console.log(event);
     if(event == 'SFR' || event == 'FFR')
     {
       this.furnish = true;
     }
     else
     {
       this.furnish = false;
     }
   }
 
 
   onChange(UpdatedValue : string) :void
   {
     this.text = UpdatedValue;
     this.amenityArray.push(UpdatedValue);
   }
 
   amenity(event): void{
     console.log(event)
     this.amenityArray.push(event);
 
       console.log(this.amenityArray);
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
 
   furnishing(event): void{
     console.log(event)
     this.furnishingArray.push(event);
 
       console.log(this.furnishingArray);
   }
 
 
 
 
 
   insert_image1(event){
     if(event.target.files.length<=5){
       for(let i=0; i<=event.target.files.length;i++){
           if(i==0){
           this.readThis1(event.target.files[0]);
           }
           if(i==1){
             this.readThis2(event.target.files[1]);
           }
           if(i==2){
             this.readThis3(event.target.files[2]);
           }
           if(i==3){
             this.readThis4(event.target.files[3]);
           }    
           if(i==4){
             this.readThis5(event.target.files[4]);
           }
       }
     }else{
       this.toastr.error("Maximum 5 Images Selected", 'Image Upload Error!!!...', {
         timeOut: 1500,
       });
     }
   
 
   }
   readThis1(inputValue: any): void {
     var file:File = inputValue;
     var myReader:FileReader = new FileReader();
 
     myReader.onloadend = (e) => {
       this.image1 = myReader.result;
     }
     myReader.readAsDataURL(file);
   }
 
    insert_image2(event){
 
     this.readThis2(event.target)
 
   }
   readThis2(inputValue: any): void {
     var file:File = inputValue;
     var myReader:FileReader = new FileReader();
 
     myReader.onloadend = (e) => {
       this.image2 = myReader.result;
     }
     myReader.readAsDataURL(file);
   }
   insert_image3(event){
 
     this.readThis3(event.target)
 
   }
   readThis3(inputValue: any): void {
     var file:File = inputValue;
     var myReader:FileReader = new FileReader();
 
     myReader.onloadend = (e) => {
       this.image3 = myReader.result;
     }
     myReader.readAsDataURL(file);
   }
   insert_image4(event){
 
     this.readThis4(event.target)
 
   }
   readThis4(inputValue: any): void {
     var file:File = inputValue;
     var myReader:FileReader = new FileReader();
 
     myReader.onloadend = (e) => {
       this.image4 = myReader.result;
     }
     myReader.readAsDataURL(file);
   }
   insert_image5(event){
 
     this.readThis5(event.target)
 
   }
   readThis5(inputValue: any): void {
     var file:File = inputValue;
     var myReader:FileReader = new FileReader();
 
     myReader.onloadend = (e) => {
       this.image5 = myReader.result;
     }
     myReader.readAsDataURL(file);
   }
 z
 
   delete_pic1(){
     this.image1 = null;
   }
   delete_pic2(){
     this.image2 = null;
   }
   delete_pic3(){
     this.image3 = null;
   }
   delete_pic4(){
     this.image4 = null;
   }
   delete_pic5(){
     this.image5 = null;
   }
   
  
   maintenanceStatus(event): void {
     if (event == 0){
       this.maintenance = true;
     }
     else{
       this.maintenance = false
     }
   }
 
   parkingStatus(event): void {
     console.log(event)
     if (event == 0){
       this.parking = true;
     }
     else{
       this.parking = false
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
         this.content = JSON.parse(err.error).message;
       }
     );
   }
 
 
   saleButton(): void{
     this.saleValue = true;
     this.rentValue = false;
   }
 
   rentButton(): void{
     this.saleValue = false;
     this.rentValue = true;
   }
 
   reloadPage(): void {
     window.location.reload();
   }

}
