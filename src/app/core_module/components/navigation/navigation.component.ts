import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  faFacebook,
  faLinkedinIn,
  faSquareInstagram,
} from '@fortawesome/free-brands-svg-icons';

import {
  faCircleInfo,
  faCoffee,
  faContactBook,
  faEnvelope,
  faGear,
  faHome,
  faHouse,
  faPersonChalkboard,
  faXmark,
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
  requirementIcon = faPersonChalkboard;
  contactUs = faContactBook;
  envelopeIcon = faEnvelope;
  facebookIcon = faFacebook;
  instagramIcon = faSquareInstagram;
  linkedInIcon = faLinkedinIn;
  closeIcon = faXmark;
}
