// const
const ReqId   = '?' + location.href.split( '?' )[ 1 ],
      BackUrl = '/admin/poster/index.html';

// var
var List_Array = [],
    Kind_Array = [];

// 資料帶入
const InputData = () => {

    // 欄位
    getId( 'FormNum' )       .value     = List_Array.Num;
    getId( 'FormTitle' )     .value     = List_Array.Title;
    getId( 'FormDesc' )      .value     = List_Array.Desc;
    getId( 'FormId' )        .innerHTML = List_Array.Id;
    getId( 'FormDateBuild' ) .innerHTML = DateTran( List_Array.DateBuild );
    getId( 'FormDateUpdate' ).innerHTML = DateTran( List_Array.DateUpdate );

    // 圖片
    getId( 'FormImg' ).setAttribute( 'src' , List_Array.Src );
    getId( 'FormImg' )   .style.display = 'block';
    getId( 'FormImgDel' ).style.display = 'flex';
    getId( 'FormImg' ).onload = () => {
        dragReset();
        getId( 'FormImg' ).style.top  = List_Array.Top;
        getId( 'FormImg' ).style.left = List_Array.Left;
    }

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
    GAS( 'AKfycby3k3tjnGQQ8eLaScZkb5EnzoJrTAxnYWYuwIpBUXaNX_QCBrEYseTARdrFgdXEZysq' ) + ReqId,
    GAS( 'AKfycbycpeSbczbsH2gNn9PYSXI8C8NoIPXCOK9hTHCPh6HdL9UM_oPgnBEbRqpCKtqDPfJk' )

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

            } else if( data === 'Error' ) {
                data === 'Error' ? alert( '查無此ID，資料已被刪除' ) : null;
                window.location.href = BackUrl;
            }
        })
    }
}

getId( 'FormNum' ).onkeyup = function() {

    var v = this.value;

    v < 1 ? v = 1 : null;
    
    this.value = Math.round( v );
};