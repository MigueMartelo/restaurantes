import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/restaurante";


@Component({
	selector: "restaurantes-list",
	templateUrl: "app/view/restaurantes-list.html",
	directives: [ROUTER_DIRECTIVES],
	providers: [RestauranteService]
})

export class RestaurantesListComponent implements OnInit{
	public titulo:string = "Listado de Restaurantes";
	public restaurantes: Restaurante[];
	public status:string;
	public errorMessage:any;
	public loading;
	public confirmado;

	constructor(private _router: Router, private _restauranteService: RestauranteService){}

	ngOnInit() {
		this.loading = 'show';
		this.getRestaurantes();
		console.log("restaurante-list component cargado");
	}

	getRestaurantes(){
		this._restauranteService.getRestaurantes().subscribe(
				result => {
							this.restaurantes = result.data;
							this.status = result.status;

							if (this.status !== "success") {
								console.error("Error en el servidor");
							}

							this.loading = 'hide';
				},
				error => {
							this.errorMessage = <any>error;
							if (this.errorMessage !== null) {
								console.error(this.errorMessage);
							}
				}
			);
	}

	onBorrarConfirm(id){
		this.confirmado = id;
	}

	onCancelarConfirm(id){
		this.confirmado = null;
	}

	onBorrarRestaurante(id){
		this._restauranteService.deleteRestaurante(id).subscribe(
				result => {
							this.restaurantes = result.data;
							this.status = result.status;

							if (this.status !== "success") {
								console.error("Error en el servidor");
							}
							this.getRestaurantes();
							this.loading = 'hide';
				},
				error => {
							this.errorMessage = <any>error;
							if (this.errorMessage !== null) {
								console.error(this.errorMessage);
							}
				}
			);
	}
}