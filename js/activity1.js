var usuario="jsandrea";
        var nombrearchivo;
        var crudServiceBaseUrl = "http://190.144.16.114:8810/rest/Documents/List/";
        var crudServiceGetFile = "http://190.144.16.114:8810/rest/Documents/GetFile/";
        var crudServiceGetFileAsPDF ="http://190.144.16.114:8810/rest/Documents/GetFileAsPDF/";
        $(document).ready(function () {
            dataSource = new kendo.data.DataSource({
                transport: {
                    read:  {
                        url: crudServiceBaseUrl + usuario,
                        dataType: "json"
                    },
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                            return {models: kendo.stringify(options.models)};
                        }
                    }
                },
                batch: true,
                pageSize: 20,
                schema: {

                    data:"response.dsfiles.dsfiles.ttfiles",
                    model: {
                        fields: {
                            nomfile: { type: "string" },
                            tamfile: { type: "integer" },
                            fecfile: { type: "date:MM-dd-yyyy"},}
                    }
                }
            });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                height: 550,
                columns: [
                    { field: "nomfile", title: "Documento", format: "{0:c}", width: "auto" },
                    { field: "tamfile", title:"Tama&ntilde;o de Archivo", format: "{0:c}", },
                    { field: "fecfile", title:"Fecha de Creacion", format: "{0:c}", },
                    {command: [{name:"descargar", text: " ",click:showDetails ,template: "<a class='k-grid-Descargar'><span class='k-icon botonDescargar'></span></a>"}] , title: "&nbsp;", width: "82px" },
                    {command: [{name:"ver", text: " ",click:htmldoc ,template: "<a class='k-grid-Ver'><span class='k-icon botonVer'></span></a>"}] , title: "&nbsp;", width: "82px" },
                    {command: [{name:"pdf", text: " ",click:pdf,template: "<a class='k-grid-pdf '><span class='k-icon botonPdf '></span></a>"}] , title: "&nbsp;", width: "82px" }
                ],
            });
        });

        function showDetails(e) {
            var Download = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: crudServiceGetFile +usuario+nombrearchivo, // url del servicio a consumir
                        dataType: "json",//, // tipo de dato json
                    }
                },
                schema: {
                    data:"response.polfile",
                }
            });
            alert(JSON.stringify(Download))
            try {
                sessionStorage.setItem("tipo", "archivo");
                e.preventDefault();
                var row = $(e.target).closest("tr");
                var item = $("#grid").data("kendoGrid").dataItem(row);
                item = item.nomfile;
                item = item.toString();
                formWidgetHandler.saveDataSlots();
            } catch (e) {
                alert(e);
            }
        }
        function htmldoc(e) {
            try {
                sessionStorage.setItem("tipo", "html");
                e.preventDefault();
                var row = $(e.target).closest("tr");
                var item = $("#grid").data("kendoGrid").dataItem(row);
                item = item.nomfile;
                item = item.toString();
                document.getElementById("").value =  item;
                document.getElementById("").value =  item;
                formWidgetHandler.saveDataSlots();
                document.getElementById("").click();
            } catch (e) {
                alert(e);
            }
        }
        function pdf(e) {
            var DataPDF = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: crudServiceGetFileAsPDF+usuario+nombrearchivo, // url del servicio a consumir
                        dataType: "json",//, // tipo de dato json
                    }
                },
                schema: {
                    data:"response.polfile",
                }
            });
            alert(JSON.stringify(DataPDF))
            try {
                sessionStorage.setItem("tipo", "pdf");
                e.preventDefault();
                var row = $(e.target).closest("tr");
                var item = $("#grid").data("kendoGrid").dataItem(row);
                item = item.nomfile;
                item = item.toString();
                document.getElementById("botonPdf").value =  item;
                formWidgetHandler.saveDataSlots();

            } catch (e) {
                alert(e);
            }
        }
        function download(filename, text, tipo) {
            var res = filename.split(".");
            filename = res[0];
            extension = res[1];
            try {
                if (tipo == "archivo") {
                    filename = filename + "." + extension;
                    if (extension == "pdf") {
                        var byteCharacters = atob(text);
                        var byteNumbers = new Array(byteCharacters.length);
                        for (var i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        var byteArray = new Uint8Array(byteNumbers);
                        var blob = new Blob([ byteArray ], {
                            type : "application/pdf"
                        });
                        saveAs(blob, filename);
                    } else {
                        var blob = new Blob([ text ]);
                        saveAs(blob, filename);
                    }
                } else if (tipo == "html") {
                    filename = filename + ".pdf";
                    if (extension == "pdf") {

                        var byteCharacters = atob(text);
                        var byteNumbers = new Array(byteCharacters.length);
                        for (var i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        var byteArray = new Uint8Array(byteNumbers);
                        var blob = new Blob([ byteArray ], {
                            type : "application/pdf"
                        });
                        saveAs(blob, filename);
                    } else {
                        var blob = new Blob([ text ]);
                        var fileURL = URL.createObjectURL(blob);
                        window.open(fileURL);
                    }
                } else if (tipo == "pdf") {
                    filename = filename + ".pdf";
                    if (extension == "pdf") {
                        var byteCharacters = atob(text);
                        var byteNumbers = new Array(byteCharacters.length);
                        for (var i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        var byteArray = new Uint8Array(byteNumbers);
                        var blob = new Blob([ byteArray ], {
                            type : "application/pdf"
                        });
                        saveAs(blob, filename);
                        return;
                    } else {
                        var blob = new Blob([ text ]);
                        saveAs(blob, filename);
                        return;
                    }
                }
            } catch (e) {
                alert(e);
            }
        }

        function mensajeAlerta(msj) {
            var notificacionError = $("#notification").kendoNotification({
                position : {
                    pinned : true,
                    top : 30,
                    right : 30
                },
                autoHideAfter : 0,
                stacking : "down",
                show : onShow,
                templates : [ {
                    type : "error",
                    template : $("#errorTemplate").html()
                } ]
            }).data("kendoNotification");
            notificacionError.show({
                title : "Ocurrio un Error",
                message : msj
            }, "error");
        }

        function form_onLoad(eventContext){
            document();}


        function showDetailsEditarV2(e){//creacion del popup de CU
            try{
                e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
                clickGrilla= this.dataItem($(e.currentTarget).closest("tr"));
                var grid = $("#div3").data("kendoGrid");
                var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
                grid.select(grid.tbody.find(">tr:not(.k-grouping-row)").eq(fila));

            }catch(e){
                alert("Function: showDetailsEditarV2 Error: "+e.message);
            }
        }