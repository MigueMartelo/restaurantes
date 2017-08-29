import {Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {Restaurante} from "../model/restaurante";

@Injectable()
export class RestauranteService{
	constructor(private _http: Http){}

	getRestaurantes(){
		return this._http.get("http://localhost/curso-angular/restaurantes/api-rest/restaurantes-api.php/restaurantes").map(res => res.json());
	}

	getRestaurante(id:string){
		return this._http.get("http://localhost/curso-angular/restaurantes/api-rest/restaurantes-api.php/restaurante/"+id).map(res => res.json());	
	}
}