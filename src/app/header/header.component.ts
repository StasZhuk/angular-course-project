import { Component } from '@angular/core'
import { LogService } from '../services/log.service'

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  constructor(private logService:LogService) {}

  onLogoClick(e:MouseEvent) {
    e.preventDefault()
    this.logService.logServiceInit.emit(true)
  }
}
