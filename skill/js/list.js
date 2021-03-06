// const
const FormLink = id => { return `/admin/skill/upload.html?id=${ id }` };

// GET
Promise.all([
    GAS( 'AKfycbyho-aJp41o7tmxSKUwR6DqB9Z54fawKHrCijXJcmnDoH0euucF0TPT_NZdpgqHu9iT' ),
    GAS( 'AKfycby8aq_1Ln1-CB73CqJ-ABcM-gi2vaEheFnf6ou0aVZncs0fmskGGIjuXngYeAEEBBlf' )

].map( req =>

    fetch( req , {
        method: 'GET'
        
    }).then( res => {
        return res.json()
    })

)).then( ary => {

    List_Array = ary[ 0 ];
    List_Total = ary[ 0 ].length;

    List_Array.forEach( el => {

        for( let i = 0 ; i < ary[ 1 ].length ; i++ ) {

            el.Kind = el.Kind.toString().replace( ary[ 1 ][ i ][ 'Id' ] , ary[ 1 ][ i ][ 'Kind' ] )
        };
    });

    getId( 'FormSearch' ).click();
});

// func 篩選資料
const ListFilter = () => {

    var t  = getId( 'FormText' )       .value,
        bf = getId( 'FormBuildFirst' ) .value.split( '-' ).join( '/' ),
        bl = getId( 'FormBuildLast' )  .value.split( '-' ).join( '/' ),
        uf = getId( 'FormUpdateFirst' ).value.split( '-' ).join( '/' ),
        ul = getId( 'FormUpdateLast' ) .value.split( '-' ).join( '/' );

    bf === '' ? bf = '1900/01/01' : null;
    bl === '' ? bl = '9999/12/31' : null;
    uf === '' ? uf = '1900/01/01' : null;
    ul === '' ? ul = '9999/12/31' : null;

    bf = new Date( bf + ' 00:00:00' );
    bl = new Date( bl + ' 00:00:00' );
    uf = new Date( uf + ' 00:00:00' );
    ul = new Date( ul + ' 00:00:00' );

    Search_Array = List_Array.filter( li =>
        (
            li.Title.toString().indexOf( t ) !== -1 ||
            li.Desc .toString().indexOf( t ) !== -1 ||
            li.Kind .toString().indexOf( t ) !== -1
        ) &&
        (
            new Date( li.DateBuild ) >= bf &&
            new Date( li.DateBuild ) <= bl
        ) &&
        (
            new Date( li.DateUpdate ) >= uf &&
            new Date( li.DateUpdate ) <= ul
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
                    <a class="list-btn" href="${ link }">
                        ${ id }
                    </a>
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