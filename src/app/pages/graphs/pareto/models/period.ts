import { ShoppingKartModel } from 'src/app/models/shoppingKartModel'

export class Period {
    label: string
    endDate: Date
    startDate: Date

    totalCalculator: (karts: ShoppingKartModel[]) => number
    constructor(args: { label: string, startDate: Date, endDate: Date, totalCalcuclator: (karts: ShoppingKartModel[]) => number }) {
        Object.assign(this, args)
    }
    getLabel() { return this.label }
    filterFactory(){
        
    }
    calculateTotal(karts:ShoppingKartModel[]){
    return this.totalCalculator(karts.filter(this.filterFactory))
}
}