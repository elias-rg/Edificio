window.addEventListener("load", inicio);
edificio = [];
index  = 0;

function inicio(){
    //document.getElementById("addEdificio").addEventListener("click",createEdificio);
    $("#addEdificio").click(createEdificio)
    document.getElementById("edit").addEventListener("click",createEditEdificio);
    if(document.getElementById("editEdificio")){
        document.getElementById("editEdificio").addEventListener("click",editEdificio);
    }
    document.getElementById("printEdificio").addEventListener("click",printEdificio)

}


function createEdificio(){
    var nombre = document.getElementById("edificio2").value;
    var calle = document.getElementById("calle").value;
    var numero = document.getElementById("numero").value;
    var codigo = document.getElementById("codigo").value;
    var puertas = document.getElementById("puertas").value;
    var plantas  = document.getElementById("plantas").value;
    if(nombre == "" || calle =="" || numero == "" || codigo ==""){
       document.getElementById("errores").innerHTML="debes rellenar todos los campos"; 
    }else{
        nombre = new Edificio(calle,numero,codigo);
        nombre.mensaje();
        nombre.agregarPlantasYPuertas(plantas,puertas);
        edificio[index] = nombre;
        edificio[index].nombre= document.getElementById("edificio2").value;
        index++;
        console.log(edificio);
    }
}

function createEditEdificio(){
var form = document.createElement("form");
form.setAttribute('method',"post");
form.setAttribute('action',"submit.php");

var planta = document.createElement("input"); //input element, text
planta.setAttribute('type',"text");
planta.setAttribute('name',"planta");
planta.setAttribute('value',"planta");
planta.setAttribute('id',"planta");

var puerta = document.createElement("input"); //input element, text
puerta.setAttribute('type',"text");
puerta.setAttribute('name',"puerta");
puerta.setAttribute('value',"puerta");
puerta.setAttribute('id',"puerta");

var propietario = document.createElement("input"); //input element, text
propietario.setAttribute('type',"text");
propietario.setAttribute('name',"propietario");
propietario.setAttribute('value',"propietario");
propietario.setAttribute('id',"propietario");


var s = document.createElement("input"); //input element, Submit button
s.setAttribute('type',"button");
s.setAttribute('value',"Submit");
s.setAttribute('id','editEdificio');

// RADIO

   edificio.forEach((edificioValue) => {
      var labelValue = document.createElement('label');
      labelValue.innerHTML = edificioValue.nombre;
      var inputValue = document.createElement('input');
      inputValue.type = "radio";
      inputValue.name = "edificio";
      inputValue.id=edificioValue.nombre;
      inputValue.value=edificioValue.nombre;
      //inputValue.genederValue = i;
      form.appendChild(labelValue);
      form.appendChild(inputValue);
   });

form.appendChild(planta);
form.appendChild(puerta);
form.appendChild(propietario);
form.appendChild(s);

//and some more input elements here
//and dont forget to add a submit button

document.getElementsByTagName('body')[0].appendChild(form);
document.getElementById("editEdificio").addEventListener("click",editEdificio);
}

function editEdificio(){


    var ele = document.getElementsByName('edificio');

    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked){
            console.log(ele[i].value);
            console.log(puerta);
            console.log(planta);
            var puerta = document.getElementById("puerta").value;
            var planta = document.getElementById("planta").value;
            var propietario = document.getElementById("propietario").value;
            //var edificio  = ele[i].value;
            //ele[i].value.agregarPropietario(propietario,planta,puerta);
            edificio[i].agregarPropietario(propietario,planta,puerta);
        }
    }
}


function printEdificio(){
    var form = document.createElement("form");
    form.setAttribute('method',"post");
    form.setAttribute('action',"submit.php");   

    //Select
    var select = document.createElement("select");
    select.name = "selectEdificio";
    select.id = "selectEdificio"
 
    for (const val of edificio)
    {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.nombre ;
        option.id=val.nombre;
        select.appendChild(option);
    }
 
    var label = document.createElement("label");
    label.innerHTML = "Escoger edificio "
    label.htmlFor = "edificio";
 



    // INPUT
    var s = document.createElement("input"); //input element, Submit button
    s.setAttribute('type',"button");
    s.setAttribute('value',"Mostrar");
    s.setAttribute('id','mostrarEdificio');

    

    //Append
   // form.appendChild(i);
    form.appendChild(label);
    form.appendChild(select);
    form.appendChild(s);
    document.getElementsByTagName('body')[0].appendChild(form);
    document.getElementById("mostrarEdificio").addEventListener("click",printNow);
}

function printNow(){
    //console.log("aqui estoy");
    var ddl = document.getElementById("selectEdificio");
    //console.log(ddl.options[ddl.selectedIndex].index);
    var index = ddl.options[ddl.selectedIndex].index
    
    edificio[index].imprimePlantas(index);
}

class Edificio{
    constructor(calle,numero,codigo){
        this.calle = calle;
        this.numero = numero;
        this.codigo = codigo;
        this.planta = [];
    }
   
