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
    try {
        getId( 'FormImg' ).getAttribute( 'src' ).length < 1 ? j = false : null;
    } catch {};

    j === false ? alert( '欄位不得空白！' ) : null;

    return j;
}

// // jpg 轉 base64
// function toBase64( src ) {

//     var img = new Image(),
//         base64;

//     img.src = src;

//     img.onload = function () {

//         var w   = this.width,
//             h   = this.height,
//             cvs = document.getElementById( 'photo' ),
//             ctx = cvs.getContext('2d');

//         cvs.width  = w;
//         cvs.height = h;
//         ctx.drawImage( img , 0 , 0 , w , h );

//         base64 = cvs.toDataURL( 'image/jpeg' );
//     }
//     return base64;
// }