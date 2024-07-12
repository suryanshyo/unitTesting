import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addText'
})
export class AddTextPipe implements PipeTransform {

  // Should return value with text Hello
  transform(value: unknown, ...args: unknown[]): unknown {
    return `Hello ${value}`;
  };

}
