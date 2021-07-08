import { MultiplierForAge } from "./MultiplierForAge";
import { MultiplierForCareerGroup } from "./MultiplierForCareerGroup";
import { MultiplierForGenders } from "./MultiplierForGenders";
import { MultiplierForMainBenifit } from "./MultiplierForMainBenifit";
import { MultiplierForPaymentPeriod } from "./MultiplierForPaymentPeriod";
import { MultiplierForSubBenifit } from "./MultiplierForSubBenifit";

export class Referencetable{
    multiplierForAge: Array<MultiplierForAge> ;
    multiplierForCareerGroup : Array<MultiplierForCareerGroup>;
    multiplierForGenders : Array<MultiplierForGenders> ;
    multiplierForMainBenifit : Array<MultiplierForMainBenifit> ;
    multiplierForPaymentPeriod : Array<MultiplierForPaymentPeriod> ;
    multiplierForSubBenifit : Array<MultiplierForSubBenifit> ;
}