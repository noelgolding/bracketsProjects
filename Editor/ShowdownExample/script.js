window.onload = function(){
    var converter_configs = {
        'tables'    :   true,
    }; 
    var converter = new showdown.Converter(converter_configs);
        
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');
    
    var convertTextAreaToMarkdown = function(){
        var markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    }
    
    pad.addEventListener('input', convertTextAreaToMarkdown)
    
    convertTextAreaToMarkdown();
}