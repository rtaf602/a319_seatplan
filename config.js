/* ตั้งค่าการเชื่อมต่อ Google Sheet
 * API_URL = URL ของ Apps Script Web App (ลงท้ายด้วย /exec) ของชีท "Seat Plan 319 (For Admin)"
 * DEMO    = ใช้เฉพาะตอนยังไม่มี API_URL (SAVE เก็บในเบราว์เซอร์) · เมื่อมี API_URL แล้วไม่มีผล
 * webCode = รหัสเว็บนี้ในรายชื่อเว็บของหน้า Admin (ระบบ Login กลาง) ต้องตรงกับ LOGIN.WEB_CODE ใน apps-script/Code.gs
 * ห้ามใส่รหัสผ่านในไฟล์นี้ (repo เป็น public)
 */
window.SEATPLAN_CONFIG = {
  API_URL: 'https://script.google.com/macros/s/AKfycbwO7LfBy2kqFdftslPtABxS13CxGLV4kJvB9a9t0tC6_dpQlu9s3CWC4cdEdlPLIdxy/exec',
  DEMO: false,
  webCode: 'WEB5'
};
