// const
const FormBtnLs = getId( 'FormBtnLs' ),
      ReqHeader = { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' };

// var
var ReqId,
    List_Array = [];

// 判斷 舊資料
if( location.href.includes( '?' ) ) {

    ReqId = ( location.href.split( '?' )[ 1 ] ).replace( 'id=' , '' );

    FormBtnLs.insertAdjacentHTML( 'beforeend' ,
        `<div class="form-group">
            <button class="form-btn" id="FormDelete" onclick="FormDelete()">
                <i class="fas fa-trash-alt"></i>
                刪除
            </button>
        </div>
        <div class="form-group">
            <button class="form-btn" id="FormCancel" onclick="FormCancel()">
                <i class="fas fa-times-circle"></i>
                取消
            </button>
        </div>
        <div class="form-group">
            <button class="form-btn" id="FormApply" onclick="FormApply()">
                <i class="fas fa-check-circle"></i>
                確定
            </button>
        </div>`
    );

    // 取得資料
    fetch( ReqUrl , {
        method: 'POST',
        headers: ReqHeader,
        body: JSON.stringify({
            type : 'GET',
            id   : ReqId
        })
    
    }).then( ( res ) => {
        return res.json()
    
    }).then( ( data ) => {
        List_Array = data;
        GetKind();
    })

// 判斷 新資料
} else {

    FormBtnLs.insertAdjacentHTML( 'beforeend' ,
        `<div class="form-group">
            <button class="form-btn" id="FormCancel" onclick="FormCancel()">
                <i class="fas fa-times-circle"></i>    
                取消
            </button>
        </div>
        <div class="form-group">
            <button class="form-btn" id="FormBuild" onclick="FormBuild()">
                <i class="fas fa-plus-circle"></i>
                建立
            </button>
        </div>`
    )
    GetKind();
};

// func 刪除
const FormDelete = () => {

    if ( confirm( '確定刪除此項設定嗎？' ) ) {

        Loading( true );

        fetch( ReqUrl , {
            method: 'POST',
            headers: ReqHeader,
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
        headers: ReqHeader,
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
        headers: ReqHeader,
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