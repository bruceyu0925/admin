// const
const FormLink = id => { return `/admin/poster/upload.html?id=${ id }` };

// GET
Promise.all([
    GAS( 'AKfycbwi9ZeGuMtffjXfcSHKdjPV0pard7uGyYkbHbFRRluxKmQD9Ii3K6YtumsAl0CrlEWh2g' ) + 
    `?len=999999&page=${ 0 }&tool=${ '' }&text=${ '' }&sort=${ 'new' }`,
    GAS( 'AKfycbycpeSbczbsH2gNn9PYSXI8C8NoIPXCOK9hTHCPh6HdL9UM_oPgnBEbRqpCKtqDPfJk' )

].map( req =>

    fetch( req , {
        method: 'GET'
        
    }).then( res => {
        return res.json()
    })

)).then( ary => {

    List_Array = ary[ 0 ][ 'data' ];
    List_Total = ary[ 0 ][ 'len' ];

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
            num        = a.Num,
            src        = a.Src,
            title      = a.Title,
            desc       = a.Desc,
            kind       = a.Kind,
            datebuild  = DateTran( a.DateBuild ),
            dateupdate = DateTran( a.DateUpdate ),
            left       = a.Left,
            top        = a.Top;

        // 輸出DOM
        getId( 'Tbody' ).insertAdjacentHTML( 'beforeend' , 
            `<tr>
                <td class="__center">
                    <a class="list-btn" href="${ FormLink( id ) }">
                        ${ id }
                    </a>
                </td>
                <td class="__center">
                    ${ num }
                </td>
                <td class="__center">
                    <div class="list-img-block">
                        <img class="list-img-src" alt="${ title }" src="${ src }" 
                            style="left:${ left * 100 }%;top:${ top * 100 }%">
                    </div>
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
                    ${ datebuild }
                </td>
                <td class="__center">
                    ${ dateupdate }
                </td>
            </tr>`
        )
        i++
    }
    queAll( '.list-img-src' ).forEach( el => {
        if( el.offsetWidth > el.offsetHeight ) {
            el.style.width  = 'auto';
            el.style.height = '100%';
        } else {
            el.style.width  = '100%';
            el.style.height = 'auto';
        }
    })
    PageJudge();
};