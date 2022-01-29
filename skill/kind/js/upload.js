// const 表單
const FormTitle      = getId( 'FormTitle' ),
      FormId         = getId( 'FormId' ),
      FormDateBuild  = getId( 'FormDateBuild' ),
      FormDateUpdate = getId( 'FormDateUpdate' );

// const 按鈕
const FormDelete = getId( 'FormDelete' ),
      FormCancel = getId( 'FormCancel' ),
      FormApply  = getId( 'FormApply' );

// const
const ReqId   = '?' + location.href.split( '?' )[ 1 ],
      BackUrl = '/admin/skill/kind/index.html';

// var
var List_Array = [],
    Kind_Array = [];

// 資料帶入
const InputData = () => {

    // 欄位
    FormTitle     .value     = List_Array.Kind;
    FormId        .innerHTML = List_Array.Id;
    FormDateBuild .innerHTML = DateTran( List_Array.DateBuild );
    FormDateUpdate.innerHTML = DateTran( List_Array.DateUpdate );
};

// GET
fetch( GAS( 'AKfycbwd7Ic8yeDuntx7d3zVPZmd_-ey_K3ECXezil27nfVMEm72Gg_Gsra_Rai_Kec7rD0MXg' ) + ReqId , {
    method: 'GET'
        
}).then( ( res ) => {
    return res.json()

}).then( ary => {
    List_Array = ary;
    InputData();
    Loading( false );

}).catch( ( err ) => {
    alert( '查無此ID，資料已被刪除' );
    window.location.href = BackUrl;
});

// DELETE
FormDelete.onclick = () => {

    if ( confirm( '確定刪除此項設定嗎？' ) ) {
        Loading( true );

        fetch( GAS( 'AKfycbx2VPd35csBHOQosY4YvU8RligUFpJ4cVrgqhcziiRShL_6MufDVVCS81UJNYNpmqwhBg' ) + ReqId , {
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
FormApply.onclick = () => {
    Loading( true );
    
    fetch( GAS( 'AKfycbyKZVAnZ314lj2TlxwtZzERF3MKyWcCLi9xoaRZNFKQ0WY8Tqd9-DHO0_PJ14_yIlzUwg' ) + ReqId , {
        method:  'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
        body:    JSON.stringify({
                    kind: FormTitle.value
                })
    
    }).then( ( res ) => {
        return res.text()
    
    }).then( ( data ) => {
        data === 'Error' ? alert( '查無此ID，資料已被刪除' ) : null;
        window.location.href = BackUrl;
    })
};

// 取消
FormCancel.onclick = () => {
    confirm( '確認離開？將不保存此次設定。' ) ? window.location.href = BackUrl : null;
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