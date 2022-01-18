// const
const FormBtnLs = getId( 'FormBtnLs' );

var ReqId;
var Ary_List = [],
    Ary_Kind = [];

// 判斷 舊資料
if( location.href.includes( '?' ) ) {

    ReqId = ( location.href.split( '?' )[ 1 ] ).replace( 'id=' , '' );

    FormBtnLs.insertAdjacentHTML( 'beforeend' ,
        `<div class="form-group">
            <button class="form-btn" id="FormDelete" onclick="FormDelete()">刪除</button>
        </div>
        <div class="form-group">
            <button class="form-btn" id="FormCancel" onclick="FormCancel()">取消</button>
        </div>
        <div class="form-group">
            <button class="form-btn" id="FormApply" onclick="FormApply()">確定</button>
        </div>`
    );

    fetch( ReqUrl , {
        method: 'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
        body: JSON.stringify({
            type : 'GET',
            id   : ReqId
        })
    
    }).then( ( res ) => {
        return res.json()
    
    }).then( ( data ) => {
        Ary_List = data;

        setTimeout( () => {

            FormHtml();
            Loading( false );

        } , 500 );
    })

// 判斷 新資料
} else {

    FormBtnLs.insertAdjacentHTML( 'beforeend' ,
        `<div class="form-group">
            <button class="form-btn" id="FormCancel" onclick="FormCancel()">取消</button>
        </div>
        <div class="form-group">
            <button class="form-btn" id="FormBuild" onclick="FormBuild()">建立</button>
        </div>`
    )

    Loading( false );
};

// func 刪除
const FormDelete = () => {

    if ( confirm( '確定刪除此項設定嗎？' ) ) {

        Loading( true );

        fetch( ReqUrl , {
            method: 'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
            body: JSON.stringify({
                type : 'DELETE',
                id   : ReqId
            })
        
        }).then( ( res ) => {
            return res.text()
        
        }).then( ( data ) => {

            GoBack();
        })
    }
}

// func 取消
const FormCancel = () => {

    if ( confirm( '確認離開？將不保存此次設定。' ) ) {

        GoBack();
    }
}

// func 修改
const FormApply = () => {

    Loading( true );

    fetch( ReqUrl , {
        method: 'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
        body: JSON.stringify( ReqJson( 'PUT' ) )
    
    }).then( ( res ) => {
        return res.text()
    
    }).then( ( data ) => {

        GoBack();
    })
}


// func 建立
const FormBuild = () => {

    Loading( true );

    fetch( ReqUrl , {
        method: 'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
        body: JSON.stringify( ReqJson( 'POST' ) )
    
    }).then( ( res ) => {
        return res.text()
    
    }).then( ( data ) => {

        GoBack();

    })
}

// event 若有修改，離開頁面前詢問
// queAll( '.form-input' ).forEach( el => {

//     el.onchange = () => {

//         window.onbeforeunload = ( e ) => {

//             var e = window.event || e;
//             e.returnValue = true;
//         }
//     }
// });