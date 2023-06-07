import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() absolute?: boolean = false;
  @Input() height?: string;
  @Input() width?: string;
  @Input() color?: 'primary' | 'danger' | 'success' | 'white' | 'black' = 'primary';
  @Input() size?: "small" | "big";
}
