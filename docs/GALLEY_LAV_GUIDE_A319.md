# คู่มือออกแบบ Galley / ห้องน้ำ / ประตู — A319 (ต่อยอดจาก A320-05)

เอกสารนี้อธิบายว่าเพิ่ม Galley, ห้องน้ำ (LAV) และประตูเข้าไปในหน้า STATUS SEAT PLAN A319 อย่างไร
โดยไม่แตะที่นั่งและ Monitor เดิม เพื่อให้โปรเจกต์อื่นศึกษาและนำไปประยุกต์ได้
(หลักการเดียวกับ `a320-05_seatplan/docs/GALLEY_LAV_GUIDE.md` — เอกสารนี้เน้นส่วนที่ต่างและสิ่งที่เพิ่ม)

---

## 1. แนวทาง: ยกระบบ A320-05 มาวางบนผัง A319 เดิม

| ส่วน | มาจาก | หมายเหตุ |
|---|---|---|
| CSS ที่นั่ง / Monitor / ห้อง Commander Center / โซฟา / ผนัง | A319 เดิม | ไม่เปลี่ยน (ที่นั่งและจอหน้าตาเหมือนเดิม) |
| CSS Galley / LAV / DOOR / หน้า 3 SUMMARY / PREVIEW 2 แบบ | A320-05 | ยกมาทั้งชุด + ส่วนเพิ่ม A319 ท้าย `<style>` |
| `ZONES` (ที่นั่ง + Monitor) | A319 เดิม | เพิ่มเฉพาะบรรทัด `fac` / `door` และ `room.lav` |
| `build()` | A319 เดิม | เพิ่ม 3 กรณี: `door`, `fac`, `room.lav` |
| Galley / LAV (`GLAYOUT`, `LAVS`, `galBox`, `lavBtn`, `facRow`, `doorRow`) | A320-05 | ข้อมูลใหม่ตามคู่มือ A319CJ |
| หน้า 1 SUMMARY (`hCols`, `hZone`, `monLen`) | A319 เดิม | เพิ่มคอลัมน์ประตู (`door`) |
| หน้า 2-4 SUMMARY, PREVIEW, EXPORT PDF 600 dpi, ชื่อไฟล์ | A320-05 | ใช้ `AC='A319'` |
| `export-excel.js` | A319 เดิม (ช่องละ 2 คอลัมน์) | เพิ่ม Galley / LAV / DOOR และแผ่นงาน "Galley และห้องน้ำ" แบบ A320-05 |

**รหัส (id)** ใช้กติกาเดียวกับ A320-05 ทุกส่วน (เว็บ ↔ Excel ↔ Apps Script)
- อุปกรณ์ Galley: `<GALLEY>-<CODE>` เช่น `FWD-OVEN-1`, `AFT-TROLLEY-2`, `FWD-DRAWER-1`
- ห้องน้ำ: `LAV-<KEY>` = `LAV-A`, `LAV-CV`, `LAV-C`, `LAV-D`
- ชนิด (`kind`): `seat`, `mon`, `eq` (Galley), `lav` (ห้องน้ำ) · รายการทั้งหมดอยู่ใน `docs/ITEM_IDS.csv`
- สภาพ: ที่นั่ง `S_LABEL`, Monitor `M_LABEL`, Galley/ห้องน้ำ `E_LABEL = ['ใช้งานได้','ใช้งานได้บางส่วน','ใช้งานไม่ได้']` (เก็บในช่อง `s` เหมือนที่นั่ง)

## 2. ตำแหน่งในผัง (`ZONES[].lines`)

