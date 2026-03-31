export const contentPages = {
  '/project': {
    title: 'Project',
    subtitle: 'ตัวอย่างผลงานและงานติดตั้งของทีม PKESS',
    html: `
      <p>เราดูแลงานด้าน UPS, battery system และ monitoring solution สำหรับองค์กรและโครงสร้างพื้นฐานที่ต้องการความต่อเนื่องของพลังงาน</p>
      <p>หากต้องการให้หน้านี้มีรายละเอียดเพิ่ม เช่น รูปหน้างาน, กลุ่มลูกค้า, หรือ case study แยกตามอุตสาหกรรม ผมสามารถย้ายข้อมูลส่วนนี้เข้า JSON หรือ CMS ต่อให้ได้</p>
    `
  },
  '/references': {
    title: 'Site References',
    subtitle: 'รวมงานอ้างอิงและสถานที่ที่เคยให้บริการ',
    html: `
      <p>หน้านี้พร้อมสำหรับใส่รายชื่อลูกค้า, สถานที่ติดตั้ง หรือหมวดหมู่งานอ้างอิงแบบแยกตามประเภทระบบ</p>
      <p>ตอนนี้ระบบ route ถูกย้ายมาเป็น clean URL แล้ว จึงสามารถต่อยอดทำ filter, search หรือโหลดข้อมูลจาก API ได้ง่ายกว่าเดิม</p>
    `
  },
  '/service/sla-battery': {
    title: 'For SLA Battery',
    subtitle: 'บริการดูแล ตรวจเช็ก และประเมินระบบแบตเตอรี่ SLA',
    html: `
      <p>รองรับงานตรวจสอบสุขภาพแบตเตอรี่, preventive maintenance, replacement planning และการประเมินความพร้อมใช้งานของระบบสำรองไฟ</p>
      <p>สามารถต่อยอดเพิ่มรายการ service package, ขั้นตอนการให้บริการ และฟอร์มขอใบเสนอราคาได้ในหน้าเดียวกัน</p>
    `
  },
  '/service/lithium-battery': {
    title: 'For Lithium Battery',
    subtitle: 'บริการสำหรับระบบ Lithium Battery และการดูแลระยะยาว',
    html: `
      <p>เหมาะกับงานที่ต้องการ monitoring, ตรวจเช็กระบบ BMS, ประเมิน performance และวางแผนบำรุงรักษาสำหรับระบบลิเธียม</p>
      <p>โครงสร้างหน้าใหม่รองรับการแตกข้อมูลเป็น section หรือ card เพิ่มเติมได้โดยไม่ต้องย้อนกลับไปใช้ไฟล์ HTML แยก</p>
    `
  }
} as const
