import {
  Input,
  Directive,
  // ViewContainerRef,
  // TemplateRef,
  HostListener,
  ElementRef,
  OnInit,
  HostBinding,
  // AfterViewInit,
  // AfterContentInit
} from '@angular/core';
import { LogService } from '../services/log.service';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false

  constructor(private logService: LogService) {}

  @HostListener('click', []) click($elRef:ElementRef) {
    this.isOpen = !this.isOpen
    this.logService.log('test')
    return false
  }
}
