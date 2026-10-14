# STATUS SEAT PLAN A319 · ตรวจสภาพที่นั่งและ Monitor

หน้าเว็บให้ฝ่ายการช่าง/ฝ่ายสื่อสารบันทึกสภาพที่นั่งและ Monitor ของเครื่อง A319
(39 ที่นั่ง, Monitor 21 จอ: Pilot Rest Monitor 8 Inch 2 จอ, Wall Mounted Monitor 20 Inch 7 จอ, Wall Mounted Monitor 15 Inch 6 จอ และ Overhead Monitor 9 Inch 6 จอ)
ข้อมูลทุกครั้งที่กด **SAVE** จะบันทึกลง Google Sheet **Seat Plan 319 (For Admin)** โดยตรง
และเพิ่มบรรทัดในแท็บ **ประวัติการแก้ไข**

- หน้าเว็บ: https://rtaf602.github.io/a319_seatplan/
- ชีทเก็บข้อมูล: [Seat Plan 319 (For Admin)](https://docs.google.com/spreadsheets/d/1OeYYS-0k1fiS7kpJZvsH5fWSewE3JzJP-Emy39tbC-o/edit)

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | หน้าเว็บ (ผังที่นั่ง, ตารางสรุปตามโซนและตามชนิด Monitor, ปุ่ม CLEAR / PREVIEW / SAVE / EXPORT TO PDF / EXPORT TO EXCEL) |
| `export-excel.js` | ผังที่นั่งของชีท และไฟล์ EXPORT TO EXCEL 4 แผ่นงาน: ผังที่นั่ง, รวมข้อขัดข้องคงค้าง, ทุกที่นั่ง และ Monitor, ประวัติการแก้ไข |
| `config.js` | ใส่ URL ของ Apps Script Web App |
| `apps-script/Code.gs` | โค้ดที่วางใน Apps Script ของ Google Sheet: สร้างแท็บทั้งหมด (`setupSheet`), อ่าน/บันทึกข้อมูลให้หน้าเว็บ และเก็บประวัติเมื่อแก้ในชีทโดยตรง |
| `tools/build-code-gs.js` | คัดลอกผังจาก `export-excel.js` ไปไว้ใน `Code.gs` (ใช้เมื่อแก้ผัง) |

## ผังที่นั่ง
| โซน | ที่นั่ง | Monitor |
|---|---|---|
| FRONT CREW ZONE | Commander Center 1A (ในห้อง Commander Center) | Pilot Rest ในห้อง 1A |
| EXECUTIVE LOUNGE | 2A, 3A (โซฟาด้านขวา) | หน้า 2A, หลัง 3A, หลังโซฟา (20") |
| FIRST CLASS | 4A, 4D, 4F, 5A, 5D, 5F | หน้า 4A, หน้า 4D/4F, หลัง 5A, หลัง 5D/5F (20") |
| MIDDLE CREW ZONE | Commander Center 6F (ในห้อง Commander Center ด้านขวา) | Pilot Rest ในห้อง 6F |
| BUSINESS CLASS | ซ้าย 6A 6C, 7A 7C, 8A 8C / ขวา 7D 7F, 8D 8F, 9D 9F | หน้า 6A/6C, หน้า 7D/7F (15") · OVHD หน้า 7A/7C, 8D/8F, 8A/8C, 9D/9F |
| Y-CLASS | ซ้าย 9A–C, 10A–C, 11A–C / ขวา 10D–F, 11D–F, 12D 12F (มีผนังกั้นก่อน 11A–C และ 12D/12F) | หน้า 9A–C, 10D–F, 11A–C, 12D/12F (15") · OVHD หน้า 10A–C, 11D–F |

ในผังบนหน้าเว็บ: **Monitor** = จอติดผนังหรือ Pilot Rest, แถบบาง **OVHD** = Overhead Monitor 9 นิ้ว (ชี้เมาส์ที่ป้ายจอเพื่อดูชนิดจอ)

## การติดตั้ง (ทำครั้งเดียว)

### 1. เปิดหน้าเว็บด้วย GitHub Pages
1. ใน repo นี้ ไปที่ **Settings > Pages**
2. Source เลือก **Deploy from a branch**, Branch เลือก **main** และ **/ (root)** แล้วกด Save
3. รอ 1–2 นาที หน้าเว็บจะอยู่ที่ `https://rtaf602.github.io/a319_seatplan/`

### 2. ติดตั้ง Apps Script และสร้างแท็บในชีท
1. เปิด Google Sheet **Seat Plan 319 (For Admin)** > **ส่วนขยาย (Extensions) > Apps Script**
2. ลบโค้ดเดิมทั้งหมดใน `Code.gs` แล้ววางโค้ดจาก `apps-script/Code.gs`
3. ถ้าต้องการรหัส ให้แก้บรรทัดบนสุด:
   - `WRITE_PIN` รหัสที่ช่างต้องใส่ตอนเปิดหน้าเว็บและก่อน SAVE เช่น `'6020'` (เว้นว่าง = ไม่ต้องใช้รหัส)
   - `ADMIN_PIN` รหัสสำหรับปุ่ม "ล้างข้อมูลทั้งหมด" บนเว็บ (เว้นว่าง = ไม่แสดงปุ่มนี้)
4. กด **บันทึก (Save)**
5. ที่แถบด้านบน เลือกฟังก์ชัน **setupSheet** แล้วกด **Run (เรียกใช้)** กดอนุญาตสิทธิ์ (Authorize access) ด้วยบัญชีเจ้าของชีท
   รอประมาณ 1 นาที ชีทจะมี 4 แท็บ: **ผังที่นั่ง**, **รวมข้อขัดข้องคงค้าง**, **ทุกที่นั่ง และ Monitor**, **ประวัติการแก้ไข** (แท็บ Sheet1 ที่ว่างจะถูกลบ)
6. กด **Deploy > New deployment** > ไอคอนเฟือง เลือก **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
7. กด **Deploy** แล้วคัดลอก **Web app URL** (ลงท้ายด้วย `/exec`)

### 3. เชื่อมหน้าเว็บกับชีท
แก้ไฟล์ `config.js` ใน GitHub ใส่ URL จากข้อ 2.7:

```js
API_URL: 'https://script.google.com/macros/s/xxxxxxxx/exec',
```

กด Commit แล้วรีเฟรชหน้าเว็บ แถบด้านบนจะขึ้น "ข้อมูลจาก Google Sheet"

## เมื่อแก้โค้ด Apps Script ภายหลัง
กด **Deploy > Manage deployments >** ไอคอนดินสอ > Version เลือก **New version** > Deploy
URL เดิมใช้ต่อได้ ไม่ต้องแก้ `config.js`

## เมื่อต้องการแก้ผังที่นั่ง
1. แก้ผังใน `export-excel.js` (ใช้ทั้งชีทและไฟล์ Excel) และ `ZONES` ใน `index.html` (ผังบนหน้าเว็บ) ให้ตรงกัน
2. รัน `node tools/build-code-gs.js` เพื่อคัดลอกผังเข้า `apps-script/Code.gs`
3. วาง `Code.gs` ใหม่ใน Apps Script แล้วรัน **setupSheet** อีกครั้ง (หรือเมนู **Seat Plan > สร้าง / จัดผังที่นั่งใหม่** ในชีท) สภาพและหมายเหตุเดิมยังอยู่ แล้ว Deploy เป็น New version

ห้ามแทรกหรือลบแถว/คอลัมน์ในแท็บ "ผังที่นั่ง" เอง เพราะ Apps Script อ่านตำแหน่งช่องตามผังใน `export-excel.js`

## การทำงาน
- หน้าเว็บดึงข้อมูลจากแท็บ "ผังที่นั่ง" ทุก 30 วินาที
- SAVE: เขียนสภาพที่นั่ง, Monitor และหมายเหตุลงช่องในชีท และเพิ่มประวัติ (ช่องอีเมลจะเป็น "หน้าเว็บ" และช่องผู้ตรวจเป็นชื่อที่ใส่บนเว็บ)
- กรอกพร้อมกันหลายคน: SAVE จะเขียนเฉพาะช่องที่คนนั้นแก้จริง ถ้าแก้ที่นั่งเดียวกันคนละช่อง ค่าของทั้งสองคนจะอยู่ครบ ถ้าแก้ช่องเดียวกันและมีคน SAVE ไปก่อน หน้าเว็บจะไม่บันทึกทับ แต่ถามคนที่ SAVE ทีหลังว่าจะใช้ค่าที่บันทึกไว้หรือค่าของตัวเอง
- แก้ในชีทโดยตรง (เลือกจาก dropdown หรือพิมพ์ในช่อง NOTE) ก็บันทึกประวัติเช่นกัน และหน้าเว็บจะเห็นค่าใหม่ในรอบดึงข้อมูลถัดไป
- ตารางสรุปตามโซนและตามชนิด Monitor ในชีทนับจากแท็บ "ทุกที่นั่ง และ Monitor" จึงเปลี่ยนเองทันที
- ถ้ายังไม่ได้ใส่ `API_URL` หน้าเว็บยังเปิดดูและแก้ได้ แต่ SAVE ไม่ได้

## ข้อควรรู้ด้านความปลอดภัย
- Web App ตั้งเป็น "Anyone" เพื่อให้ช่างใช้ได้โดยไม่ต้องล็อกอิน Google ใครที่ได้ URL ก็อ่าน/บันทึกได้ จึงแนะนำให้ตั้ง `WRITE_PIN`
- เมื่อตั้ง `WRITE_PIN` หน้าเว็บจะถามรหัสทุกครั้งที่เปิดหน้า และทุกครั้งที่กด SAVE โดยไม่จำรหัสไว้ในเครื่อง และ URL ของ Apps Script จะไม่ส่งข้อมูลให้ถ้าไม่มีรหัส
- Repo นี้เป็น public ห้ามใส่รหัสลงใน `config.js` หรือไฟล์ใดใน repo ให้ตั้งรหัสเฉพาะใน Apps Script
- ประวัติการแก้ไขอยู่ในชีท ผู้มีสิทธิ์แก้ไขชีทลบได้ ควรล็อกแท็บ "ประวัติการแก้ไข" ด้วย Protect sheet ให้เฉพาะ Admin
