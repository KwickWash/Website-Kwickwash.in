$(document).ready(function () {

    bload();

    $.get('control/ctr-slider.html', function (controls) {
        $('#ctrSlider').html(controls);
        BindCity();
        $('#slides').superslides({
            //animation: "fade",
            play: false,
            slide_speed: false,
            pagination: false,
            hashchange: false,
            scrollable: false,
        });

        //$('.example4').typeIt({
        //    whatToType: ["Laundry at your Doorstep", "Laundry at your Doorstep", "Laundry at your Doorstep",  "Laundry at your Doorstep"],
        //    typeSpeed: 300,
        //    breakLines: false
        //});

        $('.categoryList').typeIt({
            whatToType: ["Spotless", "On Time Guaranteed", "Hygienic", "Spotless", "On Time Guaranteed", "Hygienic", "Spotless", "On Time Guaranteed"],
            typeSpeed: 300,
            breakLines: false
        });

        //$('.offerPanel').typeIt({
        //    whatToType: ["Diwali Special: 20% Discount on all Household Laundry", "Shoes Laundry for ur favourite shoes", "Wash and Fold in KG for your wearable clothes", "Get your Sofa cleaned today", "Get your Curtains done at affordable prices"],
        //    typeSpeed: 200,
        //    breakLines: false
        //});


        var option = '<option id="0">--Select Area--</option>';
        $('#uarea').html(option);
        $('#kwarea').html(option);

    });

    $.get('control/ctr-services.html', function (controls) {
        $('#ctrServices').html(controls)
        GetService();
    });

    $.get('control/ctr-process.html', function (controls) {
        $('#ctrProcess').html(controls)
    });

    $.get('control/ctr-info.html', function (controls) {
        $('#ctrInfo').html(controls)
    });

    $.get('control/ctr-services-sec.html', function (controls) {
        $('#ctrServicesSec').html(controls);
        GetCounter();
    });

    $.get('control/ctr-testimonial.html', function (controls) {
        $('#ctrTestimonial').html(controls);

        var caro = $("#caro");
        caro.owlCarousel({
            items: 1,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            loop: true,
        });

        var owl = $("#owl-testimony");
        owl.owlCarousel({
            autoplay: 5000,
            stopOnHover: true,
            margin: 30,
            items: 2,
            nav: true,
            navText: ["<span class='fa fa-chevron-left'></span>", "<span class='fa fa-chevron-right'></span>"],
            dots: true,
            loop: true,
            responsive: {
                0: {
                    items: 1
                },
                1000: {
                    items: 2
                }
            }
        });

        var testimony2 = $("#owl-testimony2");
        testimony2.owlCarousel({
            autoplay: 5000,
            stopOnHover: true,
            margin: 30,
            items: 3,
            nav: true,
            navText: ["<span class='fa fa-chevron-left'></span>", "<span class='fa fa-chevron-right'></span>"],
            dots: true,
            loop: true,
            responsive: {
                0: {
                    items: 1
                },
                1000: {
                    items: 3
                }
            }
        });
    });

    $.get('control/ctr-partner.html', function (controls) {
        $('#ctrPartners').html(controls)
    });

    $.get('control/ctr-contact.html', function (controls) {
        $('#ctrContact').html(controls)
    });

    $.get('control/ctr-map.html', function (controls) {
        $('#ctrMap').html(controls)
    });

    $.get('control/ctr-footer.html', function (controls) {
        $('#ctrFooter').html(controls);
        $('#OpenBox').each(function () {
            $(this).modal('show');
        });
    });

    $.get('control/ctr-why-us.html', function (controls) {
        $('#ctrWhy').html(controls)
    });

    "use strict";

    /* =================================
    LOADER 
    =================================== */
    $(".loader").delay(400).fadeOut();
    $(".animationload").delay(400).fadeOut("fast");

    /* =================================
    NAVBAR 
    =================================== */
    jQuery(window).scroll(function () {
        var top = jQuery(document).scrollTop();
        var batas = jQuery(window).height();

        if (top > batas) {
            jQuery('.navbar-main').addClass('stiky');
        } else {
            jQuery('.navbar-main').removeClass('stiky');
        }
    });

    /* =================================
    BANNER ROTATOR IMAGE 
    =================================== */



    /* =================================
    OWL
    =================================== */



    /* =================================
    FAQ
    =================================== */
    $('.panel-heading a').on('click', function () {
        $('.panel-heading').removeClass('active');
        $(this).parents('.panel-heading').addClass('active');
    });

    /* =================================
    MAGNIFIC POPUP
    =================================== */
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });



});

