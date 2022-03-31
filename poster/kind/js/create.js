// const
const BackUrl = '/admin/skill/kind/index.html';

window.onload = () => Loading( false );

// POST
getId( 'BtnBuild' ).onclick = () => {

    if( CheckInput() === true ){
        Loading( true );
        
        fetch( GAS( 'AKfycbyxdBAjTylg6eFV9TxFOhmw_FwTwgmoSaJ8G46mKLCyK8HDoqnEpPPStsshpbKKrU_F4Q' ) , {
            method:  'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
            body:    JSON.stringify({
                        kind: getId( 'FormTitle' ).value
                    })
        
        }).then( res => {
            return res.text()
        
        }).then( data => {
            window.location.href = BackUrl;
        })
    }
};