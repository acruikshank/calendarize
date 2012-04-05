Super simple jQuery inline calendar plugin
==========================================

To use: 

      $('div').calendarize([date]).

To get date selected events: 

      $('div').bind('dateSelected', function(e,date) {//do something with date} )

To set date programmatically:

      $('div').trigger('setDate', newDate )