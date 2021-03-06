// const
const BackUrl = '/admin/poster/index.html';

// var
var Kind_Array = [];

// 資料帶入
const InputData = () => {

    // 核取方塊
    Kind_Array.forEach( el => {

        var v = el.Id,
            t = el.Kind;

        // dom
        getId( 'FormKind' ).insertAdjacentHTML( 'beforeend' ,
            `<label class="form-kind-li">
                <input type="checkbox" class="form-checkbox" value="${ v }"
                    onclick="this.toggleAttribute( 'checked' )">
                <span>${ t }</span>
            </label>`
        )
    })
};

// GET
fetch( GAS( 'AKfycbycpeSbczbsH2gNn9PYSXI8C8NoIPXCOK9hTHCPh6HdL9UM_oPgnBEbRqpCKtqDPfJk' ) , {
    method: 'GET'
        
}).then( res => {
    return res.json()
        
}).then( data => {
    Kind_Array = data
    InputData();
    Loading( false )
});

// POST
getId( 'BtnBuild' ).onclick = () => {

    if( CheckInput() === true ){
        Loading( true );

        var k = [];
        queAll( '.form-checkbox' ).forEach( el => {
            el.hasAttribute( 'checked' ) ? k.push( el.value ) : null
        });
        
        fetch( GAS( 'AKfycbxgsGqUjorV-8pb-er3wUbdJWjZudzZaEhrF1ZO4Rdat5HhdrzfLv83aMfD_bSWmw0PtA' ) , {
            method:  'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
            body:    JSON.stringify({
                        num   : getId( 'FormNum' )  .value,
                        title : getId( 'FormTitle' ).value,
                        desc  : getId( 'FormDesc' ) .value,
                        kind  : k.join( ',' ),
                        top   : getId( 'FormImg' ).style.top,
                        left  : getId( 'FormImg' ).style.left,
                        src   : getId( 'FormImg' ).getAttribute( 'src' )
                    })
        
        }).then( res => {
            return res.text()
        
        }).then( data => {

            if( data === 'Success' ) {
                window.location.href = BackUrl;

            } else if( data === 'Warn-Num' ) {
                getId( 'MsgBuild' ).classList.remove( '--show' );
                alert( '已有相同編號！' );
                Loading( false );
                
            } else if( data === 'Warn-Title' ) {
                getId( 'MsgBuild' ).classList.remove( '--show' );
                alert( '已有相同名稱！' );
                Loading( false );
            }
        })
    }
};

getId( 'FormNum' ).onkeyup = function() {

    var v = this.value;

    v < 1 ? v = 1 : null;
    
    this.value = Math.round( v );
};