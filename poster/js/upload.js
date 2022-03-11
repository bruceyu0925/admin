// const
const ReqId   = '?' + location.href.split( '?' )[ 1 ],
      BackUrl = '/admin/poster/index.html';

// var
var List_Array = [],
    Kind_Array = [];

// 資料帶入
const InputData = () => {

    // 欄位
    getId( 'FormTitle' )     .value     = List_Array.Title;
    getId( 'FormDesc' )      .value     = List_Array.Desc;
    getId( 'FormScore' )     .value     = List_Array.Score;
    getId( 'FormId' )        .innerHTML = List_Array.Id;
    getId( 'FormDateBuild' ) .innerHTML = DateTran( List_Array.DateBuild );
    getId( 'FormDateUpdate' ).innerHTML = DateTran( List_Array.DateUpdate );

    // 核取方塊
    Kind_Array.forEach( el => {

        var c = List_Array.Kind.toString(),
            v = el.Id,
            t = el.Kind,
            j = '';

        // 已核取
        c.match( v ) ? j = ' checked' : null;

        // dom
        getId( 'FormKind' ).insertAdjacentHTML( 'beforeend' ,
            `<label class="form-kind-li">
                <input type="checkbox" class="form-checkbox" value="${ v }"${ j }
                    onclick="this.toggleAttribute( 'checked' )">
                <span>${ t }</span>
            </label>`
        )
    })
};

// GET
Promise.all([
    GAS( '' ) + ReqId,
    GAS( '' )

].map( req =>

    fetch( req , {
        method: 'GET'
        
    }).then( ( res ) => {
        return res.json()
    })

)).then( ary => {
    List_Array = ary[ 0 ];
    Kind_Array = ary[ 1 ];
    InputData();
    Loading( false );

}).catch( ( err ) => {
    alert( '查無此ID，資料已被刪除' );
    window.location.href = BackUrl;
});

// DELETE
getId( 'BtnDelete' ).onclick = () => {
    Loading( true );

    fetch( GAS( '' ) + ReqId , {
        method:  'POST'
    
    }).then( ( res ) => {
        return res.text()
    
    }).then( ( data ) => {
        data === 'Error' ? alert( '查無此ID，資料已被刪除' ) : null;
        window.location.href = BackUrl;
    })
}

// PUT
getId( 'BtnApply' ).onclick = () => {

    if( CheckInput() === true ) {
        Loading( true );

        var k = [];
        queAll( '.form-checkbox' ).forEach( el => {
            el.hasAttribute( 'checked' ) ? k.push( el.value ) : null
        });
        
        fetch( GAS( '' ) + ReqId , {
            method:  'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
            body:    JSON.stringify({
                        title : getId( 'FormTitle' ).value,
                        desc  : getId( 'FormDesc' ) .value,
                        score : getId( 'FormScore' ).value,
                        kind  : k.join( ',' )
                    })
        
        }).then( ( res ) => {
            return res.text()
        
        }).then( ( data ) => {
            data === 'Error' ? alert( '查無此ID，資料已被刪除' ) : null;
            window.location.href = BackUrl;
        })
    }
}

// 分數防呆
getId( 'FormScore' ).onkeyup = function() {

    var v = this.value;

    if( v > 100 ) {
        v = 100

    } else if ( v < 0 ) {
        v = 0
    };
    this.value = Math.round( v );
};