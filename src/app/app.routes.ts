import { Routes } from '@angular/router';
import { AgentsComponent } from './components/agents/agents';
import { Weapons as WeaponsComponent } from './components/weapons/weapons';
import { GameComponent } from './components/game/game';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'game',
        pathMatch: 'full'
    },
    {
        path: 'game',
        component: GameComponent
    },
    {
        path: 'agents',
        component: AgentsComponent
    },
    {
        path: 'weapons',
        component: WeaponsComponent
    },


];
