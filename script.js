// Global visualization
// Takes a huge list of lat/long values of cities and converts them
// into 3D coordinates, generating a globe.

// THREE.js boilerplate
var camera    = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1500),
    renderer  = new THREE.WebGLRenderer({ antialias: true }),
    geometry  = new THREE.BufferGeometry(),
	 positions = new Float32Array(50000 * 3,3),
    mat       = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 3 }),
    scene     = new THREE.Scene();

// Setup
camera.position.x = 200;
camera.position.y = 200;
camera.position.z = 900;
camera.lookAt(0,0,0)
THREE.ColorManagement.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Take geographic coordinates and convert them
// into cartesian coordinates (x,y,z)
var geoToCartesian = function(lat, lon, radius) {
  var x, y, z;
  lat *= Math.PI / 180;
  lon *= Math.PI / 180;
  x = -radius * Math.cos(lat) * Math.cos(lon);
  y = radius * Math.sin(lat);
  z = radius * Math.cos(lat) * Math.sin(lon);
  return new THREE.Vector3(x, y, z);
};

let counter = -1;

cities.forEach(function(city) {
	var vertex = geoToCartesian(city[0], city[1], 400);
	vertex.toArray( positions, counter*3 );
	counter++;
});

geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions , 3 ) );
let p = new THREE.Points(geometry, mat);
scene.add(p);

requestAnimationFrame(function update() {
  requestAnimationFrame(update);
    
  var time = Date.now() * 0.00005;
  var hue = ( 360 * ( 1.0 + time ) % 360 ) / 360;

  // mat.color.setHSL(hue, 0.5, 0.5 );    
  p.rotation.y += 0.002;
  p.geometry.verticesNeedUpdate = true;
    
  renderer.render(scene, camera);
});

window.addEventListener( 'resize', onWindowResize, false );
	function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}