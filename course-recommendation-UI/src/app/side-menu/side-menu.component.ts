import { Component, OnInit } from '@angular/core';
import {MenuItem, PrimeNGConfig} from 'primeng/api';
import {Router} from "@angular/router";
import {GlobalConstants} from "../Common/GlobalConstants";


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor(private router: Router, private primengConfig: PrimeNGConfig, public global: GlobalConstants) { }
  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Register For Courses',
        icon: 'pi pi-fw pi-calendar',
        command: () => this.onRegisterClick(),
      /*  items: [
          {label: 'Published', icon: 'pi pi-fw pi-calendar'},
         //   command: () => this.onPublishClick()},
          {label: 'Draft', icon: 'pi pi-fw pi-calendar'}
           // command: () => this.onDraftClick()}
        ]*/
      },
      {
        label: 'Available Courses',
        icon: 'pi pi-fw pi-code',
        command: () => this.onDetailsClick(),
      },
      {
        label: 'Previous Course History',
        icon: 'pi pi-fw pi-replay',
        command: () => this.onHistoryClick(),
      },
      {
        label: 'My Recommendations',
        icon: 'pi pi-fw pi-thumbs-up',
        command: () => this.onRecommendationClick(),
      },
      {
        label: 'My Profile',
        icon: 'pi pi-fw pi-user',
        command: () => this.onProfileClick(),
      },
      {
        label: 'Stats',
        icon: 'pi pi-fw pi-user',
        command: () => this.onStatsClick(),
      }

    ];

  }

  onRegisterClick(){
    this.primengConfig.ripple = true;
    this.router.navigate(['/RegisterPage']);
  };

  onDetailsClick(){
    this.primengConfig.ripple = true;
    this.router.navigate(['/DetailsPage']);
  };

  onHistoryClick(){
    this.primengConfig.ripple = true;
    this.router.navigate(['/HistoryPage']);
  };

  onRecommendationClick(){
    this.primengConfig.ripple = true;
    this.router.navigate(['/RecommendationPage']);
  };

  onProfileClick(){
    this.primengConfig.ripple = true;
    this.router.navigate(['/ProfilePage']);
  };

  private onStatsClick() {
    this.primengConfig.ripple = true;
    this.router.navigate(['/StatsPage']);
  }
}
