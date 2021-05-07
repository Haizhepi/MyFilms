import { Injectable } from '@angular/core';
import { Display, MyList } from '../../structure.type';

const name = 'continue';

@Injectable({
  providedIn: 'root',
})
export class ContinueWatchingService {
  constructor() {}

  loadList() {
    let mylist: MyList = { data: [] };
    let mylistData = localStorage.getItem(name);
    if (mylistData !== null) {
      mylist = JSON.parse(mylistData);
    }
    return mylist;
  }

  hasData() {
    let mylist = this.loadList();
    return mylist.data.length > 0;
  }

  existInList(display: Display) {
    let list = this.loadList();
    for (let i = 0; i < list.data.length; i++) {
      if (list.data[i].id === display.id) {
        return true;
      }
    }
    return false;
  }

  addToList(display: Display) {
    if (this.existInList(display)) {
      return;
    }
    let list = this.loadList();
    list.data.unshift(display);
    if (list.data.length > 24) {
      list.data.pop();
    }
    localStorage.setItem(name, JSON.stringify(list));
  }

  removeFromList(display: Display) {
    if (!this.existInList(display)) {
      return;
    }
    let list = this.loadList();
    for (let i = 0; i < list.data.length; i++) {
      if (list.data[i].id === display.id) {
        list.data.splice(i, 1);
        break;
      }
    }
    localStorage.setItem(name, JSON.stringify(list));
  }

  splitCarousel<T>(array: T[]): T[][] {
    const res: T[][] = [];
    while (array.length) res.push(array.splice(0, 6));
    return res;
  }

  getData(): Display[][] {
    let mylist = this.loadList();
    return this.splitCarousel(mylist.data);
  }

  getAllData() {
    return this.loadList().data;
  }
}
