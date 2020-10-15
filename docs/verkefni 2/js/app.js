// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;

const mixers = []; 
const clock =  new THREE.Clock();

function init() {
  container = document.querySelector("#scene-container");

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8fbcd4);

  createCamera();
  createControls();
  createLights();
  createMeshes();
  createRenderer();

  renderer.setAnimationLoop(() => {

    update();
    render();

  });
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(-5, 5, 7);
}

function createControls() {
  controls = new THREE.OrbitControls(camera, container);
}

function createLights() {
  const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 5);

  const mainLight = new THREE.DirectionalLight(0xffffff, 5);
  mainLight.position.set(50, 50, 50);

  scene.add(ambientLight, mainLight);
}



function createMaterials() {
	const loader = new THREE.TextureLoader();
	const body = new THREE.MeshStandardMaterial({
		map: loader.load('https://images.template.net/wp-content/uploads/2015/11/10131230/Fluffy-Fresh-Snow-Texture-Download.gif?width=600'),
	});

	// just as with textures, we need to put colors into linear color space
	body.color.convertSRGBToLinear();

	const detail = new THREE.MeshStandardMaterial({
		color: 0x333333, // darkgrey
	});

	const noseColor = new THREE.MeshStandardMaterial({
		color: 0xFF9900,
		flatShading: true
	});

	let clickerinn = 2

	document.addEventListener('click', function(e){
		console.log(noseColor.color.g += 2)
		clickerinn = clickerinn + 2
		if(clickerinn > 100){
			noseColor.color.b = 2
		}
  	});

  detail.color.convertSRGBToLinear();

  return {
    body,
    detail,
    noseColor
  };
}

function createGeometries() {
  const nose = new THREE.CylinderBufferGeometry(0.1, 0.75, 6, 12);

  const cabin = new THREE.SphereBufferGeometry(2, 32, 32);

  const eye = new THREE.SphereBufferGeometry(1, 32, 32);

  const chimney = new THREE.CylinderBufferGeometry(0.3, 0.1, 0.5);

  // we can reuse a single cylinder geometry for all 4 wheels
  const wheel = new THREE.CylinderBufferGeometry(0.4, 0.4, 1.75, 10);
  wheel.rotateX(Math.PI / 2);

  return {
    nose,
    cabin,
    eye,
    chimney,
    wheel
  };
}

function createMeshes() {
  // create a Group to hold the pieces of the train
  const train = new THREE.Group();
  scene.add(train);

  const materials = createMaterials();
  const geometries = createGeometries();

  const nose = new THREE.Mesh(geometries.nose, materials.noseColor);
  nose.rotation.z = Math.PI / 2;
  nose.position.x = -1;

  const cabin = new THREE.Mesh(geometries.cabin, materials.body);
  cabin.position.set(1.5, 0.4, 0);

  const eyeball = new THREE.Mesh(geometries.eye, materials.detail);
  eyeball.position.set(0.5, 0.5, 0.5);

  const eyeball2 = new THREE.Mesh(geometries.eye, materials.detail);
  eyeball2.position.set(0.5, 0.5, -0.5);

  const chimney = new THREE.Mesh(geometries.chimney, materials.detail);
  chimney.position.set(-2, 0.5, 0);

  let move = 0

  document.addEventListener('click', function(e){
    console.log(chimney.position);
    move = move + 1
    chimney.position.set(-2, -move, move);
	});

  const smallWheelRear = new THREE.Mesh(geometries.wheel, materials.detail);
  smallWheelRear.position.set(0, -0.5, 0);

  const bigWheel = smallWheelRear.clone();
  bigWheel.scale.set(2, 2, 1.25);
  bigWheel.position.set(1.5, -0.1, 0);

  train.add(
    nose,
    cabin,
    eyeball,
    eyeball2,
    chimney,

    smallWheelRear,
    bigWheel
  );
}

function loadModels() {
    const loader = new THREE.GLTFLoader();
  
    // A reusable function to set up the models. We're passing in a position parameter
    // so that they can be individually placed around the scene
    const onLoad = (gltf, position) => {

      const model = gltf.scene.children[ 0 ];
      model.position.copy( position );
  
      const animation = gltf.animations[ 0 ];
  
      const mixer = new THREE.AnimationMixer( model );
      mixers.push( mixer );
  
      const action = mixer.clipAction( animation );
      action.play();
  
      scene.add( model );
    };
  
    // the loader will report the loading progress to this function
    const onProgress = () => {};
  
    // the loader will send any error messages to this function, and we'll log
    // them to to console
    const onError = (errorMessage) => {console.log( errorMessage ); };
  
    // load the first model. Each model is loaded asynchronously,
    // so don't make any assumption about which one will finish loading first
    const flagPosition = new THREE.Vector3(4, 0, -2.5);
    loader.load('models/Weaving Flag.glb', gltf => onLoad( gltf, flagPosition ), onProgress, onError );
  }

function createRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild(renderer.domElement);
}

function update() {
  const delta = clock.getDelta();

  for ( const mixer of mixers ) {

    mixer.update( delta );

  }

  render();
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

init();
