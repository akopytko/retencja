import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
    constructor(private httpClient: HttpClient) {}

    get(){
        return this.httpClient.get<any>(`https://reqres.in/api/users?page=1&per_page=12`);
        // zwrot wszystkich 12 rekordów na raz jest wymagany ze względu na brak filtrowania po stronie serwera. Ale to tylko fakowe api.
    }
    getUser(id: number){
      return this.httpClient.get<any>(`https://reqres.in/api/users/${id}`);
    }
}
