import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { Httpclient } from '../../services/httpclient';
import { WeaponModel } from '../models/weaponmodel';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-weapons',
  imports: [ButtonModule, CarouselModule, TagModule, CommonModule, DataViewModule],
  templateUrl: './weapons.html',
  styleUrl: './weapons.css',
})
export class Weapons {

 weapons = signal<WeaponModel[]>([]);
  constructor(private httpclient: Httpclient) { }
  assetsUrl = environment.assetsUrl + '/weapons/';


  ngOnInit(): void {
    this.httpclient.getWeapons().subscribe({
      next: (response) => {
        this.weapons.set(response);
        console.log(this.weapons);
      },
      error: (err) => {
        console.error(err);
      }
    });
      //this.weapons.set(WEAPONS_MOCK);


  }


}
