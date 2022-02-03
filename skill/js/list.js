// const
const FormLink = ( id ) => { return `/admin/skill/upload.html?id=${ id }` };

// GET
Promise.all([
    GAS( 'AKfycbyho-aJp41o7tmxSKUwR6DqB9Z54fawKHrCijXJcmnDoH0euucF0TPT_NZdpgqHu9iT' ),
    GAS( 'AKfycbxLx2e6WSqDSTmkyoZWDZlJt2Wklz21qUEwi0d0By-e0o5l6L4HiUzs5Oqp7T01-Dg' )

].map( req =>

    fetch( req , {
        method: 'GET'
        
    }).then( ( res ) => {
        return res.json()
    })

)).then( ary => {

    List_Array = ary[ 0 ];
    List_Total = ary[ 0 ].length;

    List_Array.forEach( el => {

        for( let i = 0 ; i < ary[ 1 ].length ; i++ ) {
            
            el.Kind = el.Kind.toString().replace( ( ary[ 1 ][ i ][ 'Id' ] ) , ary[ 1 ][ i ][ 'Kind' ] )
        };
    });
    alert(List_Array[0]['Title'])

    FormSearch.click();
});

// func 篩選資料
const ListFilter = () => {

    Search_Array = [];

    var t  = getId( 'FormText' )       .value,
        bf = getId( 'FormBuildFirst' ) .value,
        bl = getId( 'FormBuildLast' )  .value,
        uf = getId( 'FormUpdateFirst' ).value,
        ul = getId( 'FormUpdateLast' ) .value;

    bf === '' ? bf = '1900-1-1'   : null;
    bl === '' ? bl = '9999-12-31' : null;
    uf === '' ? uf = '1900-1-1'   : null;
    ul === '' ? ul = '9999-12-31' : null;

    bf = DateTran( bf + ' 0:00:00' );
    bl = DateTran( bl + ' 0:00:00' );
    uf = DateTran( uf + ' 0:00:00' );
    ul = DateTran( ul + ' 0:00:00' );

    for( let i = 0 ; i < List_Total ; i++ ) {

        var d = List_Array[ i ];

        if(
            (
                d.Title.indexOf( t ) != -1 ||
                d.Desc .indexOf( t ) != -1 ||
                d.Kind .indexOf( t ) != -1
            ) &&
            (
                DateTran( d.DateBuild ) >= bf &&
                DateTran( d.DateBuild ) <= bl
            ) &&
            (
                DateTran( d.DateUpdate ) >= uf &&
                DateTran( d.DateUpdate ) <= ul
            )
            ) {
                Search_Array.push( d )
        }
    }
};

// func 產生清單
const ListHtml = () => {

    var i = ( Page_Num - 1 ) * Page_Len,
        l = Page_Num * Page_Len;

    if( l > Search_Total ) l = Search_Total;

    getId( 'Tbody' ).innerHTML = '';

    while( i < l ) {

        // 轉換資料
        var a = Search_Array[ i ],
            id         = a.Id,
            title      = a.Title,
            desc       = a.Desc,
            kind       = a.Kind.toString(),
            score      = a.Score,
            datebuild  = DateTran( a.DateBuild ),
            dateupdate = DateTran( a.DateUpdate ),
            link       = FormLink( id );

        // 輸出DOM
        getId( 'Tbody' ).insertAdjacentHTML( 'beforeend' , 
            `<tr>
                <td class="__center">
                    <a class="list-btn list-btn-watch" href="${ link }">
                        <i class="fas fa-edit"></i>
                    </a>
                </td>
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
            </tr>`
        )
        i++
    }
    PageJudge();
};