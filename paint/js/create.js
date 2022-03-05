// const
const BackUrl = '/admin/paint/index.html';

window.onload = () => Loading( false );

// 調色功能
queAll( '.form-color' ).forEach( el => {

    el.oninput = () => {

        var c = el.getAttribute( 'data-color-class' );

        queAll( '.' + c ).forEach( o => {
            o.style.fill = el.value;
        })
    }
});

// POST
getId( 'BtnBuild' ).onclick = () => {

    if( CheckInput() === true ){
        Loading( true );

        var svg    = new XMLSerializer().serializeToString( getId( 'FormImg' ) ),
            base64 = 'data:image/svg+xml;base64,' + btoa( svg );
        
        fetch( GAS( 'AKfycbzMcXYekQV2kc7LUPUhZ-sl3P8p-8NzIc3k3v83HkrtQJ1VFkuERCkdYUcTE5733n6O' ) , {
            method:  'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
            body:    JSON.stringify({
                        name : getId( 'FormName' ).value,
                        src  : base64,
                        clr0 : getId( 'FormColor0' ).value,
                        clr1 : getId( 'FormColor1' ).value,
                        clr2 : getId( 'FormColor2' ).value,
                        clr3 : getId( 'FormColor3' ).value,
                        clr4 : getId( 'FormColor4' ).value,
                        clr5 : getId( 'FormColor5' ).value,
                        clr6 : getId( 'FormColor6' ).value,
                        clr7 : getId( 'FormColor7' ).value,
                        clr8 : getId( 'FormColor8' ).value,
                        clr9 : getId( 'FormColor9' ).value
                    })
        
        }).then( ( res ) => {
            return res.text()
        
        }).then( ( data ) => {

            if( data === 'Success' ) {
                window.location.href = BackUrl;

            } else if( data === 'Warn' ) {
                getId( 'MsgBuild' ).classList.remove( '--show' );
                alert( '已有相同名稱！' );
                Loading( false );
            }
        })
    }
};