//*** Get Counter ***//

function GetCounter() {
    var url = "https://api.kwickwash.com/api/dashboard/1";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'GET',
        success: function (data) {
            _details = data;
            if (typeof (_details) !== 'undefined') {
                $.each(_details, function (i, object) {
                    $('.txtTotalStore').html(object.ttlShop);
                    $('.txtUpcommingStore').html('6');
                    var cust = Number(object.ttlCustomer);
                    $('.txtTotalCustomer').html(cust);
                    $('.txtTotalService').html(object.ttlService);
                    $('.txtTotalProduct').html(object.ttlProduct);
                    var orders = Number(object.ttlOrders);
                    $('.txtTotalOrder').html(orders);
                });
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}


//*** Bind Service List ***//

function GetService() {
    var option = '<option id="0">--Select Services--</option>';
    var url = "https://api.kwickwash.com/api/kwickService";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'GET',
        success: function (data) {
            _details = data;
            var htmlContent = "";
            //htmlContent = '<div class="col-sm-12 col-md-12"><h2 class="section-heading">Our Services</h2></div>';
            if (typeof (_details) !== 'undefined') {
                $.each(_details, function (i, object) {
                    if (object.serviceName != 'Add on') {
                        htmlContent += '<div class="col-sm-2 col-md-2 product" style="width: 11%;">';
                        htmlContent += '<span class="box-image-1">';
                        htmlContent += '<span class="media">';
                        htmlContent += '<h4 style="font-size:14px; padding-top:30px;">' + object.serviceName + '</h2>';
                        if (object.serviceImg == "") {
                            //htmlContent += '<i class="fa fa-picture-o" style="margin-left: 25%;"></i>';
                            htmlContent += '<img style="width: 100px !important; height: 100px !important; border-radius: 50%; margin-left: 25%; margin-top:10px;" src="https://static.thenounproject.com/png/340719-200.png" alt="" class="img-responsive">';
                        }
                        else {
                            htmlContent += '<img style="border-radius: 50%; margin-top: 5px; width:56px !important; margin-left:32% !important; height:50px;" src="https://admin.kwickwash.com/' + object.serviceImg + '" alt="" class="img-responsive">';
                        }
                        htmlContent += '</span>';
                        htmlContent += '<span>Starting <b>&#x20B9;' + object.startAt + '</b> Per <b>' + object.unit + '</b></span><br/>';
                        htmlContent += '<span>Duration-' + object.duration + ' hr</span><br/>';
                        htmlContent += '<input type="hidden" id="hd_sername' + object.sid + '" value="' + object.serviceName + '" />';
                        htmlContent += '<a href="#serviceBox" onclick="callSerBox(' + object.sid + ');" data-toggle="modal" type="button" aria-haspopup="true" aria-expanded="false" class="btn btn-primary">Book now<a/>';
                        htmlContent += '</span>';
                        htmlContent += '</div>';
                        option += '<option value=' + object.sid + '>' + object.serviceName + '</option>';
                    }
                });
            }
            $('#ddServices').html(option);
            $('#ddServices1').html(option);
            $('.gutter-wedo').html(htmlContent);



            $('.gutter-wedo').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplaySpeed: 6000,
                autoplay: true,
                arrows: true,
                infinite: true,
                swipe: true,
                touchMove: true,
                touchThreshold: 100
            });

            //$(this).hover(
            //    function () {
            //        interval = setInterval(function () {
            //            mainPromoCarousel.trigger('next.owl.carousel');
            //        }, 1500);
            //    },
            //    function () {
            //        clearInterval(interval);
            //    }
            //);

        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });



}


function callSerBox(sid) {
    //alert(sid);
    $('#txtServiceId').val(sid);
    var serviceName = $('#hd_sername' + sid).val();
    //alert(serviceName);
    $('#txtServiceNames').val(serviceName);
}



