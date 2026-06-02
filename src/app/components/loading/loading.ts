import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from '../../services/loading-service';

@Component({  
  selector: 'app-loading',
  imports: [ProgressSpinnerModule],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {

    loadingService = inject(LoadingService);

}
