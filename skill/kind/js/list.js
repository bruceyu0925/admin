// const
const FormLink = ( id ) => { return `/admin/skill/kind/upload.html?id=${ id }` };

// GET
fetch( GAS( 'AKfycby8aq_1Ln1-CB73CqJ-ABcM-gi2vaEheFnf6ou0aVZncs0fmskGGIjuXngYeAEEBBlf' ) , {
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
            li.Kind.toString().indexOf( t ) != -1
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
            kind       = a.Kind,
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