//*** BindCity List ***//

function BindCity() {
    var option = '<option id="0">--Select City--</option>';
    var url = "https://api.kwickwash.com/api/city";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'GET',
        success: function (data) {
            _details = data;
            if (typeof (_details) !== 'undefined') {
                $.each(_details, function (i, object) {
                    option += '<option value=' + object.cityId + '>' + object.cityName + '</option>';
                });
            }
            $('#ucity').html(option);
            $('#kwcity').html(option);
            $('#ddCity').html(option);
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}



//******** Bind Area **********//

function callArea() {
    var id = $('#ucity').val();
    var option = '<option id="0">--Select Area--</option>';
    var url = "https://api.kwickwash.com/api/area/GetAreaList?id=" + id + "&val=1&vals=3";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'GET',
        success: function (data) {
            _details = data;
            if (typeof (_details) !== 'undefined') {
                $.each(_details, function (i, object) {
                    option += '<option value=' + object.areaId + '>' + object.areaName + '</option>';
                });
            }
            $('#uarea').html(option);
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

function callArea1() {
    var id = $('#ucity').val();
    var option = '<option id="0">--Select Area--</option>';
    var url = "https://api.kwickwash.com/api/area/GetAreaList?id=" + id + "&val=1&vals=3";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'GET',
        success: function (data) {
            _details = data;
            if (typeof (_details) !== 'undefined') {
                $.each(_details, function (i, object) {
                    option += '<option value=' + object.shopId + '>' + object.areaName + '</option>';
                });
            }
            $('#uarea').html(option);
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

function callArea2() {
    var id = $('#kwcity').val();
    var option = '<option id="0">--Select Area--</option>';
    var url = "https://api.kwickwash.com/api/area/GetAreaList?id=" + id + "&val=1&vals=3";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'GET',
        success: function (data) {
            _details = data;
            if (typeof (_details) !== 'undefined') {
                $.each(_details, function (i, object) {
                    option += '<option value=' + object.areaId + '>' + object.areaName + '</option>';
                });
            }
            $('#kwarea').html(option);
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

function getArea() {
    var id = $('#ddCity').val();
    var option = '<option id="0">--Select Area--</option>';
    var url = "https://api.kwickwash.com/api/area/GetAreaList?id=" + id + "&val=1&vals=3";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'GET',
        success: function (data) {
            _details = data;
            if (typeof (_details) !== 'undefined') {
                $.each(_details, function (i, object) {
                    option += '<option value=' + object.areaId + '>' + object.areaName + '</option>';
                });
            }
            $('#ddArea').html(option);
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

//******** Kwick-Order ********//

function inputClear() {
    alert('1');
    $("#ucity").prop("selectedIndex", 0).val();
    $("#uarea").prop("selectedIndex", 0).val();
    $('#pd_location').val('');
    $("#ddServices").prop("selectedIndex", 0).val();
    $('#txtname').val('');
    $('#txtmobile').val('');
    $('#hdd_shopId').val('');
}

function kwickOrder() {
    $('#loader').show();
    $('.btnBook').hide();
    var cityId = $('#ucity').val();
    var cityName = $("#ucity option:selected").text();
    var areaId = $('#uarea').val();
    var areaName = $("#uarea option:selected").text();
    var Location = $('#pd_location').val();
    var srId = $('#ddServices').val();
    var serviceName = $('#ddServices option:selected').text();
    var customerName = $('#txtname').val();
    var mobile = $('#txtmobile').val();
    var shopId = $('#hdd_shopId').val();
    var lat = "0";
    var longs = "0";

    var data = "{cityId:'" + cityId + "',cityName:'" + cityName + "',areaId:'" + areaId + "',areaName:'" + areaName + "',Location:'" + Location
        + "',srId:'" + srId + "',serviceName:'" + serviceName + "',customerName:'" + customerName + "',mobile:'" + mobile + "',shopId:'" + shopId
        + "',lat:'" + lat + "',longs:'" + longs + "'}";

    var url = "https://api.kwickwash.com/api/kwickOrder";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'POST',
        data: data,
        success: function (data, XMLHttpRequest) {
            var result = data;
            if (result == "1") {
                inputClear();
                $.alert({
                    title: 'Alert!',
                    content: 'Order place Successfully',
                });

                var Password = "pass@123";
                //login(mobile, Password);
                $('#loader').hide();
                $('.btnBook').show();

            }
            else {
                $.alert({
                    title: 'Error!',
                    content: 'some technical error occourred',
                });
                $('#loader').hide();
                $('.btnBook').show();
            }
        },
        error: function (XMLHttpRequest, errorThrown) {
            $.alert({
                title: 'Error!',
                content: 'Network error occourred',
            });
            $('#loader').hide();
            $('.btnBook').show();
        }
    });
}

function inputClear1() {
    $('#txtname1').val('');
    $('#hdd_shopId1').val('');
    $("#kwcity").prop("selectedIndex", 0).val();
    $("#kwarea").prop("selectedIndex", 0).val();
    $("#txtServiceId").val('');
    $('#txtServiceNames').val('');
    $('#pd_location1').val('');
    $('#hdd_shopId1').val('');
    $('#txtmobile1').val('');
}

function kwickOrderBox() {
    $('#loader1').show();
    $('.btnBook').hide();
    var cityId = $('#kwcity').val();
    var cityName = $("#kwcity option:selected").text();
    var areaId = $('#kwarea').val();
    var areaName = $("#kwarea option:selected").text();
    var Location = $('#pd_location1').val();
    var srId = $('#txtServiceId').val();
    var serviceName = $('#txtServiceNames').val();
    var customerName = $('#txtname1').val();
    var mobile = $('#txtmobile1').val();
    var shopId = $('#hdd_shopId1').val();
    var lat = "0";
    var longs = "0";

    var data = "{cityId:'" + cityId + "',cityName:'" + cityName + "',areaId:'" + areaId + "',areaName:'" + areaName + "',Location:'" + Location
        + "',srId:'" + srId + "',serviceName:'" + serviceName + "',customerName:'" + customerName + "',mobile:'" + mobile + "',shopId:'" + shopId
        + "',lat:'" + lat + "',longs:'" + longs + "'}";

    var url = "https://api.kwickwash.com/api/kwickOrder";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'POST',
        data: data,
        success: function (data, XMLHttpRequest) {
            var result = data;
            if (result == "1") {
                $.alert({
                    title: 'Alert!',
                    content: 'Order place Successfully',
                });
                var Password = "pass@123";
                //login(mobile, Password);
                $('#loader1').hide();
                $('.btnBook').show();
                inputClear1();
            }
            else {
                $.alert({
                    title: 'Error!',
                    content: 'some technical error occourred',
                });
                $('#loader1').hide();
                $('.btnBook').show();
            }
        },
        error: function (XMLHttpRequest, errorThrown) {
            $.alert({
                title: 'Error!',
                content: 'Network error occourred',
            });
            $('#loader1').hide();
            $('.btnBook').show();
        }
    });
}

function kwickOrder1() {
    $('#loader1').show();
    $('.btnBook').hide();
    var cityId = $('#ucity').val();
    var cityName = $("#ucity option:selected").text();
    var areaId = $('#uarea').val();
    var areaName = $("#uarea option:selected").text();
    var Location = $('#pd_location').val();
    var srId = $('#ddServices').val();
    var serviceName = $('#ddServices option:selected').text();
    var customerName = $('#txtname').val();
    var mobile = $('#txtmobile').val();
    var shopId = $('#hdd_shopId').val();
    var lat = "0";
    var longs = "0";

    var data = "{cityId:'" + cityId + "',cityName:'" + cityName + "',areaId:'" + areaId + "',areaName:'" + areaName + "',Location:'" + Location
        + "',srId:'" + srId + "',serviceName:'" + serviceName + "',customerName:'" + customerName + "',mobile:'" + mobile + "',shopId:'" + shopId
        + "',lat:'" + lat + "',longs:'" + longs + "'}";

    var url = "https://api.kwickwash.com/api/kwickOrder";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'POST',
        data: data,
        success: function (data, XMLHttpRequest) {
            var result = data;
            if (result == "1") {
                $.alert({
                    title: 'Alert!',
                    content: 'Order place Successfully',
                });
                var Password = "pass@123";
                login(mobile, Password);
                $('#loader1').hide();
                $('.btnBook').show();
            }
            else {
                $.alert({
                    title: 'Error!',
                    content: 'some technical error occourred',
                });
                $('#loader1').hide();
                $('.btnBook').show();
            }
        },
        error: function (XMLHttpRequest, errorThrown) {
            $.alert({
                title: 'Error!',
                content: 'Network error occourred',
            });
            $('#loader1').hide();
            $('.btnBook').show();
        }
    });
}

function kwickOrder2() {
    $('#loader1').show();
    $('.btnBook').hide();
    var cityId = $('#kwcity').val();
    var cityName = $("#kwcity option:selected").text();
    var areaId = $('#kwarea').val();
    var areaName = $("#kwarea1 option:selected").text();
    var Location = $('#pd_location1').val();
    var srId = $('#ddServices').val();
    var serviceName = $('#ddServices1 option:selected').text();
    var customerName = $('#txtname1').val();
    var mobile = $('#txtmobile1').val();
    var shopId = $('#hdd_shopId').val();
    var lat = "0";
    var longs = "0";

    var data = "{cityId:'" + cityId + "',cityName:'" + cityName + "',areaId:'" + areaId + "',areaName:'" + areaName + "',Location:'" + Location
        + "',srId:'" + srId + "',serviceName:'" + serviceName + "',customerName:'" + customerName + "',mobile:'" + mobile + "',shopId:'" + shopId
        + "',lat:'" + lat + "',longs:'" + longs + "'}";

    var url = "https://api.kwickwash.com/api/kwickOrder";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'POST',
        data: data,
        success: function (data, XMLHttpRequest) {
            var result = data;
            if (result == "1") {
                $.alert({
                    title: 'Alert!',
                    content: 'Order place Successfully',
                });
                var Password = "pass@123";
                login(mobile, Password);
                $('#loader1').hide();
                $('.btnBook').show();
            }
            else {
                $.alert({
                    title: 'Error!',
                    content: 'some technical error occourred',
                });
                $('#loader1').hide();
                $('.btnBook').show();
            }
        },
        error: function (XMLHttpRequest, errorThrown) {
            $.alert({
                title: 'Error!',
                content: 'Network error occourred',
            });
            $('#loader1').hide();
            $('.btnBook').show();
        }
    });
}

//******** Get Service & Product Price ********//

function callSerPro() {
    var areaId = $('#uarea').val();
    var url = "https://api.kwickwash.com/api/productList/GetWebPro?id=" + areaId + "&val=0";
    var htmlContent = "<div style='text-align: center;'><i class='fa fa-spinner fa-spin' style='font-size: 60px;'></i></div>";
    $('#service_Product_List').html(htmlContent);
    var serId = 0;
    var ctr = 0;
    var counter = 0;
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'GET',
        success: function (data) {
            _details = data;
            if (typeof (_details) !== 'undefined') {
                htmlContent = "";
                $.each(_details, function (i, object) {
                    counter++;
                    if (serId == object.srId) {
                        htmlContent += '<div class="item">';
                        htmlContent += '<div class="item-name"><i class="fa fa-check-circle"></i>' + object.productName + ' - Per(' + object.unit + ')</div>';
                        htmlContent += '<div class="item-price">&#x20B9; ' + Number(object.dropOffPrice).toFixed(2) + '</div>';
                        htmlContent += '</div>';
                    }
                    else {
                        htmlContent += '</div>';
                        htmlContent += '</div>';
                        htmlContent += '</div>';
                        ctr = 0;
                    }

                    if (ctr == 0) {
                        htmlContent += '<div class="col-sm-12 col-md-6">';
                        htmlContent += '<div class="price-detail">';
                        htmlContent += '<div class="price-detail-heading">' + object.serviceName + '</div>';
                        htmlContent += '<div class="price-detail-body">';
                        htmlContent += '<div class="item">';
                        htmlContent += '<div class="item-name"><i class="fa fa-check-circle"></i>' + object.productName + ' - Per(' + object.unit + ')</div>';
                        htmlContent += '<div class="item-price">&#x20B9; ' + Number(object.dropOffPrice).toFixed(2) + '</div>';
                        htmlContent += '</div>';
                        ctr = 1;
                    }


                    serId = object.srId;
                });
            }
            //htmlContent += 'Total Counter Product' + counter;
            $('#service_Product_List').html(htmlContent);
        },
        error: function (XMLHttpRequest, errorThrown) {

        }
    });
}

