import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Conexion from '../../Models/Conexion';
import { Usuario } from '../../Models/Usuario';

@Injectable({
  providedIn: 'root'
})

export class MongoConexionService {

  UrlBase: string = 'https://mongoclient.herokuapp.com/';
  Arr: Conexion[];

  constructor(private Http: HttpClient) { }

  Conexion(Url: string) {
    return this.Http.get(this.UrlBase + 'Conexion', { headers: new HttpHeaders().set('url', Url) }).toPromise();
  }

  Existe(Url: string): Boolean {
    var Local = localStorage.getItem('Conexiones');
    var R = false;
    if (Local) {
      this.Arr = JSON.parse(Local);
      this.Arr.map(Item => {
        if (Item.Url == Url) {
          R = true;
        }
      });
      return R;
    } else {
      this.Arr = [];
      return false;
    }
  }

  RetornarConexiones(): Conexion[] {
    var Local = localStorage.getItem('Conexiones');
    this.Arr = Local ? JSON.parse(Local) : [];
    return this.Arr;
  }

  EliminarConexion(index: number): Conexion[] {
    var Local = localStorage.getItem('Conexiones');
    this.Arr = Local ? JSON.parse(Local) : [];
    this.Arr.splice(index, 1)
    localStorage.setItem('Conexiones', JSON.stringify(this.Arr));
    return this.Arr;
  }

  Guardar(Url: string, Base: any) {
    var Local = localStorage.getItem('Conexiones');
    if (Local) {
      this.Arr = JSON.parse(Local);
      this.Arr.push(new Conexion(Url, Base.BaseDatos as string));
      localStorage.setItem('Conexiones', JSON.stringify(this.Arr));
    } else {
      this.Arr = [];
      this.Arr.push(new Conexion(Url, Base.BaseDatos as string));
      localStorage.setItem('Conexiones', JSON.stringify(this.Arr));
    }
  }

  BorrarUsuario(Url: string, User: string) {
    return this.Http.delete(this.UrlBase + 'RemoverUsuario', { headers: new HttpHeaders().set('url', Url).set('username', User) }).toPromise();
  }

  AgregarUsuario(Url: string, User: Usuario) {
    return this.Http.post(this.UrlBase + 'AgregarUsuario', User, { headers: new HttpHeaders().set('url', Url) }).toPromise();
  }
}
