// const
const ReqId   = '?' + location.href.split( '?' )[ 1 ],
      BackUrl = '/admin/skill/index.html';

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
                <input type="checkbox" class="form-checkbox" name="getId( 'FormKind' )" value="${ v }"${ j }
                    onclick="this.toggleAttribute( 'checked' )">
                <span>${ t }</span>
            </label>`
        )
    })
};

// GET
Promise.all([
    GAS( 'AKfycbyZkWOWGJycI0psUMiWfOVq4rmYN1Fb2-rHu6NVVym9ApdqZmcZGhaVWuiH_OyI6ZJ_WQ' ) + ReqId,
    GAS( 'AKfycby8aq_1Ln1-CB73CqJ-ABcM-gi2vaEheFnf6ou0aVZncs0fmskGGIjuXngYeAEEBBlf' )

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
getId( 'FormDelete' ).onclick = () => {

    if ( confirm( '確定刪除此項設定嗎？' ) ) {
        Loading( true );

        fetch( GAS( 'AKfycbzKKG4MKZBAHybZkTwmk-A1PgugFVzOsB1S4anK-kESvhfyN7ElYW4N08c0obVS5NX9' ) + ReqId , {
            method:  'POST'
        
        }).then( ( res ) => {
            return res.text()
        
        }).then( ( data ) => {
            data === 'Error' ? alert( '查無此ID，資料已被刪除' ) : null;
            window.location.href = BackUrl;
        })
    }
};

// PUT
getId( 'FormApply' ).onclick = () => {
    Loading( true );

    var k = [];
    queAll( '.form-checkbox' ).forEach( el => {
        el.hasAttribute( 'checked' ) ? k.push( el.value ) : null
    });
    
    fetch( GAS( 'AKfycbyJgWX4R7H4y7k16qCSp1UgX1_e9zxq-T44DRi8Oqu5xCfumOsnPC6C3rISX-MkzOjrxw' ) + ReqId , {
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
};

// 取消
getId( 'FormCancel' ).onclick = () => {
    confirm( '確認離開？將不保存此次設定。' ) ? window.location.href = BackUrl : null;
};

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