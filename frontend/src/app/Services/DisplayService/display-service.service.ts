import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayServiceService {
  constructor() {}

  splitCarousel<T>(array: T[]): T[][] {
    const res: T[][] = [];
    while (array.length) res.push(array.splice(0, 6));
    return res;
  }

  timeConvert(n: number) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rminutes === 0) {
      return rhours + ' hrs';
    }
    return rhours + ' hrs ' + rminutes + 'mins';
  }
}
