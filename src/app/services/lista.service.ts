import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  public listas: Lista[] = []; // Va a almacenar listas de listas
  constructor() {
    this.cargarStorage();
   }

  /**
   * @function crearLista
   * @description Función que guarda en arreglo de listas un nuevo objeto o una nueva lista a partir del nombre de la lista
   * @param { string } nombreLista el nombre de la lista
   */
  crearLista(nombreLista: string) {
    let ObjectoLista = new Lista(nombreLista);
    this.listas.push(ObjectoLista);
    this.guardarStorage();
    return ObjectoLista.id;
  }

  /**
   * @function guardarStorage
   * @description Función que guarda en el localStorage las listas
   */
  guardarStorage() {
    let stringLista: string = JSON.stringify(this.listas);
    localStorage.setItem('listas', stringLista);
  }

  /**
   * @function cargarStorage
   * @description Función que va a realizar la carga de la información de las listas
   */
   cargarStorage() {
    const listaStorage = localStorage.getItem('listas');
    if (listaStorage == null) {
      return this.listas = []
    }

    let objListas = JSON.parse(listaStorage);
    this.listas = objListas;
  } 

  /**
   * @function borrarLista
   * @description Función que va a realizar la eliminación de una lista
   * @param { Lista } lista la lista a eliminar
   */
  borrarLista(lista: Lista) {
    let newLista = this.listas.filter((listaItem) => listaItem.id !== lista.id);
    this.listas = newLista;
    this.guardarStorage();
  }

  /**
   * @function editarLista
   * @description Función que va a realizar la edición de la lista pasada por parámetro
   * @param { Lista } lista la lista a editar
   */
   editarLista(lista: Lista) {
    let matchLista = this.listas.find((listaItem) => listaItem.id == lista.id);
    matchLista.titulo = lista.titulo;
    this.guardarStorage();
  }
  

}
