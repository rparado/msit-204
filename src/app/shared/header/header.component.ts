import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() pageTitle: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  logout() {
	window.location.href='/login'
  }

}
