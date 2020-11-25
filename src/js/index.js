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
let productsList = require('data/goods');
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

    let maxHeight = 0;
    $(".card").each(function () {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });

    $(".card").height(maxHeight);
});
// -----------------------------------------------------------------------------
$('input, select').change(function () {
    setActivePage(getActivePage());
    doAll();
});
// -----------------------------------------------------------------------------
$('.js-page').on('click', function () {
    $('.js-page.active').removeClass('active');
    $(this).addClass('active');
    doAll();
});
// -----------------------------------------------------------------------------
function doAll() {
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
    let page = getActivePage();
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

    let filteredProducts = productsList.filter(product => filterProductNow(product, params));

    if (params.sort == 1) {
        filteredProducts.sort((a, b) => a.price.value - b.price.value);
    } else if (params.sort == 2) {
        filteredProducts.sort((a, b) => b.price.value - a.price.value);
    } else if (params.sort == 3) {
        filteredProducts.sort((a, b) => a.year - b.year);
    } else if (params.sort == 4) {
        filteredProducts.sort((a, b) => b.year - a.year);
    }
    let pageNum = getActivePage();
    let from = (pageNum - 1) * perPage;
    let to = +from + +perPage;
    let paginatedProducts = filteredProducts.slice(from, to);

    $("#js-inner").html("");
    paginatedProducts.forEach(function (product) {
        showProduct(product);
    });
}
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
function showProduct (product) {
    let template = document.querySelector('#product-show');
    let clone = template.content.cloneNode(true);
    let $clone = $(clone);
    $clone.find('.js-card-brand').text(product.brand.name);
    $clone.find('.js-card-image').attr('src', product.image.sizes['card-preview']).attr('alt', product.image.alt);
    $clone.find('.js-card-manufacturer').text(product.manufacturer.name);
    $clone.find('.js-card-year').text(product.year + ' ' + 'год');
    $clone.find('.js-card-model').text(product.model.name);
    $clone.find('.js-card-price').text(product.price.currency.symbol + product.price.value);

    $("#js-inner").append($clone);
}
// -----------------------------------------------------------------------------
function getActivePage() {
    let page = $('.pagination li.active').data('page');

    return page;
}
// -----------------------------------------------------------------------------
function setActivePage(page) {
    $('.pagination li.active').removeClass('active');
    $('.pagination li[data-page="' + page + '"]').addClass('active');
}
// -----------------------------------------------------------------------------
function filterProductNow (product, filter) {
    // console.log(product);
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
// -----------------------------------------------------------------------------

