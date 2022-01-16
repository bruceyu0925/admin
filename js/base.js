getId  = n => document.getElementById( n );
queOne = n => document.querySelector( n );
queAll = n => document.querySelectorAll( n );
GAS    = n => `https://script.google.com/macros/s/${ n }/exec`;

const Load       = getId( 'Load' ),
      Html       = getId( 'Html' ),
      HeaderText = getId( 'HeaderText' );

HeaderText.innerHTML = '您好，Bruce Yu！';

Loading = ( state = true ) => {

    if( state === true ) {
        Load.classList.add( '--show' );
        Html.classList.add( '--lock' );

    } else if( state === false ) {
        Load.classList.remove( '--show' );
        Html.classList.remove( '--lock' );
    }
}

DateTran = ( date ) => {

    var n = new Date( date ),
        Y = ( n.getFullYear()  ).toString(),
        M = ( n.getMonth() + 1 ).toString(),
        D = ( n.getDate()      ).toString(),
        h = ( n.getHours()     ).toString(),
        m = ( n.getMinutes()   ).toString(),
        s = ( n.getSeconds()   ).toString();

    if ( M.length < 2 ) M = '0' + M;
    if ( D.length < 2 ) D = '0' + D;
    if ( h.length < 2 ) h = '0' + h;
    if ( m.length < 2 ) m = '0' + m;
    if ( s.length < 2 ) s = '0' + s;

    return `${ Y }-${ M }-${ D } ${ h }:${ m }:${ s }`
}