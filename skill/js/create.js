// const
const BackUrl = '/admin/skill/index.html';

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
                <input type="checkbox" class="form-checkbox" name="getId( 'FormKind' )" value="${ v }"
                    onclick="this.toggleAttribute( 'checked' )">
                <span>${ t }</span>
            </label>`
        )
    })
};

// GET
fetch( GAS( 'AKfycby8aq_1Ln1-CB73CqJ-ABcM-gi2vaEheFnf6ou0aVZncs0fmskGGIjuXngYeAEEBBlf' ) , {
    method: 'GET'
        
}).then( ( res ) => {
    return res.json()
        
}).then( ( data ) => {
    Kind_Array = data
    InputData();
    Loading( false )
});

// POST
getId( 'FormBuild' ).onclick = () => {
    Loading( true );

    var k = [];
    queAll( '.form-checkbox' ).forEach( el => {
        el.hasAttribute( 'checked' ) ? k.push( el.value ) : null
    });
    
    fetch( GAS( 'AKfycbxyPCvHou1FCg9GWLXDyEt9wZCFiLpJCr0mLVvdmUnT2Pm9KNsQW3hukAxjcaQcMPNS' ) , {
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

// event 若有修改，離開頁面前詢問
// queAll( '.form-input' ).forEach( el => {

//     el.onchange = () => {

//         window.onbeforeunload = ( e ) => {

//             var e = window.event || e;
//             e.returnValue = true;
//         }
//     }
// });