import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Favorite Authors';
  authors = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit(){
    this.getAuthorsFromService();
  }
  
  getAuthorsFromService(){
    let observable = this._httpService.getAuthors();
    observable.subscribe(response => {
      this.authors = response['data'];
      console.log(response);
    });
  }
}
