import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-menu',
  styleUrls: ['./main-menu.component.scss'],
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent implements OnInit {
  loggedIn$?: Observable<boolean>;

  constructor(private readonly _authService: AuthService) {}

  ngOnInit(): void {
    this.loggedIn$ = this._authService.loggedIn$;
  }

  onLogout(): void {
    this._authService.logOut();
  }
}
