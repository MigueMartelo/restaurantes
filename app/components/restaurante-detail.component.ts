import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router, RouteParams} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/restaurante";


@Component({
	selector: "restaurante-detail",
	templateUrl: "app/view/restaurante-detail.html",
	providers: [RestauranteService]
})

export class RestauranteDetailComponent implements OnInit{
	public restaurante: Restaurante[];
	public status:string;
	public errorMessage:string;
	public loading;

	constructor(
		private _restauranteService: RestauranteService,
		private _routeParams: RouteParams,
		private _router:Router
	){}

	ngOnInit(){
		this.getRestaurante();
	}

	getRestaurante(){
		let id = this._routeParams.get("id");
		let random = this._routeParams.get("random");

		this._restauranteService.getRestaurante(id, random).subscribe(
			response => {
					this.restaurante = response.data;
					this.status = response.status;
					if (this.status !== "success") {
						console.error("Error en el servidor");
						this._router.navigate(["Home"]);
					}
			},
			error => {
					this.errorMessage = <any>error;
					if (this.errorMessage !== null) {
						console.error(this.errorMessage);
					}
			});
	}

}