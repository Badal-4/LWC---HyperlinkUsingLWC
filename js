import { LightningElement,wire,track } from "lwc";
import getAccounts from '@salesforce/apex/accController.getAccounts';
const COLS =  [{
    label : "Name",
    fieldName : "recordLink",
    type : 'url',
    typeAttributes : {label : {fieldName : "Name"}, tooltip : "Name",target : "_blank"}
}
];
export default class demoLWC extends LightningElement 
{
    cols = COLS;
    error;
    @track accList;
    @wire (getAccounts)
    accList({data})
    {
        if(data)
        {
            var tempAccList = [];
            for(var i=0;i<data.length;i++)
            {
                let tempRecord = Object.assign({},data[i]);
                tempRecord.recordLink = '/'+tempRecord.Id;
                tempAccList.push(tempRecord);
            }
            this.accList = tempAccList;
            
        }
    }
}
