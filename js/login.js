$("form").on("submit", function() {

    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var dataSource = new kendo.data.DataSource({
        transport: {
            read:  {
                url: 'http://myurl.co.uk/appqueries/login.php?username='+username+'&password='+password,
                dataType: "json"
            }
        }
    });

    alert("Your username is "+username+" and your password is: "+password);

});