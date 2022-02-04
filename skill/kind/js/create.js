// const
const BackUrl = '/admin/skill/kind/index.html';

Loading( false );

// POST
getId( 'FormBuild' ).onclick = () => {
    getId( 'Html' )    .classList.add( '--lock' );
    getId( 'MsgBuild' ).classList.add( '--show' );
};

getId( 'BtnBuild' ).onclick = () => {
    Loading( true );
    
    fetch( GAS( 'AKfycbyxdBAjTylg6eFV9TxFOhmw_FwTwgmoSaJ8G46mKLCyK8HDoqnEpPPStsshpbKKrU_F4Q' ) , {
        method:  'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
        body:    JSON.stringify({
                    kind: getId( 'FormTitle' ).value
                })
    
    }).then( ( res ) => {
        return res.text()
    
    }).then( ( data ) => {
        window.location.href = BackUrl;
    })
};

// 取消
getId( 'FormCancel' ).onclick = () => {
    getId( 'Html' )     .classList.add( '--lock' );
    getId( 'MsgCancel' ).classList.add( '--show' );
};

getId( 'BtnCancel' ).onclick = () => {
    window.location.href = BackUrl
};