```js
// FRONT CREW ZONE: LAV A (ซ้าย กว้างเท่าห้อง CC) + FWD GALLEY (ขวา) → DOOR 1 → ห้อง CC 1A
lines:[{fac:{L:[{lav:'A',room:1}],R:[{gal:'FWD'}]}},
       {door:{code:'1',kind:'door'}},
       {room:{name:'ห้อง Commander Center',mon:'MON-F1',seats:['1A']}}]
// FIRST CLASS: ทางออกฉุกเฉินหลังแถว 5 (ต่อท้าย Monitor หลังแถว 5)
{door:{code:'',kind:'exit'}}
// MIDDLE CREW ZONE: ห้องน้ำอีกฝั่งของห้อง CC 6F (ใหม่ ไม่มีใน A320-05)
{room:{name:'ห้อง Commander Center',mon:'MON-C1',seats:['6F'],right:true,lav:'CV'}}
// Y-CLASS: ต่อท้ายแถวสุดท้าย
{fac:{L:[{lav:'C'}],R:[{lav:'D'}]}}, {door:{code:'4',kind:'door'}}, {fac:{C:[{gal:'AFT'}]}}
```
- `room:1` = ห้องน้ำกว้างเท่าห้อง Commander Center (`--ccw`) · A319 ห้อง CC กว้างตามเนื้อหา จึงกำหนด
  `--ccw: calc(2 * var(--sw) + var(--sg) + 16px)` (ที่นั่งกว้าง 2 ช่อง + padding 12 + กรอบ 4)
- `room.lav` = ปุ่มห้องน้ำอีกฝั่งของห้อง CC กว้าง `--ccw` และยืดสูงเท่าห้อง (`.lav.bycc`, ฝั่งนั้น `align-self: stretch`)
- ทางออกฉุกเฉิน (`kind:'exit'`) แสดงเฉพาะขอบซ้าย/ขวา ไม่พาดผ่านที่นั่ง · ประตู (`kind:'door'`) เป็นแถบเต็มความกว้าง

## 3. Galley (`GLAYOUT`)

วาดเป็น CSS grid "มองจากหน้า Galley ซ้ายไปขวา" ตามภาพคู่มือ แบ่งเป็น `bands` (แต่ละช่วงมีสัดส่วนคอลัมน์ของตัวเอง)

```js
FWD:{cols:5,nrows:8,pw:205,
  bands:[{r0:1,r1:4,h:40,w:[1,1,.9,.9],      xl:[[14,1],[15,1],[16,2],[18,2]]},          // เหนือเคาน์เตอร์ 4 คอลัมน์
         {r0:5,r1:8,h:34,w:[1,1,1,1.15,.65], xl:[[14,1],[15,1],[16,1],[17,2],[19,1]]}],  // ใต้เคาน์เตอร์ 5 คอลัมน์
  cells:[{id:'KSSU-1',type:'KSSU',label:'KSSU Std Unit 1',b:'KSSU 1',p:'KSSU 1',c:1,r:1,rs:2}, ...]}
```
| ฟิลด์ | ความหมาย |
|---|---|
| `id` / `type` / `label` | รหัส, ชนิด (ชื่อเต็มใน `TYPES`), ชื่อเต็ม |
| `b` | ข้อความบนปุ่ม (คอม) และชื่อในช่องของชีท |
| `t2` | ตัวย่อบนมือถือ (ไม่ใส่ = `TCODE` + เลข) เช่น Drawer ของ FWD ใช้ `ICE` / `CUT` / `CHN` |
| `p` | ตัวย่อบนหน้า 3 ของ SUMMARY 4 PAGES (เพิ่มใหม่ แทนการ `replace` ชื่อแบบ A320-05) |
| `c`,`r`,`cs`,`rs`,`v` | ตำแหน่ง/ขนาดในกริด, `v:1` = ตัวหนังสือแนวตั้ง (`rotate(-90deg)`) |
| ไม่มี `id` | ช่องลายเส้นไม่ได้ตรวจ (`n` = ชื่อ) |
| `bands[].xl` | **เพิ่มใหม่ (A319):** คอลัมน์ในแผ่นงาน "ผังที่นั่ง" ของแต่ละคอลัมน์กริด `[คอลัมน์เริ่ม, จำนวนคอลัมน์]` |

กติกา: ไล่เลขจากแถวบนลงล่าง ซ้ายไปขวา · ช่องลายเส้นใส่ไว้ให้รูปร่างตรงคู่มือ · ทุกช่องของกริดต้องมีเจ้าของ 1 รายการพอดี (ไม่ซ้อน ไม่เว้นรู)

