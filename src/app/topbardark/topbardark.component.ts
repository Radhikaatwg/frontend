import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbardark',
  templateUrl: './topbardark.component.html',
  styleUrls: ['./topbardark.component.css']
})
export class TopbardarkComponent implements OnInit {

  currentUser: any;

  constructor(
    private token: TokenStorageService,

    ) { }

  ngOnInit(): void {
    // this.currentUser = this.token.getUser().username;
  }

}
