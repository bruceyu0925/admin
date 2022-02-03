// const
const FormLink = ( id ) => { return `/admin/skill/kind/upload.html?id=${ id }` };

// GET
fetch( GAS( 'AKfycbxLx2e6WSqDSTmkyoZWDZlJt2Wklz21qUEwi0d0By-e0o5l6L4HiUzs5Oqp7T01-Dg' ) , {
    method: 'GET'
        
}).then( ( res ) => {
    return res.json()

}).then( ary => {

    List_Array = ary;
    List_Total = ary.length;
    
    getId( 'FormSearch' ).click();
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

    Search_Array = List_Array.filter( li =>
        (
            li.Kind.indexOf( t ) != -1
        ) &&
        (
            DateTran( li.DateBuild ) >= bf &&
            DateTran( li.DateBuild ) <= bl
        ) &&
        (
            DateTran( li.DateUpdate ) >= uf &&
            DateTran( li.DateUpdate ) <= ul
        )
    )
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
            kind       = a.Kind,
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
                    ${ kind }
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