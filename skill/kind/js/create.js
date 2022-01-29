// const 表單
const FormTitle      = getId( 'FormTitle' ),
      FormId         = getId( 'FormId' ),
      FormDateBuild  = getId( 'FormDateBuild' ),
      FormDateUpdate = getId( 'FormDateUpdate' );

// const 按鈕
const FormCancel = getId( 'FormCancel' ),
      FormBuild  = getId( 'FormBuild' );

// const
const BackUrl = '/admin/skill/kind/index.html';

Loading( false );

// POST
FormBuild.onclick = () => {
    Loading( true );
    
    fetch( GAS( 'AKfycbyxdBAjTylg6eFV9TxFOhmw_FwTwgmoSaJ8G46mKLCyK8HDoqnEpPPStsshpbKKrU_F4Q' ) , {
        method:  'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
        body:    JSON.stringify({
                    kind: FormTitle.value
                })
    
    }).then( ( res ) => {
        return res.text()
    
    }).then( ( data ) => {
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