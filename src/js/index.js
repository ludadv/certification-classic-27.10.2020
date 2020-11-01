// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

// global
// styles
import 'sass#/style.scss';
// scripts

// -----------------------------------------------------------------------------
// Initialize
// -----------------------------------------------------------------------------
for (let i = 1973; i <= 2021; i++) {
    $('#year').append(`<option value="${i}">${i}</option>`);
}

$('input, select').change(function() {
    let brand = [];
    $('input:checkbox:checked').each(function() {
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






// a.forEach(i => console.log(a[name]));

