$(document).ready(function () {
    bload();  
    $.get('control/ctr-footer-log.html', function (controls) {
        $('#ctrFooter').html(controls)
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

	
});


//*** Session Checker & SignIn - SignUp - Logout ***//

function bload() {
    $.ajax({
        url: "apiService.asmx/SessionTimeout",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'POST',
        success: function (data, XMLHttpRequest) {
            var sessionval = data.d;
            if (sessionval == 0) {
                window.location.href = 'index.html';
            }
            else {

                $('#hd_id').val(sessionval);
                var id = $('#hd_id').val();
                $.get('control/ctr-header-log.html', function (controls) {
                    $('#ctrHeader').html(controls)
                });
                callMyaccount();
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
    var Username = $('#txtUsername').val();
    var Password = $('#txtPassword').val();
    $.ajax({
        url: 'apiService.asmx/LoginUser',
        method: 'post',
        data: "{Username:'" + Username + "',Password:'" + Password + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            bload();
            $('#loginBox').each(function () {
                $(this).modal('hide');
            });
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

function callMyaccount() {
    var htmlContent = '';

    htmlContent += '<div class="row">';

    htmlContent += '<div class="col-md-2 col-sm-1">';
    htmlContent += '<a href="#" class="aFont" onclick="myProfile();">';
    htmlContent += '<div class="col-md-12"><i class="fa fa-users iconFa"></i></div>';
    htmlContent += '<div class="col-md-12"><a href="#" class="aFont" onclick="myProfile();">My Profile</a></div>';
    htmlContent += '</a></div>';

    htmlContent += '<div class="col-md-2 col-sm-1">';
    htmlContent += '<a href="#" class="aFont" onclick="myOrder();">';
    htmlContent += '<div class="col-md-12"><i class="fa fa-table iconFa"></i></div>';
    htmlContent += '<div class="col-md-12"><a href="#" class="aFont" onclick="myOrder();">Order Status</a></div>';
    htmlContent += '</a></div>';

    htmlContent += '<div class="col-md-2 col-sm-1">';
    htmlContent += '<a href="#" class="aFont" onclick="myOrder();">';
    htmlContent += '<div class="col-md-12"><i class="fa fa-table iconFa"></i></div>';
    htmlContent += '<div class="col-md-12"><a href="#" class="aFont" onclick="myOrder();">Order History</a></div>';
    htmlContent += '</a></div>';


    htmlContent += '<div class="col-md-2 col-sm-1">';
    htmlContent += '<a href="#" class="aFont" onclick="mySetting();">';
    htmlContent += '<div class="col-md-12"><i class="fa fa-cog iconFa"></i></div>';
    htmlContent += '<div class="col-md-12"><a href="#" class="aFont" onclick="mySetting();">Setting</a></div>';
    htmlContent += '</a></div>';

    htmlContent += '<div class="col-md-2 col-sm-1">';
    htmlContent += '<a href="#" class="aFont" onclick="logout();">';
    htmlContent += '<div class="col-md-12"><i class="fa fa-sign-out iconFa"></i></div>';
    htmlContent += '<div class="col-md-12"><a href="#" class="aFont" onclick="logout();">Logout</a></div>';
    htmlContent += '</a></div>';

    htmlContent += '</div>';

    $('#webContainer').html(htmlContent);
}

function myOrder() {
    var htmlContent = '';
    htmlContent += '<div class="row">';

    htmlContent += '<span><a href="#" onclick="callMyaccount();">Back</a></span>';

    htmlContent += '<div class="table-responsive" style="overflow: auto;">';
    htmlContent += '<table id="myShopOrderList" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">';
    htmlContent += '<thead><tr>';
    htmlContent += '<th style="display:none;">#</th>';
    htmlContent += '<th>Request-No #</th>';    
    htmlContent += '<th>Service</th>';    
    htmlContent += '<th>Order-Date</th>';
    htmlContent += '<th>Track</th>';
    htmlContent += '</tr>';
    htmlContent += '</thead>';
    htmlContent += '<tbody id="listMyShopOrder">';
    htmlContent += '</tbody>';
    htmlContent += '</table>';
    htmlContent += '</div>';

    htmlContent += '<hr/>';

    htmlContent += '</div>';

    htmlContent += '<div class="row">';    
    htmlContent += '<div class="table-responsive" style="overflow: auto;">';
    htmlContent += '<table id="myShopOrder" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">';
    htmlContent += '<thead><tr><th style="display:none;">#</th>';
    htmlContent += '<th>Order #</th>';
    htmlContent += '<th>Order-Mode</th>';
    htmlContent += '<th>Request-Type</th>';
    htmlContent += '<th>Amount</th><th>Payment-Status</th>';
    htmlContent += '<th>Order-Date</th>';
    htmlContent += '<th>Invoice #</th><th>Delivery-Status</th><th>Delivery-Date</th></tr></thead>';
    htmlContent += '<tbody id="listMyOrder">';
    htmlContent += '</tbody></table></div>';
    $('#webContainer').html(htmlContent);
    BindOrderReq();
    BindOrder();
}

function myProfile() {
    var htmlContent = '';

    htmlContent += '<div class="row">';
    htmlContent += '<div class="col-lg-12">';
    htmlContent += '<div class="col-lg-12 float-lg-right">';
    htmlContent += '<div class="card shadow mb-4">';
    htmlContent += '<div class="card-body">';
    htmlContent += '<div class="col-sm-12">';
    htmlContent += '<div class="white-box">';
    htmlContent += '<div id="loader"></div>';
    htmlContent += '<form data-toggle="validator" enctype="multipart/form-data" id="FrCustomer">';
    htmlContent += '<div class="row">';
    htmlContent += '<div class="col-sm-3 col-lg-offset-4">';
    htmlContent += '<div class="form-group">';
    htmlContent += '<label class="control-label">Pincode</label>';
    htmlContent += '<input type="text" class="form-control" name="txtpincode" id="txtpincode" onchange="callArea();" placeholder="Enter pincode" required>';
    htmlContent += '</div></div></div>';
    htmlContent += '<div class="row" style="margin-top: 16px;">';
    htmlContent += '<div class="col-sm-3">';
    htmlContent += '<div class="form-group">';
    htmlContent += '<label class="control-label" id="contactName">Customer Name</label>';
    htmlContent += '<input type="hidden" name="hd_Customer_id" id="hd_Customer_id" value="0">';
    htmlContent += '<input type="hidden" name="hd_Customer_id" id="hd_UserId" value="0">';
    htmlContent += '<input type="text" class="form-control" name="name" id="txtname" placeholder="Enter Customer Name" required';
    htmlContent += '</div></div>';
    htmlContent += '<div class="col-sm-3">';
    htmlContent += '<div class="form-group">';
    htmlContent += '<label class="control-label">Email</label>';
    htmlContent += '<input type="email" class="form-control" name="email" id="txtemailId" placeholder="Enter Email" required>';
    htmlContent += '</div></div>';
    htmlContent += '<div class="col-sm-3">';
    htmlContent += '<div class="form-group">';
    htmlContent += '<label class="control-label">Mobile</label>';
    htmlContent += '<input type="text" class="form-control groupOfTexbox" name="mobile" value="" id="txtmobile" placeholder="Enter mobile" required maxlength="10">';
    htmlContent += '</div></div>';
    htmlContent += '<div class="col-sm-3">';
    htmlContent += '<div class="form-group">';
    htmlContent += '<label class="control-label">Gender</label>';
    htmlContent += '<select id="ddGender" class="form-control">';
    htmlContent += '<option value="0">---Select---</option>';
    htmlContent += '<option value="Male">Male</option>';;
    htmlContent += '<option value="Female">Female</option>';
    htmlContent += '<option value="Other">Other</option>';
    htmlContent += '</select>';
    htmlContent += '</div></div></div>';
    htmlContent += '<div class="row" style="margin-top: 16px;">';
    htmlContent += '<div class="col-sm-3">';
    htmlContent += '<div class="form-group">';
    htmlContent += '<label class="control-label" id="contactName">Date of Birth</label>';
    htmlContent += '<input type="date" class="form-control" name="name" id="txtDob" placeholder="Enter Date of Birth" required>';
    htmlContent += '</div></div>';
    htmlContent += '<div class="col-sm-3">';
    htmlContent += '<div class="form-group">';
    htmlContent += '<label class="control-label" id="contactName">Date of Anniversary</label>';
    htmlContent += '<input type="date" class="form-control" name="name" id="txtDoa" placeholder="Enter Date of Anniversary" required>';
    htmlContent += '</div></div>';
    htmlContent += '<div class="col-sm-3"> <div class="form-group">';
    htmlContent += '<label class="control-label">Occupation</label>';
    htmlContent += '<select id="ddoccupation" class="form-control">';
    htmlContent += '<option value="0">---Select---</option><option value="Business">Business</option>';
    htmlContent += '<option value="Doctor">Doctor</option><option value="Homemaker">Homemaker</option>';
    htmlContent += '<option value="Service">Service</option><option value="Student">Student</option>';
    htmlContent += '<option value="Teacher">Teacher</option><option value="Other">Other</option>';
    htmlContent += '</select></div></div>';
    htmlContent += '<div class="col-sm-3"><div class="form-group">';
    htmlContent += '<label class="control-label">Marital Status</label><select id="ddmaritalstatus" class="form-control">';
    htmlContent += '<option value="0">---Select---</option><option value="Married">Married</option>';
    htmlContent += '<option value="Single">Single</option><option value="Divorced">Divorced</option>';
    htmlContent += '<option value="Widowed ">Widowed</option></select></div></div></div>';
    htmlContent += '<div class="row"><div class="col-sm-12">';
    htmlContent += '<div class="form-group"><label class="control-label">Address</label>';
    htmlContent += '<textarea id="txtaddress" class="form-control" placeholder="Enter address"></textarea>';
    htmlContent += '</div></div>';
    htmlContent += '<div class="col-sm-4"><div class="form-group">';
    htmlContent += '<label class="control-label">State</label>';
    htmlContent += '<input type="text" class="form-control" readonly name="txtstate" id="txtstate" placeholder="Enter state" required>';
    htmlContent += '</div></div><div class="col-sm-4">';
    htmlContent += '<div class="form-group">';
    htmlContent += '<label class="control-label">City</label>';
    htmlContent += '<input type="text" class="form-control" readonly name="txtcity" id="txtcity" placeholder="Enter city" required>';
    htmlContent += '</div></div>';
    htmlContent += '<div class="col-sm-4"><div class="form-group">';
    htmlContent += '<label class="control-label">Area (Location)</label>';
    htmlContent += '<select id="ddLocation" class="form-control">';
    htmlContent += '</select></div></div></div>';
    htmlContent += '<div class="row"><div class="col-sm-3"><div class="form-group"><label class="control-label" id="photoLogo">Photo</label>';
    htmlContent += '<input type="hidden" id="hd_Image" /><div class="help-block with-errors"></div>';
    htmlContent += '<input type="button" name="myImage" class="button button-green upload" id="btn_Image" value="Upload Image" />';
    htmlContent += '<a class="btn btn-success btn-icon-split" id="img_Image" style="display: none; color: white; padding: 1px !important;">';
    htmlContent += '<span class="icon text-white-50"><i class="fas fa-check"></i></span>';
    htmlContent += '<span class="text">Successfully News Image uploaded..</span></a>';
    htmlContent += '<img id="imgPath" class="imgPath" accept="image/*" style=" width: 100px; height: 100px; border-radius: 50%;" required />';
    htmlContent += '</div></div>';
    htmlContent += '<div class="col-sm-4"><div class="form-group"></div></div></div>';
    htmlContent += '<div class="form-group"><div id="alertt" class="alert alert-success" style="display:none;">';
    htmlContent += '<strong>Success!</strong> save record.</div><a href="#" class="btn btn-primary" onclick="AddCustomer();">Submit</a>';
    htmlContent += '</div></form></div></div></div></div></div></div>';

    htmlContent += '</div>';

    $('#webContainer').html(htmlContent);
}

function mySetting() {
    var htmlContent = '';

    htmlContent += '<div class="row">';
    htmlContent += '<div class="col-md-12 col-sm-12">';
    htmlContent += '<h1>My Setting</h1>';
    htmlContent += '</div>';
    htmlContent += '</div>';

    $('#webContainer').html(htmlContent);
}

function BindOrder() {
    //alert(id);
    $('#listMyOrder').html('<td colspan="6" style="text-align: center;"><span><i class="fa fa-spinner fa-spin" style="color:darkslateblue; font-size:40px; text-align:center;"></i></span></td>');
    var id = $('#hd_id').val();
    var url = "https://api.kwickwash.com/api/OrderList/GetOrderHistory?orderId=0&status=1&cid=" + id;
    var ctr = 0;
    //alert(url);
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'GET',
        success: function (data) {
            _details = data;
            var _htmlTable = "";
            if (typeof (_details) !== 'undefined') {
                $.each(_details, function (i, object) {
                    ctr++;
                    var invoice = "";
                    _htmlTable += '<tr>';
                    _htmlTable += '<td style="display:none;">' + ctr + '</td>';
                    _htmlTable += '<td><a href="#" class="btnCart">' + object.orderId + '</a></td>';                    
                    _htmlTable += '<td>' + object.orderType + '</td>';            
                    _htmlTable += '<td>' + object.dropRequest + '</td>';            
                    _htmlTable += '<td>' + Number(object.ttlPayableAmount).toFixed(2) + '</td>';
                    if (object.status == 'unpaid') {
                        _htmlTable += '<td><a herf="#" class="payOnline">Pay Online</a></td>';
                    }
                    else {
                        invoice = object.invoiceNo;
                        _htmlTable += '<td><a class="payStatus">' + object.status + '</a></td>';
                    }
                    _htmlTable += '<td>' + object.orderDate + '</td>';                                                           
                    _htmlTable += '<td class="text-center">';
                    _htmlTable += '<a class="btnCart" title="Cart" target="_blank" href="order-inv.html?oid=' + object.orderId + '">' + invoice + '</a>';
                    _htmlTable += '</td>';
                    
                    if (object.status == 'unpaid') {
                        _htmlTable += '<td><a class="trackOrder" href="#">Track Order</a></td>';
                        _htmlTable += '<td></td>';
                    }
                    else {
                        _htmlTable += '<td>' + object.deliveryStatus + '</td>';
                        _htmlTable += '<td>' + object.deliveryDate + '</td>';  
                    }
                    _htmlTable += '</tr>';
                });
            }
            $('#listMyOrder').html(_htmlTable);
            $('#myShopOrder').DataTable();

        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

function BindOrderReq() {
    //alert(id);
    var cid = $('#hd_id').val();
    $('#listMyShopOrder').html('<td colspan="6" style="text-align: center;"><span><i class="fa fa-spinner fa-spin" style="color:darkslateblue; font-size:40px; text-align:center;"></i></span></td>');
    var url = "https://api.kwickwash.com/api/kwickOrder/GetReqOrder?id=1&val=0&cid=" + cid;
    var ctr = 0;
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: 'GET',
        success: function (data) {
            _details = data;
            var _htmlTable = "";
            if (typeof (_details) !== 'undefined') {
                $.each(_details, function (i, object) {
                    ctr++;
                    _htmlTable += '<tr>';
                    _htmlTable += '<td style="display:none;">' + ctr + '</td>';
                    _htmlTable += '<td>' + object.koId + '</td>';
                    _htmlTable += '<td>' + object.serviceName + '</td>';
                    _htmlTable += '<td>' + object.orderDate + '</td>';
                    _htmlTable += '<td><a class="trackOrder" href="#">Track Request</a></td>';
                    _htmlTable += '</tr>';
                });
            }
            $('#listMyShopOrder').html(_htmlTable);
            $('#myShopOrderList').DataTable();

        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    });
}