    agregarPlantasYPuertas(numplantas,puertas){
        
        
        for(let numeroPlanta = 0 ; numeroPlanta < numplantas ; numeroPlanta++ ){
            this.planta[numeroPlanta]=[];
            for(let numeroPuerta = 0 ; numeroPuerta < puertas ; numeroPuerta++){
               // this.planta[numeroPlanta]=[numeroPuerta,''];
                this.planta[numeroPlanta][numeroPuerta]='NINGUNO';
            }
        }
    }
    
    // Se le pasa el nuevo número del edificio para que lo actualice.
    modificarNumero(numero){
        this.numero = numero;
    } 

    // Se le pasa el nuevo nombre de la calle para que lo actualice.
    modificarCalle(calle){
        this.calle = calle ;
    }

    // Se le pasa el nuevo número de código postal del edificio.
    modificarCodigoPostal(codigo){
        this.codigo = codigo;
    } 

    // Devuelve el nombre de la calle del edificio.
    imprimeCalle(nombreEdificio){
        document.write(`El nombre de la calle de edificio ${nombreEdificio} es: ${this.calle}<br>`);
    } 

    // Devuelve el número del edificio.
    imprimeNumero(nombreEdificio){
        document.write(`El edificio ${nombreEdificio} esta situado en la calle ${this.calle} numero ${this.numero} <br>`);
    }

    // Devuelve el código postal del edificio.
    imprimeCodigoPostal(nombreEdificio){
        document.write(`El codigo postal del edificio ${nombreEdificio} es ${this.codigo}  <br>`);
    } 

    // Se le pasa un nombre de propietario, un número de planta y un número de puerta y lo asignará como propietario de ese piso.
    agregarPropietario(nombre,planta,puerta){
        this.planta[planta][puerta]= nombre;
        var porte = parseInt(puerta);
        var etage = parseInt(planta);
        //console.log(`${nombre} es ahora el dueño de la puerta ${puerta} de la planta ${planta}   `);
        document.getElementById("mensajes").innerHTML= `${nombre} es ahora el dueño de la puerta ${porte} de la planta ${etage}   `
    } 

    // Recorrerá el edificio e imprimirá todos los propietarios de cada puerta.
    imprimePlantas(selecionado){
       
        /*
        //exemple 1(marche bien)
        for(let numPlanta = 0  ; numPlanta < this.planta.length;numPlanta++){
            for(let numPuerta = 0 ; numPuerta < this.planta[numPlanta].length ; numPuerta++){
                document.getElementById("mensajes").innerHTML+=(` el dueño del piso numero ${numPuerta} de la planta ${numPlanta} es: ${this.planta[numPlanta][numPuerta]}<br>`);
            }
        }
*/
        //exemple2
        var html = "<table border='1|1'>";
        
    for (var i = 0; i < edificio[selecionado].planta.length; i++) {
    html+="<tr>";
    html+=`<th> planta ${i}</th>`
    html+="<td>"+edificio[selecionado].planta[i]+"</td>";    
    html+="</tr>";

}
html+="</table>";
document.getElementById("dvTable").innerHTML = html;
            //Build an array containing Customer records.
     
     /*
            //Create a HTML Table element.
            var table = document.createElement("TABLE");
            table.border = "1";
     
            //Get the count of columns.
            var columnCount = edificio.length;
     
            //Add the header row.
            var row = table.insertRow(-1);
            for (var i = 0; i < columnCount; i++) {
                var headerCell = document.createElement("TH");
                headerCell.innerHTML = edificio[0][i];
                row.appendChild(headerCell);
            }
     
            //Add the data rows.
            for (var i = 1; i < edificio.length; i++) {
                row = table.insertRow(-1);
                for (var j = 0; j < columnCount; j++) {
                    var cell = row.insertCell(-1);
                    cell.innerHTML = edificio[i][j];
                }
            }
     
            var dvTable = document.getElementById("dvTable");
            dvTable.innerHTML = "";
            dvTable.appendChild(table);
            */
    }
    mensaje(){

        document.getElementById("mensajes").innerHTML=`Construido nuevo edificio en calle: ${this.calle} Nº:${this.numero} CP:${this.codigo} <br>`
       // document.write(`Construiodo nuevo edificio en calle: ${this.calle} Nº:${this.numero} CP:${this.codigo} <br>`);
    }
    ubicacion(nombreEdificio){
        document.write(`El Edificio${nombreEdificio} esta situado en ${this.calle} numero ${this.numero} <br>`);
    }
}



/*
edificioA = new Edificio("Garcia Prieto",58,15706);
edificioB = new Edificio("Camino Caneiro",29,32004);
edificioC = new Edificio("San Clemente","s/n",15705);
edificioA.mensaje();
edificioB.mensaje();
edificioC.mensaje();
edificioA.imprimeCodigoPostal("A");
edificioA.imprimeCalle("A");
edificioA.ubicacion("A");

edificioA.agregarPlantasYPuertas(3,2);

edificioA.agregarPropietario("Jose Antonio Lopez",0,0);
edificioA.agregarPropietario("Luisa Martinez",0,1);
edificioA.agregarPropietario("Marta Castellón",0,2);
edificioA.agregarPropietario("Antonio Pereira",1,1);

edificioA.imprimePlantas();




edificioA.agregarPlantasYPuertas(1,0);
edificioA.agregarPropietario("Pedro Meijide",2,1);
edificioA.imprimePlantas();
*/