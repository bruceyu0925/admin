// const
const ReqId   = '?' + location.href.split( '?' )[ 1 ],
      BackUrl = '/admin/paint/index.html';

// var
var List_Array = [];

// 資料帶入
const InputData = () => {

    // 欄位
    getId( 'FormName' )  .value = List_Array.Name;
    getId( 'FormColor0' ).value = List_Array.Clr0;
    getId( 'FormColor1' ).value = List_Array.Clr1;
    getId( 'FormColor2' ).value = List_Array.Clr2;
    getId( 'FormColor3' ).value = List_Array.Clr3;
    getId( 'FormColor4' ).value = List_Array.Clr4;
    getId( 'FormColor5' ).value = List_Array.Clr5;
    getId( 'FormColor6' ).value = List_Array.Clr6;
    getId( 'FormColor7' ).value = List_Array.Clr7;
    getId( 'FormColor8' ).value = List_Array.Clr8;
    getId( 'FormColor9' ).value = List_Array.Clr9;
    getId( 'FormId' )        .innerHTML = List_Array.Id;
    getId( 'FormWatch' )     .innerHTML = List_Array.Watch;
    getId( 'FormDateBuild' ) .innerHTML = DateTran( List_Array.DateBuild );
    getId( 'FormDateUpdate' ).innerHTML = DateTran( List_Array.DateUpdate );

    // 調色功能
    queAll( '.form-color' ).forEach( el => {

        const sc = () => {

            var c = el.getAttribute( 'data-color-class' );

            queAll( '.' + c ).forEach( o => {
                o.style.fill = el.value;
            })
        }

        sc();

        el.oninput = () => sc();
    });
};

// GET
fetch( GAS( 'AKfycbwgcR2rqPQgoIUFjayVxXjtepWvolJsWb54cDlnucMkJKa_5dByJyKZDvLdIqUuoWRihA' ) + ReqId , {
    method: 'GET'
        
}).then( res => {
    return res.json();

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

    fetch( GAS( 'AKfycbw0seVQyh97PMFuMz-sVWGe4DZCdDTE4XsyCwIZDKXIRQ_GnqvQlkeWVTDPzeLrOxuG' ) + ReqId , {
        method:  'POST'
    
    }).then( res => {
        return res.text()
    
    }).then( data => {
        data === 'Error' ? alert( '查無此ID，資料已被刪除' ) : null;
        window.location.href = BackUrl;
    })
}

// PUT
getId( 'BtnApply' ).onclick = () => {

    if( CheckInput() === true ) {
        Loading( true );

        var svg    = new XMLSerializer().serializeToString( getId( 'FormImg' ) ),
            base64 = 'data:image/svg+xml;base64,' + btoa( svg );

        fetch( GAS( 'AKfycbyyPj90YY5AMQyv4MijtlCk-0uaJ6hkUhimfHVMbrD8aeZyNKYqT6nSrWs8Lql-Zrho' ) + ReqId , {
            method:  'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
            body:   JSON.stringify({
                        name : getId( 'FormName' ).value,
                        src  : base64,
                        clr0 : getId( 'FormColor0' ).value,
                        clr1 : getId( 'FormColor1' ).value,
                        clr2 : getId( 'FormColor2' ).value,
                        clr3 : getId( 'FormColor3' ).value,
                        clr4 : getId( 'FormColor4' ).value,
                        clr5 : getId( 'FormColor5' ).value,
                        clr6 : getId( 'FormColor6' ).value,
                        clr7 : getId( 'FormColor7' ).value,
                        clr8 : getId( 'FormColor8' ).value,
                        clr9 : getId( 'FormColor9' ).value
                    })
        
        }).then( res => {
            return res.text()
        
        }).then( data => {
            data === 'Error' ? alert( '查無此ID，資料已被刪除' ) : null;
            window.location.href = BackUrl;
        })
    }
}