import UnitCommand from '../utils/UnitCommand';
import Common from "../Common";
import {IGameUnit} from "../gameUnits/IGameUnit";
import ActionEvent = BABYLON.ActionEvent;
import Laser from "../weapons/Laser";


/**
 *
 * Controllable unit
 */


//todo team colours, friendlies
export default class Core implements IGameUnit {
  mesh:BABYLON.Mesh;
  isSelected:boolean = false; //selected units can receive new commands
  isOwn:boolean;
  modifiers:Array<any>;
  hitPoints:number = 10;
  click:(e:MouseEvent)=>void;
  baseSpeed:number = Common.MEDIUM_SPEED;
  weapon:Laser = new Laser();


  defaultMaterial:BABYLON.StandardMaterial;
  material:BABYLON.StandardMaterial;

  //todo investigate the feasibility of chained commands or queued commands
  //currentCommands:Array<any>;
  currentCommand:UnitCommand; //poss move to Igameunit

  /**
   *
   * @param scene
   * @param isOwn
   * @param isSelected
   */
  constructor(scene, isOwn, isSelected = false) {

    this.mesh = BABYLON.Mesh.CreateSphere("sphere1", 8, Common.MEDIUM_UNIT_SIZE, scene);
    this.isSelected;//selected units receive commands
    this.modifiers = [];//powerups,shields etc
    this.isOwn = isOwn;

    this.material = new BABYLON.StandardMaterial("green", scene);

    if (isOwn) {
      this.material.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.8);
      this.material.specularColor = new BABYLON.Color3(0.4, 0.4, 0.8);
    } else {
      this.material.diffuseColor = new BABYLON.Color3(0.8, 0.4, 0.4);
      this.material.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    }

    // this.material.emissiveColor = BABYLON.Color3.Green();

    this.mesh.material = this.material;

    this.mesh.actionManager = new BABYLON.ActionManager(scene);

    //show bounding box for selected elements
    this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, this.select.bind(this)));

    //show user where mouse is hovering over
    this.mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, this.mesh.material, "diffuseColor", BABYLON.Color3.White()));
    this.mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, this.mesh.material, "diffuseColor", this.material.diffuseColor));
  }

  select(e:ActionEvent) {
    this.isSelected = true;
    e.meshUnderPointer.showBoundingBox = true;
  }

  deselect() {
    //  self.isSelected = false;
    this.mesh.showBoundingBox = false;
  }

  currentSpeed() {
    //todo speed modifiers
    return this.baseSpeed;
  }
}

