// const
const FormId         = getId( 'FormId' ),
      FormTitle      = getId( 'FormTitle' ),
      FormDesc       = getId( 'FormDesc' ),
      FormKind       = getId( 'FormKind' ),
      FormScore      = getId( 'FormScore' ),
      FormDateBuild  = getId( 'FormDateBuild' ),
      FormDateUpdate = getId( 'FormDateUpdate' ),
      FormBtnLs      = getId( 'FormBtnLs' ),
      FormCancel     = getId( 'FormCancel' ),
      FormApply      = getId( 'FormApply' );

// carry out 解析網址參數
if( location.href.indexOf( '?' ) !== -1 ) {

    Loading( true );

    fetch( GAS( 'AKfycbxlvF-Cw1I2YXHe6_9w3RPcbA57tne9GPGgUOIAOkoHjbMB4TGGEm8On_-p3C-WNaud' ) , {
        method: 'GET',

    }).then( ( res ) => {
        return res.text()

    }).then( ( data ) => {

        console.log(data)

        var d = data[ 0 ];

        setTimeout( () => {

            // 設定資料
            FormTitle     .value = d[ 'Title' ];
            FormDesc      .value = d[ 'Desc' ];
            FormKind      .value = d[ 'Kind' ];
            FormScore     .value = d[ 'Score' ];
            FormId        .value = d[ 'Id' ];
            FormDateBuild .value = DateTran( d[ 'DateBuild' ] );
            FormDateUpdate.value = DateTran( d[ 'DateUpdate' ] );

            // 刪除按鈕
            FormBtnLs.insertAdjacentHTML( 'afterbegin' ,
                `<div class="form-group">
                    <button class="form-btn" id="FormDelete">刪除</button>
                </div>`
            )
            getId( 'FormDelete' ).onclick = () => {
                window.location.href = '/backstage/skill_list.html';
            }

            Loading( false );

        } , 500 )
    })
}

// event 轉換整數
FormScore.onkeyup = function() {
    this.value = Math.round( this.value );
}

// event 取消設定
FormCancel.onclick = () => {
    window.location.href = '/backstage/skill_list.html';
}

// event 若有修改，離開頁面前詢問
queAll( 'input' ).forEach( el => {

    el.onchange = () => {

        window.onbeforeunload = ( e ) => {

            var e = window.event || e;
            e.returnValue = true;
        }
    }
});

// event 確認設定
FormApply.onclick = () => {
    window.location.href = '/backstage/skill_list.html';
}