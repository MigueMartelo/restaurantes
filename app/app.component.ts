import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {RestaurantesListComponent} from "./components/restaurantes-list.component";
import {RestauranteDetailComponent} from "./components/restaurante-detail.component";
import {RestauranteAddComponent} from "./components/restaurante-add.component";
import {RestauranteEditComponent} from "./components/restaurante-edit.component";


@Component({
	selector: "my-app",
	templateUrl: "app/view/home.html",
	directives: [RestaurantesListComponent,
				 RestauranteDetailComponent,
				 RestauranteAddComponent,
				 ROUTER_DIRECTIVES]
})

@RouteConfig([
	{path: '/', name: 'Home', component: RestaurantesListComponent, useAsDefault: true},
	{path: '/restaurante/:id', name: 'Restaurante', component: RestauranteDetailComponent},
	{path: '/crear-restaurante/', name: 'CrearRestaurante', component: RestauranteAddComponent},
	{path: '/editar-restaurante/:id', name: 'EditarRestaurante', component: RestauranteEditComponent},
	{path: '/donde-como-hoy/:random', name: 'DondeComoHoy', component: RestauranteDetailComponent}
])

export class AppComponent{
	public titulo:string = "Restaurantes";
}

