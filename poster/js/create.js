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
        
}).then( ( res ) => {
    return res.json()
        
}).then( ( data ) => {
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
        console.log(JSON.stringify({
            num   : getId( 'FormNum' )  .value,
            title : getId( 'FormTitle' ).value,
            desc  : getId( 'FormDesc' ) .value,
            kind  : k.join( ',' ),
            src   : getId( 'FormImg' ).getAttribute( 'src' ),
            style : {
                top:  getId( 'FormImg' ).style.top,
                left: getId( 'FormImg' ).style.left
            }
        }))
        
        fetch( GAS( 'AKfycbxgsGqUjorV-8pb-er3wUbdJWjZudzZaEhrF1ZO4Rdat5HhdrzfLv83aMfD_bSWmw0PtA' ) , {
            method:  'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
            body:    JSON.stringify({
                        num   : getId( 'FormNum' )  .value,
                        title : getId( 'FormTitle' ).value,
                        desc  : getId( 'FormDesc' ) .value,
                        kind  : k.join( ',' ),
                        src   : getId( 'FormImg' ).getAttribute( 'src' ),
                        top   : getId( 'FormImg' ).style.top,
                        left  : getId( 'FormImg' ).style.left
                    })
        
        }).then( ( res ) => {
            return res.text()
        
        }).then( ( data ) => {
            window.location.href = BackUrl;
        })
    }
};

getId( 'FormNum' ).onkeyup = function() {

    var v = this.value;

    v < 1 ? v = 1 : null;
    
    this.value = Math.round( v );
};