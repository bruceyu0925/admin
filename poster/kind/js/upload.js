// const
const ReqId   = '?' + location.href.split( '?' )[ 1 ],
      BackUrl = '/admin/skill/kind/index.html';

// var
var List_Array = [],
    Kind_Array = [];

// 資料帶入
const InputData = () => {

    // 欄位
    getId( 'FormTitle' )     .value     = List_Array.Kind;
    getId( 'FormId' )        .innerHTML = List_Array.Id;
    getId( 'FormDateBuild' ) .innerHTML = DateTran( List_Array.DateBuild );
    getId( 'FormDateUpdate' ).innerHTML = DateTran( List_Array.DateUpdate );
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
getId( 'BtnDelete' ).onclick = () => {
    Loading( true );

    fetch( GAS( 'AKfycbx2VPd35csBHOQosY4YvU8RligUFpJ4cVrgqhcziiRShL_6MufDVVCS81UJNYNpmqwhBg' ) + ReqId , {
        method:  'POST'
    
    }).then( ( res ) => {
        return res.text()
    
    }).then( ( data ) => {
        data === 'Error' ? alert( '查無此ID，資料已被刪除' ) : null;
        window.location.href = BackUrl;
    })
};

// PUT
getId( 'BtnApply' ).onclick = () => {

    if( CheckInput() === true ){
        Loading( true );
        
        fetch( GAS( 'AKfycbyKZVAnZ314lj2TlxwtZzERF3MKyWcCLi9xoaRZNFKQ0WY8Tqd9-DHO0_PJ14_yIlzUwg' ) + ReqId , {
            method:  'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
            body:    JSON.stringify({
                        kind: getId( 'FormTitle' ).value
                    })
        
        }).then( ( res ) => {
            return res.text()
        
        }).then( ( data ) => {
            data === 'Error' ? alert( '查無此ID，資料已被刪除' ) : null;
            window.location.href = BackUrl;
        })
    }
};