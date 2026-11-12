# CHANGELOG

## 2026-11-12 · Viewer ส่งออกไฟล์ได้
- Viewer กด EXPORT TO PDF ALL PAGES / EXPORT PDF SUMMARY 4 PAGES / EXPORT TO EXCEL ได้ (บันทึกในแท็บ "ประวัติการส่งออก" เหมือน Role อื่น) ยัง SAVE, CLEAR และ PREVIEW ไม่ได้
- ต้องวาง apps-script/Code.gs ใหม่และ Deploy เวอร์ชันใหม่ (Manage deployments → ดินสอ → New version)

## 2026-11-12 · ใช้ระบบ Login กลาง ฝูง.602
- เอารหัส WRITE_PIN / ADMIN_PIN และช่องพิมพ์ชื่อผู้ตรวจออก เข้าใช้งานผ่านหน้าเข้าสู่ระบบกลาง (รหัสเว็บ WEB5)
- Admin / Editor แก้ไขและ SAVE ได้ · Viewer ดูอย่างเดียว · ล้างข้อมูลทั้งหมดเฉพาะ Admin ของเว็บนี้
- ชื่อผู้ตรวจ = ชื่อ-สกุลของบัญชีที่ Login · การส่งออก PDF / Excel บันทึกในแท็บ "ประวัติการส่งออก"

## 2026-11-11 · ตัด LAV D ออก
- เอาห้องน้ำ LAV D ออกจากหน้าเว็บ, PDF ทั้ง 2 แบบ, EXPORT TO EXCEL และชีท (เหลือห้องน้ำ 3 ห้อง: LAV A, CENTER VIP LAV, LAV C · Galley/ห้องน้ำรวม 42 รายการ)
- ประวัติเดิมของ LAV D ในแท็บประวัติยังอยู่ (ไม่ลบประวัติ)

## 2026-11-09 · ขึ้นใช้งานจริงกับชีท Seat Plan 319
- Apps Script รองรับ Galley / ห้องน้ำ: ช่องในแท็บผังที่นั่ง, แท็บ "Galley และห้องน้ำ", รวมข้อขัดข้องคงค้างรวม Galley/ห้องน้ำ
- ค่าเริ่มต้น Galley/ห้องน้ำ 43 รายการ = ใช้งานได้ ในชื่อ ร.อ.ธัญชนิต จินตภากร (แท็บประวัติ: ค่าเริ่มต้น)
- สภาพที่นั่ง/Monitor ที่บันทึกไว้ไม่เปลี่ยน · ความสูงแถวในชีทล็อกตาม EXPORT TO EXCEL
- เอาปุ่ม EXPORT TO PDF A4 2PAGE ออก (แทนด้วย EXPORT SUMMARY 4 PAGES)

## 2026-11-09 · ร่างแบบ A319 SEAT MODIFICATION — Galley, ห้องน้ำ และประตู
- เพิ่ม FWD GALLEY (17 รายการ) และ AFT GALLEY (22 รายการ) ตามคู่มือ A319CJ CAOM 1.02.04 GALLEYS (P3, P5/6)
- เพิ่มห้องน้ำ 4 ห้อง: LAV A (หน้าห้อง CC 1A), CENTER VIP LAV (ซ้ายมือห้อง CC 6F), LAV C / LAV D (หลังแถวสุดท้าย)
- เพิ่ม DOOR 1L/1R (หน้าห้อง CC 1A), EMER EXIT L/R (หลังแถว 5), DOOR 4L/4R (ก่อน AFT GALLEY)
- ปุ่มและรายงานแบบ A320-05: PREVIEW ALL PAGES / SUMMARY 4 PAGES, EXPORT TO PDF ALL PAGES, EXPORT SUMMARY 4 PAGES (600 dpi)
- ชื่อไฟล์แบบ A320-05: `YYMMDD HHMM TH-LT A319_STATUS_SEAT_PLAN_...`
- EXPORT TO EXCEL 5 แผ่นงาน: แผ่น "ผังที่นั่ง" มี Galley / ห้องน้ำ / ประตู + ตารางสรุป, เพิ่มแผ่น "Galley และห้องน้ำ"
- โหมดทดลอง `DEMO` ใน config.js (SAVE เก็บในเบราว์เซอร์ ระหว่างที่ Apps Script ยังไม่รองรับ Galley)
- ที่นั่ง 39 และ Monitor 21 จอ ไม่เปลี่ยน
