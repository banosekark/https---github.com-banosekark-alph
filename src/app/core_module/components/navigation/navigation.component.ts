import { Component, ElementRef, ViewChild } from '@angular/core';

import {
  faCircleInfo,
  faCoffee,
  faGear,
  faHome,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  showMenu: boolean = false;
  public isCollapsed = true;
  homeIcon = faHome;
  aboutIcon = faCircleInfo;
  servicesIcon = faGear;
}
