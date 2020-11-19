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

    let params = {};
    // если значение переменной page не пустое, то в новый объект добавиться свойство page со значением
    // переменной page.
    if (page) {
        params['page'] = page;
    }
    if (year) {
        params['year'] = year;
    }
    if (priceFrom) {
        params['priceFrom'] = priceFrom;
    }
    if (priceTo) {
        params['priceTo'] = priceTo;
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

    // for (let key in productsList) {
    //     if (filterProductNow(productsList[key], params)) {
    //         showProduct(productsList[key]);
    //     }
    // }
        let sorted = productsList.filter((filterProductNow(params)));
        console.log(sorted);
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
let productsList = require('data/goods');

function showProduct (product) {
    console.log (product);
}
// function sortPrice (a, b, price) {
//     return a - b;
// }
function filterProductNow (product, filter) {
    // console.log(product);
    // console.log(filter);
    if (typeof filter.brand !== 'undefined') {
        let productValue = String(product.brand.id);
        if (!filter.brand.includes(productValue)) {
            return false;
        }
    }
    if (typeof filter.manufacturer !== 'undefined') {
        if (filter.manufacturer != product.manufacturer.id) {
            return false;
        }
    }
    if (typeof filter.model !== 'undefined') {
        if (filter.model != product.model.id) {
            return false;
        }
    }
    if (typeof filter.year !== 'undefined') {
        if (filter.year != product.year) {
            return false;
        }
    }
    if (product.price.value < filter.priceFrom || product.price.value > filter.priceTo) {
        return false;
    }

    return true;
}
