javascript:(function() {
    var baseUrl="https://didattica.polito.it/portal/pls/portal/";
    /* creazione attributo replaceAll per le stringhe */
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    console.log("Getting links...");
    /* prendo tutto il contetnuo della pagina */
    var htmlContent=document.documentElement.innerHTML;
    var reg=/href="(sviluppo\.videolezioni\.vis.*lez=[0-9]*)">/gi;
    var matches, output = [];
    /* inserisco i link dentro output */
    while (matches = reg.exec(htmlContent)) {
        output.push(matches[1].replaceAll("&amp;", "&"));
    }
    /* stampo i link trovati */
    document.documentElement.innerHTML="";
    output.forEach(function(item, index){

        console.log((index+1) +" - "+ item);
        /* se riesco a ottenere il contenuto dell'url eseguo function(data) */
        $.get(baseUrl+item).success(function(data){
            var dlLink = data.match(/https:\/\/video\.polito\.it\/dl\/.*\.mp4/gi);
            /* prendo il primo match */
            document.write("<a href=\""+dlLink[0]+"\">"+dlLink[0].split("/").pop()+"</a><br>\n");
        });
    });
})()