//*** franchisee enquiry ***//

function inputClear() {
    $('#p_name').val('');
    $('#p_mobile').val('');
    $('#p_email').val('');
    $('#p_city').val('');
    $('#p_address').val('');
    $('#p_message').val('');
}

function AddFranchisee() {

    var franchiseId = "0";
    var name = $('#p_name').val();
    var mobile = $('#p_mobile').val();
    var email = $('#p_email').val();
    var city = $('#p_city').val();

    if (name == '') {
        $.alert({
            title: 'Message',
            content: 'Please enter name!',
        });
    }
    else if (mobile == '') {
        $.alert({
            title: 'Message',
            content: 'Please enter mobile!',
        });
    }
    else if (email == '') {
        $.alert({
            title: 'Message',
            content: 'Please enter email!',
        });
    }
    else if (city == '') {
        $.alert({
            title: 'Message',
            content: 'Please enter city!',
        });
    }
    else {
        $('#btn_submit').hide();
        $('#success').html('<i class="fa fa-spinner fa-spin" style="color:white;"></i>');
        var data = "{franchiseId:'" + franchiseId + "',name:'" + name + "',mobile:'" + mobile + "',email:'" + email + "',city:'" + city + "'}";

        var url = "https://api.kwickwash.com/api/franchise";
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: 'POST',
            data: data,
            success: function (data, XMLHttpRequest) {
                var result = data;
                if (result == "1") {
                    $.alert({
                        title: 'Success!',
                        content: 'Message sent successfully',
                    });
                    inputClear();
                    $('#btn_submit').show();
                    $('#success').html('');
                }
                else {
                    $.alert({
                        title: 'Alert!',
                        content: 'Some technical error occourred',
                    });
                }
            },
            error: function (XMLHttpRequest, errorThrown) {
                $.alert({
                    title: 'Alert!',
                    content: 'Network error occourred',
                });
            }
        });
    }
}

