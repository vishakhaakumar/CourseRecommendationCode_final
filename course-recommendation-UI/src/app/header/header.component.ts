import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GlobalConstants} from "../Common/GlobalConstants";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, public global: GlobalConstants) { }
  userId: number;
  userName: string;

  ngOnInit(): void { }

  async onLogOut() {
    console.log('logged out!!')
    let val = await this.loginService.logout();
    this.router.navigate(['/LoginPage']);
  }
}
