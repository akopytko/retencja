import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  favoritesName: string = 'user_favorites';
  save(id: string) {
    const favorites = localStorage.getItem(this.favoritesName);
    const favoritesArray = favorites?.split(",") ?? Array<string>();
    const isInArray = favoritesArray.some(x => x === id.toString());
    if (isInArray === false) {
      favoritesArray.push(id);
      localStorage.setItem(this.favoritesName, favoritesArray.toString());
    }
    else {
      const index = favoritesArray.indexOf(id.toString(), 0);
      if (index > -1) {
        favoritesArray.splice(index, 1);
      }
      localStorage.setItem(this.favoritesName, favoritesArray.toString());
    }
  }
  getFavorites(){
    return localStorage.getItem(this.favoritesName);
  }
}
