import { LightningElement,wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi'
import { publish, MessageContext } from 'lightning/messageService'
import SEARCHED_DATA_CHANNEL from '@salesforce/messageChannel/Searched_Data__c'
import SERVICE_TYPE from '@salesforce/schema/Service__c.Type__c'

export default class ExerciseSearchBooking extends LightningElement {
    accountName = ''
    dateFrom = ''
    dateTo = ''
    serviceType = ''
    serviceTypefield
    serviceTypeOptions = []
    bookings = []

    @wire(getPicklistValues, { recordTypeId: '0127S000000gO1aQAE', fieldApiName: SERVICE_TYPE})
    getServiceTypeOptions (result) {
        if (result.error) {
            console.error(result.error)
        } else if (result.data) {
            this.serviceTypeOptions = result.data.values
        }
    }

    @wire(MessageContext)
    messageContext;

    accountNameChangeHandler (event) {
        this.accountName = event.detail.value
    }

    dateFromChangeHandler (event) {
        this.dateFrom = event.detail.value
    }

    dateToChangeHandler (event) {
        this.dateTo = event.detail.value
    }

    serviceTypeChangeHandler (event) {
        this.serviceType = event.detail.value
    }

    async searchButtonClickHandler (event) {
        const result = await searchBookings({
            accountName:this.accountName,
            dateFrom:this.dateFrom,
            dateTo:this.dateTo,
            serviceType:this.serviceType
        })
        console.log(result)
        this.bookings = result
        const payload = {
            data: this.bookings
            };
        publish(this.messageContext, SEARCHED_DATA_CHANNEL, payload);
    }
}