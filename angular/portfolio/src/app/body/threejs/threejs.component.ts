import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.css']
})
export class ThreejsComponent implements OnInit{
  @ViewChild('render3dContainer')
  render3dContainer?: ElementRef<HTMLDivElement>;

  private camera: THREE.PerspectiveCamera;
  private scene:  THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;

  constructor() {
    this.camera = new THREE.PerspectiveCamera( 50, 4 / 3, 0.01, 2000);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }
  

  ngOnInit(): void {

    setTimeout(async () => {
      try {
        this.windowResize();
        await this.initializeScene();
      } catch (e) {
        console.error(e);
      } 
    });
  }

  async initializeScene(): Promise<boolean> {
    console.log("initializing scene...");

    const element3d = this.render3dContainer?.nativeElement;

    if(!element3d) {
      console.error("initialization failed due to constant being null");
      return false;
    }

    this.renderer.setAnimationLoop(() => {
      this.animate();
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setSize(element3d.clientWidth, element3d.clientHeight)
    element3d.appendChild(this.renderer.domElement);

    this.camera.position.z = 10;

    this.controls.enablePan = false;
    this.controls.enableZoom = false;

    this.controls.update();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );

    const pointLight = new THREE.PointLight(0xffffff, 0.25, 100);
    pointLight.position.set(15, 17, 25);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.set(2048, 2048);

    this.scene.add(pointLight);


    if (this.scene) {
      window.requestAnimationFrame(() => {
          this.animate();
      });
      this.animate();
    }

    return true;
  }

  private animate() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize')
  windowResize() {
    const element3d = this.render3dContainer?.nativeElement;
    if(!element3d) {
      setTimeout(() => {
        this.windowResize();
      }, 10);
      return;
    }

    this.camera.aspect = element3d.clientWidth / element3d.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(element3d.clientWidth, element3d.clientHeight);
    this.animate();
  }
}
