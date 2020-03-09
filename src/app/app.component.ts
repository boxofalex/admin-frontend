import {
  Component,
  OnInit,
} from '@angular/core';
import {
  DatabaseService,
  Query,
} from '@app/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'admin-frontend';

  constructor(
    private databaseService: DatabaseService,
  ) {
  }

  ngOnInit() {
    // this.databaseService.getProducts().subscribe(
    //   response => {
    //     console.log(response);
    //   }
    // );
  }
}
