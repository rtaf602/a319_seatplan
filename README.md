# STATUS SEAT PLAN A319 · Galley, ห้องน้ำ และประตู (ร่างแบบ A319 SEAT MODIFICATION)

หน้าเว็บ STATUS SEAT PLAN A319 (ใช้งานจริง) ที่เพิ่ม **Galley 2 จุด, ห้องน้ำ 4 ห้อง, ประตู และทางออกฉุกเฉิน**
โดยยกระบบมาจาก [`rtaf602/a320-05_seatplan`](https://github.com/rtaf602/a320-05_seatplan) มาใส่ผังของ [`rtaf602/a319_seatplan`](https://github.com/rtaf602/a319_seatplan)
**ที่นั่ง 39 ที่ และ Monitor 21 จอเหมือนเดิมทุกจุด** (รหัส ตำแหน่ง ชนิดจอ และสีป้ายจอไม่เปลี่ยน)

> วิธีออกแบบ, โครงสร้างข้อมูล และวิธีนำไปใช้กับเครื่องลำอื่น ดู [`docs/GALLEY_LAV_GUIDE_A319.md`](docs/GALLEY_LAV_GUIDE_A319.md)
> รายการรหัสทุกรายการ (103 รายการ) และช่องในชีท ดู [`docs/ITEM_IDS.csv`](docs/ITEM_IDS.csv)
> ภาพตัวอย่างหน้าเว็บและหน้า SUMMARY ดู [`docs/images/`](docs/images/)

## ไฟล์

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | หน้าเว็บ: ผังที่นั่ง + Monitor + Galley + ห้องน้ำ + ประตู, ปุ่ม CLEAR / PREVIEW / SAVE / EXPORT TO PDF ALL PAGES / EXPORT SUMMARY 4 PAGES / EXPORT TO EXCEL |
| `export-excel.js` | สร้างไฟล์ EXPORT TO EXCEL 5 แผ่นงาน (แผ่น "ผังที่นั่ง" มี Galley, ห้องน้ำ และประตูด้วย) |
| `config.js` | `API_URL` ของ Apps Script (ชีท Seat Plan 319) |
| `apps-script/Code.gs` | วางใน Apps Script ของชีท: สร้างแท็บ (`setupSheet`), API ให้หน้าเว็บ, ประวัติเมื่อแก้ในชีท |
| `tools/build-code-gs.js` | คัดลอกผังจาก `export-excel.js` และรายการ Galley/ห้องน้ำจาก `index.html` ไปไว้ใน `Code.gs` |
| `docs/GALLEY_LAV_GUIDE_A319.md` | คู่มือการออกแบบ |
| `docs/ITEM_IDS.csv` | รหัสทุกรายการ ชนิด โซน/Galley ชื่อ และตำแหน่งช่องในแผ่นงาน "ผังที่นั่ง" |
| `docs/images/` | ภาพหน้าเว็บทีละโซน และหน้า 1-2 ของ SUMMARY 4 PAGES |

## ผังที่เพิ่ม

| โซน | Galley / ห้องน้ำ / ประตู |
|---|---|
| FRONT CREW ZONE | **LAV A** (ซ้าย กว้างเท่าห้อง Commander Center) + **FWD GALLEY** (ขวา แนว D-F) อยู่หน้าสุด → **DOOR 1L / 1R** → ห้อง Commander Center 1A |
| FIRST CLASS | **EMER EXIT L / R** หลังแถว 5 |
| MIDDLE CREW ZONE | **CENTER VIP LAV** ซ้ายมือห้อง Commander Center 6F (กว้างและสูงเท่าห้อง) |
| Y-CLASS | **LAV C** (ซ้าย) / **LAV D** (ขวา) หลังแถวสุดท้าย → **DOOR 4L / 4R** → **AFT GALLEY** (เต็มลำ) |

- **FWD GALLEY** (คู่มือ A319CJ CAOM 1.02.04 GALLEYS P3) ตรวจ 17 รายการ: KSSU Std Unit 1-2, Oven, Microwave Oven, Coffee Maker, Hot Cup, Work Light, Power Outlet, Stowage, Faucet, Chilled Compartment 1-2, Refrigerator / Freezer, Ice / Cutlery / China Drawer, Chiller
- **AFT GALLEY** (CAOM 1.02.04 GALLEYS P5/6) ตรวจ 22 รายการ: KSSU Std Unit 1-3, Oven 1-2, Coffee Maker, Hot Jug, Cold Jug, Hot Cup, Faucet, Power Outlet, Stowage 1-3, Misc Stowage, Drawer 1-3, Waste Bin, Trash Compactor, Std FS Trolley 1-2
- ช่องลายเส้น = ไม่ได้ตรวจ (Elec. Panel, Access Panel, Sink, S/O Valve)
- สภาพ Galley / ห้องน้ำ 3 ระดับ: **ใช้งานได้ / ใช้งานได้บางส่วน / ใช้งานไม่ได้** (ที่นั่งและ Monitor ใช้ระดับเดิม)
- Power Outlet แสดงเป็นไอคอนปลั๊ก + **PWR** (ไม่ระบุแรงดัน)

## ปุ่มและรายงาน (เหมือน A320-05)

| ปุ่ม | ผลลัพธ์ |
|---|---|
| PREVIEW → ALL PAGES / SUMMARY 4 PAGES | ดูรายงานก่อน EXPORT (สลับแบบได้ในหน้าต่าง PREVIEW) |
| EXPORT TO PDF ALL PAGES | A4 แนวตั้ง: สรุปตามโซน, Monitor, Galley (FWD / AFT), ห้องน้ำ, ผังทุกโซน, รายการข้อขัดข้อง · ไม่ตัดตารางกลางกลุ่มข้ามหน้า |
| EXPORT SUMMARY 4 PAGES | A4 แนวนอน: 1 ผังที่นั่ง + ประตู, 2 ข้อขัดข้องที่นั่ง/Monitor, 3 ผัง Galley และห้องน้ำ, 4 ข้อขัดข้อง Galley และห้องน้ำ (หน้าข้อขัดข้องมีเฉพาะเมื่อมีรายการ) |
| EXPORT TO EXCEL | 5 แผ่นงาน: ผังที่นั่ง (รวม Galley/ห้องน้ำ/ประตู + ตารางสรุป Galley/ห้องน้ำ) · Galley และห้องน้ำ · รวมข้อขัดข้องคงค้าง · ทุกที่นั่ง และ Monitor · ประวัติการแก้ไข |

PDF ทั้งสองแบบสร้างที่ **600 dpi** (A4 แนวตั้ง 4,488 px ต่อความกว้าง 190 มม. · A4 แนวนอน 6,685 px ต่อ 283 มม.)
บน iPhone / iPad / Android ระบบลดลงเองตามขนาดภาพสูงสุดที่เครื่องรองรับ

ชื่อไฟล์ (เหมือน A320-05 เปลี่ยนเป็น A319):
- `YYMMDD HHMM TH-LT A319_STATUS_SEAT_PLAN_ALL PAGES.pdf`
- `YYMMDD HHMM TH-LT A319_STATUS_SEAT_PLAN_SUMMARY_4PAGES.pdf`
- `YYMMDD HHMM TH-LT A319_STATUS_SEAT_PLAN.xlsx`

(YY = ปี พ.ศ. 2 หลัก เวลาไทย เช่น `691109 2335 TH-LT ...`)

## Google Sheet: Seat Plan 319 (For Admin)

- หน้าเว็บ: https://rtaf602.github.io/a319_seatplan/
- `apps-script/Code.gs` = ส่วน API/ชีท + ผังจาก `export-excel.js` + รายการ Galley/ห้องน้ำจาก `index.html` (สร้างด้วย `node tools/build-code-gs.js`)
- แท็บ: **ผังที่นั่ง** (รวม Galley / ห้องน้ำ / ประตู ขนาดช่องเท่า EXPORT TO EXCEL) · **Galley และห้องน้ำ** · **รวมข้อขัดข้องคงค้าง** (ที่นั่ง/Monitor + Galley/ห้องน้ำ) · **ทุกที่นั่ง และ Monitor** · **ประวัติการแก้ไข**
- `setupSheet` รันซ้ำได้: อ่านสภาพ/หมายเหตุเดิมจากแท็บ "ทุกที่นั่ง และ Monitor" และ "Galley และห้องน้ำ" ตามชื่อรายการ แล้วเขียนกลับหลังจัดผัง · แท็บประวัติไม่ถูกลบ
- Galley / ห้องน้ำที่เพิ่งเข้าผังครั้งแรก: ตั้งเป็น **ใช้งานได้** ในชื่อ `INIT_BY` (ร.อ.ธัญขนิต จินตภากร) และลงแท็บประวัติโดยคอลัมน์ "อีเมลผู้แก้ไข" = **ค่าเริ่มต้น** (ไม่นับเป็น SAVE ล่าสุดของหน้าเว็บ)

### อัปเดต Apps Script (ทำทุกครั้งที่ Code.gs เปลี่ยน)
1. เปิดชีท > ส่วนขยาย > Apps Script > ลบโค้ดเดิมใน `Code.gs` > วางโค้ดจาก `apps-script/Code.gs` > บันทึก
2. เลือกฟังก์ชัน **setupSheet** > **Run**
3. **Deploy > Manage deployments >** ดินสอ > Version: **New version** > Deploy (URL เดิม ไม่ต้องแก้ `config.js`)

## ทดสอบแล้ว / ยังไม่ได้ทดสอบ
- ทดสอบแล้ว: หน้าเว็บบนคอมและมือถือ, PREVIEW ทั้งสองแบบ, ลำดับแผ่นงาน Excel, การ merge ช่องในชีท (ไม่มีช่องทับกัน), ขนาดภาพ PDF 600 dpi, ชื่อไฟล์ทั้ง 3 แบบ
- ทดสอบแล้ว (Apps Script จำลองใน Node): setupSheet เก็บสภาพที่นั่ง/Monitor เดิม, ค่าเริ่มต้น Galley/ห้องน้ำ 43 รายการ, SAVE Galley, รัน setupSheet ซ้ำไม่ลงค่าเริ่มต้นซ้ำ
- ยังไม่ได้ทดสอบ: เปิดไฟล์ PDF / Excel ที่ export จริง (เครื่องที่ใช้พัฒนาโหลด html2canvas / jsPDF / ExcelJS จาก cdnjs ไม่ได้) — ควรลองกด EXPORT บนเว็บจริงแล้วเปิดไฟล์ตรวจอีกครั้ง
