import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitle]'
})
export class TitleDirective implements OnInit {

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.applyStyles();
  }

  applyStyles(): void{
    this.el.nativeElement.style.fontSize='20px';
    if (this.el.nativeElement.localName==='th'){
      this.el.nativeElement.style.backgroundColor='lightgray';
    }
  }

}
