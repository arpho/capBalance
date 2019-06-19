import { Value } from "./value";
import { ItemServiceInterface } from "./ItemServiceInterface";
import { AlertOptions } from "@ionic/core";
import { ItemFilterOPtions } from "./ItemFIlterOptions";
import { QuickAction } from "./QuickAction";

export type Genere = "o" | "a";

export interface ItemModelInterface {
  title: string;
  note?: string;
  key: string;
  quickActions?: Array<QuickAction>;
  archived?: boolean;
  getTitle(): Value;
  getCountingText(): string;
  getNote(): Value;
  build(item: {});
  load(key: string, service: ItemServiceInterface);
  isArchived?(): boolean;
  archiveItem?(b: boolean);
  isArchivable?(): boolean;
  getValue2(): Value;
  getValue3(): Value;
  getValue4(): Value;
  getEditPopup(item?: ItemModelInterface, service?: ItemServiceInterface): any;
  getCreatePopup(service?: ItemServiceInterface): string | any;

  /**ritorna l'etichetta e il valore da visualizzare del campo aggregato **/
  getAggregate(): Value;
  aggregateAction?(): any | void;
  hasQuickActions?(): boolean;
  serialize /*
  serialize the model for storing in firebase
  */();
  getElement(): { element: string; genere: Genere };

  /**ritorna il nome del tipo di elemento
   * @returns {element:string,genere:'o'|'a'}
   */
}
