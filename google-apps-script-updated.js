/**
 * Maneja solicitudes GET
 */
function doGet() {
  return HtmlService.createHtmlOutput(
    '<html><body>' +
    '<h1>Servicio de integración - Formulario VIRA</h1>' +
    '<p>Estado: <b style="color:green">Activo</b></p>' +
    '<p>Este servicio está funcionando correctamente.</p>' +
    '<p><small>Última actualización: ' + new Date().toLocaleDateString('es-AR') + '</small></p>' +
    '</body></html>'
  );
}

/**
 * Maneja solicitudes POST - procesa los datos del formulario
 */
function doPost(e) {
  try {
    // Obtener los datos del formulario
    // FormData puede venir en e.parameter o e.postData.contents
    let formData = {};
    
    if (e.parameter) {
      // Datos vienen como parámetros de URL
      formData = e.parameter;
    } else if (e.postData && e.postData.contents) {
      // Datos vienen en el body (FormData)
      const contents = e.postData.contents;
      // Parsear FormData manualmente si es necesario
      const params = contents.split('&');
      params.forEach(function(param) {
        const pair = param.split('=');
        if (pair.length === 2) {
          formData[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
      });
    }
    
    // Log para debugging (puedes ver esto en el editor de Apps Script > Ver > Logs de ejecución)
    Logger.log('Datos recibidos: ' + JSON.stringify(formData));
    
    // Obtener la hoja de cálculo por ID
    const spreadsheet = SpreadsheetApp.openById('1cad5HY4BnAk4tzXVCBDM58UVz9fS3RpOYJnqh9M4duE');
    const sheet = spreadsheet.getSheetByName('Form Responses 1') || spreadsheet.getActiveSheet();
    
    // Preparar los datos para insertar en el orden correcto
    const timestamp = new Date();
    const rowData = [
      timestamp,                           // Columna A: Fecha y hora
      formData.nombre || '',               // Columna B: Nombre
      formData.telefono || '',             // Columna C: Teléfono
      formData.email || '',                // Columna D: Email
      formData.utmSource || '',            // Columna E: UTM Source / Origen
      formData.userAgent || ''             // Columna F: User Agent
    ];
    
    // Log para verificar el orden antes de insertar
    Logger.log('Datos a insertar: ' + JSON.stringify(rowData));
    
    // Insertar los datos en la hoja
    sheet.appendRow(rowData);
    
    // Devolver respuesta exitosa
    return ContentService.createTextOutput(JSON.stringify({
      'success': true,
      'message': 'Datos guardados correctamente'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Log del error para debugging
    Logger.log('Error en doPost: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    
    // Devolver respuesta de error
    return ContentService.createTextOutput(JSON.stringify({
      'success': false,
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Maneja solicitudes OPTIONS para CORS
 */
function doOptions() {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
}

/**
 * Función para probar el script directamente (solo para desarrollo)
 */
function testScript() {
  // Crea datos de prueba
  var testData = {
    fecha: new Date().toLocaleString('es-AR'),
    nombre: "Prueba",
    telefono: "+54 11 1234-5678",  // ← AGREGADO para pruebas
    email: "prueba@test.com",
    utmSource: "test_directo",
    userAgent: "Mozilla/5.0 (Test)"
  };
  
  // Simula una solicitud POST
  var e = {
    parameter: testData
  };
  
  // Ejecuta doPost con los datos de prueba
  var response = doPost(e);
  Logger.log(response.getContent());
}

