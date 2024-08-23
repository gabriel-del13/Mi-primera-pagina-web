import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true
})
export class PricePipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === 0 || value === '0' || value === '0.00') {
      return 'Free';
    }
    return `$${Number(value).toFixed(2)}`;
  }
}