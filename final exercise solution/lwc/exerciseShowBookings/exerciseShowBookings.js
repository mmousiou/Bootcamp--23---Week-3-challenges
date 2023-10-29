import { LightningElement, wire, track} from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SEARCHED_DATA_CHANNEL from '@salesforce/messageChannel/Searched_Data__c'
import cancelBooking from '@salesforce/apex/SearchBookingsCtrl.cancelBooking'
import searchBookings from '@salesforce/apex/SearchBookingsCtrl.searchBookings'

export default class ExerciseShowBookings extends LightningElement {
    @track filters = []
    @track data = []
    apexData = []

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Account', fieldName: 'accountName', type: 'text' },
        { label: 'Status', fieldName: 'Status__c', type: 'text' },
        {
            type: 'button',
            typeAttributes: {
                label: 'Cancel Booking',
                name: 'cancelBooking'
            }
        }
    ]

    @wire(MessageContext)
    messageContext;

    async connectedCallback() {
        const res = await searchBookings() // fetch all the bookings
        this.apexData = res.map( item => {
            return { ...item, accountName: item.Account__r.Name }
        })
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
        this.messageContext,
        SEARCHED_DATA_CHANNEL,
        (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.filters = message.data
        this.data = this.apexData.filter(item => {
            return (item.accountName === this.filters.accountName || !this.filters.accountName) &&
            (item.Staus__c === this.filters.serviceType || !this.filters.serviceType) &&
            (item.DateFrom__c === this.filters.dateFrom || !this.filters.dateFrom) &&
            (item.DateTo__c === this.filters.dateTo || !this.filters.dateTo)
        })
        // we use this condition for each filter:
        // item.accountName === this.filters.accountName || !this.filters.accountName
        // if the filter has value check the value or if it hasn't check is true
    }

    async cancelBookingHandler (event) {
        if (event.detail.action.name === 'cancelBooking') {
            await cancelBooking({
                bookingItemId: event.detail.row.id
            })
        }
    }
}