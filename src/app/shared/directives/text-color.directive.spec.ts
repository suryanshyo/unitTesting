import { ElementRef } from '@angular/core';
import { TextColorDirective } from './text-color.directive';

describe('TextColorDirective', () => {
  let directive: TextColorDirective;
  let el: ElementRef;

  beforeEach(() => {
      directive = new TextColorDirective(el);
  });

  // should create an instance
  it('Create an instance', () => {
      expect(directive).toBeTruthy();
  });

  // element color should be red
  it("Expect element color to be red ", () => {
      expect(directive.textColorVar).toBe("red");
  });
});
