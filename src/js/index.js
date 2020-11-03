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
document.addEventListener("DOMContentLoaded", () => {
let optgroup = $('#year').append(`<optgroup label="1970ыe" class="seventies"></optgroup>`);
    for (let i = 1973; i <= 2021; i++) {
        let j;
        if (i % 10 == 0) {
            let optgroup = $('#year').append(`<optgroup label="${i}ыe" class="seventies"></optgroup>`);
        }

        optgroup.append(`<option value="${i}">${i}</option>`);
    }

    $('input, select, .page').change(function() {
        let brand = [];
        $('input[name="brand"]:checked').each(function() {
            brand.push($(this).val());
        });
        let manufacturer = $('#marka').val();
        let model = $('#filter-model').val();
        let year = $('#year').val();
        let priceFrom = $('#price-from').val();
        let pricetTo = $('#price-to').val();
        let sort = $('#sort').val();
        let perPage = $('#per_page').val();
        let page = $('#page').val();
        let rez = {
            params: {
                brand: brand,
                manufacturer: manufacturer,
                model: model,
                year: year,
                price: [priceFrom, pricetTo],
            },
            pagination: {
                sort: sort,
                perPage: perPage,
                page: page,
            }
        }
        // var recursiveEncoded = $.param(rez.params);
        // console.log(decodeURIComponent(recursiveEncoded));

        // const filter = $('#filter').serializeArray()
        //     .filter(item => item && item.value)
        //     .map(item => item.name + '=' + item.value)
        //     .join('&');
        // console.log(filter);
        let params = {};
        if (brand.length > 0) {
            params['brand'] = brand;
        }
        // console.log(params);
        if (manufacturer) {
            params['manufacturer'] = manufacturer;
        }
        // console.log(params);
        if (model) {
            params['model'] = model;
        }
        // console.log(params);
        if (year) {
            params['year'] = year;
        }
        // console.log(params);
        if (priceFrom) {
            params['priceFrom'] = priceFrom;
        }
        // console.log(params);
        if (pricetTo) {
            params['pricetTo'] = pricetTo;
        }
        console.log(params);
    });


    let maxHeight = 0;
    $(".card").each(function() {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });

    $(".card").height(maxHeight);

});
