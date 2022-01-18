// const
const FormId         = getId( 'FormId' ),
      FormTitle      = getId( 'FormTitle' ),
      FormDesc       = getId( 'FormDesc' ),
      FormKind       = getId( 'FormKind' ),
      FormScore      = getId( 'FormScore' ),
      FormDateBuild  = getId( 'FormDateBuild' ),
      FormDateUpdate = getId( 'FormDateUpdate' ),
      ReqUrl = GAS( 'AKfycbxlvF-Cw1I2YXHe6_9w3RPcbA57tne9GPGgUOIAOkoHjbMB4TGGEm8On_-p3C-WNaud' );

var Kind_Array = [];

// func 上層連結
const GoBack = () => {
    window.location.href = '/backstage/skill_list.html'
};

// func 輸出資料
const FormHtml = () => {

    // 設定文字框值
    FormTitle     .value = List_Array.Title;
    FormDesc      .value = List_Array.Desc;
    FormScore     .value = List_Array.Score;
    FormId        .value = List_Array.Id;
    FormDateBuild .value = DateTran( List_Array.DateBuild );
    FormDateUpdate.value = DateTran( List_Array.DateUpdate );

    // 設定核取方塊值
    var c = List_Array.Kind.toString();

    Kind_Array.forEach( el => {

        if( c.match( el.Id ) ) {

            getId( 'FormKind' + el.Id ).setAttribute( 'checked' , true );
        }
    });
}

// func Reqest資料
const ReqJson = ( type ) => {

    // 取得核取值
    var k = [];

    queAll( '.form-checkbox' ).forEach( el => {

        if( el.hasAttribute( 'checked' ) ){

            k.push( el.value )
        }
    });

    // 返回陣列
    return {
        type  : type,
        id    : ReqId,
        title : FormTitle.value,
        desc  : FormDesc .value,
        kind  : k.join( ',' ),
        score : FormScore.value
    };
}

// event 分數防呆
FormScore.onkeyup = function() {

    var v = this.value;

    if( v > 100 ) {
        v = 100

    } else if( v < 0 ){
        v = 0
    }
    this.value = Math.round( v );
}

// fetch GET kind
const GetKind = () => {

    fetch( GAS( 'AKfycbxLx2e6WSqDSTmkyoZWDZlJt2Wklz21qUEwi0d0By-e0o5l6L4HiUzs5Oqp7T01-Dg' ) , {
        method: 'GET'
        
    }).then( res => {
        return res.json()

    }).then( data => {

        Kind_Array = data;

        setTimeout( () => {

            // 核取方塊 dom
            Kind_Array.forEach( el => {

                var v = el.Id,
                    t = el.Kind;

                FormKind.insertAdjacentHTML( 'beforeend' ,
                    `<label class="form-kind-li">
                        <input type="checkbox" class="form-checkbox" id="FormKind${ v }" name="FormKind" value="${ v }">
                        <span>${ t }</span>
                    </label>`
                )
            })

            // 核取方塊 event
            queAll( '.form-checkbox' ).forEach( el => {
                el.onclick = () => {
                    el.toggleAttribute( 'checked' )
                }
            })

            FormHtml();
            Loading( false );

        } , 500 );
    });
};