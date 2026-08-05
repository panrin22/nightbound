# Nightbound — สรุปสถานะโปรเจกต์

**อัปเดตล่าสุด:** 2026-08-05  
**แอป:** AI Bedtime Stories for Adults · soft literary · English  
**แพ็กเกจ:** `com.nightbound.app`  
**ราคาเป้า:** Subscription **$2.99 / เดือน**  
**GitHub:** https://github.com/panrin22/nightbound  
**ติดต่อ:** rinpan@yahoo.com  

---

## 1. ตัดสินใจที่ล็อกแล้ว

| หัวข้อ | ค่า |
|--------|-----|
| ภาษา | English |
| สแต็กมือถือ | React Native (Expo SDK 57) |
| เสียง MVP | System TTS (`expo-speech`) |
| ชื่อแอป | Nightbound |
| เนื้อหา | Soft literary only (ไม่โป๊ / ไม่สำหรับเด็ก) |

---

## 2. ทำเสร็จแล้ว

| ส่วน | รายละเอียด |
|------|------------|
| แผนผลิตภัณฑ์ | `PLAN.md` |
| แอปมือถือ | mood picker, generate, library, TTS, sleep timer, paywall UI, age gate 18+ |
| Backend AI | Hono + Groq (`gsk_`) / รองรับ xAI · offline fallback ในแอป |
| Legal | Privacy Policy + Terms บน GitHub Pages |
| Store copy | `store/STORE_LISTING.md` |
| กราฟิก / EAS คู่มือ | `store/GRAPHICS_AND_EAS.md`, `store/ICON_PROMPTS.md` |
| ไอคอน | แนวพระจันทร์ + หน้ากระดาษ (PNG ใน `nightbound/assets/images/`) |
| EAS | ลิงก์โปรเจกต์ + **build AAB production สำเร็จ** (v1.0.0 / versionCode 1) |
| คู่มือ VPS | `backend/HOSTINGER_VPS.md`, `backend/deploy/HOSTINGER_THIS_VPS.md` |

### URL สำคัญ

| ใช้ทำ | URL |
|--------|-----|
| Privacy (วางใน Play Console) | https://panrin22.github.io/nightbound/privacy-policy.html |
| Terms | https://panrin22.github.io/nightbound/terms.html |
| ดาวน์โหลด AAB | https://expo.dev/artifacts/eas/EuKLcmy-LL_GUCvKFdp0_0eb3p8hCiIKgnJqszoy7DY.aab |
| หน้า build EAS | https://expo.dev/accounts/panrins-team/projects/nightbound/builds/4ef4e7b1-39f2-45a5-a87a-06a3af94fff2 |
| Expo account | `panrin` · team `panrins-team` |
| EAS project ID | `37216c33-2555-4b01-a626-a04c896bf90e` |

### Hostinger VPS

| | |
|--|--|
| Hostname | `srv1163683.hstgr.cloud` |
| IP | `72.61.210.115` |
| แผน | KVM 2 |
| SSH จาก Windows | TCP port 22 ถึงได้ แต่ **SSH handshake อาจ timeout** → ใช้ **Browser console** ใน hPanel แทน |
| API `http://72.61.210.115:8787/health` | **ยังไม่ขึ้น** (ยังไม่ deploy / ยังไม่เปิดพอร์ต 8787) |

---

## 3. ยังไม่เสร็จ

| งาน | หมายเหตุ |
|-----|----------|
| Deploy API บน VPS | clone repo + `.env` (Groq key) + build + pm2 + เปิด 8787 / HTTPS |
| ผูกแอปกับ API production | `EXPO_PUBLIC_API_URL=https://…` แล้ว **EAS build รอบ 2** |
| Play Closed testing | มี AAB แล้ว ต้องอัป + ฟอร์ม listing / rating / data safety / testers |
| Feature graphic + screenshots | ยังไม่ครบชุด store |
| Google Play Billing $2.99 | ยังเป็น paywall stub / dev toggle |
| Production public release | หลัง closed test + billing (ถ้าต้องการเก็บเงิน) |