function AddContact() {
    var contactId = "0";
    var name = $('#p_name').val();
    var mobile = $('#p_mobile').val();
    var email = $('#p_email').val();
    var address = $('#p_address').val();
    var mess = $('#p_message').val();
    if (name == '') {
        $.alert({
            title: 'Alert!',
            content: 'Please enter name!',
        });
    }
    else if (mobile == '') {
        $.alert({
            title: 'Alert!',
            content: 'Please enter mobile!',
        });
    }
    else if (email == '') {
        $.alert({
            title: 'Alert!',
            content: 'Please enter email!',
        });
    }
    else if (address == '') {
        $.alert({
            title: 'Alert!',
            content: 'Please enter address!',
        });
    }
    else if (mess == '') {
        $.alert({
            title: 'Alert!',
            content: 'Please enter message!',
        });
    }
    else {
        $('#btn_submit').hide();
        $('#loaderC').show();
        $('#success').html('<i class="fa fa-spinner fa-spin" style="color:white;"></i>');
        var data = "{contactId:'" + contactId + "',name:'" + name + "',mobile:'" + mobile + "',email:'" + email + "',address:'" + address + "',mess:'" + mess + "'}";

        var url = "https://api.kwickwash.com/api/contact";
        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: 'POST',
            data: data,
            success: function (data, XMLHttpRequest) {
                var result = data;
                if (result == "1") {
                    $.alert({
                        title: 'Successfully!',
                        content: 'Message sent successfully',
                    });
                    inputClear();

                    $('#success').html('');

                    $('#btn_submit').show();
                    $('#loaderC').hide();
                }
                else {
                    $.alert({
                        title: 'Error!',
                        content: 'Some technical error occourred',
                    });
                    $('#btn_submit').show();
                    $('#loaderC').hide();
                }
            },
            error: function (XMLHttpRequest, errorThrown) {
                $.alert({
                    title: 'Error!',
                    content: 'Network error occourred',
                });
                $('#btn_submit').show();
                $('#loaderC').hide();
            }
        });
    }
}

