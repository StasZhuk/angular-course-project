import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName',
  // pure: false // to force observe changes of filtered value, recalculate on every page changes
})
export class FilterPipe implements PipeTransform {
  transform(
    value: Array<any>,
    filterStr: string,
    propName: string = 'name'
  ): Array<any> {
    if (
      filterStr.length === 0 ||
      value.length === 0 ||
      typeof value[0][propName] !== 'string'
    ) {
      return value;
    }

    return value.filter((item) =>
      (<string>item[propName]).toLowerCase().includes(filterStr.toLowerCase())
    );
  }
}
