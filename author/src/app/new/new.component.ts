import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newAuthor: any;

  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this.newAuthor = {name: "", quote: ""}
  }

  addAuthorFromService(){
    let observable = this._httpService.addAuthor(this.newAuthor);
    observable.subscribe(data => {
      console.log("Added new author!", data);
      this.newAuthor = {name: "", quote: ""};
      this._router.navigate(['/home']);
    })
  }
}