//*** Session   & SignIn - SignUp - Logout ***//

function bload() {
    $.ajax({
        url: "apiService.asmx/SessionTimeout",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'POST',
        success: function (data, XMLHttpRequest) {
            var sessionval = data.d;
            if (sessionval == 0) {
                $.get('control/ctr-header.html', function (controls) {
                    $('#ctrHeader').html(controls);
                    $('.offerPanel').typeIt({
                        whatToType: ["Write us on contactus@kwickwash.in for Franchisee", "Write us on contactus@kwickwash.in for Franchisee", "Write us on contactus@kwickwash.in for Franchisee", "Write us on contactus@kwickwash.in for Franchisee", "Write us on contactus@kwickwash.in for Franchisee"],
                        typeSpeed: 300,
                        breakLines: false
                    });
                });
            }
            else {

                $('#hd_id').val(sessionval);
                var id = $('#hd_id').val();
                $.get('control/ctr-header-log.html', function (controls) {
                    $('#ctrHeader').html(controls);
                    $('.offerPanel').typeIt({
                        whatToType: ["Diwali Special: 20% Discount on all Household Laundry", "Shoes Laundry for ur favourite shoes", "Wash and Fold in KG for your wearable clothes", "Get your Sofa cleaned today", "Get your Curtains done at affordable prices"],
                        typeSpeed: 200,
                        breakLines: false
                    });
                });
            }
        },
        error: function (XMLHttpRequest, errorThrown) {
            $.get('controls/ctr-topBL.html', function (topnavCtr) {
                $('#topnav').html(topnavCtr)
            });
        }
    });
}

