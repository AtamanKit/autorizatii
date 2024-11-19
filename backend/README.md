# bir_flask
## Alternarea dintre *heroku* si *local*
1. Dinspre react.js pleaca 2 URL-ri, unul pe heroku altul local (http://localhost:5000//). Pleaca spre local (de toate 6 URL-ri) cele legate de exportul EXCEL (autorizatii-context.js (1 URL - ExportFunc()), prog-lunar.js (1 URL - ExportFunc()), nepr-lunar.js (1 URL - ExportFunc()), export-excel.js (3 URL - componentDidMount()))
2. Pentru serverul local download zipul (nu este posibil sa fac clone de pe alt calculator pentru ca *bir_flask* este ascuns). 
3. Dezarhivez, prin *cmd* creez *env* instalez din *requirements.txt* toate *dependencies*
4. Creez bat file care contine:
```
CALL env\Scripts\activate
set FLASK_APP=app.py
flask run
```
5. Creez shortcut cu icon *atamanPSD.ico*.
6. Shortcut-l il tai si-l pun pe desKtop
