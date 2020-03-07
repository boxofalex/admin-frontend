import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { DATA } from '@shared/popover/popover.component';

@Component({
  selector: 'app-create-block-modal',
  templateUrl: './create-block-modal.component.html',
  styleUrls: ['./create-block-modal.component.scss']
})
export class CreateBlockModalComponent implements OnInit {

  constructor(
    @Inject(DATA) private data,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.data.close();
  }

}
