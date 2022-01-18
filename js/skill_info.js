// const
const FormId         = getId( 'FormId' ),
      FormTitle      = getId( 'FormTitle' ),
      FormDesc       = getId( 'FormDesc' ),
      FormKind       = getId( 'FormKind' ),
      FormScore      = getId( 'FormScore' ),
      FormDateBuild  = getId( 'FormDateBuild' ),
      FormDateUpdate = getId( 'FormDateUpdate' ),
      ReqUrl = GAS( 'AKfycbxlvF-Cw1I2YXHe6_9w3RPcbA57tne9GPGgUOIAOkoHjbMB4TGGEm8On_-p3C-WNaud' );

// func 上層連結
const GoBack = () => {
    window.location.href = '/backstage/skill_list.html'
};

// func 輸出資料
const FormHtml = () => {

    FormTitle     .value = Ary_List[ 'Title' ];
    FormDesc      .value = Ary_List[ 'Desc' ];
    FormKind      .value = Ary_List[ 'Kind' ];
    FormScore     .value = Ary_List[ 'Score' ];
    FormId        .value = Ary_List[ 'Id' ];
    FormDateBuild .value = DateTran( Ary_List[ 'DateBuild' ] );
    FormDateUpdate.value = DateTran( Ary_List[ 'DateUpdate' ] );
}

// func Reqest資料
const ReqJson = ( type ) => {

    return {
        type  : type,
        id    : ReqId,
        title : FormTitle.value,
        desc  : FormDesc .value,
        kind  : FormKind .value,
        score : FormScore.value
    }
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