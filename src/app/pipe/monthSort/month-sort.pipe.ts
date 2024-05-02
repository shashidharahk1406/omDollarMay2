import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthSort'
})
export class MonthSortPipe implements PipeTransform {
  transform(items: any[], day: string): any[] {
    if (!items || !day) {
      return items;
    }
    console.log(items.filter(item => item.month === day));
    return items.filter(item => item.month === day);
  }
}
