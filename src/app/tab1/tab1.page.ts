import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ListaService } from '../services/lista.service';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public listaService: ListaService
    ) {}

    /**
     * @function AgregarLista
     * @description Función que será ejecutada cuando el usuario haga click en el botón agregar
     * Muestra una alerta donde solicita el nombre de la lista
     */
    async agregarLista() {
      let alerta = await this.alertController.create({
        header: "Agregar lista",
        inputs: [
          {
            type: "text",
            name: "titulo",
            placeholder: "Ingresar nombre de la lista"
          }
        ],
        buttons: [
          {
            text: "Cancelar",
            role: "cancel"
          },
          {
            text: "Crear",
            handler: (data: any) => {
              let isValid: boolean = this.validInput(data);
              if (isValid) {
                let titulo = data.titulo;
                this.listaService.crearLista(titulo);
                this.presentToast('Lista creada correctamente');
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

    /**
     * @function editarLista
     * @description Función para editar la lista seleccionada
     * @param { Lista } listaItem la lista a editar
     */
    editarLista(listaItem: Lista) {

    }

    /**
     * @function borrarLista
     * @description Función para eliminar la lista seleccionada
     * @param { Lista } listaItem la lista a eliminar
     */
     borrarLista(listaItem: Lista) {

    }

}
