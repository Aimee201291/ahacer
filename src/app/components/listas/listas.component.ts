import { Component, OnInit } from '@angular/core';
import { ListaService } from '../../services/lista.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  constructor(public listaService: ListaService,
    public alertController: AlertController,
    public toastController: ToastController,
    public router: Router) { }

  ngOnInit() {}

    /**
     * @function editarLista
     * @description Función que será ejecutada cuando el usuario haga click en el botón editar
     * Muestra una alerta donde solicita el nuevo nombre de la lista
     */
      async editarLista(lista: Lista) {
        let alerta = await this.alertController.create({
          header: "Editar lista",
          inputs: [
            {
              type: "text",
              name: "titulo",
              placeholder: "Ingresar nombre de la lista",
              value: lista.titulo
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
                  lista.titulo = titulo;
                  this.listaService.editarLista(lista);
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

    /**
     * @function borrarLista
     * @description Función para eliminar la lista seleccionada
     * @param { Lista } listaItem la lista a eliminar
     */
      borrarLista(listaItem: Lista) {
        this.listaService.borrarLista(listaItem);
      }
    
    /**
     * @function actualizarLista
     * @description Función para editar  la lista seleccionada
     * @param { Lista } listaItem la lista a editar
     */
      actualizarLista(listaItem: Lista) {
      this.editarLista(listaItem);
    }

    listaSeleccionada(listaItem: Lista) {
      console.log(listaItem);
      const URL = '/agregar/'+listaItem.id;
      this.router.navigateByUrl(URL);
    }
}
