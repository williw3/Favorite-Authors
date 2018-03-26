import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  editAuthor: any;
  
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.populateEditField();
  }

  editAuthorFromService(){
    let observable = this._httpService.updateAuthor(this.editAuthor.id, this.editAuthor);
    observable.subscribe(data => {
      console.log("Message Received: ", data);
      this.editAuthor = {name: "", quote: ""};
      this._router.navigate(['/home']);
    }) 
  }

  populateEditField(){
    this._route.params.subscribe((params: Params) => {
      let observable = this._httpService.getOneAuthor(params['id']);
      observable.subscribe(data => {
        this.editAuthor = {id: params['id'], name: data['data'].name, quote: data['data'].quote};
      })
    })
  }
}
