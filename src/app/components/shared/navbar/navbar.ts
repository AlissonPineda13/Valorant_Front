import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, RouterModule],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Choose your agent',
        //todo change icons
        // icon: 'pi pi-link',
        routerLink: '/game'
      },
      {
        label: 'Agents',
        routerLink: '/agents'
      },
      {
        label: 'Weapons',
        routerLink: '/weapons'
      }
    ];
  }


}
