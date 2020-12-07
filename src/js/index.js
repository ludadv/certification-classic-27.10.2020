// -----------------------------------------------------------------------------
// Deps
// -----------------------------------------------------------------------------

// global
import jQuery from 'js#/lib/jquery';
// styles
import 'sass#/style.scss';
// scripts
// -----------------------------------------------------------------------------
// Initialize
// -----------------------------------------------------------------------------
let productsList = require('data/goods');
// -----------------------------------------------------------------------------
// document.addEventListener("DOMContentLoaded", function () {
//
// });
jQuery(function ($) {
    let optgroup = $('#year').append(`<optgroup label="70-ыe"></optgroup>`);
    for (let year = 1973; year <= 2021; year++) {
        if (year % 10 === 0) {
            let group;
            if (year < 2000) {
                group = year % 100 + '-ыe';
            } else if(year === 2000) {
                group = '2k';
            } else {
                group = '2k' + year % 100;
            }
            optgroup = $('#year').append(`<optgroup label="${group}"></optgroup>`);
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

    doAll();
    // -----------------------------------------------------------------------------
    window.addEventListener ('popstate', function () {
        let searchParams = new URLSearchParams(window.location.search);

        let page = 1;
        if (searchParams.has('page')) {
            page = searchParams.get('page');
        }
        setActivePage(page);

        if (searchParams.has('brand')) {
            let brand = [];
            brand.push(searchParams.getAll('brand'));
            $('input[name="brand"]:checked').each(function(){
                $(this).prop('checked', false);
            });
        }

        if (searchParams.has('manufacturer')) {
            let manufacturer = searchParams.get('manufacturer');
            $('#marka').val(manufacturer);
        }
        if (searchParams.has('model')) {
            let model = searchParams.get('model');
            $('#filter-model').val(model);
        }
        if (searchParams.has('priceFrom')) {
            let priceFrom = searchParams.get('priceFrom');
            $('#price-from').val(priceFrom);
        }
        if (searchParams.has('priceTo')) {
            let priceTo = searchParams.get('priceTo');
            $('#price-to').val(priceTo);
        }
        if (searchParams.has('year')) {
            let year = searchParams.get('year');
            $('#year').val(year);
        }
        if (searchParams.has('sort')) {
            let sort = searchParams.get('sort');
            $('#sort').val(sort);
        }
        if (searchParams.has('perPage')) {
            let perPage = searchParams.get('perPage');
            $('#per_page').val(perPage);
        }
        doAll(true);
    });
    // -----------------------------------------------------------------------------
    $('input, select').change(function () {
        setActivePage(1);
        doAll();
    });
    // -----------------------------------------------------------------------------
    $('.js-pagination').on('click', '.js-page', function () {
        $('.js-page.active').removeClass('active');
        $(this).addClass('active');

        doAll();
    });
    // -----------------------------------------------------------------------------
    $('.js-first-page').on('click', function () {
        setActivePage(1);
        doAll();
    });
    // -----------------------------------------------------------------------------
    $('.js-prev-page').on('click', function () {
        let activePage = getActivePage();
        if (activePage > 1) {
            setActivePage(activePage - 1);
            doAll();
        }
    });
    // -----------------------------------------------------------------------------
    $('.js-next-page').on('click', function () {
        let pagesCount = $('.js-pagination').data('pages-count');
        let activePage = getActivePage();
        if (activePage < pagesCount) {
            setActivePage(activePage + 1);
            doAll();
        }
    });
    // -----------------------------------------------------------------------------
    $('.js-last-page').on('click', function () {
        let pagesCount = $('.js-pagination').data('pages-count');
        setActivePage(pagesCount);
        doAll();
    });
    // -----------------------------------------------------------------------------
    function doAll(skipHistory) {
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
        let minPrice = $('#price-from').data('min-price');
        let maxPrice = $('#price-to').data('max-price');
        let result = {
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
        console.log(result);
        // -----------------------------------------------------------
        let params = {};
        // если значение переменной page не пустое, то в новый объект добавиться свойство page со значением
        // переменной page.
        if (page > 1) {
            params['page'] = page;
        }
        if (year) {
            params['year'] = year;
        }
        if (priceFrom != minPrice) {
            params['priceFrom'] = priceFrom;
        }
        if (priceTo != maxPrice) {
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
        if (sort > 1) {
            params['sort'] = sort;
        }
        if (perPage !== '6') {
            params['perPage'] = perPage;
        }
        // let paramsStr = $.param(params);
        // if (paramsStr) {
        //     paramsStr = '?' + paramsStr;
        // }
        // if (!skipHistory) {
        //     setLocation(paramsStr);
        // }
        let paramsStr = decodeURIComponent($.param(params));
        if (paramsStr) {
            paramsStr = '?' + paramsStr;
        }
        if (!skipHistory) {
            setLocation(paramsStr);
        }

        let filteredProducts = productsList.filter(product => filterProductNow(product, params));

        switch (sort) {
            case '1':
                filteredProducts.sort((item1, item2) => item1.price.value - item2.price.value);
                break;
            case '2':
                filteredProducts.sort((item1, item2) => item2.price.value - item1.price.value);
                break;
            case '3':
                filteredProducts.sort((item1, item2) => item1.year - item2.year);
                break;
            case '4':
                filteredProducts.sort((item1, item2) => item2.year - item1.year);
                break;
        }
        let pageNum = getActivePage();
        let from = (pageNum - 1) * perPage;
        let to = +from + +perPage;
        let paginatedProducts = filteredProducts.slice(from, to);

        createPagination(filteredProducts.length, perPage, pageNum);

        $("#js-inner").html("");
        paginatedProducts.forEach(function (product) {
            showProduct(product);
        });
    }
    // -----------------------------------------------------------------------------
    function setLocation(curLoc) {
        if (!curLoc) {
            curLoc = '/';
        }

        try {
            history.pushState(null, null, curLoc);
            return;
        } catch (e) {}

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

        if (!page) {
            page = 1;
        }

        return page;
    }
    // -----------------------------------------------------------------------------
    function setActivePage(page) {
        $('.pagination li.active').removeClass('active');
        $('.pagination li[data-page="' + page + '"]').addClass('active');
    }
    // -----------------------------------------------------------------------------
    function createPagination (products, perPage, activePageNumber) {
        let pagesCount = Math.round(products / perPage);
        if (products % perPage !== 0) {
            pagesCount = pagesCount++;
        }

        $('.js-pagination').data('pages-count', pagesCount);

        $('.js-page').remove();
        for (let i = pagesCount; i >= 1; i--) {
            let classActive = '';
            if (i === activePageNumber) {
                classActive = 'active';
            }
            $('.js-prev-page').after(`<li class="js-page ${classActive}" data-page="${i}">${i}</li>`);
        }
        if (activePageNumber === 1) {
            $('.js-first-page').addClass('disabled');
            $('.js-prev-page').addClass('disabled');
        } else {
            $('.js-first-page').removeClass('disabled');
            $('.js-prev-page').removeClass('disabled');
        }
        if (activePageNumber === pagesCount) {
            $('.js-last-page').addClass('disabled');
            $('.js-next-page').addClass('disabled');
        } else  {
            $('.js-last-page').removeClass('disabled');
            $('.js-next-page').removeClass('disabled');
        }
    }
    // -----------------------------------------------------------------------------
    function filterProductNow (product, filter) {
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
});
