import { Pipe, PipeTransform } from '@angular/core';

export type SortOrder = 'asc' | 'desc';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: any[], sortOrder: SortOrder | string = 'asc', sortKey?: string): any {
    // console.log(value);
    
    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);

    if (!value || (sortOrder !== 'asc' && sortOrder !== 'desc')) {
      return value;
    }

    const sorted = value.slice().sort((a, b) => {
      const comparison = this.compare(a, b, sortKey);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    console.log(sorted)
    return sorted;
  }

  private compare(a: any, b: any, sortKey?: string): number {
    if (sortKey) {
      a = a[sortKey];
      b = b[sortKey];
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    } else if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    } else {
      return 0;
    }
  }
}
