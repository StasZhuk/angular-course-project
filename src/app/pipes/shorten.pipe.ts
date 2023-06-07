import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, end: number = 10) {
    if (typeof value === 'string' && value.length > end) {
      return value.substring(0, end).trim() + '...';
    }

    return value;
  }
}
