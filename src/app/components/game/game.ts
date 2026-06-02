import { Component, computed, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectItemGroup } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { DrawerModule } from 'primeng/drawer';
import { NgIf } from "../../../../node_modules/@angular/common/types/_common_module-chunk";
import { AGENTS_MOCK } from '../../mocks/agents.mock';
import { AgentModel } from '../models/agentmodel';
import { Httpclient } from '../../services/httpclient';

@Component({
  selector: 'app-game',
  imports: [ButtonModule, MultiSelectModule, FormsModule, CheckboxModule, DrawerModule],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class GameComponent {

  agents = signal<AgentModel[]>([]);
  selectedAgents = signal<AgentModel[]>([]);


  selectedRandomAgent = signal<AgentModel | null>(null);
  showAgentPanel = signal(false);
  constructor(private httpclient: Httpclient) { }

  ngOnInit(): void {

    this.httpclient.getAgents().subscribe({
      next: (response) => {
        this.agents.set(response);
        console.log(this.agents);
      },
      error: (err) => {
        console.error(err);
      }
    });



  }

  isGroupSelected(group: any): boolean {
    return group.items.every((item: any) =>
      this.selectedAgents().some(
        agent => agent.id === item.value.id
      )
    );

  }

  toggleGroup(group: any): void {

    const groupAgents = group.items.map((item: any) => item.value);

    const allSelected = this.isGroupSelected(group);

    if (allSelected) {

      this.selectedAgents.set(this.selectedAgents().filter(
        selected =>
          !groupAgents.some(
            (groupAgent: AgentModel) => groupAgent.id === selected.id
          )
      ));

    } else {

      const newAgents = groupAgents.filter(
        (groupAgent: AgentModel) =>
          !this.selectedAgents().some(
            selected => selected.id === groupAgent.id
          )
      );

      this.selectedAgents.set([
        ...this.selectedAgents(),
        ...newAgents
      ]);

    }
  }

  groupedAgents = computed(() => {

    const groups = this.agents().reduce((acc, agent) => {

      if (!acc[agent.role]) {
        acc[agent.role] = [];
      }

      acc[agent.role].push({
        label: agent.name,
        value: agent
      });

      return acc;

    }, {} as Record<string, any[]>);

    return Object.entries(groups).map(([role, items]) => ({
      label: role,
      value: role,
      items
    }));

  });

  randomizeAgents(): void {

    const agents = this.selectedAgents();
    const randomIndex = Math.floor(Math.random() * this.selectedAgents().length);

    this.selectedRandomAgent.set(
      agents[randomIndex]
    );
    this.showAgentPanel.set(false)
  }


}

