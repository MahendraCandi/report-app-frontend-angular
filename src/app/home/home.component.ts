import { Component, OnInit } from '@angular/core';
import { TokenStorageServiceService } from '../token-storage-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    //private tokenService: TokenStorageServiceService
    ) { }

  ngOnInit() {
  }

  // generateToken(){
  //   this.tokenService.generateToken();
  // }

}
