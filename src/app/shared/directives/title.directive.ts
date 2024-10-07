import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitle]'
})
export class TitleDirective {

  constructor(private el: ElementRef<HTMLElement>) {

    this.applyStyles();
   }


  applyStyles(): void{

    this.el.nativeElement.style.fontSize='20';
    this.el.nativeElement.style.backgroundColor='lightgray';
  }

}
