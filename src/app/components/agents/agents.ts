import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { Httpclient } from '../../services/httpclient';
import { AGENTS_MOCK } from '../../mocks/agents.mock';
import { AgentModel } from '../models/agentmodel';



@Component({
  selector: 'app-agents',
  imports: [ButtonModule, CarouselModule, TagModule, CommonModule, DataViewModule],
  templateUrl: './agents.html',
  styleUrl: './agents.css',
})
export class AgentsComponent {
  // agents: AgentModel[] = [];
  agents = signal<AgentModel[]>([]);
  constructor(private httpclient: Httpclient) { }

  baseUrl = 'http://localhost:5000/static/agents/';
  
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

    //this.agents.set(AGENTS_MOCK);


  }




}


