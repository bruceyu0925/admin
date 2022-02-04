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