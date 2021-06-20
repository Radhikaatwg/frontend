import { ProductService } from './_services/product.service';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { TopbardarkComponent } from './topbardark/topbardark.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardTopbarComponent } from './dashboard-topbar/dashboard-topbar.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardAgentComponent } from './board-agent/board-agent.component';
import { BoardCompanyComponent } from './board-company/board-company.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { ProfileComponent } from './profile/profile.component';
import { UserlogoutComponent } from './userlogout/userlogout.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { ContactComponent } from './contact/contact.component';
import { PostproductComponent } from './postproduct/postproduct.component';
import { TopbardarkLoaderComponent } from './topbardark-loader/topbardark-loader.component';
import { RequirementComponent } from './requirement/requirement.component';
import { CompareComponent } from './compare/compare.component';
import { SearchComponent } from './search/search.component';
import { SavedsearchesComponent } from './savedsearches/savedsearches.component';
import { MypropertiesComponent } from './myproperties/myproperties.component';
import { PostproductrentComponent } from './postproductrent/postproductrent.component';
import { InsertselectorComponent } from './insertselector/insertselector.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AdmingetusersComponent } from './admingetusers/admingetusers.component';
import { AdmingetproductComponent } from './admingetproduct/admingetproduct.component';
import { AdmindashtopbarComponent } from './admindashtopbar/admindashtopbar.component';
import { AdmingetreviewsComponent } from './admingetreviews/admingetreviews.component';
import { AdmingetrequirementsComponent } from './admingetrequirements/admingetrequirements.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { LawyerserviceComponent } from './lawyerservice/lawyerservice.component';
import { LawyerpageComponent } from './lawyerpage/lawyerpage.component';
import { LawyerprofileComponent } from './lawyerprofile/lawyerprofile.component';
import { AdminlawyerservicesComponent } from './adminlawyerservices/adminlawyerservices.component';
import { VerifyComponent } from './verify/verify.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { EditproductrentComponent } from './editproductrent/editproductrent.component';
import { UsercreatorComponent } from './usercreator/usercreator.component';
import { AllusersComponent } from './allusers/allusers.component';
import { LoancalcComponent } from './loancalc/loancalc.component';
import { AdminloanComponent } from './adminloan/adminloan.component';
//import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    FooterComponent,
    TestimonialsComponent,
    NotfoundComponent,
    HomeComponent,
    TopbardarkComponent,
    DashboardComponent,
    DashboardTopbarComponent,
    BoardAdminComponent,
    BoardAgentComponent,
    BoardCompanyComponent,
    BoardUserComponent,
//    FileUploadModule,
    UserloginComponent,
    UserregisterComponent,
    ProfileComponent,
    UserlogoutComponent,
    ProductListingComponent,
    ProductpageComponent,
    ContactComponent,
    PostproductComponent,
    TopbardarkLoaderComponent,
    RequirementComponent,
    CompareComponent,
    SearchComponent,
    SavedsearchesComponent,
    MypropertiesComponent,
    PostproductrentComponent,
    InsertselectorComponent,
    AdminpanelComponent,
    AdmingetusersComponent,
    AdmingetproductComponent,
    AdmindashtopbarComponent,
    AdmingetreviewsComponent,
    AdmingetrequirementsComponent,
    ReviewsComponent,
    LawyerserviceComponent,
    LawyerpageComponent,
    LawyerprofileComponent,
    AdminlawyerservicesComponent,
    VerifyComponent,
    EditproductComponent,
    EditproductrentComponent,
    UsercreatorComponent,
    AllusersComponent,
    LoancalcComponent,
    AdminloanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Title,
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