### FWD GALLEY (CAOM 1.02.04 P3) — 17 รายการ
```
เหนือเคาน์เตอร์ │ KSSU 1      │ Elec.Panel* │ Work Light  │ PWR
                │ (2 แถว)     │ Microwave   │ Coffee Maker│ Stowage
                │ Oven        │ KSSU 2      │ (2 แถว)     │ Access Panel*
                │ (2 แถว)     │ (2 แถว)     │ Hot Cup     │ Faucet
ใต้เคาน์เตอร์   │ Chilled 1 │ Chilled 2 │ Refrig/Freezer │ Sink*          │ *
                │ (4 แถว)   │ (4 แถว)   │ (4 แถว)        │ Ice Drawer     │ Chiller
                │           │           │                │ Cutlery Drawer │ (2 แถว)
                │           │           │                │ China Drawer   │ S/O Valve*
```
### AFT GALLEY (CAOM 1.02.04 P5/6) — 22 รายการ (10 คอลัมน์ เต็มลำ)
```
r1 │ *     *  │ Elec.Panel* │ KSSU1 │ KSSU2 │ KSSU3 │ Stow 1 │ Elec.* │ *
r2 │ PWR │ CM │ HJ  │ CJ    │ Oven1 │ Oven2 │ Stow 2 (2 คอลัมน์ × 6 แถว) │ Stow 3 │ *
r3 │ Faucet   │ *   │ HC    │       │       │                │ (6 แถว)│ *
r4 │ Waste│Sink*│ Trash     │ Trl 1 │ Trl 2 │                │        │ *
r5 │ Bin  │Drw1 │ Compactor │       │       │                │        │ Misc
r6 │      │Drw2 │ (4 แถว)   │       │       │                │        │ Stow
r7 │ S/O* │Drw3 │           │       │       │                │        │ *
```
(* = ลายเส้น ไม่ได้ตรวจ · HJ / CJ = Hot / Cold Jug · HC = Hot Cup)

## 4. ห้องน้ำ (`LAVS`)
```js
var LAVS={A:{name:'LAVATORY A',short:'LAV A',zone:'F',pos:'หน้าห้อง Commander Center 1A (หน้า DOOR 1L/1R)'},
          CV:{name:'CENTER VIP LAVATORY',short:'CENTER VIP LAV',zone:'C',pos:'ซ้ายมือห้อง Commander Center 6F'},
          C:{name:'LAVATORY C',short:'LAV C',zone:'Y',pos:'หลังแถวสุดท้าย ฝั่งซ้าย'},
          D:{name:'LAVATORY D',short:'LAV D',zone:'Y',pos:'หลังแถวสุดท้าย ฝั่งขวา'}};
```
`zone` = นับในสรุปห้องน้ำของโซนไหน · `pos` (เพิ่มใหม่) ต่อท้ายชื่อในหน้าต่างบันทึก/รายการข้อขัดข้อง

## 5. รายงาน
- **หน้า 1 SUMMARY** (ผังที่นั่งแนวนอน): ใช้ของ A319 เดิม เพิ่มคอลัมน์ประตู (`k:'door'` กว้าง 14px) — DOOR 1, EXIT หลังแถว 5, DOOR 4 · Galley/ห้องน้ำไม่แสดงในหน้านี้ (`fac` ถูกข้าม)
- **หน้า 3 SUMMARY** (`EQ_CABIN`): ลำตัวแนวนอน หัวซ้าย-ท้ายขวา บน = ฝั่งขวา, ล่าง = ฝั่งซ้าย
  ```js
  {z:'FRONT',R:[{gal:'FWD'}],L:[{lav:'A'}]}, {z:'FRONT',door:{code:'1',kind:'door'}}, {z:'CREW',seat:'FRONT CREW',sub:'CC 1A'}, ...
  {z:'MID CREW',L:[{lav:'CV'}],cc:'CC 6F'},   // cc = กล่องห้อง CC 6F ฝั่งบน (เพิ่มใหม่)
  ```
  ตารางล่าง 2 คอลัมน์ (Galley + ห้องน้ำ | ตามชนิดอุปกรณ์ 18 ชนิด) และแถวตารางแน่นขึ้นให้พอดีหน้า
