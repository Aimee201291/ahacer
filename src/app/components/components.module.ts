import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListasComponent } from './listas/listas.component';


@NgModule({
  declarations: [
    ListasComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ListasComponent
  ] 
})
export class ComponentsModule { }
