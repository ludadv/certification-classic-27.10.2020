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
document.addEventListener("DOMContentLoaded", function () {
    let optgroup = $('#year').append(`<optgroup label="70-ыe" class="seventies"></optgroup>`);
    for (let year = 1973; year <= 2021; year++) {
        if (year % 10 == 0) {
            let group;
            if (year < 2000) {
                group = year % 100 + '-ыe';
            } else if(year === 2000) {
                group = '2k';
            } else {
                group = '2k' + year % 100;
            }
            let optgroup = $('#year').append(`<optgroup label="${group}" class="seventies"></optgroup>`);
        }
        optgroup.append(`<option value="${year}">${year}</option>`);
    }
// -----------------------------------------------------------------------------
    let maxHeight = 0;
    $(".card").each(function () {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });

    $(".card").height(maxHeight);
});
// -----------------------------------------------------------------------------
$('input, select, .page').change(function () {
    let brand = [];
    $('input[name="brand"]:checked').each(function () {
        brand.push($(this).val());
    });
    let manufacturer = $('#marka').val();
    let model = $('#filter-model').val();
    let year = $('#year').val();
    let priceFrom = $('#price-from').val();
    let priceTo = $('#price-to').val();
    let sort = $('#sort').val();
    let perPage = $('#per_page').val();
    let page = $('.pagination a.active').data('page');
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
    console.log(rez);

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
    let paramsStr = $.param(params)
    setLocation('?' + paramsStr);
});

// -----------------------------------------------------------------------------
function setLocation(curLoc) {
    try {
        history.pushState(null, null, curLoc);
        return;
    } catch (e) {
    }
    location.hash = '#' + curLoc;
}
// -----------------------------------------------------------------------------
// $.getJSON("goods.json", function(json) {
//         console.log(json);
//     }
// );
let data = require('data/goods.json');
console.log(data);
for (var key in data) {
    console.log(data[key]);
}

// const tasks = [
//     {
//         name: "test",
//         type: "one"
//     },
//     {
//         name: "test2",
//         type: 'two'
//     }
// ];
// const activities = [
//     {
//         name: "test",
//         type: "one"
//     },
//     {
//         name: "test2",
//         type: 'two'
//     },
//     {
//         name: "test3",
//         type: "three"
//     }
// ];

// let tests = activities.filter(a => tasks.some(t => t.type == a.type));
// console.log(tests);