---

## 4. ความคืบหน้าโดยประมาณ

```
[แผน]                 ████████████ 100%
[แอป + AI local]      ████████████ 100%
[Legal / Privacy]     ████████████ 100%
[EAS AAB #1]          ████████████ 100%
[VPS API]             ██░░░░░░░░░░  ~15%
[Play Closed testing] ███░░░░░░░░░  ~25%
[Billing / Production]░░░░░░░░░░░░   0%
```

| เป้า | ความพร้อมโดยคร่าว |
|------|-------------------|
| ทดสอบติดตั้ง (AAB + offline story) | ~50–60% |
| ทดสอบ + AI ออนไลน์จริง | รอ VPS + rebuild |
| ขายจริง + เก็บเงิน $2.99 | รอ Billing + listing ครบ |

---

## 5. ลำดับงานถัดไป (แนะนำ)

1. เข้า **Hostinger Browser console** (หลีกเลี่ยง SSH timeout บน Wi‑Fi org)
2. Deploy API ตาม `backend/deploy/HOSTINGER_THIS_VPS.md`
3. ให้ผ่าน: `curl http://72.61.210.115:8787/health` (และ HTTPS ถ้าทำได้)
4. ตั้ง `EXPO_PUBLIC_API_URL` → `eas build -p android --profile production`
5. Play Console → **Closed testing** → อัป AAB ใหม่ + เพิ่ม tester
6. ทีหลัง: Play Billing $2.99 · รูป store ครบ · Production

---

## 6. โครงสร้างโฟลเดอร์

```
ai-bedtime-stories/          (root = monorepo = GitHub nightbound)
  PLAN.md
  STATUS.md                  ← ไฟล์นี้
  README.md
  nightbound/                Expo app + EAS
  backend/                   AI story API
  store/                     listing, icons, legal source
  docs/                      GitHub Pages (privacy + terms)
```

**พาธบนเครื่อง:** `C:\Users\tawat\grokwork\ai-bedtime-stories`

---

## 7. บทเรียน / ข้อควรจำ

- อย่ารัน `create-expo-app` ทับโปรเจกต์เดิม — ใช้ `eas init --id <uuid>` กับโฟลเดอร์ที่มีโค้ดแล้ว
- อย่าใส่ `http://localhost:8081/` เป็น Privacy หรือ API production (เป็นแค่ Metro dev)
- Key AI อยู่เฉพาะ server (`.env` บน VPS) — ห้ามฝังใน APK
- AAB รอบแรกยังไม่มี API บน VPS → generate อาจเป็น **offline story**
- Wi‑Fi องค์กร: บางครั้ง TCP 22 ผ่าน แต่ SSH banner ค้าง → ใช้ Browser terminal / hotspot
- ทุกครั้งที่อัป Play ใหม่ ต้อง **versionCode +1** (EAS remote version)

---

## 8. คำสั่งที่ใช้บ่อย

```powershell
# แอป local
cd C:\Users\tawat\grokwork\ai-bedtime-stories\nightbound
npx expo start -c

# EAS
eas whoami
eas build -p android --profile production --non-interactive
eas build:list

# ตรวจ API บน VPS (หลัง deploy)
curl http://72.61.210.115:8787/health
# หรือ
curl https://srv1163683.hstgr.cloud/health
```

```bash
# บน VPS (หลัง SSH / Browser console)
cd /var/www/nightbound && git pull
cd backend && npm install && npx tsc
pm2 restart nightbound-api
curl http://127.0.0.1:8787/health
```

---

## 9. สรุปหนึ่งบรรทัด

**แอป + เอกสาร legal + AAB พร้อมแล้ว · รอ deploy API บน Hostinger VPS แล้ว rebuild · จากนั้น Closed testing บน Play · Billing $2.99 ทีหลัง**

---

*อัปเดตไฟล์นี้เมื่อจบ milestone สำคัญ (VPS up, AAB #2, closed test live, billing, production).*
