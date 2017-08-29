import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {RestaurantesListComponent} from "./components/restaurantes-list.component";
import {RestauranteDetailComponent} from "./components/restaurante-detail.component";


@Component({
	selector: "my-app",
	templateUrl: "app/view/home.html",
	directives: [RestaurantesListComponent,
				 RestauranteDetailComponent,
				 ROUTER_DIRECTIVES]
})

@RouteConfig([
	{path: '/', name: 'Home', component: RestaurantesListComponent, useAsDefault: true},
	{path: '/restaurante/:id', name: 'Restaurante', component: RestauranteDetailComponent}
])

export class AppComponent{
	public titulo:string = "Restaurantes";
}

