queAll( '.msg-cancel' ).forEach( el => {
    el.onclick = () => {
        getId( 'Html' ).classList.remove( '--lock' );
        queAll( '.msg' ).forEach( el => el.classList.remove( '--show' ) );
    }
})

// event 若有修改，離開頁面前詢問
// queAll( '.form-input' ).forEach( el => {

//     el.onchange = () => {

//         window.onbeforeunload = ( e ) => {

//             var e = window.event || e;
//             e.returnValue = true;
//         }
//     }
// });

const LeavaAlert = ( e ) => {
    var e = window.event || e;
    e.returnValue = true;
};

window.addEventListener( 'beforeunload' , LeavaAlert );

queAll( '.msg-apply' ).forEach( el =>
    el.addEventListener( 'click' , () =>
        window.removeEventListener( 'beforeunload' , LeavaAlert )
    )
);

const CheckInput = () => {

    var j = true;

    queAll( '.form-input' ).forEach( el => 

        el.value === '' ? j = false : null
    );

    if( queAll( '.form-checkbox' ).length > 0 ) {

        var c = 0;

        queAll( '.form-checkbox' ).forEach( el => 

            el.hasAttribute( 'checked' ) ? c++ : null
        );

        c === 0 ? j = false : null;
    };

    j === false ? alert( '欄位不得空白！' ) : null;

    return j;
}