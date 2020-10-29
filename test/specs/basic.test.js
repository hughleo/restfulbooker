import moment from 'moment';
import faker from 'faker'
import momentRandom from '../../momentRandom';

describe('exploratory challenge', () => {

    beforeEach(() => {
        browser.url('https://aw4.automationintesting.online/#/');
        $('=Admin panel').click();

        $('#username').setValue('admin');
        $('#password').setValue('password')
        $('#doLogin').click();
    });


    //Test how well the UI handles error codes returned from the APIs
    it('Should return error code from API', () => {
       
        const mock = browser.mock('**/branding/');

        // mock.respond((response) => {
        //     return response.body
        // },{ statusCode: 503 })

        mock.respond({ statusCode: 503 })

        browser.url('/');
    })




    //Find out if the system behaves correctly when the messaging API is turned off.
    it('Should have messaging API turned off', () => {
        const mock = browser.mock('**/message/');
   
        mock.abort('AddressUnreachable')
        browser.url('https://aw4.automationintesting.online/#/admin/messages');
    })


    //Test the reporting page when it believes that the system contains 1000 bookings across 10 rooms.
    it('should return 1000 bookings', () => {
        const mock = browser.mock('**/report/');
        const threeMonthsAgo = moment().subtract(3, 'months');
        const threeMonthsFuture = moment().add(3, 'months');

        const fullReport = [];

        for(let i = 0; i<1000; i++ ) {
            const randomDate = momentRandom(threeMonthsFuture, threeMonthsAgo);

            const endDate = randomDate.format('YYYY-MM-DD');
            const startDate = moment(randomDate).subtract(4, 'days').format('YYYY-MM-DD');

            const report = {
                "start": startDate,
                "end": endDate,
                "title": `${faker.name.firstName()} ${faker.name.lastName()} - Room: 10${Math.round(i/100)}`
            }
            fullReport.push(report);
        }

   
        mock.respond({ "report": fullReport });

    
        browser.url('https://aw4.automationintesting.online/#/admin/report');
    })

    
})
