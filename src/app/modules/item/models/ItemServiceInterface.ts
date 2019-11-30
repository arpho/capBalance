
// tslint:disable:semicolon
import * as firebase from 'firebase';
import { ItemModelInterface } from './itemModelInterface';
import { Observable } from 'rxjs';
export interface ItemServiceInterface {
// extra service for complex models
categoriesService?: ItemServiceInterface
suppliersService?: ItemServiceInterface
paymentsService?: ItemServiceInterface
suppliersListRef?
items?: Observable<Array<ItemModelInterface>>

    /**get one item from firebase
     * @param key:string
     * @returns firebase.database reference
     */
    getItem(key: string): firebase.database.Reference;

    /**modifica un item su firebase
     * @param item: ItemModelInterface the item to update
     * @returns void
     */
    updateItem(item: ItemModelInterface);
    /** delete an item on firebase database
     * @param key: string the item's key
     */
    deleteItem(key: string);

    /** return a void item of the type handled by the service */
    getDummyItem(): ItemModelInterface;
    /**crea un item in firebase
     *
     */
    createItem(item: ItemModelInterface): firebase.database.ThenableReference;

    getEntitiesList(): firebase.database.Reference;
}
