// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

// global
require('js/lib/jquery.js');
// styles
import 'sass#/style.scss';
// scripts

// -----------------------------------------------------------------------------
// Initialize
// -----------------------------------------------------------------------------
let optgroup = $('#year').append(`<optgroup label="1970ыe" class="seventies"></optgroup>`);
for (let i = 1973; i <= 2021; i++) {
    let j;
    if (i % 10 == 0) {
        let optgroup = $('#year').append(`<optgroup label="${i}ыe" class="seventies"></optgroup>`);
    }

    optgroup.append(`<option value="${i}">${i}</option>`);
}

$('input, select').change(function() {
    let brand = [];
    $('input[name="brand"]:checked').each(function() {
        brand.push($(this).val());
    });
    let manufacturer = $('#marka').val();
    let model = $('#filter-model').val();
    let year = $('#year').val();
    let priceFrom = $('#price-from').val();
    let pricetTo = $('#price-to').val();
    let rez = {
        params: {
            brand: brand,
            manufacturer: manufacturer,
            model: model,
            year: year,
            price: [priceFrom, pricetTo],
        },
        pagination: {
            // sort: string
            // perPage: number
            // page: number
        }
    }
    console.log(rez);
});


var maxHeight = 0;
$(".card").each(function(){
    if ( $(this).height() > maxHeight )
    {
        maxHeight = $(this).height();
    }
});

$(".card").height(maxHeight);
