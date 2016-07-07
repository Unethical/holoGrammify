var lesson7 = {
  scene: null,
  camera: null,
  renderer: null,
  container: null,
  controls: null,
  clock: null,
  stats: null,

  init: function() { // Initialization

    // create main scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xcce0ff, 0.0003);

    var SCREEN_WIDTH = window.innerWidth,
        SCREEN_HEIGHT = window.innerHeight;

    // prepare camera
    var VIEW_ANGLE = 60, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene.add(this.camera);
    this.camera.position.set(-27, 15, -25);
    this.camera.lookAt(new THREE.Vector3(0,0,0));

    // prepare renderer
    this.renderer = new THREE.WebGLRenderer({ antialias:true });
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.renderer.setClearColor(this.scene.fog.color);
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;

    // prepare container
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.container.appendChild(this.renderer.domElement);

    // events
    THREEx.WindowResize(this.renderer, this.camera);

    // prepare controls (OrbitControls)


    // prepare clock
    this.clock = new THREE.Clock();

    // prepare stats

    this.scene.add( new THREE.AmbientLight(0x606060) );

    // light
    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(200, 200, 1000).normalize();
    this.camera.add(dirLight);
    this.camera.add(dirLight.target);

    // load models
    this.loadModels();
  },
  loadModels: function() {
// prepare STL loader and load the model
		var oStlLoader = new THREE.STLLoader();
		oStlLoader.load('models/Larry.stl', function(geometry) {

  		var material = new THREE.MeshNormalMaterial();
 		var mesh = new THREE.Mesh(geometry, material);
  		mesh.rotation.set( - Math.PI / 2, 0, Math.PI / 2);
  		mesh.position.set(-10, 0, 10);
  		mesh.scale.set(2, 2, 2);
  		lesson7.scene.add(mesh);
});

    // here we will load all the models ...
  }
};

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

// Update controls and stats
function update() {
  lesson7.controls.update(lesson7.clock.getDelta());
  lesson7.stats.update();
}

// Render the scene
function render() {
  if (lesson7.renderer) {
    lesson7.renderer.render(lesson7.scene, lesson7.camera);
  }
}

// Initialize lesson on page load
function initializeLesson() {
  lesson7.init();
  animate();
}

if (window.addEventListener)
  window.addEventListener('load', initializeLesson, false);
else if (window.attachEvent)
  window.attachEvent('onload', initializeLesson);
else window.onload = initializeLesson;
