document.addEventListener('DOMContentLoaded', function() {

    //activate SideBar nav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    //Kode diatas berhubungan dengan framework "Materialize"

    function loadNav() {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                //Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                //Event listener untuk navigation
                document.querySelectorAll(".topnav a, .sidenav a").forEach(function(elm) {
                    elm.addEventListener('click', function(event) {
                        
                        //Berikut adalah code untuk menutup sidebar
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        //Memuat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    })
                });
            };
        }

        xhttp.open("GET", "nav.html", true)
        xhttp.send();
    }

    //load page content
    var page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content");
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        }
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
})