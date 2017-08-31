import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router, RouteParams} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/restaurante";


@Component({
	selector: "restaurante-edit",
	templateUrl: "app/view/restaurante-add.html",
	providers: [RestauranteService]
})

export class RestauranteEditComponent implements OnInit{
	public titulo:string = "Editar restaurante";
	public restaurante: Restaurante;
	public status:string;
	public errorMessage:string;
	public loading;

	public filesToUpload: Array<File>;

	constructor(
		private _restauranteService: RestauranteService,
		private _routeParams: RouteParams,
		private _router:Router
	){}

	onSubmit(){
		let id = this._routeParams.get("id")
		this._restauranteService.editRestaurante(id, this.restaurante).subscribe(
				response => {
					this.status = response.status;
					if(this.status !== "success"){
						console.error("Error en el servidor");
					}
				},
				error => {
					this.errorMessage = <any>error;
					if(this.errorMessage !== null){
						console.error(this.errorMessage);
					}
				}
		);
		this._router.navigate(["Home"]);
	}

	ngOnInit(){
		this.restaurante = new Restaurante(
								parseInt(this._routeParams.get("id")),
								this._routeParams.get("nombre"),
								this._routeParams.get("direccion"),
								this._routeParams.get("descripcion"),
								"null",
								this._routeParams.get("precio")
								);
		this.getRestaurante();
	}

	getRestaurante(){
		let id = this._routeParams.get("id");
		this._restauranteService.getRestaurante(id).subscribe(
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

	callPrecio(valor){
		return this.restaurante.precio = valor;
	}

	public resultUpload;

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;

		this.makeFileRequest("http://localhost/curso-angular/restaurantes/api-rest/restaurantes-api.php/upload-file", [], this.filesToUpload).then((result) => {
													this.resultUpload = result;
													this.restaurante.imagen = this.resultUpload.filename;
													console.log(this.resultUpload.filename);
		}, (error) => {
			console.error(error);
		});
	}

	makeFileRequest(url:string, params: Array<string>, files:Array<File>){
		return new Promise((resolve, reject) => {
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			for (var i = 0; i < files.length; i++) {
				formData.append("uploads[]", files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4) {
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			}
			xhr.open("POST", url, true);
			xhr.send(formData);
		});
	}

}