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
    // Obtener los datos del formulario directamente de e.parameter
    // URLSearchParams llega como parámetros de URL
    const nombre = String(e.parameter.nombre || '').trim();
    const telefono = String(e.parameter.telefono || '').trim();
    const email = String(e.parameter.email || '').trim();
    const utmSource = String(e.parameter.utmSource || '').trim();
    const userAgent = String(e.parameter.userAgent || '').trim();
    
    // Log para debugging
    Logger.log('=== DATOS RECIBIDOS ===');
    Logger.log('Nombre: ' + nombre);
    Logger.log('Teléfono: ' + telefono);
    Logger.log('Email: ' + email);
    Logger.log('UTM Source: ' + utmSource);
    Logger.log('User Agent: ' + userAgent);
    
    // Obtener la hoja de cálculo por ID
    const spreadsheet = SpreadsheetApp.openById('1cad5HY4BnAk4tzXVCBDM58UVz9fS3RpOYJnqh9M4duE');
    const sheet = spreadsheet.getSheetByName('Form Responses 1') || spreadsheet.getActiveSheet();
    
    // Preparar los datos para insertar en el orden EXACTO de las columnas
    const timestamp = new Date();
    const rowData = [
      timestamp,      // Columna A: Fecha y hora
      nombre,         // Columna B: Nombre
      telefono,       // Columna C: Teléfono
      email,          // Columna D: Email
      utmSource,      // Columna E: UTM Source
      userAgent       // Columna F: User Agent
    ];
    
    Logger.log('=== DATOS A INSERTAR ===');
    Logger.log('Row data: ' + JSON.stringify(rowData));
    
    // Insertar los datos en la hoja
    sheet.appendRow(rowData);
    
    Logger.log('=== DATOS INSERTADOS CORRECTAMENTE ===');
    
    // Devolver respuesta exitosa
    return ContentService.createTextOutput(JSON.stringify({
      'success': true,
      'message': 'Datos guardados correctamente',
      'received': {
        'nombre': nombre,
        'telefono': telefono,
        'email': email
      }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Log del error para debugging
    Logger.log('=== ERROR ===');
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
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

