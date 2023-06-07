import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() title: string;
  @Input() type: string = 'button';
  @Input() class: string;
  @Input() style: string;
  @Input() disabled: boolean;
  @Input() fetching: boolean = false;
  @Input() color: 'primary' | 'warning' | 'secondary' | 'info' | 'danger' = 'primary';
  @Input() size: 'xs' | 'sm' | 'md' | 'xl' = 'md';
}
