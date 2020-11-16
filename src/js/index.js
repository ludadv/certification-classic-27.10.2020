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

    let result = filterProduct(productsList[0], params);
    console.log(result);
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


function filterProduct(product, filter) {
    console.log('Product', product);
    console.log('Filter', filter);
    for (let key in product) {
        console.log('-----------------');
        console.log('KEY: ', key);
        if (typeof filter[key] !== 'undefined') {
            let productValue = product[key].id;
            console.log('productValue', productValue);
            let filterValue = filter[key];
            console.log('filterValue', filterValue);
            if (productValue !== filterValue) {
                return false;
            }
        }
        // console.log(product[key]);
    }
   //  if (typeof filter.manufacturer !== 'undefined') {
   //     if (product.manufacturer.id != filter.manufacturer) {
   //         return false;
   //     }
   // }
   //  if (typeof filter.model !== 'undefined') {
   //      if (product.model.id != filter.model) {
   //          return false;
   //      }
   //  }
   //  if (typeof filter['brand'] !== 'undefined') {
   //
   //  }
   //
   //  return true;
}
let  husband = {
    name: 'Jack',
    sername: 'Wats',
    age: 27,
}
let  wife = {
    name: 'Jane',
    sername: 'Wats',
    age: 25
}
for (let key in husband) {
    if (wife[key]) {
        if (wife[key] != husband[key]) {
            console.log('не совпало');
        } else {
            console.log('совпало');
        }
    }
}
let a = 10
let b = 153;
let c = 88;
let d = Math.max(a, b, c);
console.log(d);
