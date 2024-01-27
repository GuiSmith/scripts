function readFile(file, callback) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var data = event.target.result;
        var workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        console.log(sheet);
            var array = [];
            var columns = [];
            delete sheet['!ref'];
            for (cell in sheet){
                let column = cell.replace(/[^a-z]/gi,'');
                let line = cell.replace(/[^0-9]/gi,'') - 1;
                console.log(cell);
                if(!columns.includes(column) && column != 'ref'){
                    columns.push(column);
                }
                let columnIndex = columns.indexOf(column);
                if (columnIndex == 0){
                    array[line] = [];
                }
                try {
                    array[line][columnIndex] = sheet[cell]['w'];
                } catch (error) {
                    console.log(array);
                    console.log(`Célula: ${cell}; Linha: ${line}; Coluna: ${columnIndex}`);
                }
            }
            callback(array);
            
    };
    if (file) {
        reader.readAsBinaryString(file);
    } else {
        console.error('No file provided');
    }
}
function createTable(array){
    const table = document.createElement('table');
    for (i=0;i<array.length;i++) {
    let row = document.createElement('tr');
    for (j=0;j<array[i].length;j++){
        let cell;
        if(i == 0){
            cell = document.createElement('th');
        }else{
            cell = document.createElement('td');
        }
        cell.textContent = array[i][j];
        row.appendChild(cell);      
    }
    table.appendChild(row);
    }
    return table;
}