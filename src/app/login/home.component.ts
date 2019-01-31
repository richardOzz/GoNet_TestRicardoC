import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {AuthService} from 'angularx-social-login';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private route: string;
    private userName = '';
    private userMail = '';
    private userLogged: boolean;

    private userPhotoURI = '';

    constructor(private router: Router, private cookie: CookieService, private authService: AuthService) { }

    ngOnInit() {
        // Si no esta logeado
        this.authService.authState.subscribe((user) => {
            // bind user data
            this.userName = user.name;
            this.userMail = user.email;
            this.userPhotoURI = user.photoUrl;
            this.userLogged = (user != null);
        });

        if (!this.userLogged) {
            this.router.navigate(['/login']);
        }
    }
}
