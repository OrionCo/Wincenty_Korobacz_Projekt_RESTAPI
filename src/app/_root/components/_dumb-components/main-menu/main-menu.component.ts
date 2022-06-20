import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-menu',
  styleUrls: ['./main-menu.component.scss'],
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent {
  constructor(private readonly _authService: AuthService) {}

  onLogout(): void {
    this._authService.logOut();
  }
}
