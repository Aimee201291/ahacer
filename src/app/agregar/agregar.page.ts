import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actividad } from '../models/actividad.model';
import { Lista } from '../models/lista.model';
import { ListaService } from '../services/lista.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem: string;

  constructor(private router: ActivatedRoute,
              public listaService: ListaService) {

    let idLista = this.router.snapshot.paramMap.get('idLista');
    this.lista = this.listaService.obtenerLista(idLista);
    console.log(this.lista);
   }

  ngOnInit() {
  }

  agregar() {
    if (this.nombreItem.length == 0) {
      return;
    }

    const actividad = new Actividad(this.nombreItem);
    this.lista.item.push(actividad);
    this.listaService.guardarStorage();
    this.nombreItem = '';
    console.log(this.nombreItem);
  }

  editar(lista: Lista, actividad: Actividad) {
    console.log("Editar ", lista, actividad);
  }

  borrar(actividad: Actividad) {
    console.log("Eliminar ", actividad);
  }

}
