import {Component, OnInit, NgZone} from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

declare var FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public user: SocialUser;
  private userLogged = false;
  title = 'GoNet';

    public pieChartLabels:string[] = [];
    public pieChartData:any[] = [{

    }];
    public pieChartType:string = 'bar';
    public barChartLegend: boolean = true;
    public pieChartOptions:any = {'backgroundColor': [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
        ]};
    public rawDummyData: any[] = [{
        "ventas" : "$74392.24",
        "devoluciones" : "$39281.60",
        "bonos" : "$34812.33"
    },{
        "ventas" : "$99376.48",
        "devoluciones": "$62308.65",
        "bonos": "$40810.96"
    }, {
        "ventas": "$24055.02",
        "devoluciones": "$20143.82",
        "bonos": "$44979.52"
    }, {
        "ventas": "$71304.16",
        "devoluciones": "$21618.16",
        "bonos": "$12397.78"
    }, {
        "ventas": "$99402.39",
        "devoluciones": "$60100.63",
        "bonos": "$55536.43"
    }, {
        "ventas": "$73423.34",
        "devoluciones": "$57595.76",
        "bonos": "$437.64"
    }, {
        "ventas": "$69524.05",
        "devoluciones": "$98400.32",
        "bonos": "$12786.42"
    }, {
        "ventas": "$40727.44",
        "devoluciones": "$23100.37",
        "bonos": "$86098.05"
    }];

    constructor(private authService: AuthService, private router: Router, private cookie: CookieService, public _zone: NgZone) { }

    ngOnInit() {
        if (this.user != null) {
            this.authService.signOut();
        }
        (window as any).fbAsyncInit = function() {
            FB.init({
                appId      : '387900248451973',
                cookie     : true,
                xfbml      : true,
                version    : 'v3.1'
            });
           FB.AppEvents.logPageView();
        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        this.loadChart();
    }

    signInWithFB(): void {
        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.userLogged = (user != null);
            console.log("Data", JSON.stringify(user));
        });

        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

    }

    signOut(): void {
        this.authService.signOut();
        this.user = null;
        this.userLogged = false;
    }

    //Chart


    // events on slice click
    public chartClicked(e:any):void {
        console.log(e);
    }

    // event on pie chart slice hover
    public chartHovered(e:any):void {
        console.log(e);
    }

    public loadChart() {
        let awibi=Object.keys(this.rawDummyData[0]);
        console.log("RM "+JSON.stringify(awibi));
        this.pieChartLabels = awibi.map(item=> item);

        var d1 = this.rawDummyData.map (item => item.ventas);
        var d2 = this.rawDummyData.map (item => item.devoluciones);
        var d3 = this.rawDummyData.map (item => item.bonos);
        console.log("data? ",d1);
        this.pieChartData[0] = d1;
        this.pieChartData[1] = d2;
        this.pieChartData[2] = d3;
    }
}
