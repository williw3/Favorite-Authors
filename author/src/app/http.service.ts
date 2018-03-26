import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
  
  }

  getAuthors(){
    return this._http.get('/allAuthors');
  }

  getOneAuthor(id){
    return this._http.get('/authors/' + id);
  }

  addAuthor(newAuthor){
    return this._http.post('/authors', newAuthor);
  }

  deleteAuthor(id){
    return this._http.delete('/authors/' + id);
  }

  updateAuthor(id, updateAuthor){
    return this._http.put('/authors/' + id, updateAuthor);
  }
}
