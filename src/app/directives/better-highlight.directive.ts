import {
  Input,
  OnInit,
  ElementRef,
  Renderer2,
  Directive,
  HostListener,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor:string = 'red'
  @Input() hoverColor:string = 'blue'
  @HostBinding('style.backgroundColor') backgroundColor:string

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.backgroundColor = this.defaultColor
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'transition',
      'background-color 0.3s'
    );
  }

  @HostListener('mouseenter') mouseover() {
    this.backgroundColor = this.hoverColor
  }

  @HostListener('mouseleave') mouseleave() {
    this.backgroundColor = this.defaultColor
  }
}
