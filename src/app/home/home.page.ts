import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cardNumber:any;
  cardHolder:any;
  cardCVV:any;
  cardExpiration:any;
  cardlogo:string="";
  constructor() {}

  cardNumberBlurred(){

    if(this.cardNumber=="" || this.cardNumber==undefined) return "";

    var cardType = this.getCardType(this.cardNumber);

    this.cardlogo =  cardType + ".png";
    
  }

  getCardType(cur_val) {
   
    //JCB
    let jcb_regex = new RegExp('^(?:2131|1800|35)[0-9]{0,}$'); //2131, 1800, 35 (3528-3589)
    // American Express
    let amex_regex = new RegExp('^3[47][0-9]{0,}$'); //34, 37
    // Diners Club
    let diners_regex = new RegExp('^3(?:0[0-59]{1}|[689])[0-9]{0,}$'); //300-305, 309, 36, 38-39
    // Visa
    let visa_regex = new RegExp('^4[0-9]{0,}$'); //4
    // MasterCard
    let mastercard_regex = new RegExp('^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$'); //2221-2720, 51-55
    let maestro_regex = new RegExp('^(5[06789]|6)[0-9]{0,}$'); //always growing in the range: 60-69, started with / not something else, but starting 5 must be encoded as mastercard anyway
    //Discover
    let discover_regex = new RegExp('^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$');
    ////6011, 622126-622925, 644-649, 65


    // get rid of anything but numbers
    cur_val = cur_val.replace(/\D/g, '');

    // checks per each, as their could be multiple hits
    //fix: ordering matter in detection, otherwise can give false results in rare cases
    var sel_brand = "unknown";
    if (cur_val.match(jcb_regex)) {
        sel_brand = "jcb";
    } else if (cur_val.match(amex_regex)) {
        sel_brand = "americanexpress";
    } else if (cur_val.match(diners_regex)) {
        sel_brand = "diners_club";
    } else if (cur_val.match(visa_regex)) {
        sel_brand = "visa";
    } else if (cur_val.match(mastercard_regex)) {
        sel_brand = "mastercard";
    } else if (cur_val.match(discover_regex)) {
        sel_brand = "discover";
    } else if (cur_val.match(maestro_regex)) {
        if (cur_val[0] == '5') { //started 5 must be mastercard
            sel_brand = "mastercard";
        } else {
            sel_brand = "maestro"; //maestro is all 60-69 which is not something else, thats why this condition in the end
        }
    }

    return sel_brand;
}

}
