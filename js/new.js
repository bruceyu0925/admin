/**
 * @param {Array} array
 * @param {Object} id
 */

class Table {

    constructor( id ) {
        this.id = document.getElementById( id );
        this.data;
    };

    // 資料
    Data( array ) {
        this.data = array;
        this.Tbody( this.data );
    };

    // 表頭
    Thead( array ) {

        var h = '<table id="Table"><thead><tr>',
            s = ( n ) => { 
                return `<button class="td-sort-btn --max" value="${ n }"><i class="fas fa-caret-up"></i><i class="fas fa-caret-down"></i></button>`
            };
        
        array.forEach( el => {
            
            h += `<td>${ el[ 0 ] }`;

            el[ 1 ] !== undefined ? h += s( el[ 1 ] ) : null;

            h += '</td>';
        });

        h += '</tr></thead><tbody id="Tbody"></tbody></table>';

        this.id.innerHTML = h;

        this.Sort();
    };

    // 排序
    Sort() {

        document.querySelectorAll( '.td-sort-btn' ).forEach( el => {
            
            el.onclick = () => {

                if( el.classList.contains( '--click' ) ) {

                    el.classList.toggle( '--max' );
                    el.classList.toggle( '--min' );
                }

                try {
                    queOne( '.td-sort-btn.--click' ).classList.remove( '--click' );
                } catch {};

                el.classList.add( '--click' );

                this.data.sort( ( a , b ) => {

                    var n = queOne( '.td-sort-btn.--click' ),
                        v = n.value;

                    if( n.classList.contains( '--max' ) ) {
                        return a[ v ] < b[ v ] ? 1 : -1
            
                    } else if( n.classList.contains( '--min' ) ) {
                        return a[ v ] > b[ v ] ? 1 : -1
                    }
                });

                this.Tbody( this.data )
            }
        })
    };

    // 表身
    Tbody( array ) {

        var html = '';

        array.forEach( li => {

            html += '<tr>';

            Object.entries( li ).forEach( ( [ k , v ] ) => 

                html += `<td>${ v }</td>`
            );

            html += '</tr>';
        });

        document.getElementById( 'Tbody' ).innerHTML = html;
    };

    _pageJudge() {

    };

    _pageList() {

    };
};

// TEST ---------------------------------------------------------------------

var List_Array = [];

var a = new Table( 'TableBox' );
a.Thead([
    [ '管理' ],
    [ 'ID' , 'Id' ],
    [ '標題' ],
    [ '描述' ],
    [ '分類' ],
    [ '分數' , 'Score' ],
    [ '建立日期' , 'BuildDate' ],
    [ '更新日期' , 'UploadDate' ]
]);

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
    
    ary[ 0 ].forEach( el => {

        for( let i = 0 ; i < ary[ 1 ].length ; i++ ) {
    
            el.Kind = el.Kind.toString()
                .replace(
                    ary[ 1 ][ i ][ 'Id' ] ,
                    ary[ 1 ][ i ][ 'Kind' ]
                )
        };

        List_Array.push({
            Link:       `<a href="/admin/skill/upload.html?id=${ el.Id }">${ el.Id }</a>`,
            Id:         el.Id,
            Title:      el.Title,
            Desc:       el.Desc,
            Kind:       el.Kind,
            Score:      el.Score,
            DateBuild:  DateTran( el.DateBuild ),
            DateUpdate: DateTran( el.DateUpdate )
        })

    })
    // List_Array = ary[ 0 ];
    FormSearch.onclick();
});

FormSearch.onclick = () => {

    Loading( true );
    
    var Ary = [],
        t   = FormText       .value,
        bf  = FormBuildFirst .value,
        bl  = FormBuildLast  .value,
        uf  = FormUpdateFirst.value,
        ul  = FormUpdateLast .value;

    bf === '' ? bf = '1900-1-1'   : null;
    bl === '' ? bl = '9999-12-31' : null;
    uf === '' ? uf = '1900-1-1'   : null;
    ul === '' ? ul = '9999-12-31' : null;

    bf = DateTran( bf + ' 0:00:00' );
    bl = DateTran( bl + ' 0:00:00' );
    uf = DateTran( uf + ' 0:00:00' );
    ul = DateTran( ul + ' 0:00:00' );

    for( let i = 0 ; i < List_Array.length ; i++ ) {

        var d = List_Array[ i ];

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
                Ary.push( d )
        }
    };
    setTimeout( () => {
        Loading( false );
        a.Data( Ary )
        SearchTotal.innerHTML = '共 ' + Ary.length + ' 筆資料';
    } , 300 );
};

FormReset.onclick = () => {

    queAll( '.form-input' ).forEach( el => el.value = '' );
    FormSearch.click();
};