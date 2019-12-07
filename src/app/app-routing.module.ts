import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowWeatherComponent } from './show-weather/show-weather.component';
import { FavoritesComponent } from './favorites/favorites.component';


const routes: Routes = [
  { path: 'home', component: ShowWeatherComponent },
  { path: 'favorites', component: FavoritesComponent },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
