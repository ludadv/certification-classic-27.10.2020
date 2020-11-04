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
    let step = 0;
    $('input, select, .page').change(function() {
        let brand = [];
        $('input[name="brand"]:checked').each(function() {
            brand.push($(this).val());
        });
        let manufacturer = $('#marka').val();
        let model = $('#filter-model').val();
        let year = $('#year').val();
        let priceFrom = $('#price-from').val();
        let priceTo = $('#price-to').val();
        let sort = $('#sort').val();
        let perPage = $('#per_page').val();
        let page = $('#page').val();
        let rez = {
            params: {
                brand: brand,
                manufacturer: manufacturer,
                model: model,
                year: year,
                price: [priceFrom, priceTo],
            },
            pagination: {
                sort: sort,
                perPage: perPage,
                page: page,
            }
        }
        var recursiveEncoded = $.param(rez.params);
        console.log(decodeURIComponent(recursiveEncoded));

        // const filter = $('#filter').serializeArray()
        //     .filter(item => item && item.value)
        //     .map(item => item.name + '=' + item.value)
        //     .join('&');
        // console.log(filter);
        let params = {};
        if (page) {
            params['page'] = page;
        }
        if (year) {
            params['year'] = year;
        }
        if (priceTo) {
            params['priceTo'] = priceTo;
        }
        if (priceFrom) {
            params['priceFrom'] = priceFrom;
        }
        if (model) {
            params['model'] = model;
        }
        if (manufacturer) {
            params['manufacturer'] = manufacturer;
        }
        if (brand.length > 0) {
            params['brand'] = brand;
        }
        if (sort) {
            params['sort'] = sort;
        }
        if (perPage) {
            params['perPage'] = perPage;
        }
            console.log(params);
        step++;
        setLocation('#' + step);
    });
    function setLocation(curLoc) {
        try {
            history.pushState(null, null, curLoc);
            return;
        } catch(e) {}
        location.hash = '#' + curLoc;
    }

    let maxHeight = 0;
    $(".card").each(function() {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });

    $(".card").height(maxHeight);

});
