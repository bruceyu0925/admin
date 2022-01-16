// const
const FormLink = ( id ) => { return `/backstage/skill_info.html?id=${ id }` };

const FormBuildFirst  = getId( 'FormBuildFirst' ),
      FormBuildLast   = getId( 'FormBuildLast' ),
      FormUpdateFirst = getId( 'FormUpdateFirst' ),
      FormUpdateLast  = getId( 'FormUpdateLast' ),
      FormText        = getId( 'FormText' ),
      BtnAdd          = getId( 'BtnAdd' );

// fetch GET data
fetch( GAS( 'AKfycbyho-aJp41o7tmxSKUwR6DqB9Z54fawKHrCijXJcmnDoH0euucF0TPT_NZdpgqHu9iT' ) , {
    method: 'GET'
    
}).then( res => {
    return res.json()

}).then( data => {
    Data_Array = data;
    Data_Total = data.length;

    FormSearch.click();
});

// func 篩選資料
ListFilter = () => {

    Search_Array = [];

    var t  = FormText       .value,
        bf = FormBuildFirst .value,
        bl = FormBuildLast  .value,
        uf = FormUpdateFirst.value,
        ul = FormUpdateLast .value;

        bf === '' ? bf = '1900-1-1'   : null;
        bl === '' ? bl = '9999-12-31' : null;
        uf === '' ? uf = '1900-1-1'   : null;
        ul === '' ? ul = '9999-12-31' : null;

        bf = DateTran( bf + ' 0:00:00' );
        bl = DateTran( bl + ' 0:00:00' );
        uf = DateTran( uf + ' 0:00:00' );
        ul = DateTran( ul + ' 0:00:00' );

    for( let i = 0 ; i < Data_Total ; i++ ) {

        var d = Data_Array[ i ];

        if(
            (
                d[ 'Title' ].indexOf( t ) != -1 ||
                d[ 'Desc' ] .indexOf( t ) != -1 ||
                d[ 'Kind' ] .indexOf( t ) != -1
            ) &&
            (
                DateTran( d[ 'DateBuild' ] ) >= bf &&
                DateTran( d[ 'DateBuild' ] ) <= bl
            ) &&
            (
                DateTran( d[ 'DateUpdate' ] ) >= uf &&
                DateTran( d[ 'DateUpdate' ] ) <= ul
            )
            ) {

                Search_Array.push( d )
        }
    };
};

// func 產生清單
ListHtml = () => {

    var i = ( Page_Num - 1 ) * Page_Len,
        l = Page_Num * Page_Len;

    if( l > Search_Total ) l = Search_Total;

    Tbody.innerHTML = '';

    while( i < l ) {

        var a = Search_Array[ i ],
            id         = a[ 'Id' ],
            title      = a[ 'Title' ],
            desc       = a[ 'Desc' ],
            kind       = a[ 'Kind' ],
            score      = a[ 'Score' ],
            datebuild  = DateTran( a[ 'DateBuild' ] ),
            dateupdate = DateTran( a[ 'DateUpdate' ] ),
            link       = FormLink( id );

        Tbody.insertAdjacentHTML( 'beforeend' , 
            `<tr>
                <td class="__center">
                    ${ id }
                </td>
                <td class="__center">
                    ${ title }
                </td>
                <td class="__left">
                    ${ desc }
                </td>
                <td class="__center">
                    ${ kind }
                </td>
                <td class="__center">
                    ${ score }
                </td>
                <td class="__center">
                    ${ datebuild }
                </td>
                <td class="__center">
                    ${ dateupdate }
                </td>
                <td class="__center">
                    <a class="list-btn list-btn-watch" href="${ link }">編輯</a>
                </td>
            </tr>`
        )
        i++
    }
    PageJudge();
};