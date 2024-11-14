import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[highLight]'
})
export class HighLightDirective {

  defaultColor = 'gray';
  @Input('highLight') set bgColor(bgColor: string) {
    this._elementRef.nativeElement.style.backgroundColor = bgColor || this.defaultColor;
  };

  constructor(
    private _elementRef: ElementRef
  ) {
    this._elementRef.nativeElement.style.backgroundColor = this.defaultColor;
  }



}
