import React, {Component} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import RubberDuck from './../../assets/cad-rubber-duck.stl';
import './Render.css'

class Render extends Component {
    componentDidMount() {
        var mesh, renderer, scene, camera, controls, bb, rect;
        var rotate = 'Y';
        var vector = new THREE.Vector3(0, -1, 0);
        var pause = false;

        function load() {
            var loader = new STLLoader();
            loader.load(RubberDuck, function (geometry) {
                geometry.center();
                var material = new THREE.MeshNormalMaterial();
                mesh = new THREE.Mesh(geometry, material);
                var boundingBox = new THREE.Box3().setFromObject(mesh);
                var sizeHouse = bb.getSize();
                var sizeObject = boundingBox.getSize();
                var ratio = sizeObject.divide(sizeHouse);
                var maxRatio = Math.max(ratio.x, ratio.y, ratio.z);
                var invertRatio = 1 / maxRatio;
                mesh.scale.set(invertRatio, invertRatio, invertRatio);
                mesh.position.set(0, 0.25, 0);
                mesh.setRotationFromAxisAngle(vector, Math.PI/2);
                scene.add(mesh);
                animate();
            });

        }

        function init() {
            var container = document.getElementById("threejs-product-container");
            rect = container.getBoundingClientRect();

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(rect.width - 2, rect.height - 2);

            container.appendChild(renderer.domElement);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xcccccc);
            camera = new THREE.PerspectiveCamera(1, rect.width / rect.height, 1, 1000);
            controls = new OrbitControls(camera, container);

            var boxGeometry = new THREE.BoxGeometry(1, 1, 1);
            var boxMaterial = new THREE.MeshNormalMaterial();
            var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
            bb = new THREE.Box3().setFromObject(boxMesh);
            var height = bb.getSize().y;
            var dist = height / 2 / Math.tan(Math.PI / 360);
            camera.position.set(dist + 25, dist + 25, dist + 25);
            camera.lookAt(boxMesh.position);

            window.addEventListener('resize', onWindowResize, false);
            document.getElementById("threejs-product-container").addEventListener('mousedown', mousedownfunc, false);
            document.getElementById("threejs-product-container").addEventListener('mouseup', mouseupfunc, false);
        }

        function mousedownfunc() {
            pause = true;
        }

        function mouseupfunc() {
            pause = false;
        }

        function onWindowResize() {
            camera.aspect = (rect.width) / (rect.height);
            camera.updateProjectionMatrix();
            renderer.setSize(rect.width - 2, rect.height - 2);
        }

        function animate() {
            if (!pause) {
                if (rotate === 'X') {
                    mesh.rotation.x += 0.01;
                }
                else if (rotate === 'Y') {
                    mesh.rotation.y += 0.01;
                }
                else if (rotate === 'Z') {
                    mesh.rotation.z += 0.01;
                }
            }
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        init();
        load();
    }

    render() {
        return (
            <div className="product-wrapper">
                <div className="row">
                    <div className="flex-column-55">
                        <div id="threejs-product-container"></div>
                    </div>
                    <div className="flex-column-45 product-column-right">
                        <div className="product-title">Rubber Ducks.</div>
                        <p>
                            We understand that natural disasters are unpredictable and can catch
                            even the best of us off-guard. In partnership with some of the leading
                            experts in disaster relief, Real-Time Rescume is preparing to manufacture
                            and distribute a large number of rubber ducks to coastal cities.
                        </p>
                        <p>
                            These rubber ducks are equipped with a special FM transeiver that will
                            automatically alert the local authorities and rescue services of your
                            location when squeezed. The enclosure is water-proof and lightweight,
                            allowing it to float as the water rises in an emergency situation.
                        </p>
                        <p>
                            The rubber duck comes at no cost to you. It is entirely funded by
                            disaster relief agencies and donors. To find out more, please contact us
                            at &nbsp;
                            <a href="mailto:rtrescue.swamphacks@gmail.com">
                                rtrescue.swamphacks@gmail.com
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Render;
