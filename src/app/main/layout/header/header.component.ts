import {
  Component,
  OnInit,
} from '@angular/core';
import { HeaderService } from './header.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private headerService: HeaderService,
  ) { }

  ngOnInit(): void {
  }

  openAccountMenu(origin: MatButton): void {
    this.headerService.openAccoutMenu(origin);
  }

}