- **PDF 600 dpi**: `pdfScale()` ของ A320-05 — scale = 600 / 25.4 × ความกว้างบนกระดาษ(มม.) / ความกว้างภาพ(px) จำกัดตาม canvas สูงสุดของ iOS (16 MP) / Android (30 MP)
- บทเรียน html2canvas (เหมือน A320-05): ลายเส้นใช้ SVG data-URI, ไอคอน SVG ใส่ `width/height/fill` ในแท็ก, ตัวหนังสือแนวตั้งใช้ `rotate(-90deg)` ไม่ใช้ `writing-mode`

## 6. Excel (`export-excel.js`)
- `buildSeatWorkbook(ExcelJS, {state, lastSave, inspector, history, eq:{GLAYOUT, GALLEYS, LAVS, TYPES, TYPE_ORDER}})` — หน้าเว็บส่งข้อมูล Galley ให้ จึงมีข้อมูลผังชุดเดียว
- แผ่นงาน "ผังที่นั่ง": แต่ละรายการ 3 ช่องเรียงลงมา **ชื่อ / สภาพ (dropdown) / NOTE** เหมือนที่นั่ง
  - `galleyGrid(k, c0, c1)` — แถวกริด 1 แถว = 3 แถวในชีท, ช่องสูง `rs` แถว → NOTE merge ลงมาจนสุดช่อง
  - `lavCell(key, row, col, span)`, `lavRow(left, right)`, `doorBand(code, exit)`
  - ตารางสรุป Galley/ห้องน้ำ (แถว 19-23) นับด้วย `COUNTIFS` จากแผ่นงาน "Galley และห้องน้ำ"
- แผ่นงาน "Galley และห้องน้ำ" (แบบ A320-05): สรุปตาม Galley + ชนิด, สรุปห้องน้ำตามโซน, รายการที่ดึงสภาพ/NOTE จากผังด้วยสูตร
- "ทุกที่นั่ง และ Monitor" มีเฉพาะที่นั่งและจอ (สรุปตามโซนเดิมยังนับถูก) · "รวมข้อขัดข้องคงค้าง" รวม Galley/ห้องน้ำด้วย
- ตำแหน่งช่องของทุกรายการอยู่ใน `docs/ITEM_IDS.csv` (คอลัมน์ `sheet_status_cell`, `sheet_note_cell`) — ใช้ตอนทำ Apps Script

## 7. โหมดทดลอง (`config.js` → `DEMO:true`)
ยังไม่มี Apps Script ที่รู้จัก Galley/ห้องน้ำ จึงเพิ่มโหมดนี้: ไม่มี `API_URL` + `DEMO:true` → SAVE เก็บใน `localStorage` (`seat-a319-demo-saved`)
เพื่อให้ PREVIEW / EXPORT แสดงค่าที่บันทึก · ปุ่ม "ล้างข้อมูลทั้งหมด" ล้างข้อมูลทดลอง · เมื่อใส่ `API_URL` แล้วโหมดนี้ไม่มีผล

## 8. เช็กลิสต์เมื่อนำไปใช้กับเครื่องลำอื่น
1. ภาพ Galley จากคู่มือของเครื่องนั้น → `GLAYOUT` (cells, bands, `xl`) และรหัส id · ตรวจว่ากริดไม่ซ้อน/ไม่มีรู
2. `LAVS` และตำแหน่ง `fac` / `room.lav` ในผัง ให้กว้างเท่าที่นั่งฝั่งนั้นหรือเท่าห้อง CC
3. `door` (ประตู / ทางออก) ใน `ZONES` และ `EQ_CABIN` สำหรับหน้า 3
4. `export-excel.js`: เรียก `galleyGrid` / `lavCell` / `doorBand` ในตำแหน่งเดียวกับผังเว็บ
5. Apps Script: ผังในชีทต้องตรงกับ `export-excel.js` (id เดียวกัน) → `setupSheet` → Deploy New version
6. ทดสอบ: หน้าเว็บบนมือถือ/คอม, PREVIEW ทั้งสองแบบ, EXPORT PDF ทั้งสอง (ซูมดูความคม), EXPORT TO EXCEL (เปิดใน Excel และ Google Sheets), SAVE แล้วดูในชีท
