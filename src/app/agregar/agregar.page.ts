import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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
              public listaService: ListaService,
              private alertController: AlertController,
              private toastController: ToastController) {

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
    this.editarActividad(actividad);
  }

  borrar(actividad: Actividad) {
    this.lista.item = this.lista.item.filter(item => item !== actividad);
    this.listaService.guardarStorage();
    console.log("Eliminar ", actividad);
  }

  cambioCheck() {
    const pendientes = this.lista.item.filter(item => item.completado == false).length;
    if (pendientes == 0) {
      this.lista.completada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.completada = false;
      this.lista.terminadaEn = null;
    }
    this.listaService.guardarStorage();
  }

    /**
     * @function editarActividad
     * @description Función que será ejecutada cuando el usuario haga click en el botón editar
     * Muestra una alerta donde solicita el nuevo nombre de la actividad
     */
      async editarActividad(actividad: Actividad) {
        let alerta = await this.alertController.create({
          header: "Editar actividad",
          inputs: [
            {
              type: "text",
              name: "titulo",
              placeholder: "Ingresar nombre de la actividad",
              value: actividad.descripcion
            }
          ],
          buttons: [
            {
              text: "Cancelar",
              role: "cancel"
            },
            {
              text: "Editar",
              handler: (data: any) => {
                let isValid: boolean = this.validInput(data);
                if (isValid) {
                  let titulo = data.titulo;
                  actividad.descripcion = titulo;
                  this.listaService.guardarStorage();
                  this.presentToast('Lista editada correctamente');
                }
              }
            }
          ]
        })
        await alerta.present();
        console.log("Click en el botón");
      }

    /**
     * @function validInput
     * @description Función que realiza la validación del input
     * Cuando no fue ingresado ningún valor manda false (y un toast) y en caso contrario manda un true
     * @param { any } input al valor ingresado por el usuario
     * @return { boolean }
     */
      validInput(input: any): boolean {
        if (input && input.titulo) {
          return true;
        }
        this.presentToast("Debe ingresar un valor");
        return false;
    }

    /**
     * @function presentToast
     * @description Función que muestra un mensaje el cual fue pasado por parámetro
     * Duración 2000 milisegundos
     * @param { any } mensaje al valor ingresado por el usuario
     * @return { boolean }
     */
      async presentToast(mensaje: string) {
        let toast = await this.toastController.create({
          message: mensaje,
          duration: 2000
        });
        toast.present();
    }

}
