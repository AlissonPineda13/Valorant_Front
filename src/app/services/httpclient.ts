import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { AgentModel } from '../components/models/agentmodel';
import { WeaponModel } from '../components/models/weaponmodel';
import { WeaponMapper } from '../mappers/weapon.mapper';
import { WeaponDto } from '../models/weaponDto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Httpclient {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;
  getAgents(): Observable<AgentModel[]> {
    return this.http.get<AgentModel[]>(this.apiUrl + 'agents');
  }


  getWeapons(): Observable<WeaponModel[]> {

    return this.http
      .get<WeaponDto[]>(this.apiUrl + 'weapons')
      .pipe(
        map(response => WeaponMapper.fromApiList(response))
      );
  }



}
