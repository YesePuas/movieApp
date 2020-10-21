import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalles-pelicula',
  templateUrl: './detalles-pelicula.page.html',
  styleUrls: ['./detalles-pelicula.page.scss'],
})
export class DetallesPeliculaPage implements OnInit {
  public movie:object={};
  constructor(
    private activeRoute: ActivatedRoute,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(async (params) => {
      this.movie = JSON.parse(params["movie"]);
    });
  }

  public atras() {
    this.navCtrl.back();
  }
}
