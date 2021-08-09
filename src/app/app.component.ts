import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ingressa';


  constructor(
    public auth: AuthService,
    private route: ActivatedRoute
  ){}

}
