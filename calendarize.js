/* Super simple jQuery inline calendar plugin
 To use: $('div').calendarize([date]).
 To get date selected events: $('div').bind('dateSelected', function(e,date) {//do something with date} )
 To set date programmatically: $('div').trigger('setDate', newDate )
*/
$.fn.calendarize = function( date ) {
  function prop(n) { return function(o) { return o[n](); } }
  var fy=prop('getFullYear'), m=prop('getMonth'), d=prop('getDate'), dow=prop('getDay');
  function calendarize( container, date ) {
    date = date || new Date();
    var month = new Date( fy(date), m(date), 1 );
    var row = "<tr><td>" + '1234567'.split(/\d/).join('</td><td>') + "</td></tr>";
    var months = 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',');
    $(container).html('<span class="cal-head"><span class="cal-prev">\u25C4</span><span class="cal-month"/>'
                      +'<span class="cal-next">\u25BA</span></span>')
                .append('<table class="cal-dates">' + '<tr><th>' + 'Su,Mo,Tu,We,Th,Fr,Sa'.replace(/,/g,'</th><th>')
                       + '</th></tr>' + '123456'.split(/\d/).join(row) + '</table>')
                .bind('setDate', function (e, d) { date = d; month = new Date( fy(date), m(date), 1 ); render(); });
    function render() {
      $('.cal-month',container).text(months[m(month)] + ' ' + fy(month) );
      $('td',container).attr('class','disabled').text('');
      for ( var day=month, i=dow(month); m(day) == m(month); day=new Date(fy(day),m(day),d(day)+1), i++ )
        $('tr:eq('+(((i/7)|0)+1)+') td:eq('+(i%7)+')',container).attr('class','date').text(d(day));
      if ( fy(date) == fy(month) && m(date) == m(month) ) {
        var i = dow(month) + d(date) - 1;
        $('tr:eq('+(((i/7)|0)+1)+') td:eq('+(i%7)+')',container).addClass('selected');
      }
    }
    render();
    $('.cal-prev',container).mousedown(function() { month = new Date(fy(month),m(month)-1,d(month)); render(); return false; });
    $('.cal-next',container).mousedown(function() { month = new Date(fy(month),m(month)+1,d(month)); render(); return false; });
    $('.cal-dates td.date',container).live('mousedown',function(e) {
      e.preventDefault();
      $('td',container).removeClass('selected');
      $(e.target).addClass('selected');
      $(container).trigger('dateSelected', new Date(fy(month),m(month),$(e.target).text()|0) );
    });
  }

  $(this).each( function() { calendarize(this, date); } )
  return this;
}