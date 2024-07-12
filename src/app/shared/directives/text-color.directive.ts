import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTextColor]'
})
export class TextColorDirective {
 
  textColorVar: string = "red";

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.color = this.textColorVar;    
  }

}
