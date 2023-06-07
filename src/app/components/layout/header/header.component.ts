import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private storageService: StorageService) {}

  onLoadData() {
    this.storageService.fetchRecipeData().subscribe();
  }

  onSaveData() {
    this.storageService.saveRecipeData();
  }
}
