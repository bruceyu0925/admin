// module
const getId  = n => document.getElementById( n );
const queOne = n => document.querySelector( n );
const queAll = n => document.querySelectorAll( n );
const GAS    = n => { return `https://script.google.com/macros/s/${ n }/exec` };

// const
const Load       = getId( 'Load' ),
      Html       = getId( 'Html' ),
      HeaderText = getId( 'HeaderText' );

// func 讀取畫面
const Loading = ( state = true ) => {

    if( state === true ) {
        Load.classList.add( '--show' );
        Html.classList.add( '--lock' );

    } else if( state === false ) {
        Load.classList.remove( '--show' );
        Html.classList.remove( '--lock' );
    }
}

// func 日期轉換
const DateTran = ( date ) => {

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

// carry out 問好
HeaderText.innerHTML = '您好，Bruce Yu！';