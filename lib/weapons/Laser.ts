import {IGameUnit} from "../gameUnits/IGameUnit";
import WeaponModifier from "../modifiers/WeaponModifier";

/**
 * Fires a laser from one game object to another
 *
 * For simplicity it fires and renders instantly(speed of light) and remains 1 second afterglow
 *
 * //todo add group laser firing and laser adding
 */
export default class laser {
  intialDamage:number = 10;
  weaponModifier:WeaponModifier = new WeaponModifier();

  constructor() {

  }

  /**
   * Fires laser from one unit to another
   * @param from
   * @param to
   */
  fire(from:IGameUnit, to:IGameUnit, scene:BABYLON.Scene):boolean {
    //todo draw laser + apply damage to 'tp
    return;
  }
}