function callLogin() {
    $('#loader2').show();
    $('.btnLogin').hide();
    var Username = $('#txtUsername').val();
    var Password = $('#txtPassword').val();
    login(Username, Password);
}

function login(Username, Password) {
    $.ajax({
        url: 'apiService.asmx/LoginUser',
        method: 'post',
        data: "{Username:'" + Username + "',Password:'" + Password + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            alert(data.d);
            var result = data.d;
            if (result == '1') {
                bload();
                $('#loginBox').each(function () {
                    $(this).modal('hide');
                });
                $('#loader2').hide();
                $('.btnLogin').show();
            }
            else {
                $.alert({
                    title: 'Error!',
                    content: 'Confirm your e-mail ID and Password and try again.',
                });
                $('#loader2').hide();
                $('.btnLogin').show();
            }
        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

function logout() {
    $.ajax({
        url: "apiService.asmx/SessionLogout",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'POST',
        success: function (data, XMLHttpRequest) {
            bload();
        },
        error: function (XMLHttpRequest, errorThrown) {

        }
    });
}

function signup() {
    var profileId = $('#hd_id').val();
    var name = $('#txtName').val();
    var emailId = $('#txtUsername1').val();
    var mobile = $('#txtPhone').val();
    var address = '0';
    var state = '0';
    var city = $("#ddCity option:selected").text();
    var pincode = '0';
    var companyLogo = '0';
    var shopUserId = '0';
    var areaId = $('#ddArea').val();
    var password = $('#txtPassword1').val();
    $(".error").remove();
    if (name.length == "") {
        $('#txtname').after('<span class="error">This field is required</span>');
        $('#txtname').addClass('txterror');
    }
    else {
        $('.loader').show();
        var data = "{profileId:'" + profileId + "',name:'" + name + "',emailId:'" + emailId + "',mobile:'" + mobile + "',address:'" + address
            + "',state:'" + state + "',city:'" + city + "',pincode:'" + pincode + "',companyLogo:'" + companyLogo + "',shopUserId:'" + shopUserId
            + "',areaId:'" + areaId + "',password:'" + password + "'}";

        var url = "https://api.kwickwash.com/api/profile";

        $.ajax({
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: 'POST',
            data: data,
            success: function (data) {
                if (data == "1") {
                    $('.loader').hide();
                    $.alert({
                        title: 'Success!',
                        content: 'Save successfully',
                    });
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        });
    }
}




