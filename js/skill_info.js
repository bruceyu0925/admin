// const
const FormId         = getId( 'FormId' ),
      FormTitle      = getId( 'FormTitle' ),
      FormDesc       = getId( 'FormDesc' ),
      FormKind       = getId( 'FormKind' ),
      FormScore      = getId( 'FormScore' ),
      FormDateBuild  = getId( 'FormDateBuild' ),
      FormDateUpdate = getId( 'FormDateUpdate' ),
      FormBtnLs      = getId( 'FormBtnLs' );

var ReqId;
var Ary_List = [],
    Ary_Kind = [];

// 判斷 舊資料/新資料
try {

    ReqId = ( location.href.split( '?' )[ 1 ] ).replace( 'id=' , '' );

    fetch( GAS( 'AKfycbxlvF-Cw1I2YXHe6_9w3RPcbA57tne9GPGgUOIAOkoHjbMB4TGGEm8On_-p3C-WNaud' ) , {
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
        FormHtml();
    })

} catch {

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

// func 輸出資料
FormHtml = () => {

    setTimeout( () => {

        // 設定資料
        FormTitle     .value = Ary_List[ 'Title' ];
        FormDesc      .value = Ary_List[ 'Desc' ];
        FormKind      .value = Ary_List[ 'Kind' ];
        FormScore     .value = Ary_List[ 'Score' ];
        FormId        .value = Ary_List[ 'Id' ];
        FormDateBuild .value = DateTran( Ary_List[ 'DateBuild' ] );
        FormDateUpdate.value = DateTran( Ary_List[ 'DateUpdate' ] );

        // 刪除按鈕
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
        )

        Loading( false );

    } , 500 )
}

// func 刪除
FormDelete = () => {

    if ( confirm( '確定刪除此項設定嗎？' ) ) {

        Loading( true );

        fetch( GAS( 'AKfycbxlvF-Cw1I2YXHe6_9w3RPcbA57tne9GPGgUOIAOkoHjbMB4TGGEm8On_-p3C-WNaud' ) , {
            method: 'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
            body: JSON.stringify({
                type : 'DELETE',
                id   : ReqId
            })
        
        }).then( ( res ) => {
            return res.text()
        
        }).then( ( data ) => {
    
            window.location.href = '/backstage/skill_list.html';
    
        })
    }
}

// func 取消
FormCancel = () => {

    if ( confirm( '確認離開？將不保存此次設定。' ) ) {

        window.location.href = '/backstage/skill_list.html';

    }
}

// func 修改
FormApply = () => {

    Loading( true );

    fetch( GAS( 'AKfycbxlvF-Cw1I2YXHe6_9w3RPcbA57tne9GPGgUOIAOkoHjbMB4TGGEm8On_-p3C-WNaud' ) , {
        method: 'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
        body: JSON.stringify({
            type  : 'PUT',
            id    : ReqId,
            title : FormTitle.value,
            desc  : FormDesc .value,
            kind  : FormKind .value,
            score : FormScore.value
        })
    
    }).then( ( res ) => {
        return res.text()
    
    }).then( ( data ) => {

        window.location.href = '/backstage/skill_list.html';

    })
}

// func 建立
FormBuild = () => {

    Loading( true );

    fetch( GAS( 'AKfycbxlvF-Cw1I2YXHe6_9w3RPcbA57tne9GPGgUOIAOkoHjbMB4TGGEm8On_-p3C-WNaud' ) , {
        method: 'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8' },
        body: JSON.stringify({
            type  : 'POST',
            title : FormTitle.value,
            desc  : FormDesc .value,
            kind  : FormKind .value,
            score : FormScore.value
        })
    
    }).then( ( res ) => {
        return res.text()
    
    }).then( ( data ) => {

        window.location.href = '/backstage/skill_list.html';

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

// event 轉換整數
FormScore.onkeyup = function() {
    this.value = Math.round( this.value );
}