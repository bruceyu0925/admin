// 浮動視窗
queAll( '.form-btn' ).forEach( el =>
    el.onclick = () => {
        getId( 'Html' )  .classList.add( '--lock' );
        getId( el.value ).classList.add( '--show' );
});

queAll( '.msg-cancel' ).forEach( el =>
    el.onclick = () => {
        getId( 'Html' ).classList.remove( '--lock' );
        queAll( '.msg' ).forEach( el =>
            el.classList.remove( '--show' ) 
        );
    }
);

// window beforeunload事件
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

// 返回index
getId( 'BtnCancel' ).onclick = () => {
    window.location.href = BackUrl
};

// 確認欄位都有資料
const CheckInput = () => {

    var j = true,
        c = 0;

    queAll( '.form-input' ).forEach( el => 

        el.value === '' ? j = false : null
    );

    if( queAll( '.form-checkbox' ).length > 0 ) {

        queAll( '.form-checkbox' ).forEach( el =>

            el.hasAttribute( 'checked' ) ? c++ : null
        );

        c === 0 ? j = false : null;
    };

    j === false ? alert( '欄位不得空白！' ) : null;

    return j;
}