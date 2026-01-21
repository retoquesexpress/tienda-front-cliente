import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IServicios } from '../Models/i-servicios';
import { ICategorias } from '../Models/i-categorias';

@Injectable({
  providedIn: 'root'
})
export class SFuncionalidades {

  private miUrl = 'http://localhost:8080/api/services';
  private micategoriaUrl = 'http://localhost:8080/api/categories';
  private miHttp = inject(HttpClient);


  getAllServices(): Observable<IServicios[]> {
    return this.miHttp.get<IServicios[]>(this.miUrl);
  }
  getServiceById(id: number): Observable<IServicios> {
    return this.miHttp.get<IServicios>(this.miUrl + "/" + id);
  }

  getAllCategories(): Observable<ICategorias[]> {
    return this.miHttp.get<ICategorias[]>(this.micategoriaUrl);
  }
  getCategoryById(id: number): Observable<ICategorias> {
    return this.miHttp.get<ICategorias>(this.micategoriaUrl + "/" + id);
  }

  getServicesByCategory(idCategory: number): Observable<IServicios[]> {
    return this.miHttp.get<IServicios[]>(`${this.miUrl}/category/${idCategory}`);
  }

}
