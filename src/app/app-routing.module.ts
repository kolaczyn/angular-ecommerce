import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltersComponent } from './features/filters/filters.component';
import { AboutComponent } from './features/about/about.component';
import { ProductPageComponent } from './features/product-page/product-page.component';
import { CartPageModule } from './features/cart-page/cart-page.module';

const routes: Routes = [
  {
    path: '',
    component: FiltersComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'products/:id',
    component: ProductPageComponent,
  },
  {
    path: 'cart',
    loadChildren: () => CartPageModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
