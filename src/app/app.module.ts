import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductTileComponent } from './features/filters/components/product-tile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltersComponent } from './features/filters/filters.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AboutComponent } from './features/about/about.component';
import { MaterialModule } from './shared/material.module';
import { ProductPageComponent } from './features/product-page/product-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CounterComponent } from './features/about/counter/counter.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductTileComponent,
    FiltersComponent,
    LayoutComponent,
    AboutComponent,
    ProductPageComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
