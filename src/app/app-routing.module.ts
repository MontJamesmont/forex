import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/app', pathMatch: 'full'
  },
  {
    path: 'app', component: CarouselComponent
  }
]
  ;

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
