async function extractTextToTable() {
  const fileInput = document.getElementById('pdfFileInput');
  const endOfLineText = document.getElementById('endOfLineText').value.trim();
  const file = fileInput.files[0];

  if (!file) {
    alert('Selecciona un archivo PDF para procesar.');
    return;
  }

  // const endOfLineRegex = endOfLineText ? new RegExp(endOfLineText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')) : null;
  const endOfLineRegex = endOfLineText ? new RegExp(endOfLineText) : null;
  const table = document.createElement('table');
  table.id = 'extractedDataTable';
  table.classList.add('table','table-striped','table-sm','table-hover','table-bordered','display','compact');
  const tableHead = document.createElement('thead');
  const tableHeadRow = document.createElement('tr');
  tableHead.appendChild(tableHeadRow);
  table.appendChild(tableHead);

  const tableBody = document.createElement('tbody');
  table.appendChild(tableBody);

  const reader = new FileReader();
  reader.onload = async function (event) {
    const arrayBuffer = event.target.result;
    try {
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const numPages = pdf.numPages;

      let currentRow = [];
      let columnCount = 0;

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        let pageText = textContent.items.map(item => item.str).join('\n');

        let lines = pageText.split('\n');
        lines = lines.map(line => line.trim()).filter(line => line !== '');

        let cleanedText = lines.join('\n');

        cleanedText = cleanedText.replace(/: \n/g, ": ")
                                  .replace(/:\n/g, ": ")
                                  .replace(/-\n/g, "-")
                                  .replace(/\n-/g, "-")
                                  .replace(/- \n/g, "-")
                                  .replace(/\$ \n/g, "$ ")
                                  .replace(/\$\n/g, "$ ")
                                  .replace(/\.\n/g, ". ")
                                  .replace(/\.\n/g, ". ")
                                  .replace(/\s+\n\s*/g, " ");

        lines = cleanedText.split('\n');
        
        if (endOfLineRegex) {
          lines.forEach(line => {
            currentRow.push(line);
            if (endOfLineRegex.test(line)) {
              if (currentRow.length > columnCount) {
                columnCount = currentRow.length -1;
              }
              const tableRow = document.createElement('tr');
              currentRow.forEach(cellText => {
                const cell = document.createElement('td');
                cell.textContent = cellText;
                tableRow.appendChild(cell);
              });
              tableBody.appendChild(tableRow);
              currentRow = [];
            }
          });
        } else {
          lines.forEach(line => {
            const tableRow = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = line;
            tableRow.appendChild(cell);
            tableBody.appendChild(tableRow);
          });
        }
      }
      
      if (currentRow.length > 0 && endOfLineRegex) {
        if (currentRow.length > columnCount) {
          columnCount = currentRow.length -1;
        }
        const tableRow = document.createElement('tr');
        currentRow.forEach(cellText => {
          const cell = document.createElement('td');
          cell.textContent = cellText;
          tableRow.appendChild(cell);
        });
        tableBody.appendChild(tableRow);
      }

      // Crear encabezado de la tabla
      for (let i = 0; i <= columnCount; i++) {
        const th = document.createElement('th');
        th.textContent = 'Col' + (i + 1);
        tableHeadRow.appendChild(th);
      }
      
      // Asegurar que todas las filas tengan el mismo número de celdas
      tableBody.querySelectorAll('tr').forEach(row => {
        while (row.children.length <= columnCount) {
          const emptyCell = document.createElement('td');
          row.appendChild(emptyCell);
        }
      });
      
      const extractedTableContainer = document.getElementById('extractedTable');
      extractedTableContainer.innerHTML = '';
      extractedTableContainer.appendChild(table);

      // Inicializar DataTables después de añadir la tabla al DOM
      $(document).ready(function() {
        $('#extractedDataTable').DataTable({
          "responsive": true,
          ordering: false,
          dom: '<"dt-top-container"<l><"dt-center-in-div"B><f>r><t><"row justify-content-between"<"col-sm-4"i><"col-sm-4"p>>',
          buttons: {
            dom: {
              button: {
                className: 'btn btn-success'
              }
            },
            buttons: [
              {
                extend: 'copy',
                text: 'Copiar',
              },
              {
                extend: 'excel',
                title: 'Materiales'
              },
            ]
          },
          lengthMenu: [
            [20, 25, 50, -1],
            [20, 25, 50, 'All']
          ],
          language:{ 
            url:"//cdn.datatables.net/plug-ins/2.0.8/i18n/es-MX.json"
          },
        });
      });
    } catch (error) {
      console.error('Error al procesar el PDF:', error);
      alert('Ocurrió un error al extraer el texto del PDF. Intenta nuevamente.');
    }
  };
  reader.readAsArrayBuffer(file);
}

